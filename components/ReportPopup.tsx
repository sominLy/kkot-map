"use client";

import { useState } from "react";
import { supabase, type Report } from "@/lib/supabase";

export default function ReportPopup({
  report,
  onClose,
}: {
  report: Report;
  onClose: () => void;
}) {
  const [voted, setVoted] = useState(false);
  const [flagged, setFlagged] = useState(false);

  async function vote(kind: "fresh" | "faded") {
    if (voted) return;
    setVoted(true);
    await supabase.rpc("vote_report", { p_report_id: report.id, p_kind: kind });
  }

  async function flag() {
    if (flagged) return;
    setFlagged(true);
    await supabase.from("flags").insert({ report_id: report.id, reason: "user" });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="popup" style={{ padding: 0 }}>
          {report.photo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={report.photo_url} alt="제보 사진" />
          )}
          {report.memo && <p>{report.memo}</p>}
          <p style={{ color: "#888", fontSize: 12 }}>
            {new Date(report.created_at).toLocaleDateString("ko-KR")} 제보 · 아직
            있어요 {report.fresh_votes + (voted ? 1 : 0)}
          </p>
          <div className="votes">
            <button onClick={() => vote("fresh")} disabled={voted}>
              🌸 아직 피어있어요
            </button>
            <button onClick={() => vote("faded")} disabled={voted}>
              🍂 이제 졌어요
            </button>
          </div>
          <button
            onClick={flag}
            disabled={flagged}
            style={{
              marginTop: 8,
              background: "none",
              border: "none",
              color: "#aaa",
              fontSize: 12,
              textDecoration: "underline",
            }}
          >
            {flagged ? "신고가 접수됐어요" : "🚨 부적절한 제보 신고"}
          </button>
        </div>
      </div>
    </div>
  );
}
