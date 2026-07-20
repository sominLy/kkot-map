// 좋아요 중복 방지: 이 브라우저에서 누른 제보 id를 localStorage에 기억

import { supabase } from "./supabase";
import { bumpStat } from "./game";

const KEY = "kkotmap-liked";

export function getLikedIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function hasLiked(id: number): boolean {
  return getLikedIds().includes(id);
}

export async function likeReport(id: number): Promise<boolean> {
  if (hasLiked(id)) return false;
  localStorage.setItem(KEY, JSON.stringify([id, ...getLikedIds()]));
  bumpStat("likesGiven");
  const { error } = await supabase.rpc("like_report", { p_report_id: id });
  return !error;
}
