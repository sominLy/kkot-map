-- 출처 링크를 "최근 1년 내 인스타그램 게시물"로만 교체.
-- Supabase SQL Editor에서 실행하세요. 중복 실행해도 안전합니다.

-- 1) 기존 블로그·기사 링크는 제거 (인스타만 남긴다)
update reports set source_url = null
where source_url is not null and source_url not like '%instagram.com%';

-- 2) 명소별 인스타 게시물 연결
update reports set source_url = 'https://www.instagram.com/reel/DLkERhEvBJX/' where memo like '전주 한옥마을%능소화%';
update reports set source_url = 'https://www.instagram.com/reel/DLaG21STemn/' where memo like '서울 연남동 경의선숲길%';
update reports set source_url = 'https://www.instagram.com/reel/DKw1QB6T0gY/' where memo like '북촌한옥마을%' or memo like '서울 덕수궁 돌담길%' or memo like '서울 삼청동 골목%' or memo like '서울 서촌%' or memo like '성북동 골목%';
update reports set source_url = 'https://www.instagram.com/reel/DZpmHOgyCK-/' where memo like '광주 양림동%';

update reports set source_url = 'https://www.instagram.com/p/DV-CWWeD_SA/' where memo like '서울 석촌호수%';
update reports set source_url = 'https://www.instagram.com/p/DWbQeY6EbFD/' where memo like '서울 여의도 윤중로%' or memo like '서울 남산 순환로%';
update reports set source_url = 'https://www.instagram.com/p/DWy0J1ck_NL/' where memo like '서울 올림픽공원%' and memo like '%벚꽃%';

update reports set source_url = 'https://www.instagram.com/p/DYoby07mSbZ/' where memo in (select memo from reports r join seasons s on r.season_id = s.id where s.flower_name = '수국' and r.memo like '제주%');
update reports set source_url = 'https://www.instagram.com/p/DLUN6hXvl1c/' where memo like '서귀포 휴애리 수국%';

update reports set source_url = 'https://www.instagram.com/reel/DOsygfFErd0/' where memo like '서울 하늘공원 핑크뮬리%' or memo like '양주 나리공원 핑크뮬리%';
update reports set source_url = 'https://www.instagram.com/reel/DO8oyPAEuXA/' where memo like '고창 청농원%';
update reports set source_url = 'https://www.instagram.com/reel/DPvO-rDk_vG/' where memo like '함안 악양생태공원%';
update reports set source_url = 'https://www.instagram.com/p/DPTsZP_gSLt/' where memo like '대구 침산공원 핑크뮬리%';

update reports set source_url = 'https://www.instagram.com/p/DQYyXR0gaoX/' where memo in (select memo from reports r join seasons s on r.season_id = s.id where s.flower_name = '단풍·은행' and r.memo like '서울%');
update reports set source_url = 'https://www.instagram.com/p/DVnHL6Hkbb0/' where memo like '제주 산방산 유채밭%';
update reports set source_url = 'https://www.instagram.com/p/DVBKh3yktYA/' where memo like '제주 엉덩물계곡%';
update reports set source_url = 'https://www.instagram.com/reel/DUw-Fc9k99w/' where memo like '제주 가시리 녹산로%';
update reports set source_url = 'https://www.instagram.com/p/DYAQfSZGTcL/' where memo like '서울 중랑 장미공원%' or memo like '중랑 서울장미축제%';

-- 3) 인스타에서만 발견된 새 명소 추가
create or replace function _seed_ig(p_flower text, p_lat float8, p_lng float8, p_memo text, p_url text)
returns void language sql as $$
  insert into reports (season_id, lat, lng, memo, bloom_state, source_url)
  select id, p_lat, p_lng, p_memo, 'full', p_url from seasons where flower_name = p_flower
  and not exists (select 1 from reports where memo = p_memo);
$$;

select _seed_ig('능소화', 35.1532, 129.1183, '부산 광안리 골목 — 인스타 화제 능소화 스팟', 'https://www.instagram.com/reel/DLPYkv_vltP/');
select _seed_ig('수국', 33.3960, 126.8000, '제주 영주산 — 천국의 계단 수국길', 'https://www.instagram.com/p/DLRhrRFSW8M/');
select _seed_ig('핑크뮬리', 37.5730, 127.2130, '하남 미사 — 서울에서 30분 핑크뮬리 명소', 'https://www.instagram.com/reel/DQBJaxrkcWr/');
select _seed_ig('단풍·은행', 37.2570, 127.6800, '여주 강천섬 — 실시간 단풍 명소', 'https://www.instagram.com/p/DQ34kM7k0ql/');

drop function _seed_ig(text, float8, float8, text, text);

-- 확인용: 인스타 링크 달린 제보 목록
select memo, source_url from reports where source_url is not null order by id;
