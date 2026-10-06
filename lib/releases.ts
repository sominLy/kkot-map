// 기능 출시 기록. 대시보드 그래프에 세로선으로 표시하고, 출시 전후 7일 지표를 비교한다.
// 새 기능을 배포하면 맨 위에 한 줄 추가하세요.

export type Release = { date: string; title: string };

export const RELEASES: Release[] = [
  { date: "2026-10-06", title: "사진 제보 검수·신고 자동 숨김" },
  { date: "2026-10-05", title: "사진 계정 인스타 단풍 링크 8건" },
  { date: "2026-10-03", title: "단풍 출사 추천 계정" },
  { date: "2026-10-03", title: "명소 카드 목록·필터·길찾기·공유 링크" },
  { date: "2026-09-29", title: "검색 최적화(SEO)·/guide 페이지" },
  { date: "2026-09-29", title: "단풍 시즌 전환·24절기·이벤트 캘린더·UI 고급화" },
  { date: "2026-07-20", title: "게이미피케이션·랭킹·전국 명소 333곳" },
  { date: "2026-07-19", title: "꽃맵 MVP 공개" },
];
