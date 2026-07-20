-- 최근 1년 SNS·인스타에서 화제가 된 꽃 명소 시드 (출처 링크 포함)
-- seed-spots.sql 실행 후에 실행하세요. 중복 실행해도 안전합니다.

alter table reports add column if not exists source_url text;

-- 삽입 헬퍼: 시즌 이름으로 찾아 넣고, 같은 memo가 있으면 건너뜀
create or replace function _seed_viral(p_flower text, p_lat float8, p_lng float8, p_memo text, p_url text)
returns void language sql as $$
  insert into reports (season_id, lat, lng, memo, bloom_state, source_url)
  select id, p_lat, p_lng, p_memo, 'full', p_url from seasons where flower_name = p_flower
  and not exists (select 1 from reports where memo = p_memo);
$$;

-- 능소화 (여름)
select _seed_viral('능소화', 37.5825, 126.9830, '북촌한옥마을 — 기와지붕+능소화 SNS 단골샷', 'https://valmemo.com/34');
select _seed_viral('능소화', 37.2879, 127.0169, '수원 화성 화홍문 — 성곽길 능소화 사진 명소', 'https://valmemo.com/34');
select _seed_viral('능소화', 37.5296, 127.0668, '뚝섬한강공원 — 여름 능소화 산책 스팟', 'https://valmemo.com/34');
select _seed_viral('능소화', 37.5946, 126.9970, '성북동 골목 — 고즈넉한 담장 능소화', 'https://valmemo.com/34');
select _seed_viral('능소화', 37.6247, 126.9018, '고양 서오릉 — 능소화 산책 명소', 'https://valmemo.com/34');
select _seed_viral('능소화', 37.2586, 127.1218, '용인 한국민속촌 — 전통가옥 능소화', 'https://valmemo.com/34');

-- 벚꽃 (봄)
select _seed_viral('벚꽃', 37.5550, 127.1100, '워커힐 벚꽃 산책로 — 인스타 화제 벚꽃길', 'https://www.instagram.com/p/DIWnPmOPQPP/');
select _seed_viral('벚꽃', 37.5443, 127.0374, '서울숲 바람의 언덕 — SNS 유명 벚꽃 포토존', 'https://www.kkday.com/ko/blog/25431/aisa-korea-seoul-cherry-blossom-best-spots');
select _seed_viral('벚꽃', 37.4700, 127.0380, '양재시민의숲 — 밤 라이트업 벚꽃 명소', 'https://www.kkday.com/ko/blog/25431/aisa-korea-seoul-cherry-blossom-best-spots');

-- 수국 (초여름)
select _seed_viral('수국', 33.3060, 126.3350, '제주 파더스가든 — 3만평 수국정원, 야자수+수국 포토존', 'https://www.tourtoctoc.com/news/articleView.html?idxno=9613');
select _seed_viral('수국', 33.2896, 126.3688, '카멜리아힐 수국길 — 수국 바다 인스타 성지', 'https://travelmapjourney.com/hydrangea-spots-2026-best10/');

-- 장미 (5월)
select _seed_viral('장미', 37.5896, 127.0929, '중랑 서울장미축제 — 5.45km 국내 최대 장미터널, 야간 LED', 'https://korean.visitkorea.or.kr/kfes/detail/fstvlDetail.do?fstvlCntntsId=eae0362f-261d-45ab-aca5-3123278d2763');
select _seed_viral('장미', 37.1650, 127.0540, '오산 고인돌공원 — 장미+야경 무료 축제', 'https://www.balpumnews.com/travel/oh-happy-rose-festival');

-- 핑크뮬리 (가을)
select _seed_viral('핑크뮬리', 36.9670, 127.0090, '평택 바람새마을 — 풍차+핑크뮬리 유럽 감성', 'https://sun1.greenharmony11.com/entry/서울-근교·전국-핑크뮬리-명소-총정리-2025-가을-여행지-추천');
select _seed_viral('핑크뮬리', 35.3660, 126.5960, '고창 청농원 — 언덕 가득 핑크뮬리 물결', 'https://www.tourtoctoc.com/news/articleView.html?idxno=10765');
select _seed_viral('핑크뮬리', 37.8290, 128.8780, '강릉 호린파크 — 해변 옆 핑크뮬리 군락', 'https://www.tourtoctoc.com/news/articleView.html?idxno=10765');
select _seed_viral('핑크뮬리', 35.5680, 128.1690, '합천 신소양체육공원 — 나선형 핑크뮬리 언덕 인생샷', 'https://www.telltrip.com/domestic-travel/hapcheon-sinsoyang-park-pink-muhly/');

-- 튤립 (봄)
select _seed_viral('튤립', 35.7740, 128.4250, '대구 옥연지 송해공원 — 튤립 봄 나들이 명소', 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=5071672e-d8e9-4a2e-b0b5-50823df08d9a');

-- 해바라기 (여름)
select _seed_viral('해바라기', 37.1780, 128.9560, '태백 구와우마을 — 해발 800m 고원 해바라기밭', 'https://www.news-wa.com/article/travel/tour-korea/2026/06/30/20260630500016');

-- 유채꽃 (봄, 제주)
select _seed_viral('유채꽃', 33.4500, 126.9270, '제주 광치기해변 — 성산일출봉 배경 유채밭', 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=c46325ef-58ca-4a50-9a47-b86830ffb03f');
select _seed_viral('유채꽃', 33.2496, 126.4030, '제주 대왕수천예래생태공원 — 유채+벚꽃 동시 스냅 명소', 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=234dc81c-663c-46af-a70b-9362476b4f3b');
select _seed_viral('유채꽃', 33.4520, 126.4130, '제주 항파두리 — 한적한 토성 유채밭 인생샷', 'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=ee086406-eaf6-4bf8-af98-1b4a7e091d9f');

-- 단풍·은행 (가을)
select _seed_viral('단풍·은행', 37.5796, 126.9770, '경복궁 — 서울 단풍 검색량 1위, 경회루 반영샷', 'https://m.view.nate.com/travel/view/332026/');
select _seed_viral('단풍·은행', 35.8347, 129.2265, '경주 동궁과 월지 — 단풍 야경 반영 감성', 'https://tastytracer.com/entry/인스타-감성-가득한-가을-단풍-사진-명소-추천');
select _seed_viral('단풍·은행', 36.7760, 126.4570, '서산향교 은행나무 — SNS 화제 황금빛 스팟', 'https://tripgend.co.kr/domestic/24359/seosan-ginkgo-autumn-travel/');
select _seed_viral('단풍·은행', 36.7710, 127.0090, '아산 신정호수공원 — 단풍+억새+호수 산책', 'https://www.telltrip.com/domestic-travel/asan-sinjeongho-lake-park-autumn-forest/');
select _seed_viral('단풍·은행', 36.7830, 126.9800, '아산 곡교천 은행나무길 — 황금빛 터널, 11월 거리예술제', 'https://www.telltrip.com/domestic-travel/asan-gokgyocheon-ginkgo-road/');

-- 억새 (가을)
select _seed_viral('억새', 37.2680, 128.7620, '정선 민둥산 — 30회 은빛억새축제, 전국 5대 억새', 'https://www.telltrip.com/festival/jeongseon-mindungsan-silver-grass-festival/');

drop function _seed_viral(text, float8, float8, text, text);
