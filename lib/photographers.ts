// 단풍 출사 참고용 사진 계정. 프로필 링크만 걸고 사진·글은 가져오지 않는다.
// 팔로워 5,000명 이상만 (검색에 노출된 프로필 기준, checkedAt 날짜에 확인).

export type Photographer = {
  handle: string;
  name: string;
  focus: string;
  followers: number;
};

export const PHOTOGRAPHERS_CHECKED_AT = "2026-10-03";

export const PHOTOGRAPHERS: Photographer[] = [
  { handle: "foto_ycy", name: "윤찬영", focus: "국내 여행 포토 크리에이터", followers: 413_000 },
  { handle: "siniple", name: "시니플", focus: "여행 사진작가", followers: 157_000 },
  { handle: "bigg_jun", name: "빅준", focus: "서울 풍경 위주", followers: 140_000 },
  { handle: "photographer_kimjoowon", name: "김주원", focus: "풍경 사진가", followers: 82_000 },
  { handle: "mongle_jyh", name: "몽글이", focus: "풍경 사진", followers: 63_000 },
  { handle: "hwanygallery", name: "seonghwan", focus: "사진·여행작가", followers: 10_000 },
];

/** 413000 → "41.3만", 10000 → "1만" */
export function followersLabel(n: number): string {
  const man = n / 10_000;
  return `${Number.isInteger(man) ? man : man.toFixed(1)}만`;
}
