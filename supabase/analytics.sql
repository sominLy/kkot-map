-- 운영 지표: 방문·화면 이동·필터·길찾기·공유·제보 시작 같은 행동 수를 센다. security.sql 다음에 실행하세요.
-- 여러 번 실행해도 안전합니다. 개인을 식별하는 정보(IP·기기 정보)는 저장하지 않고
-- 행동 종류·제보 id·짧은 라벨(탭 이름 등)·시각만 남깁니다.
-- 같은 사람(IP 해시)의 같은 행동은 1시간에 1번만 셉니다 (새로고침·연타로 숫자가 부풀지 않게).
-- 'app_open'은 사람당 하루 1번만 세므로 일별 방문자 수(DAU)로 볼 수 있어요. 라벨에는 유입 경로(도메인)를 남깁니다.

create table if not exists app_events (
  id bigint generated always as identity primary key,
  kind text not null,
  report_id bigint,
  label text,
  created_at timestamptz not null default now()
);
alter table app_events add column if not exists label text;
create index if not exists app_events_time on app_events (created_at);
alter table app_events enable row level security;
revoke all on app_events from anon, authenticated;

drop function if exists track_event(text, bigint);
create or replace function track_event(p_kind text, p_report_id bigint default null, p_label text default null)
returns void language plpgsql security definer set search_path = public as $$
declare
  lbl text := nullif(left(regexp_replace(coalesce(p_label, ''), '[^0-9A-Za-z가-힣·._ -]', '', 'g'), 40), '');
begin
  if p_kind not in (
    'app_open', 'open_report', 'directions', 'share', 'report_start',
    'tab', 'filter', 'season_switch', 'calendar_add', 'card_share', 'locate'
  ) then return; end if;
  -- app_open은 사람당 하루 1번(유입 경로 라벨과 무관), 나머지는 라벨별로 1시간에 1번
  if not _once('ev:' || p_kind || case when p_kind = 'app_open' then '' else ':' || coalesce(lbl, '') end,
               p_report_id,
               case when p_kind = 'app_open' then interval '1 day' else interval '1 hour' end) then
    return;
  end if;
  insert into app_events (kind, report_id, label) values (p_kind, p_report_id, lbl);
end $$;
grant execute on function track_event(text, bigint, text) to anon, authenticated;

-- 확인용
select kind, count(*) from app_events group by 1;
