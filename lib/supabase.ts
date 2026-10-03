import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn(
    "[꽃맵] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY가 없어요. 데이터 없이 화면만 뜹니다."
  );
}

// 환경변수가 없는 배포(예: Vercel Preview)에서도 빌드가 깨지지 않도록 자리표시 값으로 만든다.
// 이 경우 요청은 실패하고 지도에는 제보가 비어 보인다.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key"
);

export type Season = {
  id: number;
  flower_name: string;
  emoji: string;
  is_active: boolean;
};

export type Report = {
  id: number;
  season_id: number;
  lat: number;
  lng: number;
  memo: string;
  photo_url: string | null;
  bloom_state: "full" | "blooming" | "faded";
  fresh_votes: number;
  faded_votes: number;
  likes: number;
  visits: number;
  source_url: string | null;
  source_posted_at?: string | null;
  hidden: boolean;
  created_at: string;
};

/** 출처는 인스타그램 게시물만 보여준다. 예전 시드에 남은 블로그·기사 링크는 null로. */
export function instagramOnly(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    return host === "instagram.com" || host.endsWith(".instagram.com") ? url : null;
  } catch {
    return null;
  }
}

export function withInstagramSource(r: Report): Report {
  const source_url = instagramOnly(r.source_url);
  return source_url === r.source_url ? r : { ...r, source_url, source_posted_at: null };
}
