// 로그인이 없으므로 "내 제보"는 이 브라우저의 localStorage에 id로 기억한다.

const KEY = "kkotmap-my-reports";

export function getMyReportIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addMyReportId(id: number) {
  localStorage.setItem(KEY, JSON.stringify([id, ...getMyReportIds()]));
}
