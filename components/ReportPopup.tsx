"use client";

import { useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { hasLiked, likeReport } from "@/lib/likes";
import { bumpStat, collectFlower, hasVisited, markVisited } from "@/lib/game";

export default function ReportPopup({
  report,
  season,
  onClose,
  onEarnCard,
}: {
  report: Report;
  season: Season | null;
  onClose: () => void;
  onEarnCard: (isNew: boolean) => void;
}) {
  const [voted, setVoted] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [initialLiked] = useState(() => hasLiked(report.id));
  const [liked, setLiked] = useState(initialLiked);

  async function like() {
    if (liked) return;
    setLiked(true);
    await likeReport(report.id);
  }

  const [visited, setVisited] = useState(() => hasVisited(report.id));

  async function visit() {
    if (visited || !season) return;
    setVisited(true);
    markVisited(report.id);
    bumpStat("visits");
    const isNew = collectFlower(season.flower_name, season.emoji);
    supabase.rpc("visit_report", { p_report_id: report.id });
    onEarnCard(isNew);
  }

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
          {report.source_url && (
            <a
              className="source-link"
              href={report.source_url}
              target="_blank"
              rel="noreferrer noopener"
            >
              🔗 소개 콘텐츠 보기
            </a>
          )}
          <button className={`like-btn${liked ? " on" : ""}`} onClick={like}>
            {liked ? "❤️" : "🤍"} 좋아요 {(report.likes ?? 0) + (liked && !initialLiked ? 1 : 0)}
          </button>
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
          <button className="visit-btn" onClick={visit} disabled={visited}>
            {visited
              ? `🎴 방문 완료! (방문 ${(report.visits ?? 0) + 1}명)`
              : `👣 저도 방문했어요! ${(report.visits ?? 0) > 0 ? `(${report.visits}명 다녀감)` : "— 꽃카드 받기"}`}
          </button>
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
