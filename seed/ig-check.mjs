// seed/instagram-collected.json 검사기.
//   node seed/ig-check.mjs          → 게시물마다 통과/탈락 이유를 보여준다
//   node seed/ig-check.mjs --apply  → 통과한 게시물을 lib/instagram-verified.json에 반영
//
// 검사 항목은 seed/ig-rules.mjs에 있다: 인스타 게시물 URL인지, 게시일이 기간 안인지
// (2025년 10월 / 2026년 9월 21일~), 팔로워 5,000명 이상인지, URL의 계정과 account가 맞는지,
// 좌표가 한국 안인지, 설명이 짧은 직접 쓴 문장인지.

import { readFileSync, writeFileSync } from "fs";
import { shortcode } from "./ig-date.mjs";
import { screen } from "./ig-rules.mjs";

const COLLECTED = new URL("./instagram-collected.json", import.meta.url);
const VERIFIED = new URL("../lib/instagram-verified.json", import.meta.url);
const collected = JSON.parse(readFileSync(COLLECTED, "utf8"));
const verified = JSON.parse(readFileSync(VERIFIED, "utf8"));
const apply = process.argv.includes("--apply");

const { ok, bad } = screen(collected.posts, verified.minFollowers);

for (const { post: p, date, errs } of bad)
  console.log(`✗ ${date} ${p.spot ?? "?"} @${p.account ?? "?"} ${p.url ?? ""}\n    - ${errs.join("\n    - ")}`);
for (const { post: p, date } of ok)
  console.log(`✓ ${date} ${p.spot} @${p.account} (${p.followers.toLocaleString()}) ${p.url}`);

console.log(`\n통과 ${ok.length} / 전체 ${collected.posts.length}`);
if (bad.length) console.log(`탈락 ${bad.length}건은 고치거나 지워야 지도에 반영됩니다.`);

if (apply) {
  const have = new Set(verified.posts.map((p) => shortcode(p.url)));
  let added = 0;
  for (const { post: p } of ok) {
    if (have.has(shortcode(p.url))) continue;
    verified.posts.push({ url: p.url, account: p.account, followers: p.followers, checkedAt: p.checkedAt });
    added++;
  }
  writeFileSync(VERIFIED, JSON.stringify(verified, null, 2) + "\n");
  console.log(`lib/instagram-verified.json에 ${added}건 추가 (총 ${verified.posts.length}건)`);
  console.log("다음: node seed/instagram-autumn.mjs");
}
