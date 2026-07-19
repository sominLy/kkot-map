-- 전국 꽃 명소 시드. Supabase SQL Editor에서 실행하세요.
-- 좌표는 근사값입니다. 중복 실행 방지를 위해 memo로 존재 여부를 확인합니다.

insert into seasons (flower_name, emoji, is_active)
select '능소화', '🧡', false
where not exists (select 1 from seasons where flower_name = '능소화');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5658, 126.9741, '서울 덕수궁 돌담길 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '서울 덕수궁 돌담길 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5862, 126.9946, '서울 성균관 명륜당 담장 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '서울 성균관 명륜당 담장 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5826, 126.9817, '서울 삼청동 골목 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '서울 삼청동 골목 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5794, 126.9724, '서울 서촌 통의동 골목 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '서울 서촌 통의동 골목 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5446, 127.0565, '서울 성수동 카페거리 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '서울 성수동 카페거리 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5623, 126.9256, '서울 연남동 경의선숲길 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '서울 연남동 경의선숲길 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.2818, 127.0129, '수원 행궁동 벽화마을 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '수원 행궁동 벽화마을 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4736, 126.6216, '인천 개항로 골목 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '인천 개항로 골목 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.3321, 127.4342, '대전 소제동 카페거리 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '대전 소제동 카페거리 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8151, 127.1532, '전주 한옥마을 은행로 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '전주 한옥마을 은행로 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8172, 127.1571, '전주 자만벽화마을 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '전주 자만벽화마을 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8601, 128.6063, '대구 김광석 다시그리기길 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '대구 김광석 다시그리기길 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8003, 128.5033, '대구 남평문씨 본리세거지 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '대구 남평문씨 본리세거지 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8372, 129.2098, '경주 황리단길 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '경주 황리단길 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8299, 129.2141, '경주 교촌마을 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '경주 교촌마을 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.0778, 129.0454, '부산 흰여울문화마을 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '부산 흰여울문화마을 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1382, 126.9096, '광주 양림동 펭귄마을 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '광주 양림동 펭귄마을 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1329, 128.706, '창원 진해 중원로터리 골목 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '창원 진해 중원로터리 골목 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.5392, 128.5169, '안동 하회마을 담장 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '안동 하회마을 담장 — 능소화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.2268, 126.2517, '제주 대정읍 골목 — 능소화 명소 (운영자 추천)', 'full' from seasons where flower_name = '능소화'
and not exists (select 1 from reports where memo = '제주 대정읍 골목 — 능소화 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '벚꽃', '🌸', false
where not exists (select 1 from seasons where flower_name = '벚꽃');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5284, 126.9179, '서울 여의도 윤중로 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '서울 여의도 윤중로 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5093, 127.1039, '서울 석촌호수 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '서울 석촌호수 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5512, 126.9882, '서울 남산 순환로 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '서울 남산 순환로 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.582, 126.9829, '서울 정독도서관 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '서울 정독도서관 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5481, 127.0811, '서울 어린이대공원 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '서울 어린이대공원 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4266, 127.0163, '과천 서울대공원 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '과천 서울대공원 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4757, 126.6224, '인천 자유공원 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '인천 자유공원 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.2871, 127.0119, '수원 화성 장안공원 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '수원 화성 장안공원 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.945, 127.8085, '춘천 소양강댐 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '춘천 소양강댐 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.7955, 128.8961, '강릉 경포호 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '강릉 경포호 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 38.2159, 128.5678, '속초 영랑호 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '속초 영랑호 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.6255, 127.487, '청주 무심천 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '청주 무심천 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.3946, 127.4406, '대전 계족산 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '대전 계족산 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8046, 127.1381, '전주 완산공원 꽃동산 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '전주 완산공원 꽃동산 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.9569, 126.6944, '군산 은파호수공원 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '군산 은파호수공원 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.2049, 127.4629, '구례 섬진강 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '구례 섬진강 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1908, 127.632, '하동 십리벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '하동 십리벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1526, 126.8541, '광주 운천저수지 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '광주 운천저수지 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8534, 128.5661, '대구 이월드 벚꽃 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '대구 이월드 벚꽃 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8419, 129.2818, '경주 보문단지 벚꽃 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '경주 보문단지 벚꽃 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.838, 129.21, '경주 대릉원 돌담길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '경주 대릉원 돌담길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1487, 128.6592, '창원 진해 여좌천 로망스다리 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '창원 진해 여좌천 로망스다리 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1524, 128.6931, '창원 진해 경화역 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '창원 진해 경화역 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1367, 129.1091, '부산 남천동 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '부산 남천동 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.22, 129.0864, '부산 온천천 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '부산 온천천 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.5624, 129.121, '울산 작천정 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '울산 작천정 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.506, 126.5219, '제주 전농로 벚꽃거리 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '제주 전농로 벚꽃거리 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.4576, 126.3672, '제주 애월 장전리 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '제주 애월 장전리 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.2496, 126.403, '서귀포 예래동 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '서귀포 예래동 벚꽃길 — 벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.6015, 127.2971, '세종 조치원 벚꽃길 — 벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '벚꽃'
and not exists (select 1 from reports where memo = '세종 조치원 벚꽃길 — 벚꽃 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '장미', '🌹', false
where not exists (select 1 from seasons where flower_name = '장미');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5896, 127.0929, '서울 중랑 장미공원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '서울 중랑 장미공원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5215, 127.1213, '서울 올림픽공원 장미광장 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '서울 올림픽공원 장미광장 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.6893, 127.0472, '서울 도봉 창포원 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '서울 도봉 창포원 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5052, 126.796, '부천 백만송이 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '부천 백만송이 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4478, 126.7325, '인천 장미근린공원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '인천 장미근린공원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.3082, 126.848, '안산 노적봉공원 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '안산 노적봉공원 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.2921, 126.9765, '수원 일월공원 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '수원 일월공원 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.8703, 127.7205, '춘천 공지천 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '춘천 공지천 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.3672, 127.3881, '대전 한밭수목원 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '대전 한밭수목원 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.6479, 127.5091, '청주 명암저수지 장미 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '청주 명암저수지 장미 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8446, 127.1252, '전주 덕진공원 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '전주 덕진공원 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1745, 126.9115, '광주 북구 장미공원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '광주 북구 장미공원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.205, 127.3, '곡성 세계장미축제 장미공원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '곡성 세계장미축제 장미공원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8534, 128.5661, '대구 이월드 장미축제 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '대구 이월드 장미축제 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.5322, 129.301, '울산 대공원 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '울산 대공원 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.2378, 129.09, '부산 화명수목원 장미 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '부산 화명수목원 장미 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.0561, 129.3781, '포항 영일대 장미원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '포항 영일대 장미원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.2199, 128.6811, '창원 장미공원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '창원 장미공원 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.3897, 126.2397, '제주 한림공원 장미 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '제주 한림공원 장미 — 장미 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4443, 129.168, '삼척 장미공원 — 장미 명소 (운영자 추천)', 'full' from seasons where flower_name = '장미'
and not exists (select 1 from reports where memo = '삼척 장미공원 — 장미 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '수국', '💙', false
where not exists (select 1 from seasons where flower_name = '수국');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.436, 126.8901, '제주 혼인지 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '제주 혼인지 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.2896, 126.3688, '제주 카멜리아힐 수국길 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '제주 카멜리아힐 수국길 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.4187, 126.7626, '제주 보롬왓 수국밭 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '제주 보롬왓 수국밭 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.253, 126.3312, '제주 안덕면사무소 수국길 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '제주 안덕면사무소 수국길 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.4989, 126.9128, '제주 종달리 수국길 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '제주 종달리 수국길 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.446, 126.6284, '서귀포 휴애리 수국축제 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '서귀포 휴애리 수국축제 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.0532, 129.0865, '부산 태종대 태종사 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '부산 태종대 태종사 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.1291, 129.0921, '부산 문화회관 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '부산 문화회관 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.7355, 128.61, '거제 저구마을 수국동산 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '거제 저구마을 수국동산 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.6906, 128.3565, '통영 장사도 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '통영 장사도 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.7635, 127.942, '남해 섬이정원 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '남해 섬이정원 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.927, 127.5054, '순천만국가정원 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '순천만국가정원 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.696, 125.999, '신안 도초도 수국공원 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '신안 도초도 수국공원 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.9772, 126.997, '익산 아가페정원 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '익산 아가페정원 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.5541, 127.0261, '공주 유구색동수국정원 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '공주 유구색동수국정원 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.598, 126.307, '태안 팜카밀레 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '태안 팜카밀레 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5443, 127.0374, '서울 서울숲 수국길 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '서울 서울숲 수국길 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.6584, 126.7691, '고양 일산호수공원 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '고양 일산호수공원 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.5459, 129.305, '울산 태화강 국가정원 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '울산 태화강 국가정원 수국 — 수국 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8961, 128.5851, '대구 침산공원 수국 — 수국 명소 (운영자 추천)', 'full' from seasons where flower_name = '수국'
and not exists (select 1 from reports where memo = '대구 침산공원 수국 — 수국 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '코스모스', '🌼', false
where not exists (select 1 from seasons where flower_name = '코스모스');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5664, 126.8837, '서울 하늘공원 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '서울 하늘공원 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5228, 127.1263, '서울 올림픽공원 들꽃마루 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '서울 올림픽공원 들꽃마루 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5789, 127.122, '구리 한강시민공원 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '구리 한강시민공원 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5951, 126.8248, '고양 행주산성 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '고양 행주산성 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.927, 126.802, '파주 율곡습지공원 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '파주 율곡습지공원 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5721, 126.6431, '인천 드림파크야생화단지 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '인천 드림파크야생화단지 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.885, 127.7, '춘천 의암호 코스모스길 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '춘천 의암호 코스모스길 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.37, 128.39, '평창 두메산골 코스모스길 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '평창 두메산골 코스모스길 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.662, 127.462, '청주 문암생태공원 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '청주 문암생태공원 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.524, 127.331, '세종 합강공원 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '세종 합강공원 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.477, 127.482, '대전 대청호 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '대전 대청호 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.793, 127.118, '전주 삼천 코스모스길 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '전주 삼천 코스모스길 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.744, 126.954, '김제 벽골제 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '김제 벽골제 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.302, 126.785, '장성 황룡강 노란꽃잔치 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '장성 황룡강 노란꽃잔치 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.101, 127.888, '하동 북천 코스모스축제 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '하동 북천 코스모스축제 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.568, 128.169, '합천 신소양체육공원 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '합천 신소양체육공원 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.893, 128.573, '대구 하중도 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '대구 하중도 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8347, 129.219, '경주 첨성대 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '경주 첨성대 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.211, 128.964, '부산 대저생태공원 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '부산 대저생태공원 코스모스 — 코스모스 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.452, 126.413, '제주 항파두리 코스모스 — 코스모스 명소 (운영자 추천)', 'full' from seasons where flower_name = '코스모스'
and not exists (select 1 from reports where memo = '제주 항파두리 코스모스 — 코스모스 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '유채꽃', '🟡', false
where not exists (select 1 from seasons where flower_name = '유채꽃');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.237, 126.313, '제주 산방산 유채밭 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '제주 산방산 유채밭 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.458, 126.941, '제주 성산일출봉 유채밭 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '제주 성산일출봉 유채밭 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.386, 126.766, '제주 가시리 녹산로 유채꽃길 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '제주 가시리 녹산로 유채꽃길 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.248, 126.411, '제주 엉덩물계곡 유채 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '제주 엉덩물계곡 유채 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.506, 126.953, '제주 우도 유채밭 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '제주 우도 유채밭 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.51, 126.995, '서울 반포 한강공원 서래섬 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '서울 반포 한강공원 서래섬 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5789, 127.122, '구리 한강시민공원 유채 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '구리 한강시민공원 유채 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.279, 126.993, '수원 서호꽃뫼공원 유채 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '수원 서호꽃뫼공원 유채 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.012, 127.221, '안성 팜랜드 유채 호밀밭 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '안성 팜랜드 유채 호밀밭 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.211, 128.964, '부산 대저생태공원 유채 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '부산 대저생태공원 유채 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.178, 128.974, '부산 낙동강 삼락생태공원 유채 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '부산 낙동강 삼락생태공원 유채 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.388, 128.477, '창녕 남지 유채축제 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '창녕 남지 유채축제 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.387, 129.217, '삼척 맹방 유채꽃축제 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '삼척 맹방 유채꽃축제 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.416, 126.641, '청보리·유채 고창 학원농장 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '청보리·유채 고창 학원농장 — 유채꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.016, 126.711, '나주 영산강 유채 — 유채꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '유채꽃'
and not exists (select 1 from reports where memo = '나주 영산강 유채 — 유채꽃 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '매화', '🌸', false
where not exists (select 1 from seasons where flower_name = '매화');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.051, 127.63, '광양 매화마을 청매실농원 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '광양 매화마을 청매실농원 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.997, 127.331, '순천 선암사 매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '순천 선암사 매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.487, 129.064, '양산 통도사 홍매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '양산 통도사 홍매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.257, 127.499, '구례 화엄사 홍매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '구례 화엄사 홍매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.515, 127.057, '서울 봉은사 홍매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '서울 봉은사 홍매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5794, 126.991, '서울 창덕궁 홍매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '서울 창덕궁 홍매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.641, 126.512, '해남 보해매실농원 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '해남 보해매실농원 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.09, 127.75, '하동 먹점마을 매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '하동 먹점마을 매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.228, 128.889, '김해 와룡매 건설 매화공원 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '김해 와룡매 건설 매화공원 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.446, 126.6284, '제주 휴애리 매화축제 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '제주 휴애리 매화축제 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.254, 126.556, '제주 걸매생태공원 매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '제주 걸매생태공원 매화 — 매화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.728, 128.845, '안동 도산서원 매화 — 매화 명소 (운영자 추천)', 'full' from seasons where flower_name = '매화'
and not exists (select 1 from reports where memo = '안동 도산서원 매화 — 매화 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '동백', '🌺', false
where not exists (select 1 from seasons where flower_name = '동백');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.743, 127.766, '여수 오동도 동백 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '여수 오동도 동백 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.828, 128.704, '거제 지심도 동백섬 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '거제 지심도 동백섬 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.153, 129.156, '부산 동백섬 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '부산 동백섬 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.6906, 128.3565, '통영 장사도 동백 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '통영 장사도 동백 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.59, 126.75, '강진 백련사 동백숲 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '강진 백련사 동백숲 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.497, 126.58, '고창 선운사 동백 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '고창 선운사 동백 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.13, 126.493, '서천 마량리 동백나무숲 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '서천 마량리 동백나무숲 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.2896, 126.3688, '제주 카멜리아힐 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '제주 카멜리아힐 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.281, 126.644, '제주 동백수목원 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '제주 동백수목원 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.296, 126.664, '제주 신흥리 동백마을 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '제주 신흥리 동백마을 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.274, 126.666, '제주 위미 동백나무군락 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '제주 위미 동백나무군락 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.487, 129.431, '울산 목도 동백 상록수림 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '울산 목도 동백 상록수림 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.021, 127.611, '광양 옥룡사지 동백숲 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '광양 옥룡사지 동백숲 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.916, 126.902, '나주 불회사 동백 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '나주 불회사 동백 — 동백 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.142, 126.556, '완도 보길도 동백 — 동백 명소 (운영자 추천)', 'full' from seasons where flower_name = '동백'
and not exists (select 1 from reports where memo = '완도 보길도 동백 — 동백 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '진달래', '🌷', false
where not exists (select 1 from seasons where flower_name = '진달래');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.499, 126.796, '부천 원미산 진달래동산 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '부천 원미산 진달래동산 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.721, 126.437, '강화 고려산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '강화 고려산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.549, 127.029, '서울 응봉산 진달래 개나리산 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '서울 응봉산 진달래 개나리산 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.716, 128.525, '대구 비슬산 참꽃군락지 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '대구 비슬산 참꽃군락지 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.281, 128.618, '창원 천주산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '창원 천주산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.536, 128.523, '창녕 화왕산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '창녕 화왕산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.447, 128.748, '밀양 종남산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '밀양 종남산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.81, 127.691, '여수 영취산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '여수 영취산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.728, 127.085, '완주 모악산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '완주 모악산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.554, 126.737, '인천 계양산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '인천 계양산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.964, 128.687, '거제 대금산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '거제 대금산 진달래 — 진달래 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.842, 127.665, '춘천 삼악산 진달래 — 진달래 명소 (운영자 추천)', 'full' from seasons where flower_name = '진달래'
and not exists (select 1 from reports where memo = '춘천 삼악산 진달래 — 진달래 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '철쭉', '🌺', false
where not exists (select 1 from seasons where flower_name = '철쭉');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.352, 126.933, '군포 철쭉동산 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '군포 철쭉동산 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.492, 128.023, '합천 황매산 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '합천 황매산 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.421, 127.554, '남원 바래봉 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '남원 바래봉 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.681, 127.172, '보성 일림산 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '보성 일림산 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.736, 126.966, '장흥 제암산 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '장흥 제암산 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.957, 128.484, '단양 소백산 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '단양 소백산 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5481, 127.0811, '서울 군자 어린이대공원 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '서울 군자 어린이대공원 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.49, 126.69, '인천 원적산공원 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '인천 원적산공원 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.287, 127.388, '대전 뿌리공원 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '대전 뿌리공원 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.152, 129.079, '부산 황령산 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '부산 황령산 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.371, 128.05, '원주 치악산 철쭉 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '원주 치악산 철쭉 — 철쭉 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.6584, 126.7691, '고양 호수공원 철쭉원 — 철쭉 명소 (운영자 추천)', 'full' from seasons where flower_name = '철쭉'
and not exists (select 1 from reports where memo = '고양 호수공원 철쭉원 — 철쭉 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '튤립', '🌷', false
where not exists (select 1 from seasons where flower_name = '튤립');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.5, 126.338, '태안 세계튤립꽃박람회 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '태안 세계튤립꽃박람회 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.294, 127.202, '용인 에버랜드 튤립축제 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '용인 에버랜드 튤립축제 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.6584, 126.7691, '고양 일산호수공원 튤립 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '고양 일산호수공원 튤립 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5443, 127.0374, '서울숲 튤립밭 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '서울숲 튤립밭 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.927, 127.5054, '순천만국가정원 튤립 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '순천만국가정원 튤립 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.573, 127.257, '임실 치즈테마파크 튤립 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '임실 치즈테마파크 튤립 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.893, 128.573, '대구 하중도 튤립 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '대구 하중도 튤립 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.178, 128.974, '부산 낙동강 튤립 유채단지 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '부산 낙동강 튤립 유채단지 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.311, 126.582, '제주 상효원 튤립 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '제주 상효원 튤립 — 튤립 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.7955, 128.8961, '강릉 경포 튤립정원 — 튤립 명소 (운영자 추천)', 'full' from seasons where flower_name = '튤립'
and not exists (select 1 from reports where memo = '강릉 경포 튤립정원 — 튤립 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '연꽃', '🪷', false
where not exists (select 1 from seasons where flower_name = '연꽃');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.545, 127.326, '양평 세미원 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '양평 세미원 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.271, 126.913, '부여 궁남지 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '부여 궁남지 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8446, 127.1252, '전주 덕진공원 연화지 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '전주 덕진공원 연화지 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.907, 126.439, '무안 회산백련지 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '무안 회산백련지 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.393, 126.806, '시흥 관곡지 연꽃테마파크 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '시흥 관곡지 연꽃테마파크 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.57, 126.944, '서울 봉원사 연꽃 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '서울 봉원사 연꽃 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.771, 127.009, '아산 인취사 연꽃 신정호 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '아산 인취사 연꽃 신정호 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.821, 129.235, '경주 서출지 연꽃 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '경주 서출지 연꽃 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.814, 128.836, '경산 반곡지 연꽃 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '경산 반곡지 연꽃 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.87, 128.722, '대구 안심 연꽃단지 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '대구 안심 연꽃단지 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.877, 126.853, '김제 청운사 하소백련 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '김제 청운사 하소백련 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.279, 128.409, '함안 연꽃테마파크 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '함안 연꽃테마파크 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.5459, 129.305, '울산 태화강 연밭 십리대숲 인근 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '울산 태화강 연밭 십리대숲 인근 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.51, 127.49, '청주 문의문화재단지 연꽃 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '청주 문의문화재단지 연꽃 — 연꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.723, 126.464, '강화 선원사 연꽃축제 — 연꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '연꽃'
and not exists (select 1 from reports where memo = '강화 선원사 연꽃축제 — 연꽃 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '해바라기', '🌻', false
where not exists (select 1 from seasons where flower_name = '해바라기');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.241, 128.444, '함안 강주마을 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '함안 강주마을 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.178, 128.956, '태백 구와우마을 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '태백 구와우마을 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.012, 127.221, '안성 팜랜드 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '안성 팜랜드 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.927, 126.802, '파주 율곡습지공원 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '파주 율곡습지공원 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5228, 127.1263, '서울 올림픽공원 들꽃마루 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '서울 올림픽공원 들꽃마루 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.79, 127.068, '양주 나리공원 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '양주 나리공원 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.257, 127.68, '여주 강천섬 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '여주 강천섬 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.662, 127.462, '청주 문암생태공원 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '청주 문암생태공원 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8347, 129.219, '경주 첨성대 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '경주 첨성대 해바라기 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.305, 128.766, '김해 봉하마을 해바라기 들판 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '김해 봉하마을 해바라기 들판 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.456, 126.575, '제주 김경숙 해바라기농장 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '제주 김경숙 해바라기농장 — 해바라기 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.211, 128.964, '부산 대저생태공원 해바라기 — 해바라기 명소 (운영자 추천)', 'full' from seasons where flower_name = '해바라기'
and not exists (select 1 from reports where memo = '부산 대저생태공원 해바라기 — 해바라기 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '배롱나무', '🩷', false
where not exists (select 1 from seasons where flower_name = '배롱나무');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.247, 127.009, '담양 명옥헌원림 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '담양 명옥헌원림 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.539, 128.479, '안동 병산서원 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '안동 병산서원 배롱나무 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.821, 129.235, '경주 서출지 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '경주 서출지 배롱나무 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.142, 127.142, '논산 명재고택 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '논산 명재고택 배롱나무 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.63, 126.7, '강진 백운동원림 배롱 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '강진 백운동원림 배롱 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.83, 128.434, '대구 하목정 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '대구 하목정 배롱나무 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.173, 129.07, '부산 양정 화지공원 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '부산 양정 화지공원 배롱나무 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5786, 126.9948, '서울 창경궁 배롱 후원 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '서울 창경궁 배롱 후원 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.497, 126.58, '고창 선운사 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '고창 선운사 배롱나무 — 배롱나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.431, 128.86, '밀양 표충사 배롱나무 — 배롱나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '배롱나무'
and not exists (select 1 from reports where memo = '밀양 표충사 배롱나무 — 배롱나무 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '핑크뮬리', '🩷', false
where not exists (select 1 from seasons where flower_name = '핑크뮬리');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.79, 127.068, '양주 나리공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '양주 나리공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5664, 126.8837, '서울 하늘공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '서울 하늘공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.211, 128.964, '부산 대저생태공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '부산 대저생태공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8347, 129.219, '경주 첨성대 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '경주 첨성대 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.568, 128.169, '합천 신소양체육공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '합천 신소양체육공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.253, 128.39, '함안 악양생태공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '함안 악양생태공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.446, 126.6284, '제주 휴애리 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '제주 휴애리 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.258, 126.354, '제주 마노르블랑 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '제주 마노르블랑 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8961, 128.5851, '대구 침산공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '대구 침산공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.016, 126.711, '나주 영산강 핑크뮬리 억새 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '나주 영산강 핑크뮬리 억새 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.927, 127.5054, '순천만국가정원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '순천만국가정원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.9772, 126.997, '익산 아가페정원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '익산 아가페정원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.012, 127.221, '안성 팜랜드 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '안성 팜랜드 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.5459, 129.305, '울산 태화강 국가정원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '울산 태화강 국가정원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.6584, 126.7691, '고양 일산호수공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)', 'full' from seasons where flower_name = '핑크뮬리'
and not exists (select 1 from reports where memo = '고양 일산호수공원 핑크뮬리 — 핑크뮬리 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '꽃무릇', '❤️', false
where not exists (select 1 from seasons where flower_name = '꽃무릇');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.193, 126.562, '영광 불갑사 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '영광 불갑사 꽃무릇 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.497, 126.58, '고창 선운사 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '고창 선운사 꽃무릇 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.156, 126.581, '함평 용천사 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '함평 용천사 꽃무릇 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.541, 127.154, '서울 길동생태공원 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '서울 길동생태공원 꽃무릇 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.601, 126.988, '서울 성북 길상사 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '서울 성북 길상사 꽃무릇 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.211, 128.964, '부산 대저 꽃무릇 생태공원 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '부산 대저 꽃무릇 생태공원 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.44, 126.6, '제주 절물자연휴양림 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '제주 절물자연휴양림 꽃무릇 — 꽃무릇 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.314, 126.625, '보령 성주산 꽃무릇 — 꽃무릇 명소 (운영자 추천)', 'full' from seasons where flower_name = '꽃무릇'
and not exists (select 1 from reports where memo = '보령 성주산 꽃무릇 — 꽃무릇 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '메밀꽃', '🤍', false
where not exists (select 1 from seasons where flower_name = '메밀꽃');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.616, 128.363, '평창 봉평 효석문화마을 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '평창 봉평 효석문화마을 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.47, 126.515, '제주 오라동 메밀밭 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '제주 오라동 메밀밭 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.4187, 126.7626, '제주 보롬왓 메밀밭 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '제주 보롬왓 메밀밭 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5664, 126.8837, '서울 하늘공원 메밀 억새 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '서울 하늘공원 메밀 억새 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.956, 128.1, '고성 하이 메밀꽃 들판 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '고성 하이 메밀꽃 들판 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.5392, 128.5169, '안동 하회 메밀 부용대 인근 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '안동 하회 메밀 부용대 인근 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.95, 127.78, '춘천 유포리 메밀밭 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '춘천 유포리 메밀밭 — 메밀꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5789, 127.122, '구리 한강 메밀 꽃단지 — 메밀꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '메밀꽃'
and not exists (select 1 from reports where memo = '구리 한강 메밀 꽃단지 — 메밀꽃 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '국화', '💛', false
where not exists (select 1 from seasons where flower_name = '국화');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.571, 126.981, '서울 조계사 국화축제 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '서울 조계사 국화축제 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.197, 128.576, '마산 가고파국화축제 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '마산 가고파국화축제 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.065, 126.516, '함평 대한민국 국향대전 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '함평 대한민국 국향대전 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.948, 126.958, '익산 천만송이 국화축제 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '익산 천만송이 국화축제 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.785, 126.452, '서산 국화축제 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '서산 국화축제 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.362, 127.356, '대전 유성 국화전시회 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '대전 유성 국화전시회 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.6584, 126.7691, '고양 호수공원 국화 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '고양 호수공원 국화 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.129, 129.098, '부산 유엔기념공원 국화 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '부산 유엔기념공원 국화 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.828, 128.581, '대구 앞산 국화 전시 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '대구 앞산 국화 전시 — 국화 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.6015, 127.2971, '조치원 세종 국화원 — 국화 명소 (운영자 추천)', 'full' from seasons where flower_name = '국화'
and not exists (select 1 from reports where memo = '조치원 세종 국화원 — 국화 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '억새', '🌾', false
where not exists (select 1 from seasons where flower_name = '억새');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5664, 126.8837, '서울 하늘공원 억새축제 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '서울 하늘공원 억새축제 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.268, 128.762, '정선 민둥산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '정선 민둥산 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.547, 129.03, '울산 영남알프스 간월재 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '울산 영남알프스 간월재 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.536, 128.523, '창녕 화왕산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '창녕 화왕산 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 38.106, 127.323, '포천 명성산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '포천 명성산 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.538, 126.999, '장흥 천관산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '장흥 천관산 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.44, 126.672, '보령 오서산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '보령 오서산 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.434, 126.685, '제주 산굼부리 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '제주 산굼부리 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.368, 126.357, '제주 새별오름 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '제주 새별오름 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.123, 128.975, '부산 승학산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '부산 승학산 억새 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.828, 128.581, '대구 앞산 억새 전망 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '대구 앞산 억새 전망 — 억새 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.134, 126.988, '광주 무등산 억새 — 억새 명소 (운영자 추천)', 'full' from seasons where flower_name = '억새'
and not exists (select 1 from reports where memo = '광주 무등산 억새 — 억새 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '단풍·은행', '🍁', false
where not exists (select 1 from seasons where flower_name = '단풍·은행');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5512, 126.9882, '서울 남산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '서울 남산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5658, 126.9751, '서울 덕수궁 은행나무길 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '서울 덕수궁 은행나무길 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5826, 126.9817, '서울 삼청동 은행나무길 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '서울 삼청동 은행나무길 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5862, 126.9946, '서울 성균관 은행나무 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '서울 성균관 은행나무 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.783, 126.98, '아산 곡교천 은행나무길 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '아산 곡교천 은행나무길 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.842, 128.326, '홍천 은행나무숲 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '홍천 은행나무숲 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.79, 127.525, '가평 남이섬 메타세쿼이아 은행길 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '가평 남이섬 메타세쿼이아 은행길 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.542, 127.592, '양평 용문사 은행나무 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '양평 용문사 은행나무 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.498, 126.888, '내장산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '내장산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 38.119, 128.465, '설악산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '설악산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.123, 127.323, '대둔산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '대둔산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.543, 127.825, '속리산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '속리산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.393, 129.165, '주왕산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '주왕산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.893, 127.746, '무주 덕유산 단풍 구천동계곡 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '무주 덕유산 단풍 구천동계곡 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.134, 126.988, '광주 무등산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '광주 무등산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.324, 126.991, '담양 메타세쿼이아길 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '담양 메타세쿼이아길 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8151, 127.1532, '전주 한옥마을 은행나무 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '전주 한옥마을 은행나무 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.809, 129.256, '경주 통일전 은행나무길 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '경주 통일전 은행나무길 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.975, 128.697, '대구 팔공산 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '대구 팔공산 단풍 — 단풍·은행 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.284, 129.068, '부산 범어사 단풍 — 단풍·은행 명소 (운영자 추천)', 'full' from seasons where flower_name = '단풍·은행'
and not exists (select 1 from reports where memo = '부산 범어사 단풍 — 단풍·은행 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '이팝나무', '🤍', false
where not exists (select 1 from seasons where flower_name = '이팝나무');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.569, 126.999, '서울 청계천 이팝나무 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '서울 청계천 이팝나무 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5, 126.972, '서울 현충원 이팝 수양벚 길 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '서울 현충원 이팝 수양벚 길 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.92, 128.556, '대구 이팝나무 군락 교항리 인근 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '대구 이팝나무 군락 교항리 인근 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.268, 128.81, '김해 천곡리 이팝나무 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '김해 천곡리 이팝나무 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.409, 129.033, '양산 신전리 이팝나무 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '양산 신전리 이팝나무 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.85, 127.105, '전주 팔복동 이팝나무길 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '전주 팔복동 이팝나무길 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.941, 127.696, '광양 유당공원 이팝나무 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '광양 유당공원 이팝나무 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.362, 127.356, '대전 유성 이팝나무길 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '대전 유성 이팝나무길 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.228, 128.685, '창원 용지호수 이팝 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '창원 용지호수 이팝 — 이팝나무 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.533, 126.648, '인천 청라 이팝나무 가로수길 — 이팝나무 명소 (운영자 추천)', 'full' from seasons where flower_name = '이팝나무'
and not exists (select 1 from reports where memo = '인천 청라 이팝나무 가로수길 — 이팝나무 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '개나리', '💛', false
where not exists (select 1 from seasons where flower_name = '개나리');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5493, 127.029, '서울 응봉산 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '서울 응봉산 개나리 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.621, 127.041, '서울 강북 북서울꿈의숲 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '서울 강북 북서울꿈의숲 개나리 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.517, 126.887, '서울 안양천 개나리길 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '서울 안양천 개나리길 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4266, 127.0163, '과천 서울대공원 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '과천 서울대공원 개나리 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.4757, 126.6224, '인천 자유공원 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '인천 자유공원 개나리 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.367, 127.388, '대전 갑천 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '대전 갑천 개나리 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.22, 129.0864, '부산 온천천 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '부산 온천천 개나리 — 개나리 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.8703, 127.7205, '춘천 공지천 개나리 — 개나리 명소 (운영자 추천)', 'full' from seasons where flower_name = '개나리'
and not exists (select 1 from reports where memo = '춘천 공지천 개나리 — 개나리 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '작약', '🩷', false
where not exists (select 1 from seasons where flower_name = '작약');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.352, 128.697, '의성 작약꽃밭 — 작약 명소 (운영자 추천)', 'full' from seasons where flower_name = '작약'
and not exists (select 1 from reports where memo = '의성 작약꽃밭 — 작약 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.973, 128.938, '영천 작약 재배단지 — 작약 명소 (운영자 추천)', 'full' from seasons where flower_name = '작약'
and not exists (select 1 from reports where memo = '영천 작약 재배단지 — 작약 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.825, 126.857, '파주 벽초지수목원 작약 — 작약 명소 (운영자 추천)', 'full' from seasons where flower_name = '작약'
and not exists (select 1 from reports where memo = '파주 벽초지수목원 작약 — 작약 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.927, 127.5054, '순천만국가정원 작약원 — 작약 명소 (운영자 추천)', 'full' from seasons where flower_name = '작약'
and not exists (select 1 from reports where memo = '순천만국가정원 작약원 — 작약 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.992, 127.085, '평택 농업생태원 작약 — 작약 명소 (운영자 추천)', 'full' from seasons where flower_name = '작약'
and not exists (select 1 from reports where memo = '평택 농업생태원 작약 — 작약 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 33.4187, 126.7626, '제주 보롬왓 작약 라벤더 — 작약 명소 (운영자 추천)', 'full' from seasons where flower_name = '작약'
and not exists (select 1 from reports where memo = '제주 보롬왓 작약 라벤더 — 작약 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '맥문동', '💜', false
where not exists (select 1 from seasons where flower_name = '맥문동');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.919, 128.283, '성주 성밖숲 맥문동 — 맥문동 명소 (운영자 추천)', 'full' from seasons where flower_name = '맥문동'
and not exists (select 1 from reports where memo = '성주 성밖숲 맥문동 — 맥문동 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.411, 126.746, '장성 축령산 맥문동 편백숲 — 맥문동 명소 (운영자 추천)', 'full' from seasons where flower_name = '맥문동'
and not exists (select 1 from reports where memo = '장성 축령산 맥문동 편백숲 — 맥문동 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5215, 127.1213, '서울 올림픽공원 맥문동 소나무숲 — 맥문동 명소 (운영자 추천)', 'full' from seasons where flower_name = '맥문동'
and not exists (select 1 from reports where memo = '서울 올림픽공원 맥문동 소나무숲 — 맥문동 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.3672, 127.3881, '대전 한밭수목원 맥문동 — 맥문동 명소 (운영자 추천)', 'full' from seasons where flower_name = '맥문동'
and not exists (select 1 from reports where memo = '대전 한밭수목원 맥문동 — 맥문동 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.438, 128.265, '상주 경천섬 맥문동 — 맥문동 명소 (운영자 추천)', 'full' from seasons where flower_name = '맥문동'
and not exists (select 1 from reports where memo = '상주 경천섬 맥문동 — 맥문동 명소 (운영자 추천)');

insert into seasons (flower_name, emoji, is_active)
select '겹벚꽃', '🌸', false
where not exists (select 1 from seasons where flower_name = '겹벚꽃');

insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.5443, 127.0374, '서울숲 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '서울숲 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 37.524, 126.98, '서울 국립중앙박물관 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '서울 국립중앙박물관 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.79, 129.332, '경주 불국사 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '경주 불국사 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8046, 127.1381, '전주 완산칠봉 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '전주 완산칠봉 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.8961, 128.5851, '대구 침산공원 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '대구 침산공원 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 36.662, 126.487, '개심사 청벚꽃 (서산) — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '개심사 청벚꽃 (서산) — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 34.997, 127.331, '순천 선암사 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '순천 선암사 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');
insert into reports (season_id, lat, lng, memo, bloom_state)
select id, 35.129, 129.098, '부산 유엔평화공원 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)', 'full' from seasons where flower_name = '겹벚꽃'
and not exists (select 1 from reports where memo = '부산 유엔평화공원 겹벚꽃 — 겹벚꽃 명소 (운영자 추천)');

