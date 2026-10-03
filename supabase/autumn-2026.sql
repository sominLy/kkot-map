-- 2026년 가을: 지금 시즌을 단풍으로 바꾸고 단풍 명소를 정리.
-- node seed/instagram-autumn.mjs 로 생성. Supabase SQL Editor에서 실행하세요. 중복 실행해도 안전합니다.
-- 출처 조건: 인스타그램 게시물 중 작성 계정 팔로워 5,000명 이상으로 확인된 것만
--           (lib/instagram-verified.json, 현재 0건), 2025년 10월·2026년 9월 21일 이후 게시물

alter table reports add column if not exists source_url text;
alter table reports add column if not exists source_posted_at date;

-- 1) 지금 시즌 = 단풍·은행
update seasons set is_active = (flower_name = '단풍·은행');

-- 2) 확인되지 않은 출처 링크 전부 제거 (블로그·기사, 팔로워 미확인 인스타 게시물; 모든 시즌)
update reports set source_url = null, source_posted_at = null
where source_url is not null;

-- 3) 아직 물드는 중: 운영자·SNS 시드("이름 — 설명")의 상태를 '물드는 중'으로
update reports set bloom_state = 'blooming'
where season_id = (select id from seasons where flower_name = '단풍·은행')
  and bloom_state = 'full'
  and memo like '% — %';

-- 명소 이름으로 기존 제보를 찾아 갱신하고, 없으면 새로 추가 (출처가 없으면 링크 없이)
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

select _ig_autumn('광주 곤지암 화담숲', 37.341, 127.293, '광주 곤지암 화담숲 — 곤지암 산자락을 따라 조성된 단풍 수목원', null, null);
select _ig_autumn('원주 반계리 은행나무', 37.353, 127.8445, '원주 반계리 은행나무 — 천연기념물 노거수, 늦가을 노랗게 물드는 은행나무', null, null);
select _ig_autumn('괴산 문광저수지 은행나무길', 36.79, 127.745, '괴산 문광저수지 은행나무길 — 저수지 둑길을 따라 늘어선 은행나무', null, null);
select _ig_autumn('아산 곡교천 은행나무길', 36.783, 126.98, '아산 곡교천 은행나무길 — 곡교천 강변을 따라 이어지는 은행나무 가로수', null, null);
select _ig_autumn('경주 도리마을 은행나무숲', 35.874, 129.06, '경주 도리마을 은행나무숲 — 마을 안에 빽빽하게 심은 은행나무 숲', null, null);
select _ig_autumn('홍천 은행나무숲', 37.842, 128.326, '홍천 은행나무숲 — 가을에만 개방하는 개인 은행나무 숲', null, null);
select _ig_autumn('가평 남이섬 메타세쿼이아 은행길', 37.79, 127.525, '가평 남이섬 메타세쿼이아 은행길 — 메타세쿼이아·은행나무 가로수길이 있는 섬', null, null);
select _ig_autumn('가평 아침고요수목원', 37.7437, 127.3525, '가평 아침고요수목원 — 축령산 자락의 정원형 수목원', null, null);
select _ig_autumn('평창 오대산 월정사 전나무숲', 37.7317, 128.5925, '평창 오대산 월정사 전나무숲 — 월정사 앞 전나무숲길과 오대산 계곡', null, null);
select _ig_autumn('설악산 단풍', 38.119, 128.465, '설악산 단풍 — 해마다 가장 먼저 단풍이 드는 산', null, null);
select _ig_autumn('설악산 천불동계곡', 38.163, 128.472, '설악산 천불동계곡 — 비선대에서 양폭으로 이어지는 계곡길', null, null);
select _ig_autumn('설악산 토왕성폭포', 38.158, 128.5, '설악산 토왕성폭포 — 설악동에서 오르는 폭포 전망대', null, null);
select _ig_autumn('주왕산 단풍', 36.393, 129.165, '주왕산 단풍 — 기암 협곡과 주산지가 있는 국립공원', null, null);
select _ig_autumn('내장산 단풍', 35.498, 126.888, '내장산 단풍 — 우화정과 단풍나무 터널이 있는 국립공원', null, null);
select _ig_autumn('대둔산 단풍', 36.123, 127.323, '대둔산 단풍 — 케이블카와 구름다리가 있는 암릉 산', null, null);
select _ig_autumn('담양 메타세쿼이아길', 35.324, 126.991, '담양 메타세쿼이아길 — 늦가을 적갈색으로 물드는 가로수길', null, null);

drop function _ig_autumn(text, float8, float8, text, text, date);

-- 기간 밖이라 제외한 명소
--   장성 백양사: 2025-11-11, 2025-11-11, 2025-11-14
--   서울 올림픽공원: 2025-11-11
--   대전 한밭수목원: 2025-11-05
--   대구 팔공산 단풍: 2025-11-13, 2025-11-16

-- 확인용: 남아 있는 출처 링크 (확인된 게시물만 있어야 함)
select memo, source_posted_at, source_url from reports where source_url is not null order by source_posted_at desc;
