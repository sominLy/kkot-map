import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);

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
  hidden: boolean;
  created_at: string;
};
