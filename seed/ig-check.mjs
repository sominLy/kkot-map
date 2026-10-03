// seed/instagram-collected.json 검사기.
//   node seed/ig-check.mjs          → 게시물마다 통과/탈락 이유를 보여준다
//   node seed/ig-check.mjs --apply  → 통과한 게시물을 lib/instagram-verified.json에 반영
//
// 검사 항목: 인스타 게시물 URL인지, 게시일이 기간 안인지(2025년 10월 / 2026년 9월 21일~),
// 팔로워 5,000명 이상인지, URL의 계정과 account가 맞는지, 좌표가 한국 안인지, 설명이 짧은 직접 쓴 문장인지.

import { readFileSync, writeFileSync } from "fs";
import { inWindow, postedDate, shortcode } from "./ig-date.mjs";

const COLLECTED = new URL("./instagram-collected.json", import.meta.url);
const VERIFIED = new URL("../lib/instagram-verified.json", import.meta.url);
const collected = JSON.parse(readFileSync(COLLECTED, "utf8"));
const verified = JSON.parse(readFileSync(VERIFIED, "utf8"));
const apply = process.argv.includes("--apply");

function problems(p) {
  const out = [];
  if (!/^https:\/\/www\.instagram\.com\/(?:[\w.]+\/)?(?:p|reel)\/[\w-]+\/?$/.test(p.url ?? ""))
    out.push("인스타 게시물 URL 형식이 아님 (https://www.instagram.com/p/코드/)");
  else if (!inWindow(postedDate(p.url))) out.push(`기간 밖 게시물 (${postedDate(p.url)})`);
  if (!/^[\w.]{1,30}$/.test(p.account ?? "")) out.push("account는 @ 없이 계정 아이디만");
  const inUrl = p.url?.match(/instagram\.com\/([\w.]+)\/(?:p|reel)\//)?.[1];
  if (inUrl && p.account && inUrl.toLowerCase() !== p.account.toLowerCase())
    out.push(`URL의 계정(${inUrl})과 account(${p.account})가 다름`);
  if (!(Number.isInteger(p.followers) && p.followers >= verified.minFollowers))
    out.push(`팔로워 ${verified.minFollowers.toLocaleString()}명 미만이거나 숫자가 아님`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.checkedAt ?? "")) out.push("checkedAt은 YYYY-MM-DD");
  if (!p.spot?.trim()) out.push("spot(명소 이름) 없음");
  if (!(p.lat >= 33 && p.lat <= 38.7 && p.lng >= 124.5 && p.lng <= 131)) out.push("좌표가 한국 범위 밖");
  if (!p.desc?.trim() || p.desc.length > 40) out.push("desc는 직접 쓴 한 줄(40자 이내)");
  if (/[#@]/.test(p.desc ?? "")) out.push("desc에 해시태그·멘션 금지 (캡션 복사 의심)");
  return out;
}

const seen = new Set();
const ok = [];
for (const p of collected.posts) {
  const errs = problems(p);
  const code = p.url && shortcode(p.url);
  if (code && seen.has(code)) errs.push("중복 게시물");
  if (code) seen.add(code);
  const date = code ? postedDate(p.url) : "????-??-??";
  if (errs.length) console.log(`✗ ${date} ${p.spot ?? "?"} @${p.account ?? "?"} ${p.url ?? ""}\n    - ${errs.join("\n    - ")}`);
  else {
    ok.push(p);
    console.log(`✓ ${date} ${p.spot} @${p.account} (${p.followers.toLocaleString()}) ${p.url}`);
  }
}
console.log(`\n통과 ${ok.length} / 전체 ${collected.posts.length}`);

if (apply) {
  const have = new Set(verified.posts.map((p) => shortcode(p.url)));
  let added = 0;
  for (const p of ok) {
    if (have.has(shortcode(p.url))) continue;
    verified.posts.push({ url: p.url, account: p.account, followers: p.followers, checkedAt: p.checkedAt });
    added++;
  }
  writeFileSync(VERIFIED, JSON.stringify(verified, null, 2) + "\n");
  console.log(`lib/instagram-verified.json에 ${added}건 추가 (총 ${verified.posts.length}건)`);
  console.log("다음: node seed/instagram-autumn.mjs");
}
