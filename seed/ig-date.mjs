// 인스타 게시물 URL → 게시일. shortcode를 미디어 ID로 바꾼 뒤 상위 비트의 타임스탬프를 읽는다.
// 인스타에 접속하지 않아도 정확한 업로드 날짜가 나온다.

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const IG_EPOCH_MS = 1314220021721n;

/** https://www.instagram.com/p/CODE/ · /reel/CODE/ · /계정/p/CODE/ → CODE */
export const shortcode = (u) => u.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel)\/([\w-]+)/)?.[1];

/** 인스타 URL → 게시일 (KST, YYYY-MM-DD) */
export function postedDate(url) {
  const code = shortcode(url).slice(0, 11);
  let id = 0n;
  for (const c of code) id = id * 64n + BigInt(ALPHA.indexOf(c));
  const ms = Number((id >> 23n) + IG_EPOCH_MS);
  return new Date(ms + 9 * 3600e3).toISOString().slice(0, 10);
}

// 2025년은 10월 게시물, 2026년은 9월 넷째 주(9/21)부터
export const WINDOWS = [
  ["2025-10-01", "2025-10-31"],
  ["2026-09-21", "9999-12-31"],
];
export const inWindow = (d) => WINDOWS.some(([from, to]) => d >= from && d <= to);
