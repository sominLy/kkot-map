-- 제보 1차 검수 + 신고 자동 숨김 + 사진 저장소 제한
-- Supabase SQL Editor에서 한 번 실행하세요. 여러 번 실행해도 안전합니다.
--
-- 흐름
--   · 사진이 있는 제보 → status = 'pending'(검수 대기). 운영자가 /admin에서 승인해야 지도에 보여요.
--   · 글만 있는 제보   → 바로 'approved'.
--   · 신고가 3건 쌓이면 자동으로 hidden = true. 운영자가 /admin에서 복구하거나 그대로 둡니다.
--   · 기존 제보는 전부 'approved'로 시작합니다.

-- 1) 검수 상태 컬럼
alter table reports add column if not exists status text not null default 'approved';
alter table reports drop constraint if exists reports_status_check;
alter table reports add constraint reports_status_check check (status in ('pending', 'approved', 'rejected'));
alter table reports add column if not exists reviewed_at timestamptz;
create index if not exists reports_pending_idx on reports (created_at) where status = 'pending';

-- 2) 익명 제보의 상태는 서버가 정한다 (클라이언트가 status·hidden·투표 수를 조작할 수 없게)
create or replace function reports_before_insert()
returns trigger language plpgsql as $$
begin
  if current_user in ('anon', 'authenticated') then
    new.status := case when new.photo_url is not null then 'pending' else 'approved' end;
    new.hidden := false;
    new.fresh_votes := 0;
    new.faded_votes := 0;
    new.likes := 0;
    new.visits := 0;
    new.reviewed_at := null;
  end if;
  return new;
end $$;

drop trigger if exists reports_before_insert on reports;
create trigger reports_before_insert before insert on reports
  for each row execute function reports_before_insert();

-- 3) 읽기: 승인되고 숨겨지지 않은 제보만
drop policy if exists "reports readable" on reports;
create policy "reports readable" on reports for select using (not hidden and status = 'approved');

-- 4) 제보 작성은 RPC로 (검수 대기 제보는 select 정책에 안 걸려서 insert ... returning이 실패하므로)
create or replace function create_report(
  p_season_id bigint, p_lat float8, p_lng float8, p_memo text, p_photo_url text, p_bloom_state text
) returns table (id bigint, status text, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare
  r reports;
begin
  if p_photo_url is not null and p_photo_url !~ '/storage/v1/object/public/photos/' then
    raise exception 'invalid photo url';
  end if;
  insert into reports (season_id, lat, lng, memo, photo_url, bloom_state, status)
  values (p_season_id, round(p_lat::numeric, 4)::float8, round(p_lng::numeric, 4)::float8, coalesce(p_memo, ''), p_photo_url, p_bloom_state,
          case when p_photo_url is not null then 'pending' else 'approved' end)
  returning * into r;
  return query select r.id, r.status, r.created_at;
end $$;
grant execute on function create_report(bigint, float8, float8, text, text, text) to anon, authenticated;

-- 5) 내 제보 상태 확인 (내용은 돌려주지 않고 상태만)
create or replace function report_status(p_ids bigint[])
returns table (id bigint, status text, hidden boolean)
language sql security definer set search_path = public as $$
  select r.id, r.status, r.hidden from reports r where r.id = any(p_ids[1:200]);
$$;
grant execute on function report_status(bigint[]) to anon, authenticated;

-- 6) 신고 3건이면 자동 숨김
create or replace function flags_auto_hide()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from flags where report_id = new.report_id) >= 3 then
    update reports set hidden = true where id = new.report_id;
  end if;
  return new;
end $$;

drop trigger if exists flags_auto_hide on flags;
create trigger flags_auto_hide after insert on flags
  for each row execute function flags_auto_hide();

-- 7) 사진 저장소: jpeg만, 2MB 이하 (앱이 1600px·jpeg로 줄여서 올리므로 보통 0.5MB 안팎)
update storage.buckets
set file_size_limit = 2 * 1024 * 1024, allowed_mime_types = array['image/jpeg']
where id = 'photos';

-- 확인용
select status, hidden, count(*) from reports group by 1, 2 order by 1, 2;
