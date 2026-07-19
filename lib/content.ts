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
      { name: "단풍·은행", emoji: "🍁", spots: "남이섬, 아산 은행나무길" },
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

export type SolarTerm = {
  name: string;
  month: number;
  day: number;
  desc: string;
  foods: string[];
};

// 절기 날짜는 해마다 ±1일 오차가 있는 근사값
export const SOLAR_TERMS: SolarTerm[] = [
  { name: "소한", month: 1, day: 5, desc: "일 년 중 가장 춥다는 시기", foods: ["떡국", "곰탕", "귤"] },
  { name: "대한", month: 1, day: 20, desc: "큰 추위, 겨울의 마무리", foods: ["팥죽", "매생이국", "한라봉"] },
  { name: "입춘", month: 2, day: 4, desc: "봄의 시작", foods: ["봄동", "냉이", "달래"] },
  { name: "우수", month: 2, day: 19, desc: "눈이 녹아 비가 되는 때", foods: ["바지락", "쑥", "딸기"] },
  { name: "경칩", month: 3, day: 5, desc: "개구리가 잠에서 깨는 날", foods: ["도다리쑥국", "주꾸미", "봄나물"] },
  { name: "춘분", month: 3, day: 20, desc: "낮과 밤의 길이가 같은 날", foods: ["두릅", "달래무침", "소라"] },
  { name: "청명", month: 4, day: 5, desc: "하늘이 맑아지는 봄의 한가운데", foods: ["미나리", "꽃게", "쑥버무리"] },
  { name: "곡우", month: 4, day: 20, desc: "곡식을 적시는 봄비", foods: ["우전차", "조기", "취나물"] },
  { name: "입하", month: 5, day: 5, desc: "여름의 시작", foods: ["멍게", "완두콩", "매실"] },
  { name: "소만", month: 5, day: 21, desc: "만물이 자라 가득 차는 때", foods: ["감자", "마늘종", "앵두"] },
  { name: "망종", month: 6, day: 6, desc: "보리 베고 모내기하는 때", foods: ["보리밥", "매실청 담그기", "살구"] },
  { name: "하지", month: 6, day: 21, desc: "일 년 중 낮이 가장 긴 날", foods: ["감자전", "옥수수", "참외"] },
  { name: "소서", month: 7, day: 7, desc: "본격 더위의 시작, 장마철", foods: ["민어탕", "콩국수", "수박"] },
  { name: "대서", month: 7, day: 23, desc: "가장 무더운 한여름", foods: ["삼계탕", "장어", "복숭아"] },
  { name: "입추", month: 8, day: 7, desc: "더위 속 가을의 문턱", foods: ["전복", "옥수수", "포도"] },
  { name: "처서", month: 8, day: 23, desc: "더위가 물러가는 때", foods: ["추어탕", "고구마순", "무화과"] },
  { name: "백로", month: 9, day: 7, desc: "풀잎에 흰 이슬이 맺히는 때", foods: ["대하", "송이버섯", "배"] },
  { name: "추분", month: 9, day: 23, desc: "낮과 밤이 다시 같아지는 날", foods: ["전어", "토란국", "밤"] },
  { name: "한로", month: 10, day: 8, desc: "찬 이슬이 내리는 때", foods: ["미꾸라지", "홍합", "감"] },
  { name: "상강", month: 10, day: 23, desc: "서리가 내리기 시작", foods: ["꽃게찜", "은행", "사과"] },
  { name: "입동", month: 11, day: 7, desc: "겨울의 시작, 김장 준비", foods: ["김장김치", "굴", "홍시"] },
  { name: "소설", month: 11, day: 22, desc: "첫눈이 내리는 때", foods: ["시래기국", "과메기", "유자차"] },
  { name: "대설", month: 12, day: 7, desc: "눈이 가장 많이 내리는 때", foods: ["동태탕", "만두", "곶감"] },
  { name: "동지", month: 12, day: 22, desc: "밤이 가장 긴 날", foods: ["팥죽", "동치미", "귤"] },
];

/** 오늘 날짜 기준 현재 절기와 다음 절기를 돌려준다. */
export function getCurrentTerm(now = new Date()): { current: SolarTerm; next: SolarTerm } {
  const md = (now.getMonth() + 1) * 100 + now.getDate();
  let idx = SOLAR_TERMS.length - 1; // 1/1~1/4는 전년도 동지
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    if (SOLAR_TERMS[i].month * 100 + SOLAR_TERMS[i].day <= md) idx = i;
  }
  return {
    current: SOLAR_TERMS[idx],
    next: SOLAR_TERMS[(idx + 1) % SOLAR_TERMS.length],
  };
}
