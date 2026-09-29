// 꽃도감·절기·제철음식 정적 콘텐츠

export type FlowerSeason = {
  period: string;
  flowers: { name: string; emoji: string; spots?: string }[];
};

export const FLOWER_SEASONS: FlowerSeason[] = [
  {
    period: "2월 ~ 3월",
    flowers: [
      { name: "매화", emoji: "🌸", spots: "광양 매화마을, 봉은사" },
      { name: "동백", emoji: "🌺", spots: "여수 오동도, 거제 지심도" },
    ],
  },
  {
    period: "3월 ~ 4월",
    flowers: [
      { name: "벚꽃", emoji: "🌸", spots: "여의도 윤중로, 석촌호수" },
      { name: "개나리", emoji: "💛", spots: "응봉산" },
      { name: "진달래", emoji: "🌷", spots: "원미산, 강화 고려산" },
      { name: "유채꽃", emoji: "🟡", spots: "제주 산방산, 청보리밭" },
    ],
  },
  {
    period: "4월 ~ 5월",
    flowers: [
      { name: "겹벚꽃", emoji: "🌸", spots: "서울숲, 경주 불국사" },
      { name: "철쭉", emoji: "🌺", spots: "군포 철쭉동산, 황매산" },
      { name: "튤립", emoji: "🌷", spots: "에버랜드, 태안 튤립축제" },
    ],
  },
  {
    period: "5월 ~ 6월",
    flowers: [
      { name: "장미", emoji: "🌹", spots: "중랑 장미공원, 올림픽공원" },
      { name: "이팝나무", emoji: "🤍", spots: "가로수길 곳곳" },
      { name: "작약", emoji: "🩷", spots: "의성 작약밭" },
    ],
  },
  {
    period: "6월 ~ 7월",
    flowers: [
      { name: "수국", emoji: "💙", spots: "제주 혼인지, 태종대" },
      { name: "연꽃", emoji: "🪷", spots: "양평 세미원, 부여 궁남지" },
    ],
  },
  {
    period: "7월 ~ 9월",
    flowers: [
      { name: "능소화", emoji: "🧡", spots: "골목 담벼락 어디든!" },
      { name: "해바라기", emoji: "🌻", spots: "함안 강주마을" },
      { name: "배롱나무", emoji: "🩷", spots: "담양 명옥헌" },
      { name: "맥문동", emoji: "💜", spots: "성주 성밖숲" },
    ],
  },
  {
    period: "9월 ~ 10월",
    flowers: [
      { name: "코스모스", emoji: "🌼", spots: "하늘공원, 구리 한강공원" },
      { name: "핑크뮬리", emoji: "🩷", spots: "양주 나리공원" },
      { name: "꽃무릇", emoji: "❤️", spots: "영광 불갑사, 고창 선운사" },
      { name: "메밀꽃", emoji: "🤍", spots: "평창 봉평" },
    ],
  },
  {
    period: "10월 ~ 11월",
    flowers: [
      { name: "국화", emoji: "💛", spots: "조계사, 마산 국화축제" },
      { name: "억새", emoji: "🌾", spots: "하늘공원, 민둥산" },
      { name: "단풍·은행", emoji: "🍁", spots: "설악산, 화담숲, 반계리 은행나무" },
    ],
  },
  {
    period: "11월 ~ 2월",
    flowers: [
      { name: "동백", emoji: "🌺", spots: "제주 동백수목원" },
      { name: "납매", emoji: "💛", spots: "국립수목원" },
    ],
  },
];

/** 오늘이 속한 시기인지 ("11월 ~ 2월"처럼 해를 넘기는 구간 포함) */
export function isCurrentPeriod(period: string, now = new Date()): boolean {
  const [from, to] = period.match(/\d+/g)!.map(Number);
  const m = now.getMonth() + 1;
  return from <= to ? m >= from && m <= to : m >= from || m <= to;
}

// ─── 2026 단풍 달력 (9월 29일 기준) ───
// 출처: 산림청 「2026년 한반도 단풍절정 예측지도」(9월 22일 발표), 기상청 첫 단풍 관측(9월 28일)

export type FoliageEvent = {
  place: string;
  date: string; // YYYY-MM-DD
  kind: "first" | "peak";
  note?: string;
};

export const FOLIAGE_2026: { updated: string; source: string; events: FoliageEvent[] } = {
  updated: "2026-09-29",
  source: "산림청 단풍절정 예측지도 · 기상청 관측",
  events: [
    { place: "점봉산", date: "2026-09-14", kind: "first", note: "시민 관측" },
    { place: "설악산", date: "2026-09-28", kind: "first", note: "평년과 같음" },
    { place: "설악산", date: "2026-10-20", kind: "peak" },
    { place: "속리산", date: "2026-10-28", kind: "peak" },
    { place: "은행나무", date: "2026-10-30", kind: "peak", note: "전국" },
    { place: "단풍나무·참나무", date: "2026-10-31", kind: "peak", note: "전국" },
    { place: "내장산", date: "2026-11-04", kind: "peak" },
    { place: "한라산", date: "2026-11-06", kind: "peak" },
  ],
};

/** 오늘 기준 D-day (지난 날은 음수) */
export function dday(date: string, now = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [y, m, d] = date.split("-").map(Number);
  return Math.round((new Date(y, m - 1, d).getTime() - today.getTime()) / 86400000);
}

/** 지도 배너용 한 줄 소식: 가장 최근 관측 + 다음 절정 */
export function foliageHeadline(now = new Date()): { observed?: FoliageEvent; nextPeak?: FoliageEvent } {
  const ev = FOLIAGE_2026.events;
  const observed = ev.filter((e) => e.kind === "first" && dday(e.date, now) <= 0).at(-1);
  const nextPeak = ev.find((e) => e.kind === "peak" && dday(e.date, now) >= 0);
  return { observed, nextPeak };
}

export type Source = { label: string; url: string };

export type SolarTerm = {
  name: string;
  hanja: string;
  month: number;
  day: number;
  longitude: number; // 태양 황경(°)
  meaning: string; // 이름 풀이
  desc: string;
  foods: string[]; // 제철 음식
  todo: string[]; // 해보면 좋은 일·풍습
  saying?: string; // 속담
  sources: Source[];
};

const LECTURER = "https://www.lecturernews.com/news/articleView.html?idxno=";
const DANDY = "https://dandylife1.com/entry/";

// 24절기. 날짜는 해마다 ±1일 오차가 있는 근사값.
// 음식·할 일·속담은 2024년 이후 게시된 글에서만 모았고, 절기마다 출처를 남긴다.
export const SOLAR_TERMS: SolarTerm[] = [
  {
    name: "소한", hanja: "小寒", month: 1, day: 5, longitude: 285,
    meaning: "작은(小) 추위(寒)",
    desc: "이름은 작은 추위지만 실제로는 이 무렵이 가장 추워요",
    foods: ["과메기", "매생이국"],
    todo: ["겨울 바다 제철 미식 여행 (구룡포 과메기·장흥 매생이)", "강추위에 대비해 몸 따뜻하게 하기"],
    saying: "대한이 소한의 집에 가서 얼어 죽는다",
    sources: [
      { label: "한국강사신문 · 2025", url: `${LECTURER}169710` },
      { label: "네이트뉴스 · 2025", url: "https://m.news.nate.com/view/20251229n32010" },
    ],
  },
  {
    name: "대한", hanja: "大寒", month: 1, day: 20, longitude: 300,
    meaning: "큰(大) 추위(寒)",
    desc: "겨울을 마무리하고 입춘을 기다리는 마지막 절기",
    foods: ["홍게", "매생이국"],
    todo: ["지난 한 해를 정리하고 새봄 맞을 준비하기", "제주 '신구간' 알아보기 (대한 뒤 이사·집수리를 하던 풍습)"],
    saying: "소한에 얼어 죽은 사람은 있어도 대한에 얼어 죽은 사람은 없다",
    sources: [
      { label: "다음카페 · 2026", url: "https://m.cafe.daum.net/okenzyme/SFWk/4858" },
      { label: "네이트뉴스 · 2025", url: "https://m.news.nate.com/view/20251229n32010" },
    ],
  },
  {
    name: "입춘", hanja: "立春", month: 2, day: 4, longitude: 315,
    meaning: "봄(春)이 선다(立)",
    desc: "봄의 시작, 한 해의 첫 절기",
    foods: ["오신반 (매운 봄나물 다섯 가지)", "입춘채 (달래·냉이 무침)", "명태순대"],
    todo: ["대문에 '입춘대길 건양다경' 입춘첩 붙이기", "가까운 사람과 입춘 인사 나누기"],
    sources: [
      { label: "한국강사신문 · 2025", url: `${LECTURER}171264` },
      { label: "트립닷컴 · 2026", url: "https://kr.trip.com/blog/beginning-of-spring-kr/" },
    ],
  },
  {
    name: "우수", hanja: "雨水", month: 2, day: 19, longitude: 330,
    meaning: "눈이 녹아 빗물(雨水)이 된다",
    desc: "얼음이 녹고 봄비가 내리기 시작하는 때",
    foods: ["달래 양념장 비빔밥", "미나리", "쑥"],
    todo: ["달래장 만들어 봄 밥상 차리기"],
    saying: "우수 경칩에 대동강 물이 풀린다",
    sources: [
      { label: "해달바람비 · 2026", url: "https://www.ib612.com/2026/02/usu-solar-term-korea-spring-home-health-tips-2026.html" },
      { label: "easyfasthand · 2025", url: "https://a.easyfasthand.com/161" },
    ],
  },
  {
    name: "경칩", hanja: "驚蟄", month: 3, day: 5, longitude: 345,
    meaning: "겨울잠 자던 벌레(蟄)가 놀라(驚) 깬다",
    desc: "개구리가 깨어나고 봄이 본격적으로 시작돼요",
    foods: ["고로쇠 수액", "냉이", "달래", "쑥"],
    todo: ["경칩 전후 열흘만 나는 고로쇠 수액 맛보기"],
    sources: [{ label: "한국강사신문 · 2025", url: `${LECTURER}173104` }],
  },
  {
    name: "춘분", hanja: "春分", month: 3, day: 20, longitude: 0,
    meaning: "봄(春)을 반(分)으로 나눈다",
    desc: "낮과 밤의 길이가 같아지는 봄의 한가운데",
    foods: ["나이떡", "볶은 콩", "냉이·달래·씀바귀"],
    todo: ["가족과 나이 수만큼 나이떡 나눠 먹기", "콩 볶아 먹기 (새와 쥐를 쫓던 풍습)"],
    sources: [{ label: "click-korea · 2025", url: "https://click-korea.com/107" }],
  },
  {
    name: "청명", hanja: "淸明", month: 4, day: 5, longitude: 15,
    meaning: "하늘이 맑고(淸) 밝아진다(明)",
    desc: "봄 하늘이 맑아지는 때, 한식과 같은 날이거나 하루 차이예요",
    foods: ["풋나물", "산나물"],
    todo: ["산나물로 봄 밥상 차리기", "찬 음식을 먹던 한식 챙기기"],
    sources: [{ label: "dandylife · 2025", url: `${DANDY}2025%EB%85%84-4%EC%9B%94-%EC%A0%88%EA%B8%B0-%EC%B2%AD%EB%AA%85-%EA%B3%A1%EC%9A%B0%EC%9D%98-%EB%9C%BB%EA%B3%BC-%EC%9C%A0%EB%9E%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%82%A0%EC%A7%9C%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-feat-%ED%95%9C%EC%8B%9D` }],
  },
  {
    name: "곡우", hanja: "穀雨", month: 4, day: 20, longitude: 30,
    meaning: "곡식(穀)을 적시는 봄비(雨)",
    desc: "봄의 마지막 절기, 봄비가 백곡을 기름지게 하는 때",
    foods: ["우전차 (곡우 전에 딴 첫 차)", "쑥떡", "곡우살이 조기", "보리밥"],
    todo: ["햇차 마셔보기", "곡우물(나무 수액) 마시기"],
    sources: [{ label: "VisitingKorea · 2025", url: "https://visitingkorea.kr/entry/gogu-meaning-2025" }],
  },
  {
    name: "입하", hanja: "立夏", month: 5, day: 5, longitude: 45,
    meaning: "여름(夏)이 선다(立)",
    desc: "여름의 시작, 흰 이팝나무 꽃이 피는 때",
    foods: ["쑥버무리", "보리밥", "보리개떡"],
    todo: ["어린 쑥 뜯어 쑥버무리 쪄 먹기", "이팝나무 꽃 구경하기 (꽃이 풍성하면 풍년이라 여겼어요)"],
    sources: [
      { label: "다음뉴스 · 2026", url: "https://v.daum.net/v/20260505050020506" },
      { label: "자람나무 · 2025", url: "https://jaramnamu.com/entry/24%EC%A0%88%EA%B8%B0-%EC%A0%95%EB%A6%AC-%E2%80%93-%ED%83%9C%EC%96%91%EC%9D%98-%EC%9B%80%EC%A7%81%EC%9E%84%EC%9C%BC%EB%A1%9C-%EB%82%98%EB%88%88-%EA%B3%84%EC%A0%88%EC%9D%98-%ED%9D%90%EB%A6%84-2025%EB%85%84-%EA%B8%B0%EC%A4%80-%EB%82%A0%EC%A7%9C-%ED%8F%AC%ED%95%A8" },
    ],
  },
  {
    name: "소만", hanja: "小滿", month: 5, day: 21, longitude: 60,
    meaning: "만물이 조금씩(小) 차오른다(滿)",
    desc: "햇볕이 풍부해 곡식이 여물기 시작하는 때",
    foods: ["죽순", "쑥버무리"],
    todo: ["죽순 데쳐 초고추장에 찍어 먹기"],
    sources: [
      { label: "한국강사신문 · 2025", url: `${LECTURER}178568` },
      { label: "해달바람비 · 2025", url: "https://www.ib612.com/2025/06/spring-seasonal-food-korea-apr-jun.html" },
    ],
  },
  {
    name: "망종", hanja: "芒種", month: 6, day: 6, longitude: 75,
    meaning: "까끄라기(芒) 있는 곡식의 씨(種)를 뿌린다",
    desc: "보리를 거두고 모를 심는 가장 바쁜 농사철",
    foods: ["보리밥", "밀전병", "애호박", "열무"],
    todo: ["햇보리로 보리밥 지어 먹기"],
    sources: [
      { label: "오뚜기 칼럼 · 2025", url: "https://www.otoki.com/pr/column-detail?page=1&idx=118" },
      { label: "mbcdy · 2026", url: "https://www.mbcdy.com/%EB%A7%9D%EC%A2%85-%EB%9C%BB%EA%B3%BC-2026%EB%85%84-%EB%82%A0%EC%A7%9C-%EB%86%8D%EC%82%AC-%ED%92%8D%EC%8A%B5-%EC%A0%95%EB%A6%AC" },
    ],
  },
  {
    name: "하지", hanja: "夏至", month: 6, day: 21, longitude: 90,
    meaning: "여름(夏)에 이른다(至)",
    desc: "일 년 중 낮이 가장 긴 날",
    foods: ["하지감자", "감자전"],
    todo: ["햇감자 쪄 먹거나 감자전 부치기"],
    sources: [{ label: "오뚜기 칼럼 · 2025", url: "https://www.otoki.com/pr/column-detail?page=1&idx=118" }],
  },
  {
    name: "소서", hanja: "小暑", month: 7, day: 7, longitude: 105,
    meaning: "작은(小) 더위(暑)",
    desc: "본격적인 더위와 장마가 시작되는 때",
    foods: ["보리밥", "열무김치", "보리개떡"],
    todo: ["열무김치 담가 여름 입맛 살리기"],
    sources: [{ label: "마담인포레스트 · 2025", url: "https://madaminforest.com/entry/%F0%9F%8C%9E-2025%EB%85%84-%E2%80%98%EC%86%8C%EC%84%9C%E2%80%99%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%86%8C%EC%84%9C%EC%A0%88%EA%B8%B0-%ED%8C%81-%EC%B4%9D%EC%A0%95%EB%A6%AC" }],
  },
  {
    name: "대서", hanja: "大暑", month: 7, day: 23, longitude: 120,
    meaning: "큰(大) 더위(暑)",
    desc: "일 년 중 가장 무더운 때, 중복 무렵",
    foods: ["삼계탕", "민어", "장어", "오미자차"],
    todo: ["복날 보양식 챙겨 먹기"],
    sources: [
      { label: "한국강사신문 · 2025", url: `${LECTURER}183015` },
      { label: "toinformation · 2025", url: "https://toinformation.com/entry/2025%EB%85%84-%EB%8C%80%EC%84%9C%EB%8A%94-%EC%96%B8%EC%A0%9C-%EB%9C%BB%EA%B3%BC-%EC%9C%A0%EB%9E%98%EB%B6%80%ED%84%B0-%EC%A0%88%EA%B8%B0-%EC%9D%8C%EC%8B%9D%EA%B9%8C%EC%A7%80-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC" },
    ],
  },
  {
    name: "입추", hanja: "立秋", month: 8, day: 7, longitude: 135,
    meaning: "가을(秋)이 선다(立)",
    desc: "더위 속에 가을이 시작되는 때, 말복과 겹치기도 해요",
    foods: ["복숭아", "옥수수", "닭백숙", "오이소박이"],
    todo: ["김장용 배추·무 심기"],
    sources: [
      { label: "holloseogi · 2025", url: "https://holloseogi.com/entry/2025%EB%85%84-%EC%9E%85%EC%B6%94%EB%8A%94-%EC%96%B8%EC%A0%9C-%EB%9C%BB%EA%B3%BC-%EC%9C%A0%EB%9E%98-%ED%92%8D%EC%8A%B5%EC%97%90%EC%84%9C-%EB%A8%B9%EA%B1%B0%EB%A6%AC%EA%B9%8C%EC%A7%80" },
      { label: "해달바람비 · 2026", url: "https://www.ib612.com/2026/08/beginning-of-autumn-august-farming-guide.html" },
    ],
  },
  {
    name: "처서", hanja: "處暑", month: 8, day: 23, longitude: 150,
    meaning: "더위(暑)가 머물다(處) 그친다",
    desc: "더위가 물러가고 아침저녁으로 선선해지는 때",
    foods: ["닭백숙", "멸치국수", "참외", "수박"],
    todo: ["눅눅해진 책·옷·이불 햇볕에 말리기 (포쇄)", "벌초하기"],
    saying: "처서가 지나면 모기 입도 비뚤어진다",
    sources: [
      { label: "위기브 · 2025", url: "https://www.wegive.co.kr/wezine/detail/1155" },
      { label: "wellbeing2017 · 2025", url: "https://wellbeing2017.co.kr/entry/2025%EB%85%84-%EC%B2%98%EC%84%9C-%EB%82%A0%EC%A7%9C-%EC%96%B8%EC%A0%9C%EC%9D%BC%EA%B9%8C-%EC%9D%98%EB%AF%B8%C2%B7%ED%92%8D%EC%8A%B5%C2%B7%EC%A0%9C%EC%B2%A0-%EC%9D%8C%EC%8B%9D-%EC%B4%9D%EC%A0%95%EB%A6%AC" },
    ],
  },
  {
    name: "백로", hanja: "白露", month: 9, day: 7, longitude: 165,
    meaning: "흰(白) 이슬(露)이 맺힌다",
    desc: "풀잎에 이슬이 맺히고 가을 기운이 완연해져요",
    foods: ["포도", "햇밤", "햇대추"],
    todo: ["햇과일·햇곡식 음식 이웃과 나누기"],
    saying: "백로에 비가 오면 풍년 든다",
    sources: [
      { label: "에포크타임스 · 2024", url: "https://www.epochtimes.kr/2024/09/690299.html" },
      { label: "dandylife · 2025", url: `${DANDY}2025%EB%85%84-9%EC%9B%94-%EC%A0%88%EA%B8%B0-%EB%B0%B1%EB%A1%9C-%EC%B6%94%EB%B6%84%EC%9D%98-%EB%9C%BB%EA%B3%BC-%EB%82%A0%EC%A7%9C-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%9C%A0%EB%9E%98%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90` },
    ],
  },
  {
    name: "추분", hanja: "秋分", month: 9, day: 23, longitude: 180,
    meaning: "가을(秋)을 반(分)으로 나눈다",
    desc: "낮과 밤이 다시 같아지고, 이후로는 밤이 길어져요",
    foods: ["표고버섯", "토란국", "고등어", "갈치"],
    todo: ["호박·박 썰어 말려 묵나물 준비하기"],
    sources: [{ label: "tripcorea · 2025", url: "https://tripcorea.com/155" }],
  },
  {
    name: "한로", hanja: "寒露", month: 10, day: 8, longitude: 195,
    meaning: "찬(寒) 이슬(露)이 맺힌다",
    desc: "이슬이 차가워지고 오곡백과를 거두는 때",
    foods: ["추어탕", "국화전", "국화주"],
    todo: ["노란 국화로 국화전 부치기", "높은 곳에 올라 가을 풍경 보기 (중양절 풍속)"],
    sources: [
      { label: "한국강사신문 · 2025", url: `${LECTURER}188315` },
      { label: "한국강사신문 · 2024", url: `${LECTURER}163390` },
    ],
  },
  {
    name: "상강", hanja: "霜降", month: 10, day: 23, longitude: 210,
    meaning: "서리(霜)가 내린다(降)",
    desc: "가을의 마지막 절기, 첫서리와 함께 단풍이 절정에 이르러요",
    foods: ["추어탕", "국화주"],
    todo: ["단풍 절정 구경하기 (2026년 전국 절정은 10월 말 예상)"],
    sources: [
      { label: "한국강사신문 · 2025", url: `${LECTURER}188315` },
      { label: "한국영농신문 · 2026", url: "https://www.youngnong.co.kr/news/articleView.html?idxno=70540" },
    ],
  },
  {
    name: "입동", hanja: "立冬", month: 11, day: 7, longitude: 225,
    meaning: "겨울(冬)이 선다(立)",
    desc: "겨울의 시작, 김장을 준비하는 때",
    foods: ["굴", "시래기된장국", "시루떡", "수육·보쌈"],
    todo: ["김장하기", "동네 어르신께 음식 대접하던 '치계미' 이어가기"],
    saying: "입동 지나면 김장하라",
    sources: [
      { label: "다음뉴스 · 2025", url: "https://v.daum.net/v/20251107050121575" },
      { label: "dandylife · 2025", url: `${DANDY}2025%EB%85%84-11%EC%9B%94-%EC%A0%88%EA%B8%B0-%EC%9E%85%EB%8F%99-%EC%86%8C%EC%84%A4-%EB%82%A0%EC%A7%9C%EC%99%80-%EC%9C%A0%EB%9E%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%ED%92%8D%EC%8A%B5%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4` },
    ],
  },
  {
    name: "소설", hanja: "小雪", month: 11, day: 22, longitude: 240,
    meaning: "작은(小) 눈(雪)",
    desc: "첫눈이 내리고 얼음이 얼기 시작하는 때",
    foods: ["김장김치", "시래기국", "우거짓국"],
    todo: ["입동에 못 한 겨울 채비 마무리하기", "손돌바람(강풍) 부는 날 바닷길 조심하기"],
    sources: [
      { label: "dandylife · 2025", url: `${DANDY}2025%EB%85%84-11%EC%9B%94-%EC%A0%88%EA%B8%B0-%EC%9E%85%EB%8F%99-%EC%86%8C%EC%84%A4-%EB%82%A0%EC%A7%9C%EC%99%80-%EC%9C%A0%EB%9E%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%ED%92%8D%EC%8A%B5%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4` },
    ],
  },
  {
    name: "대설", hanja: "大雪", month: 12, day: 7, longitude: 255,
    meaning: "큰(大) 눈(雪)",
    desc: "눈이 많이 온다는 절기, 농사일을 쉬는 농한기의 시작",
    foods: ["잡곡죽", "채소죽"],
    todo: ["늦어도 대설 전에 김장 끝내기", "한 해 쉬어가며 재충전하기"],
    sources: [
      { label: "농민신문 · 2025", url: "https://www.nongmin.com/article/20251204500106" },
      { label: "더하고나누기 · 2025", url: "https://plushare.co.kr/%EB%8C%80%EC%84%A4-%EB%9C%BB%EA%B3%BC-%EC%A0%88%EA%B8%B0-%EC%9D%98%EB%AF%B8-%EC%A0%95%EB%A6%AC-2025%EB%85%84-%EB%8C%80%EC%84%A4-%EB%82%A0%EC%A7%9C/" },
    ],
  },
  {
    name: "동지", hanja: "冬至", month: 12, day: 22, longitude: 270,
    meaning: "겨울(冬)에 이른다(至)",
    desc: "일 년 중 밤이 가장 긴 날, 이후로 낮이 다시 길어져요",
    foods: ["팥죽", "팥시루떡"],
    todo: ["붉은 팥 음식 나눠 먹기", "음력 11월 초순의 '애동지'엔 팥죽 대신 팥떡 먹기"],
    sources: [
      { label: "세계일보 · 2025", url: "https://www.segye.com/newsView/20251222501799" },
      { label: "다음뉴스 · 2025", url: "https://v.daum.net/v/20251222102006275" },
    ],
  },
];

export const TERM_SEASONS: { name: string; emoji: string; terms: string[] }[] = [
  { name: "봄", emoji: "🌸", terms: ["입춘", "우수", "경칩", "춘분", "청명", "곡우"] },
  { name: "여름", emoji: "🌻", terms: ["입하", "소만", "망종", "하지", "소서", "대서"] },
  { name: "가을", emoji: "🍁", terms: ["입추", "처서", "백로", "추분", "한로", "상강"] },
  { name: "겨울", emoji: "❄️", terms: ["입동", "소설", "대설", "동지", "소한", "대한"] },
];

/** 이 절기 무렵(같은 달)에 피는 꽃 — 꽃맵 도감 데이터에서 */
export function flowersAround(term: Pick<SolarTerm, "month">): { name: string; emoji: string }[] {
  const now = new Date(2000, term.month - 1, 15);
  return FLOWER_SEASONS.filter((s) => isCurrentPeriod(s.period, now))
    .flatMap((s) => s.flowers)
    .filter((f, i, arr) => arr.findIndex((x) => x.name === f.name) === i);
}

/** 오늘 날짜 기준 현재 절기, 다음 절기, 다음 절기까지 남은 날과 진행률 */
export function getCurrentTerm(now = new Date()): {
  current: SolarTerm;
  next: SolarTerm;
  daysLeft: number;
  progress: number;
} {
  const md = (now.getMonth() + 1) * 100 + now.getDate();
  let idx = SOLAR_TERMS.length - 1; // 1/1~1/4는 전년도 동지
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    if (SOLAR_TERMS[i].month * 100 + SOLAR_TERMS[i].day <= md) idx = i;
  }
  const current = SOLAR_TERMS[idx];
  const next = SOLAR_TERMS[(idx + 1) % SOLAR_TERMS.length];
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const y = now.getFullYear();
  const start = new Date(current.month > now.getMonth() + 1 ? y - 1 : y, current.month - 1, current.day);
  const end = new Date(next.month < current.month ? start.getFullYear() + 1 : start.getFullYear(), next.month - 1, next.day);
  const total = (end.getTime() - start.getTime()) / 86400000;
  const daysLeft = Math.round((end.getTime() - today.getTime()) / 86400000);
  return { current, next, daysLeft, progress: Math.min(1, Math.max(0, 1 - daysLeft / total)) };
}
