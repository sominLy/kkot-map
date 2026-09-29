// 계절 이벤트 캘린더: 예약 오픈·꽃 축제·한정 개방 (2024년 1월 ~ 2026년 가을)
// 날짜는 각 출처에 적힌 공식 일정. 출처가 확인되지 않은 연도는 넣지 않는다.

import type { Source } from "./content";

export type EventKind = "booking" | "festival" | "open";

export type SeasonEvent = {
  title: string;
  emoji: string;
  kind: EventKind;
  start: string; // YYYY-MM-DD
  end?: string; // 없으면 하루짜리 또는 종료일 미정
  place: string;
  note?: string;
  source: Source;
};

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  booking: "예약 오픈",
  festival: "축제",
  open: "한정 개방",
};

export const SEASON_EVENTS: SeasonEvent[] = [
  // ─── 2024 ───
  {
    title: "진해군항제", emoji: "🌸", kind: "festival", start: "2024-03-22", end: "2024-04-01",
    place: "창원 진해구",
    source: { label: "SBS 뉴스", url: "https://news.sbs.co.kr/news/endPage.do?news_id=N1007517196" },
  },
  {
    title: "여의도 봄꽃축제", emoji: "🌸", kind: "festival", start: "2024-03-29", end: "2024-04-02",
    place: "서울 여의서로",
    source: { label: "서울시 미래한강본부", url: "https://hangang.seoul.go.kr/www/eventMng/detail.do?evntSn=173&mid=538" },
  },
  {
    title: "중랑 서울장미축제", emoji: "🌹", kind: "festival", start: "2024-05-18", end: "2024-05-25",
    place: "서울 중랑장미공원",
    source: { label: "여행톡톡", url: "https://www.tourtoctoc.com/news/articleView.html?idxno=4873" },
  },
  {
    title: "평창 효석문화제", emoji: "🤍", kind: "festival", start: "2024-09-06", end: "2024-09-15",
    place: "평창 봉평 메밀꽃밭",
    source: { label: "뉴시스", url: "https://www.newsis.com/view/NISX20240826_0002862557" },
  },
  {
    title: "화담숲 가을 단풍축제", emoji: "🍁", kind: "festival", start: "2024-10-18", end: "2024-11-17",
    place: "광주 곤지암 화담숲", note: "100% 사전 예약제",
    source: { label: "다음 · 여행다이어리", url: "https://v.daum.net/v/1KivSzuSHE" },
  },

  // ─── 2025 ───
  {
    title: "진해군항제", emoji: "🌸", kind: "festival", start: "2025-03-28", end: "2025-04-06",
    place: "창원 진해구",
    source: { label: "인포매틱스뷰", url: "https://www.informaticsview.com/news/articleView.html?idxno=1491" },
  },
  {
    title: "여의도 봄꽃축제", emoji: "🌸", kind: "festival", start: "2025-04-08", end: "2025-04-12",
    place: "서울 여의서로",
    source: { label: "서울문화포털", url: "https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?menuNo=200010&cultcode=153009" },
  },
  {
    title: "봄 궁중문화축전", emoji: "🏯", kind: "festival", start: "2025-04-26", end: "2025-05-04",
    place: "서울 4대궁·종묘",
    source: { label: "국가유산청", url: "https://www.khs.go.kr/newsBbz/selectNewsBbzView.do?newsItemId=155705412&sectionId=b_sec_1&mn=NS_01_02_01" },
  },
  {
    title: "평창 효석문화제", emoji: "🤍", kind: "festival", start: "2025-09-05", end: "2025-09-14",
    place: "평창 봉평 메밀꽃밭",
    source: { label: "경향신문", url: "https://www.khan.co.kr/article/202508271118001" },
  },
  {
    title: "화담숲 가을 성수기 예매 오픈", emoji: "🎟️", kind: "booking", start: "2025-09-24",
    place: "광주 곤지암 화담숲", note: "오후 1시 오픈",
    source: { label: "jintti", url: "https://jintti.com/entry/2025-%ED%99%94%EB%8B%B4%EC%88%B2-%EA%B0%80%EC%9D%84-%EB%8B%A8%ED%92%8D%EC%B6%95%EC%A0%9C-%EC%82%AC%EC%A0%84%EC%98%88%EC%95%BD-%EC%98%A4%ED%94%88" },
  },
  {
    title: "영광 불갑산 상사화축제", emoji: "❤️", kind: "festival", start: "2025-09-26", end: "2025-10-05",
    place: "영광 불갑사 관광지", note: "꽃무릇 군락",
    source: { label: "더페스티벌", url: "https://thefestival.co.kr/info/festival/10476" },
  },
  {
    title: "홍천 은행나무숲 개방", emoji: "💛", kind: "open", start: "2025-10-03", end: "2025-11-02",
    place: "홍천 내면 광원리", note: "1년에 한 달만 무료 개방",
    source: { label: "경향신문", url: "https://www.khan.co.kr/article/202510021050001" },
  },
  {
    title: "가을 궁중문화축전", emoji: "🏯", kind: "festival", start: "2025-10-08", end: "2025-10-12",
    place: "서울 4대궁·종묘",
    source: { label: "궁중문화축전", url: "https://www.kh.or.kr/cont/view/fest/month/menu/210?idx=110232" },
  },
  {
    title: "화담숲 가을 성수기", emoji: "🍁", kind: "festival", start: "2025-10-24", end: "2025-11-16",
    place: "광주 곤지암 화담숲", note: "100% 사전 예약제",
    source: { label: "Instagram", url: "https://www.instagram.com/p/DQLXy-pk0W_/" },
  },
  {
    title: "아침고요수목원 오색별빛정원전", emoji: "✨", kind: "festival", start: "2025-12-05", end: "2026-03-15",
    place: "가평 아침고요수목원", note: "겨울 한정 빛 축제",
    source: { label: "telltrip", url: "https://www.telltrip.com/festival/morning-calm-garden-winter-light-festival/" },
  },

  // ─── 2026 ───
  {
    title: "화담숲 봄 시즌 예매 오픈", emoji: "🎟️", kind: "booking", start: "2026-03-10",
    place: "광주 곤지암 화담숲", note: "오후 1시 오픈 · 3월 27일 개장",
    source: { label: "인포매틱스뷰", url: "https://www.informaticsview.com/news/articleView.html?idxno=4651" },
  },
  {
    title: "에버랜드 튤립축제", emoji: "🌷", kind: "festival", start: "2026-03-20", end: "2026-04-30",
    place: "용인 에버랜드", note: "봄꽃 120만 송이",
    source: { label: "경향신문", url: "https://www.khan.co.kr/article/202603161020001" },
  },
  {
    title: "진해군항제", emoji: "🌸", kind: "festival", start: "2026-03-27", end: "2026-04-05",
    place: "창원 진해구",
    source: { label: "트립닷컴", url: "https://kr.trip.com/blog/jinhae-gunhang-festival-cherry-blossom-festival/" },
  },
  {
    title: "여의도 봄꽃축제", emoji: "🌸", kind: "festival", start: "2026-04-03", end: "2026-04-07",
    place: "서울 여의서로",
    source: { label: "서울시 미래한강본부", url: "https://hangang.seoul.go.kr/www/eventMng/detail.do?srchType=list&mid=538&evntSn=383" },
  },
  {
    title: "휴애리 수국축제", emoji: "💙", kind: "festival", start: "2026-04-20", end: "2026-07-26",
    place: "서귀포 휴애리",
    source: { label: "Visit Jeju", url: "https://visitjeju.net/kr/festival/view?contentsid=CNTS_300000000014244&menuId=DOM_000001718007000000" },
  },
  {
    title: "중랑 서울장미축제", emoji: "🌹", kind: "festival", start: "2026-05-15", end: "2026-05-23",
    place: "서울 중랑장미공원",
    source: { label: "위키트리", url: "https://www.wikitree.co.kr/articles/1136823" },
  },
  {
    title: "함안 강주 해바라기 축제", emoji: "🌻", kind: "festival", start: "2026-06-18", end: "2026-07-02",
    place: "함안 법수면 강주마을",
    source: { label: "더트래블뉴스", url: "https://thetravelnews.co.kr/2026/06/haman-gangju-sunflower-festival-2026-2/" },
  },
  {
    title: "세미원 연꽃문화제", emoji: "🪷", kind: "festival", start: "2026-06-26", end: "2026-08-17",
    place: "양평 세미원",
    source: { label: "telltrip", url: "https://www.telltrip.com/domestic-travel/semiwon-lotus-culture-2026-festival/" },
  },
  {
    title: "창덕궁 달빛기행 예매 응모", emoji: "🎟️", kind: "booking", start: "2026-08-20", end: "2026-08-26",
    place: "티켓링크", note: "추첨제 · 관람은 9/10~10/17",
    source: { label: "헤럴드경제", url: "https://www.heraldk.com/article/2026081719060636487" },
  },
  {
    title: "평창 효석문화제", emoji: "🤍", kind: "festival", start: "2026-09-04", end: "2026-09-13",
    place: "평창 봉평 메밀꽃밭",
    source: { label: "경향신문", url: "https://www.khan.co.kr/article/202609011024001/" },
  },
  {
    title: "창덕궁 달빛기행", emoji: "🌙", kind: "festival", start: "2026-09-10", end: "2026-10-17",
    place: "서울 창덕궁", note: "목~일 야간",
    source: { label: "헤럴드경제", url: "https://www.heraldk.com/article/2026081719060636487" },
  },
  {
    title: "화담숲 가을 성수기 예매 오픈", emoji: "🎟️", kind: "booking", start: "2026-09-16",
    place: "광주 곤지암 화담숲", note: "오후 1시 오픈 · 모노레일은 다음 날",
    source: { label: "파이낸셜뉴스", url: "https://www.fnnews.com/news/202609111604520474" },
  },
  {
    title: "영광 불갑산 상사화축제", emoji: "❤️", kind: "festival", start: "2026-09-18", end: "2026-09-27",
    place: "영광 불갑사 관광지", note: "꽃무릇 군락",
    source: { label: "네이트뉴스", url: "https://m.news.nate.com/view/20260906n11819" },
  },
  {
    title: "정선 민둥산 억새축제", emoji: "🌾", kind: "festival", start: "2026-09-18", end: "2026-11-08",
    place: "정선 민둥산",
    source: { label: "국민일보", url: "https://www.kmib.co.kr/article/view.asp?arcid=9000013751" },
  },
  {
    title: "고창 청농원 핑크뮬리 축제", emoji: "🩷", kind: "festival", start: "2026-09-19",
    place: "고창 청농원",
    source: { label: "스타뉴스", url: "https://www.starnewskorea.com/business-life/2026/09/18/2026091813454783095" },
  },
  {
    title: "가을 궁중문화축전", emoji: "🏯", kind: "festival", start: "2026-10-07", end: "2026-10-11",
    place: "서울 4대궁·종묘",
    source: { label: "이데일리", url: "https://www.edaily.co.kr/News/Read?newsId=03686726645576512" },
  },
  {
    title: "구리 코스모스 축제", emoji: "🌼", kind: "festival", start: "2026-10-09", end: "2026-10-11",
    place: "구리한강시민공원",
    source: { label: "네이트뉴스", url: "https://m.news.nate.com/view/20260909n28246" },
  },
  {
    title: "서울억새축제", emoji: "🌾", kind: "festival", start: "2026-10-17", end: "2026-10-23",
    place: "서울 하늘공원",
    source: { label: "서울시", url: "https://news.seoul.go.kr/env/archives/570795" },
  },
  {
    title: "화담숲 가을 단풍축제", emoji: "🍁", kind: "festival", start: "2026-10-23", end: "2026-11-15",
    place: "광주 곤지암 화담숲", note: "100% 사전 예약제",
    source: { label: "파이낸셜뉴스", url: "https://www.fnnews.com/news/202609111604520474" },
  },
];

export type EventStatus = "ongoing" | "upcoming" | "past";

/** 오늘 기준 진행 상태와 D-day */
export function eventStatus(e: SeasonEvent, now = new Date()): { status: EventStatus; d: number } {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const at = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  };
  const start = at(e.start);
  // 종료일이 없는 축제는 시작 후 45일까지 진행 중으로 본다
  const end = e.end ? at(e.end) : e.kind === "festival" ? start + 45 * 86400000 : start;
  const d = Math.round((start - today) / 86400000);
  if (today > end) return { status: "past", d };
  if (today >= start) return { status: "ongoing", d };
  return { status: "upcoming", d };
}

/** "2026-10-07" ~ "2026-10-11" → "10.7 – 10.11" */
export function eventRange(e: SeasonEvent): string {
  const f = (s: string) => `${Number(s.slice(5, 7))}.${Number(s.slice(8))}`;
  if (!e.end) return e.kind === "booking" ? f(e.start) : `${f(e.start)} ~`;
  const crossYear = e.end.slice(0, 4) !== e.start.slice(0, 4);
  return `${f(e.start)} – ${crossYear ? `${e.end.slice(2, 4)}.` : ""}${f(e.end)}`;
}
