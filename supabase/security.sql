-- 도배·조작 방지. moderation.sql을 먼저 실행한 뒤 Supabase SQL Editor에서 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
--   · 제보: 같은 사람(IP) 10분에 5건, 하루 30건까지. 좌표는 한국 범위만.
--   · 신고: 같은 사람이 같은 제보를 두 번 신고해도 1건 (자동 숨김 3건은 서로 다른 3명이어야 함)
--   · 확인 투표·좋아요·방문: 같은 사람이 같은 제보에 하루 1번씩만 반영
--   · 테이블에 직접 insert하는 길을 닫고 전부 RPC로만 받는다
--
-- IP는 원문을 저장하지 않고 해시만 남기며 30일 지나면 지운다.
-- IP를 알 수 없는 요청(SQL Editor 등)은 제한하지 않는다.

-- 1) 기록 테이블 (익명 사용자는 읽기·쓰기 불가)
create table if not exists rate_events (
  kind text not null,
  actor text not null,
  target bigint,
  created_at timestamptz not null default now()
);
create index if not exists rate_events_lookup on rate_events (kind, actor, created_at);
alter table rate_events enable row level security;
revoke all on rate_events from anon, authenticated;

-- 요청한 사람의 IP 해시 (없으면 null)
create or replace function _actor() returns text
language plpgsql stable as $$
declare
  h json := nullif(current_setting('request.headers', true), '')::json;
  ip text := coalesce(h->>'cf-connecting-ip', split_part(h->>'x-forwarded-for', ',', 1));
begin
  if ip is null or btrim(ip) = '' then return null; end if;
  return md5('kkotmap:' || btrim(ip));
end $$;

-- 기간 안에 같은 사람이 남긴 기록 수 (target이 null이면 대상 무관)
create or replace function _rate_count(p_kind text, p_target bigint, p_window interval) returns int
language sql stable as $$
  select count(*)::int from rate_events
  where kind = p_kind and actor = _actor() and created_at > now() - p_window
    and (p_target is null or target = p_target);
$$;

create or replace function _rate_log(p_kind text, p_target bigint) returns void
language plpgsql as $$
begin
  if _actor() is null then return; end if;
  insert into rate_events (kind, actor, target) values (p_kind, _actor(), p_target);
  if random() < 0.02 then
    delete from rate_events where created_at < now() - interval '30 days';
  end if;
end $$;

-- 같은 사람이 같은 대상에 기간 안에 이미 했으면 false, 아니면 기록하고 true
create or replace function _once(p_kind text, p_target bigint, p_window interval) returns boolean
language plpgsql as $$
begin
  if _actor() is null then return true; end if;
  if _rate_count(p_kind, p_target, p_window) > 0 then return false; end if;
  perform _rate_log(p_kind, p_target);
  return true;
end $$;

revoke execute on function _actor(), _rate_count(text, bigint, interval), _rate_log(text, bigint),
  _once(text, bigint, interval) from public, anon, authenticated;

-- 2) 제보 작성: 속도 제한 + 입력 검사
create or replace function create_report(
  p_season_id bigint, p_lat float8, p_lng float8, p_memo text, p_photo_url text, p_bloom_state text
) returns table (id bigint, status text, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare
  r reports;
begin
  if _actor() is not null and (
    _rate_count('report', null, interval '10 minutes') >= 5 or
    _rate_count('report', null, interval '1 day') >= 30
  ) then
    raise exception 'rate_limited' using hint = '잠시 후 다시 제보해 주세요';
  end if;
  if p_lat is null or p_lng is null or p_lat not between 33 and 39 or p_lng not between 124 and 132 then
    raise exception 'out_of_range';
  end if;
  if p_photo_url is not null and p_photo_url !~ '/storage/v1/object/public/photos/[0-9]+/[0-9a-f-]{36}\.jpg$' then
    raise exception 'invalid photo url';
  end if;
  insert into reports (season_id, lat, lng, memo, photo_url, bloom_state, status)
  values (p_season_id, round(p_lat::numeric, 4)::float8, round(p_lng::numeric, 4)::float8,
          left(btrim(coalesce(p_memo, '')), 200), p_photo_url, p_bloom_state,
          case when p_photo_url is not null then 'pending' else 'approved' end)
  returning * into r;
  perform _rate_log('report', r.id);
  return query select r.id, r.status, r.created_at;
end $$;
grant execute on function create_report(bigint, float8, float8, text, text, text) to anon, authenticated;

-- 3) 신고: 같은 사람·같은 제보는 한 번만, 하루 20건까지
create or replace function flag_report(p_report_id bigint, p_reason text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if _actor() is not null and _rate_count('flag', null, interval '1 day') >= 20 then return; end if;
  if not _once('flag', p_report_id, interval '30 days') then return; end if;
  insert into flags (report_id, reason) values (p_report_id, left(coalesce(p_reason, ''), 100));
end $$;
grant execute on function flag_report(bigint, text) to anon, authenticated;

-- 4) 확인 투표·좋아요·방문: 같은 사람·같은 제보 하루 1번
create or replace function vote_report(p_report_id bigint, p_kind text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_kind not in ('fresh', 'faded') then return; end if;
  if not _once('vote', p_report_id, interval '1 day') then return; end if;
  update reports set
    fresh_votes = fresh_votes + (p_kind = 'fresh')::int,
    faded_votes = faded_votes + (p_kind = 'faded')::int
  where id = p_report_id and status = 'approved' and not hidden;
end $$;

create or replace function like_report(p_report_id bigint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not _once('like', p_report_id, interval '1 day') then return; end if;
  update reports set likes = likes + 1 where id = p_report_id and status = 'approved' and not hidden;
end $$;

create or replace function visit_report(p_report_id bigint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not _once('visit', p_report_id, interval '1 day') then return; end if;
  update reports set visits = visits + 1 where id = p_report_id and status = 'approved' and not hidden;
end $$;

-- 5) 직접 insert 막기 (제보·신고는 위 RPC로만)
drop policy if exists "anyone can report" on reports;
drop policy if exists "anyone can flag" on flags;

-- 6) 사진 업로드 경로 고정: photos/{시즌id}/{uuid}.jpg 만
drop policy if exists "photos upload" on storage.objects;
create policy "photos upload" on storage.objects for insert
  with check (bucket_id = 'photos' and name ~ '^[0-9]+/[0-9a-f-]{36}\.jpg$');

-- 확인용
select proname from pg_proc
where proname in ('create_report', 'flag_report', 'vote_report', 'like_report', 'visit_report')
order by 1;
