-- 좋아요·방문 기능. Supabase SQL Editor에서 실행하세요. (seed-spots.sql과 함께 실행해도 돼요)

alter table reports add column if not exists likes int not null default 0;
alter table reports add column if not exists visits int not null default 0;

create or replace function visit_report(p_report_id bigint)
returns void language sql security definer as $$
  update reports set visits = visits + 1 where id = p_report_id;
$$;

create or replace function like_report(p_report_id bigint)
returns void language sql security definer as $$
  update reports set likes = likes + 1 where id = p_report_id;
$$;
