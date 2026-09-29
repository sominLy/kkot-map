-- 2026년 9월 말 기준: 지금 시즌을 단풍으로 바꾸고 인스타그램 단풍 명소를 연결.
-- node seed/instagram-autumn.mjs 로 생성. Supabase SQL Editor에서 실행하세요. 중복 실행해도 안전합니다.
-- 출처 기간: 2025년 10월 게시물, 2026년 9월 21일 이후 게시물 (인스타그램만, 블로그 제외)

alter table reports add column if not exists source_url text;
alter table reports add column if not exists source_posted_at date;

-- 1) 지금 시즌 = 단풍·은행
update seasons set is_active = (flower_name = '단풍·은행');

-- 2) 단풍 제보에 남아 있는 블로그·기사 링크 제거
update reports set source_url = null, source_posted_at = null
where season_id = (select id from seasons where flower_name = '단풍·은행')
  and source_url is not null and source_url not like '%instagram.com%';

-- 3) 9월 말은 아직 물드는 중: 운영자 시드의 상태를 '물드는 중'으로
update reports set bloom_state = 'blooming'
where season_id = (select id from seasons where flower_name = '단풍·은행')
  and bloom_state = 'full'
  and (memo like '%(운영자 추천)' or source_url is not null);

-- 명소 이름으로 기존 제보를 찾아 출처를 붙이고, 없으면 새로 추가
create or replace function _ig_autumn(p_name text, p_lat float8, p_lng float8, p_memo text, p_url text, p_posted date)
returns void language plpgsql as $$
declare
  sid bigint := (select id from seasons where flower_name = '단풍·은행');
begin
  update reports set memo = p_memo, source_url = p_url, source_posted_at = p_posted
  where season_id = sid and memo like p_name || ' —%';
  if not found then
    insert into reports (season_id, lat, lng, memo, bloom_state, source_url, source_posted_at)
    values (sid, p_lat, p_lng, p_memo, 'blooming', p_url, p_posted);
  end if;
end $$;

select _ig_autumn('광주 곤지암 화담숲', 37.341, 127.293, '광주 곤지암 화담숲 — 곤지암 산자락을 따라 조성된 단풍 수목원', 'https://www.instagram.com/p/DQLXy-pk0W_/', '2025-10-24');
select _ig_autumn('원주 반계리 은행나무', 37.353, 127.8445, '원주 반계리 은행나무 — 천연기념물 노거수, 늦가을 노랗게 물드는 은행나무', 'https://www.instagram.com/p/DQLD2awEsgN/', '2025-10-24');
select _ig_autumn('괴산 문광저수지 은행나무길', 36.79, 127.745, '괴산 문광저수지 은행나무길 — 저수지 둑길을 따라 늘어선 은행나무', 'https://www.instagram.com/p/DQeOQF8ExCY/', '2025-10-31');
select _ig_autumn('아산 곡교천 은행나무길', 36.783, 126.98, '아산 곡교천 은행나무길 — 곡교천 강변을 따라 이어지는 은행나무 가로수', 'https://www.instagram.com/p/DQOEhOukSbs/', '2025-10-25');
select _ig_autumn('경주 도리마을 은행나무숲', 35.874, 129.06, '경주 도리마을 은행나무숲 — 마을 안에 빽빽하게 심은 은행나무 숲', 'https://www.instagram.com/p/DPz4jpFD_e8/', '2025-10-15');
select _ig_autumn('홍천 은행나무숲', 37.842, 128.326, '홍천 은행나무숲 — 가을에만 개방하는 개인 은행나무 숲', 'https://www.instagram.com/p/DPnxp2iEt2j/', '2025-10-10');
select _ig_autumn('가평 남이섬 메타세쿼이아 은행길', 37.79, 127.525, '가평 남이섬 메타세쿼이아 은행길 — 메타세쿼이아·은행나무 가로수길이 있는 섬', 'https://www.instagram.com/p/DQYe5AxEkwO/', '2025-10-29');
select _ig_autumn('가평 아침고요수목원', 37.7437, 127.3525, '가평 아침고요수목원 — 축령산 자락의 정원형 수목원', 'https://www.instagram.com/p/DQJBiNMiQ7R/', '2025-10-23');
select _ig_autumn('평창 오대산 월정사 전나무숲', 37.7317, 128.5925, '평창 오대산 월정사 전나무숲 — 월정사 앞 전나무숲길과 오대산 계곡', 'https://www.instagram.com/p/DPk7lfdCRki/', '2025-10-09');
select _ig_autumn('설악산 단풍', 38.119, 128.465, '설악산 단풍 — 해마다 가장 먼저 단풍이 드는 산', 'https://www.instagram.com/p/DQSjL-Wkvxd/', '2025-10-27');
select _ig_autumn('설악산 천불동계곡', 38.163, 128.472, '설악산 천불동계곡 — 비선대에서 양폭으로 이어지는 계곡길', 'https://www.instagram.com/p/DQGrR4ZE-JL/', '2025-10-22');
select _ig_autumn('설악산 토왕성폭포', 38.158, 128.5, '설악산 토왕성폭포 — 설악동에서 오르는 폭포 전망대', 'https://www.instagram.com/p/DQZKzQ7jwwX/', '2025-10-29');
select _ig_autumn('주왕산 단풍', 36.393, 129.165, '주왕산 단풍 — 기암 협곡과 주산지가 있는 국립공원', 'https://www.instagram.com/p/DPzxmZyjbrk/', '2025-10-15');
select _ig_autumn('내장산 단풍', 35.498, 126.888, '내장산 단풍 — 우화정과 단풍나무 터널이 있는 국립공원', 'https://www.instagram.com/p/DQWvuy0CX09/', '2025-10-28');
select _ig_autumn('대둔산 단풍', 36.123, 127.323, '대둔산 단풍 — 케이블카와 구름다리가 있는 암릉 산', 'https://www.instagram.com/p/DP59c69CW4h/', '2025-10-17');
select _ig_autumn('담양 메타세쿼이아길', 35.324, 126.991, '담양 메타세쿼이아길 — 늦가을 적갈색으로 물드는 가로수길', 'https://www.instagram.com/p/DP-V6rOknpE/', '2025-10-19');

drop function _ig_autumn(text, float8, float8, text, text, date);

-- 4) 기존 인스타 링크의 게시일 채우기
update reports set source_posted_at = '2025-07-01' where source_url = 'https://www.instagram.com/reel/DLkERhEvBJX/' and source_posted_at is null;
update reports set source_posted_at = '2025-06-27' where source_url = 'https://www.instagram.com/reel/DLaG21STemn/' and source_posted_at is null;
update reports set source_posted_at = '2025-06-11' where source_url = 'https://www.instagram.com/reel/DKw1QB6T0gY/' and source_posted_at is null;
update reports set source_posted_at = '2026-06-16' where source_url = 'https://www.instagram.com/reel/DZpmHOgyCK-/' and source_posted_at is null;
update reports set source_posted_at = '2026-03-17' where source_url = 'https://www.instagram.com/p/DV-CWWeD_SA/' and source_posted_at is null;
update reports set source_posted_at = '2026-03-28' where source_url = 'https://www.instagram.com/p/DWbQeY6EbFD/' and source_posted_at is null;
update reports set source_posted_at = '2026-04-06' where source_url = 'https://www.instagram.com/p/DWy0J1ck_NL/' and source_posted_at is null;
update reports set source_posted_at = '2026-05-22' where source_url = 'https://www.instagram.com/p/DYoby07mSbZ/' and source_posted_at is null;
update reports set source_posted_at = '2025-06-25' where source_url = 'https://www.instagram.com/p/DLUN6hXvl1c/' and source_posted_at is null;
update reports set source_posted_at = '2025-09-17' where source_url = 'https://www.instagram.com/reel/DOsygfFErd0/' and source_posted_at is null;
update reports set source_posted_at = '2025-09-23' where source_url = 'https://www.instagram.com/reel/DO8oyPAEuXA/' and source_posted_at is null;
update reports set source_posted_at = '2025-10-13' where source_url = 'https://www.instagram.com/reel/DPvO-rDk_vG/' and source_posted_at is null;
update reports set source_posted_at = '2025-10-02' where source_url = 'https://www.instagram.com/p/DPTsZP_gSLt/' and source_posted_at is null;
update reports set source_posted_at = '2025-10-29' where source_url = 'https://www.instagram.com/p/DQYyXR0gaoX/' and source_posted_at is null;
update reports set source_posted_at = '2026-03-08' where source_url = 'https://www.instagram.com/p/DVnHL6Hkbb0/' and source_posted_at is null;
update reports set source_posted_at = '2026-02-21' where source_url = 'https://www.instagram.com/p/DVBKh3yktYA/' and source_posted_at is null;
update reports set source_posted_at = '2026-02-15' where source_url = 'https://www.instagram.com/reel/DUw-Fc9k99w/' and source_posted_at is null;
update reports set source_posted_at = '2026-05-07' where source_url = 'https://www.instagram.com/p/DYAQfSZGTcL/' and source_posted_at is null;
update reports set source_posted_at = '2025-06-23' where source_url = 'https://www.instagram.com/reel/DLPYkv_vltP/' and source_posted_at is null;
update reports set source_posted_at = '2025-06-24' where source_url = 'https://www.instagram.com/p/DLRhrRFSW8M/' and source_posted_at is null;
update reports set source_posted_at = '2025-10-20' where source_url = 'https://www.instagram.com/reel/DQBJaxrkcWr/' and source_posted_at is null;
update reports set source_posted_at = '2025-11-10' where source_url = 'https://www.instagram.com/p/DQ34kM7k0ql/' and source_posted_at is null;

-- 기간 밖이라 제외한 명소 (게시물을 더 찾으면 seed/instagram-autumn.mjs에 추가 후 재생성)
--   장성 백양사: 2025-11-11, 2025-11-11, 2025-11-14
--   서울 올림픽공원: 2025-11-11
--   대전 한밭수목원: 2025-11-05
--   대구 팔공산 단풍: 2025-11-13, 2025-11-16

-- 확인용
select memo, bloom_state, source_posted_at, source_url from reports r
join seasons s on r.season_id = s.id
where s.flower_name = '단풍·은행' and source_url is not null order by source_posted_at desc;
