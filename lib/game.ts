// 칭호·꽃카드 컬렉션. 로그인이 없으므로 모두 이 브라우저의 localStorage에 저장.

export type Stats = { reports: number; visits: number; likesGiven: number };

const STATS_KEY = "kkotmap-stats";
const COLLECTION_KEY = "kkotmap-collection";
const VISITED_KEY = "kkotmap-visited";

export function getStats(): Stats {
  if (typeof window === "undefined") return { reports: 0, visits: 0, likesGiven: 0 };
  try {
    return { reports: 0, visits: 0, likesGiven: 0, ...JSON.parse(localStorage.getItem(STATS_KEY) ?? "{}") };
  } catch {
    return { reports: 0, visits: 0, likesGiven: 0 };
  }
}

export function bumpStat(kind: keyof Stats) {
  const s = getStats();
  s[kind] += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}

export function score(s: Stats): number {
  return s.reports * 10 + s.visits * 5 + s.likesGiven * 2;
}

export type Title = { name: string; emoji: string; min: number };

// 꽃반인(꽃+일반인) → 꽃내기(꽃+풋내기) → … 활동할수록 올라가는 칭호
export const TITLES: Title[] = [
  { name: "꽃반인", emoji: "🌱", min: 0 },
  { name: "꽃내기", emoji: "🌿", min: 10 },
  { name: "꽃잡이", emoji: "🌼", min: 30 },
  { name: "꽃잘알", emoji: "🌸", min: 70 },
  { name: "갓꽃러", emoji: "💐", min: 150 },
  { name: "꽃박사", emoji: "👑", min: 300 },
];

export function getTitle(s: Stats): { current: Title; next: Title | null; score: number } {
  const sc = score(s);
  let cur = TITLES[0];
  for (const t of TITLES) if (sc >= t.min) cur = t;
  const next = TITLES[TITLES.indexOf(cur) + 1] ?? null;
  return { current: cur, next, score: sc };
}

// ─── 꽃카드 컬렉션 ───

export type CollectionEntry = { emoji: string; count: number; firstAt: string };

export function getCollection(): Record<string, CollectionEntry> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(COLLECTION_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** 꽃카드 획득. 처음 모은 꽃이면 true를 돌려준다. */
export function collectFlower(flower: string, emoji: string): boolean {
  const col = getCollection();
  const isNew = !col[flower];
  col[flower] = {
    emoji,
    count: (col[flower]?.count ?? 0) + 1,
    firstAt: col[flower]?.firstAt ?? new Date().toISOString(),
  };
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(col));
  return isNew;
}

// ─── 방문 중복 방지 ───

export function hasVisited(id: number): boolean {
  try {
    return JSON.parse(localStorage.getItem(VISITED_KEY) ?? "[]").includes(id);
  } catch {
    return false;
  }
}

export function markVisited(id: number) {
  const ids = (() => {
    try {
      return JSON.parse(localStorage.getItem(VISITED_KEY) ?? "[]");
    } catch {
      return [];
    }
  })();
  localStorage.setItem(VISITED_KEY, JSON.stringify([id, ...ids]));
}

// ─── 카드 공유 ───

export async function shareCard(flower: string, emoji: string, place?: string) {
  const text = `${emoji} 꽃맵에서 「${flower}」 카드를 모았어요!${place ? ` (${place})` : ""}\n지금 어디에 꽃이 피었는지 구경하러 오세요 🌸`;
  const url = "https://kkot-map.vercel.app";
  if (navigator.share) {
    try {
      await navigator.share({ title: "꽃맵", text, url });
      return "shared";
    } catch {
      return "cancelled";
    }
  }
  await navigator.clipboard.writeText(`${text}\n${url}`);
  return "copied";
}
