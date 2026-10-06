// 운영 지표 기록 (supabase/analytics.sql). 실패해도 화면에는 영향 없음.

import { supabase } from "./supabase";

export type TrackKind =
  | "app_open"
  | "open_report"
  | "directions"
  | "share"
  | "report_start"
  | "tab"
  | "filter"
  | "season_switch"
  | "calendar_add"
  | "card_share"
  | "locate";

export function track(kind: TrackKind, opts: { reportId?: number; label?: string } = {}) {
  supabase
    .rpc("track_event", { p_kind: kind, p_report_id: opts.reportId ?? null, p_label: opts.label ?? null })
    .then(
      () => {},
      () => {}
    );
}
