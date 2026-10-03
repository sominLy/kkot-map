// 수집한 게시물(seed/instagram-collected.json)의 검사 규칙.
// ig-check.mjs와 instagram-autumn.mjs가 같은 규칙을 쓰도록 여기 한 곳에 둔다.

import { inWindow, postedDate, shortcode } from "./ig-date.mjs";

/** 게시물 하나의 문제점 목록. 빈 배열이면 통과. */
export function problems(p, minFollowers) {
  const out = [];
  if (!/^https:\/\/www\.instagram\.com\/(?:[\w.]+\/)?(?:p|reel)\/[\w-]+\/?$/.test(p.url ?? ""))
    out.push("인스타 게시물 URL 형식이 아님 (https://www.instagram.com/p/코드/)");
  else if (!inWindow(postedDate(p.url))) out.push(`기간 밖 게시물 (${postedDate(p.url)})`);
  if (!/^[\w.]{1,30}$/.test(p.account ?? "")) out.push("account는 @ 없이 계정 아이디만");
  const inUrl = p.url?.match(/instagram\.com\/([\w.]+)\/(?:p|reel)\//)?.[1];
  if (inUrl && p.account && inUrl.toLowerCase() !== p.account.toLowerCase())
    out.push(`URL의 계정(${inUrl})과 account(${p.account})가 다름`);
  if (!(Number.isInteger(p.followers) && p.followers >= minFollowers))
    out.push(`팔로워 ${minFollowers.toLocaleString()}명 미만이거나 숫자가 아님`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.checkedAt ?? "")) out.push("checkedAt은 YYYY-MM-DD");
  if (!p.spot?.trim()) out.push("spot(명소 이름) 없음");
  if (!(p.lat >= 33 && p.lat <= 38.7 && p.lng >= 124.5 && p.lng <= 131)) out.push("좌표가 한국 범위 밖");
  if (!p.desc?.trim() || p.desc.length > 40) out.push("desc는 직접 쓴 한 줄(40자 이내)");
  if (/[#@]/.test(p.desc ?? "")) out.push("desc에 해시태그·멘션 금지 (캡션 복사 의심)");
  return out;
}

/** 수집 목록 전체를 검사해 통과(ok)와 탈락(bad)으로 나눈다. 같은 게시물이 두 번 나오면 뒤쪽을 탈락시킨다. */
export function screen(posts, minFollowers) {
  const seen = new Set();
  const ok = [];
  const bad = [];
  for (const p of posts) {
    const errs = problems(p, minFollowers);
    const code = p.url && shortcode(p.url);
    if (code && seen.has(code)) errs.push("중복 게시물");
    if (code) seen.add(code);
    const date = code ? postedDate(p.url) : "????-??-??";
    if (errs.length) bad.push({ post: p, date, errs });
    else ok.push({ post: p, date });
  }
  return { ok, bad };
}
