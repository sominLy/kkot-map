// 인스타그램 단풍 명소 → supabase/autumn-2026.sql 생성
//
// 수집: 웹 검색으로 찾은 인스타그램 게시물 URL만 사용 (블로그·기사 링크 제외)
// 기간: 2025년은 10월 게시물만, 2026년은 9월 넷째 주(9/21, 월)부터
// 게시일: 인스타 shortcode → 미디어 ID → 상위 비트의 타임스탬프로 계산하므로
//         인스타에 로그인하거나 접속하지 않아도 정확한 업로드 날짜를 알 수 있다.
// 한 명소에 게시물이 여러 개면 기간 안의 가장 최근 게시물을 출처로 쓴다.
// 저작권: 게시물의 사진·글은 가져오지 않고 원문 링크만 저장한다. 설명은 직접 쓴 일반 정보.
// 좌표는 명소 기준 근사값(±수백 m). node seed/instagram-autumn.mjs 로 실행.

import { readFileSync, writeFileSync } from "fs";

const WINDOWS = [
  ["2025-10-01", "2025-10-31"],
  ["2026-09-21", "9999-12-31"],
];

// [명소 이름, 위도, 경도, 한 줄 설명, 후보 게시물 URL들]
// 이름이 기존 제보 memo의 앞부분과 같으면 새로 만들지 않고 그 제보에 출처를 붙인다.
const SPOTS = [
  ["광주 곤지암 화담숲", 37.341, 127.293, "곤지암 산자락을 따라 조성된 단풍 수목원", [
    "https://www.instagram.com/p/DQLXy-pk0W_/",
    "https://www.instagram.com/p/DQlmedBEnhL/",
    "https://www.instagram.com/p/DQtlRwgD2TM/",
    "https://www.instagram.com/p/DOxr5g5EUcY/",
    "https://www.instagram.com/p/Dcx9PCknwCW/",
    "https://www.instagram.com/p/DcyCIBMkqMl/",
  ]],
  ["원주 반계리 은행나무", 37.353, 127.8445, "천연기념물 노거수, 늦가을 노랗게 물드는 은행나무", [
    "https://www.instagram.com/p/DQLD2awEsgN/",
    "https://www.instagram.com/p/DQjEpduEkb2/",
    "https://www.instagram.com/p/DQnI_l7EnRo/",
    "https://www.instagram.com/p/DQ9Cl55kqgc/",
  ]],
  ["괴산 문광저수지 은행나무길", 36.79, 127.745, "저수지 둑길을 따라 늘어선 은행나무", [
    "https://www.instagram.com/p/DQWPqsRk7H2/",
    "https://www.instagram.com/p/DQbhUA5EvE6/",
    "https://www.instagram.com/p/DQeOQF8ExCY/",
    "https://www.instagram.com/p/DQrjCgaEhUO/",
  ]],
  ["아산 곡교천 은행나무길", 36.783, 126.98, "곡교천 강변을 따라 이어지는 은행나무 가로수", [
    "https://www.instagram.com/p/DPbE9Cjk8MN/",
    "https://www.instagram.com/p/DQOEhOukSbs/",
  ]],
  ["경주 도리마을 은행나무숲", 35.874, 129.06, "마을 안에 빽빽하게 심은 은행나무 숲", [
    "https://www.instagram.com/p/DPz4jpFD_e8/",
    "https://www.instagram.com/p/DQ_Ilb0Ey71/",
    "https://www.instagram.com/p/DRePlTMj2HM/",
  ]],
  ["홍천 은행나무숲", 37.842, 128.326, "가을에만 개방하는 개인 은행나무 숲", [
    "https://www.instagram.com/p/DPnxp2iEt2j/",
    "https://www.instagram.com/p/DRgRfJtEuCc/",
  ]],
  ["가평 남이섬 메타세쿼이아 은행길", 37.79, 127.525, "메타세쿼이아·은행나무 가로수길이 있는 섬", [
    "https://www.instagram.com/p/DP0etxDEpkG/",
    "https://www.instagram.com/p/DQBPwSbksu1/",
    "https://www.instagram.com/p/DQVg8VGEipc/",
    "https://www.instagram.com/p/DQYe5AxEkwO/",
  ]],
  ["가평 아침고요수목원", 37.7437, 127.3525, "축령산 자락의 정원형 수목원", [
    "https://www.instagram.com/p/DP0qpu9j0Rk/",
    "https://www.instagram.com/p/DQJBiNMiQ7R/",
  ]],
  ["평창 오대산 월정사 전나무숲", 37.7317, 128.5925, "월정사 앞 전나무숲길과 오대산 계곡", [
    "https://www.instagram.com/p/DPk7lfdCRki/",
  ]],
  ["설악산 단풍", 38.119, 128.465, "해마다 가장 먼저 단풍이 드는 산", [
    "https://www.instagram.com/p/DPcxMrRgc4J/",
    "https://www.instagram.com/p/DQA_UMBESRF/",
    "https://www.instagram.com/p/DQSjL-Wkvxd/",
  ]],
  ["설악산 천불동계곡", 38.163, 128.472, "비선대에서 양폭으로 이어지는 계곡길", [
    "https://www.instagram.com/p/DQB1Evhk2eA/",
    "https://www.instagram.com/p/DQGrR4ZE-JL/",
  ]],
  ["설악산 토왕성폭포", 38.158, 128.5, "설악동에서 오르는 폭포 전망대", [
    "https://www.instagram.com/p/DQZKzQ7jwwX/",
  ]],
  ["주왕산 단풍", 36.393, 129.165, "기암 협곡과 주산지가 있는 국립공원", [
    "https://www.instagram.com/p/DPzxmZyjbrk/",
  ]],
  ["내장산 단풍", 35.498, 126.888, "우화정과 단풍나무 터널이 있는 국립공원", [
    "https://www.instagram.com/p/DQWvuy0CX09/",
    "https://www.instagram.com/p/DQjdHcsk_IW/",
    "https://www.instagram.com/p/DQ-IRppk7db/",
    "https://www.instagram.com/p/DRCD-URE2P6/",
  ]],
  ["장성 백양사", 35.441, 126.883, "쌍계루 앞 연못이 있는 백암산 사찰", [
    "https://www.instagram.com/p/DQ6NOl1EyQ_/",
    "https://www.instagram.com/p/DQ6YBwDku4R/",
    "https://www.instagram.com/p/DRB1blxkxkH/",
  ]],
  ["대둔산 단풍", 36.123, 127.323, "케이블카와 구름다리가 있는 암릉 산", [
    "https://www.instagram.com/p/DP59c69CW4h/",
    "https://www.instagram.com/p/DQyi4j9CcFd/",
  ]],
  ["담양 메타세쿼이아길", 35.324, 126.991, "늦가을 적갈색으로 물드는 가로수길", [
    "https://www.instagram.com/p/DP-V6rOknpE/",
    "https://www.instagram.com/p/DRw-b12ATtO/",
  ]],
  ["서울 올림픽공원", 37.5215, 127.1213, "몽촌토성 둘레의 도심 공원", [
    "https://www.instagram.com/p/DQ6RRFDk204/",
  ]],
  ["대전 한밭수목원", 36.3672, 127.3881, "엑스포 과학공원 옆 도심 수목원", [
    "https://www.instagram.com/p/DQrItuRDq_5/",
  ]],
  ["대구 팔공산 단풍", 35.975, 128.697, "순환도로를 따라 달리는 대구의 진산", [
    "https://www.instagram.com/p/DQ-fvwAEiS6/",
    "https://www.instagram.com/p/DRG2ilCk9aO/",
  ]],
];

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const IG_EPOCH_MS = 1314220021721n;

/** 인스타 URL → 게시일 (KST, YYYY-MM-DD) */
export function postedDate(url) {
  const code = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel)\/([\w-]+)/)[1].slice(0, 11);
  let id = 0n;
  for (const c of code) id = id * 64n + BigInt(ALPHA.indexOf(c));
  const ms = Number((id >> 23n) + IG_EPOCH_MS);
  return new Date(ms + 9 * 3600e3).toISOString().slice(0, 10);
}

const inWindow = (d) => WINDOWS.some(([from, to]) => d >= from && d <= to);
const q = (s) => `'${s.replace(/'/g, "''")}'`;

let sql = `-- 2026년 9월 말 기준: 지금 시즌을 단풍으로 바꾸고 인스타그램 단풍 명소를 연결.
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

`;

const picked = [];
const skipped = [];
for (const [name, lat, lng, desc, urls] of SPOTS) {
  const dated = urls.map((u) => ({ url: u, date: postedDate(u) }));
  const ok = dated.filter((p) => inWindow(p.date)).sort((a, b) => b.date.localeCompare(a.date));
  if (ok.length === 0) {
    skipped.push({ name, dated });
    continue;
  }
  const { url, date } = ok[0];
  picked.push({ name, date });
  sql += `select _ig_autumn(${q(name)}, ${lat}, ${lng}, ${q(`${name} — ${desc}`)}, ${q(url)}, '${date}');\n`;
}

sql += `\ndrop function _ig_autumn(text, float8, float8, text, text, date);\n`;

// 이전에 연결해 둔 인스타 링크(다른 꽃 포함)에도 게시일을 채워 팝업에 표시
const earlier = [
  ...new Set(
    readFileSync(new URL("../supabase/instagram-links.sql", import.meta.url), "utf8").match(
      /https:\/\/www\.instagram\.com\/(?:p|reel)\/[\w-]+\//g
    )
  ),
];
sql += `\n-- 4) 기존 인스타 링크의 게시일 채우기\n`;
for (const url of earlier) {
  sql += `update reports set source_posted_at = '${postedDate(url)}' where source_url = ${q(url)} and source_posted_at is null;\n`;
}

if (skipped.length) {
  sql += `\n-- 기간 밖이라 제외한 명소 (게시물을 더 찾으면 seed/instagram-autumn.mjs에 추가 후 재생성)\n`;
  for (const { name, dated } of skipped) {
    sql += `--   ${name}: ${dated.map((p) => p.date).join(", ")}\n`;
  }
}

sql += `\n-- 확인용\nselect memo, bloom_state, source_posted_at, source_url from reports r
join seasons s on r.season_id = s.id
where s.flower_name = '단풍·은행' and source_url is not null order by source_posted_at desc;\n`;

writeFileSync(new URL("../supabase/autumn-2026.sql", import.meta.url), sql);
console.log(`연결 ${picked.length}곳, 기간 밖 제외 ${skipped.length}곳`);
for (const p of picked) console.log(`  ✓ ${p.date} ${p.name}`);
for (const s of skipped) console.log(`  – ${s.name} (${s.dated.map((p) => p.date).join(", ")})`);
