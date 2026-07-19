"use client";

import { useEffect, useState } from "react";
import { supabase, type Report } from "@/lib/supabase";
import { getMyReportIds } from "@/lib/myReports";

const BLOOM_LABEL: Record<Report["bloom_state"], string> = {
  blooming: "피는 중 🌱",
  full: "만개 🌸",
  faded: "졌어요 🍂",
};

export default function MyPage({
  onShowOnMap,
}: {
  onShowOnMap: (r: Report) => void;
}) {
  const [mine, setMine] = useState<Report[] | null>(null);

  useEffect(() => {
    const ids = getMyReportIds();
    if (ids.length === 0) {
      setMine([]);
      return;
    }
    supabase
      .from("reports")
      .select("*")
      .in("id", ids)
      .order("created_at", { ascending: false })
      .then(({ data }) => setMine(data ?? []));
  }, []);

  return (
    <div className="sheet">
      <h3 className="section-title">📍 내가 제보한 곳</h3>
      {mine === null && <p className="empty">불러오는 중…</p>}
      {mine?.length === 0 && (
        <p className="empty">
          아직 제보한 곳이 없어요.
          <br />
          꽃을 발견하면 첫 제보를 남겨보세요! 🌸
        </p>
      )}
      {mine?.map((r) => (
        <button key={r.id} className="my-report" onClick={() => onShowOnMap(r)}>
          <span className="my-report-memo">{r.memo || "(메모 없음)"}</span>
          <span className="my-report-meta">
            {BLOOM_LABEL[r.bloom_state]} ·{" "}
            {new Date(r.created_at).toLocaleDateString("ko-KR")} · 아직 있어요{" "}
            {r.fresh_votes}
          </span>
        </button>
      ))}
      <p className="disclaimer">
        내 제보는 이 브라우저에만 기억돼요 (로그인 없는 익명 서비스라서요).
      </p>
    </div>
  );
}
