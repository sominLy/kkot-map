-- 꽃맵 스키마. Supabase SQL Editor에 붙여넣어 실행하세요.

create table seasons (
  id bigint generated always as identity primary key,
  flower_name text not null,
  emoji text not null default '🌸',
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

create table reports (
  id bigint generated always as identity primary key,
  season_id bigint not null references seasons(id),
  lat double precision not null,
  lng double precision not null,
  memo text not null default '' check (char_length(memo) <= 200),
  photo_url text,
  bloom_state text not null default 'full' check (bloom_state in ('full', 'blooming', 'faded')),
  fresh_votes int not null default 0,
  faded_votes int not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create table flags (
  id bigint generated always as identity primary key,
  report_id bigint not null references reports(id),
  reason text not null default '',
  created_at timestamptz not null default now()
);

-- 확인 투표는 RPC로만 (임의 컬럼 수정 방지)
create or replace function vote_report(p_report_id bigint, p_kind text)
returns void language sql security definer as $$
  update reports set
    fresh_votes = fresh_votes + (p_kind = 'fresh')::int,
    faded_votes = faded_votes + (p_kind = 'faded')::int
  where id = p_report_id and p_kind in ('fresh', 'faded');
$$;

-- RLS: 익명은 읽기 + 제보 작성만. 수정·삭제 불가.
alter table seasons enable row level security;
alter table reports enable row level security;
alter table flags enable row level security;

create policy "seasons readable" on seasons for select using (true);
create policy "reports readable" on reports for select using (not hidden);
create policy "anyone can report" on reports for insert
  with check (not hidden and fresh_votes = 0 and faded_votes = 0);
create policy "anyone can flag" on flags for insert with check (true);

-- Storage: 'photos' 공개 버킷을 만들고 아래 정책 추가
-- (Dashboard > Storage > New bucket > photos, public)
create policy "photos upload" on storage.objects for insert
  with check (bucket_id = 'photos');

-- 시작 데이터
insert into seasons (flower_name, emoji, is_active) values ('능소화', '🧡', true);
