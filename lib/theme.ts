// 시즌별 테마 색과 문구. 단풍 시즌에는 "피었다/졌다" 대신 "물들었다/떨어졌다"로 말한다.

import type { Report, Season } from "./supabase";

type Palette = { accent: string; deep: string; soft: string; glow: string; glow2: string };

const DEFAULT: Palette = {
  accent: "#e0566a",
  deep: "#b93d52",
  soft: "#fcecee",
  glow: "#ffd3c2",
  glow2: "#f4d6ff",
};

// 꽃 이름 일부로 팔레트를 고른다 (없으면 기본 코랄)
const PALETTES: [string, Palette][] = [
  ["단풍", { accent: "#c4532d", deep: "#963a1c", soft: "#fbece4", glow: "#ffd9a8", glow2: "#ffc4b0" }],
  ["은행", { accent: "#c98a17", deep: "#94620a", soft: "#fcf3dc", glow: "#ffe39a", glow2: "#ffd0a6" }],
  ["억새", { accent: "#a08354", deep: "#76603a", soft: "#f5efe4", glow: "#f1e2c4", glow2: "#e6dccb" }],
  ["코스모스", { accent: "#d9577f", deep: "#a93a5f", soft: "#fcebf1", glow: "#ffd1e0", glow2: "#e9d7ff" }],
  ["핑크뮬리", { accent: "#d45a8c", deep: "#a33d68", soft: "#fcebf3", glow: "#ffcfe4", glow2: "#f1d5ff" }],
  ["꽃무릇", { accent: "#c8323f", deep: "#99212c", soft: "#fbe8ea", glow: "#ffc9c2", glow2: "#ffd9e1" }],
  ["수국", { accent: "#5a6fd6", deep: "#3f51ad", soft: "#eceffd", glow: "#cfd9ff", glow2: "#e6d4ff" }],
  ["유채", { accent: "#c9a114", deep: "#957608", soft: "#fcf6dc", glow: "#fff0a0", glow2: "#ffe0b0" }],
  ["해바라기", { accent: "#d4901a", deep: "#9e6608", soft: "#fdf2dd", glow: "#ffe39a", glow2: "#ffd4a0" }],
];

export function paletteFor(season: Season | null): Palette {
  if (!season) return DEFAULT;
  return PALETTES.find(([key]) => season.flower_name.includes(key))?.[1] ?? DEFAULT;
}

/** 루트 CSS 변수에 시즌 팔레트를 입힌다. */
export function applyTheme(season: Season | null) {
  const p = paletteFor(season);
  const root = document.documentElement.style;
  root.setProperty("--accent", p.accent);
  root.setProperty("--accent-deep", p.deep);
  root.setProperty("--accent-soft", p.soft);
  root.setProperty("--glow", p.glow);
  root.setProperty("--glow-2", p.glow2);
}

export function isFoliage(season: Pick<Season, "flower_name"> | null): boolean {
  return !!season && /단풍|은행/.test(season.flower_name);
}

export type Copy = {
  state: Record<Report["bloom_state"], string>;
  stateEmoji: Record<Report["bloom_state"], string>;
  freshVote: string;
  fadedVote: string;
  freshCount: string;
};

const FLOWER_COPY: Copy = {
  state: { blooming: "피는 중", full: "만개", faded: "졌어요" },
  stateEmoji: { blooming: "🌱", full: "🌸", faded: "🍂" },
  freshVote: "아직 피어있어요",
  fadedVote: "이제 졌어요",
  freshCount: "아직 있어요",
};

const FOLIAGE_COPY: Copy = {
  state: { blooming: "물드는 중", full: "절정", faded: "낙엽 졌어요" },
  stateEmoji: { blooming: "🌿", full: "🍁", faded: "🍂" },
  freshVote: "아직 고와요",
  fadedVote: "다 떨어졌어요",
  freshCount: "아직 고와요",
};

export function copyFor(season: Pick<Season, "flower_name"> | null): Copy {
  return isFoliage(season) ? FOLIAGE_COPY : FLOWER_COPY;
}

/** "명소 이름 — 설명" 형태의 memo를 제목과 설명으로 나눈다. */
export function splitMemo(memo: string): { title: string; desc: string } {
  const i = memo.indexOf("—");
  if (i < 0) return { title: memo.trim(), desc: "" };
  return { title: memo.slice(0, i).trim(), desc: memo.slice(i + 1).trim() };
}

/** 채용 공고 사이트처럼 "오늘 · 3일 전 · 2주 전 · 11개월 전" 상대 시간 */
export function timeAgo(date: string | Date, now = new Date()): string {
  const then = typeof date === "string" ? new Date(date.length === 10 ? `${date}T00:00:00+09:00` : date) : date;
  const days = Math.floor((now.getTime() - then.getTime()) / 86400000);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  if (days < 7) return `${days}일 전`;
  if (days < 30) return `${Math.floor(days / 7)}주 전`;
  if (days < 365) return `${Math.floor(days / 30)}개월 전`;
  return `${Math.floor(days / 365)}년 전`;
}

/** "2025-10-24" → "2025.10.24" */
export function dotDate(date: string): string {
  return date.slice(0, 10).replace(/-/g, ".");
}
