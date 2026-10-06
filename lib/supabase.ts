import { createClient } from "@supabase/supabase-js";
import verified from "./instagram-verified.json";

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
  /** 검수 상태. 사진 제보는 운영자 승인 전까지 pending (supabase/moderation.sql) */
  status?: "pending" | "approved" | "rejected";
  created_at: string;
};

// 팔로워 5,000명 이상으로 확인된 계정의 게시물만 출처로 보여준다 (lib/instagram-verified.json)
const VERIFIED = new Set(
  (verified.posts as { url: string; followers: number }[])
    .filter((p) => p.followers >= verified.minFollowers)
    .map((p) => normalizeIg(p.url))
);

function normalizeIg(url: string) {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel)\/([\w-]+)/);
  return m ? m[1] : url;
}

/** 출처는 확인된 인스타그램 게시물만. 블로그·기사 링크와 미확인 게시물은 null. */
export function instagramOnly(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    if (host !== "instagram.com" && !host.endsWith(".instagram.com")) return null;
  } catch {
    return null;
  }
  return VERIFIED.has(normalizeIg(url)) ? url : null;
}

export function withInstagramSource(r: Report): Report {
  const source_url = instagramOnly(r.source_url);
  return source_url === r.source_url ? r : { ...r, source_url, source_posted_at: null };
}
