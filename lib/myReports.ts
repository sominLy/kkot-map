// 로그인이 없으므로 "내 제보"는 이 브라우저의 localStorage에 id로 기억한다.
// 검수 대기 제보는 서버에서 내용을 읽을 수 없어서 내용 사본도 함께 기억한다.

import type { Report } from "./supabase";

const KEY = "kkotmap-my-reports";
const PENDING_KEY = "kkotmap-my-pending";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장 공간이 막혀 있으면 이번 세션만 잊는다
  }
}

export function getMyReportIds(): number[] {
  return read<number[]>(KEY, []);
}

export function addMyReportId(id: number) {
  write(KEY, [id, ...getMyReportIds()]);
}

/** 검수 대기 제보의 사본 (승인되면 서버 데이터로 대체됨) */
export function getMyPendingCopies(): Report[] {
  return read<Report[]>(PENDING_KEY, []);
}

export function addMyPendingCopy(r: Report) {
  write(PENDING_KEY, [r, ...getMyPendingCopies().filter((x) => x.id !== r.id)].slice(0, 50));
}
