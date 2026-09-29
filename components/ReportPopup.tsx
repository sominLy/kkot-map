"use client";

import { useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { hasLiked, likeReport } from "@/lib/likes";
import { bumpStat, collectFlower, hasVisited, markVisited } from "@/lib/game";
import { copyFor, dotDate, splitMemo, timeAgo } from "@/lib/theme";
import Icon from "./Icon";

const STATE_CHIP: Record<Report["bloom_state"], string> = {
  blooming: "gold",
  full: "accent",
  faded: "muted",
};

export default function ReportPopup({
  report,
  season,
  onClose,
  onEarnCard,
}: {
  report: Report;
  season: Season;
  onClose: () => void;
  onEarnCard: (isNew: boolean) => void;
}) {
  const copy = copyFor(season);
  const { title, desc } = splitMemo(report.memo);

  const [vote, setVote] = useState<"fresh" | "faded" | null>(null);
  const [flagged, setFlagged] = useState<"" | "user" | "source-removal">("");
  const [initialLiked] = useState(() => hasLiked(report.id));
  const [liked, setLiked] = useState(initialLiked);
  const [initialVisited] = useState(() => hasVisited(report.id));
  const [visited, setVisited] = useState(initialVisited);

  async function like() {
    if (liked) return;
    setLiked(true);
    await likeReport(report.id);
  }

  async function visit() {
    if (visited) return;
    setVisited(true);
    markVisited(report.id);
    bumpStat("visits");
    const isNew = collectFlower(season.flower_name, season.emoji);
    supabase.rpc("visit_report", { p_report_id: report.id });
    onEarnCard(isNew);
  }

  async function sendVote(kind: "fresh" | "faded") {
    if (vote) return;
    setVote(kind);
    await supabase.rpc("vote_report", { p_report_id: report.id, p_kind: kind });
  }

  async function flag(reason: "user" | "source-removal") {
    if (flagged) return;
    setFlagged(reason);
    await supabase.from("flags").insert({ report_id: report.id, reason });
  }

  const likes = (report.likes ?? 0) + (liked && !initialLiked ? 1 : 0);
  const visits = (report.visits ?? 0) + (visited && !initialVisited ? 1 : 0);
  const fresh = report.fresh_votes + (vote === "fresh" ? 1 : 0);
  // 운영자 시드·SNS 출처가 아닌 실제 사용자 제보에만 제보 시점을 붙인다
  const isUserReport = !report.source_url && !report.memo.endsWith("(운영자 추천)");

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="place-hero">
          {report.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={report.photo_url} alt={`${title} 제보 사진`} />
          ) : (
            <span className="big-emoji">{season.emoji}</span>
          )}
        </div>

        <div className="sheet-head">
          <div>
            <h2>{title || "이름 없는 장소"}</h2>
            {desc && <p>{desc}</p>}
          </div>
          <button
            className={`icon-btn${liked ? " liked" : ""}`}
            onClick={like}
            aria-label={liked ? "좋아요 누름" : "좋아요"}
          >
            <Icon name="heart" size={20} />
          </button>
        </div>

        <div className="chips">
          <span className={`chip ${STATE_CHIP[report.bloom_state]}`}>
            {copy.stateEmoji[report.bloom_state]} {copy.state[report.bloom_state]}
          </span>
          {isUserReport && <span className="chip">{timeAgo(report.created_at)} 제보</span>}
          {fresh > 0 && <span className="chip">{copy.freshCount} {fresh}</span>}
          {likes > 0 && <span className="chip">♥ {likes}</span>}
          {visits > 0 && <span className="chip">👣 {visits}명 다녀감</span>}
        </div>

        {report.source_url && (
          <>
            <a
              className="source-card"
              href={report.source_url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="ig-glyph">
                <Icon name="camera" size={20} />
              </span>
              <span className="row-body">
                <b>Instagram에서 원문 보기</b>
                <span className="row-meta">
                  {report.source_posted_at
                    ? `${dotDate(report.source_posted_at)} 게시 · ${timeAgo(report.source_posted_at)}`
                    : "SNS 화제 명소"}
                </span>
              </span>
              <Icon name="external" size={18} className="row-go" />
            </a>
            <p className="source-note">
              꽃맵은 원문 링크만 연결해요. 사진과 글의 권리는 게시자에게 있어요.
            </p>
          </>
        )}

        <div>
          <p className="field-label">지금 상태를 알려주세요</p>
          <div className="segmented">
            <button
              className={vote === "fresh" ? "on" : ""}
              onClick={() => sendVote("fresh")}
              disabled={!!vote}
            >
              {copy.stateEmoji.full} {copy.freshVote}
            </button>
            <button
              className={vote === "faded" ? "on" : ""}
              onClick={() => sendVote("faded")}
              disabled={!!vote}
            >
              🍂 {copy.fadedVote}
            </button>
          </div>
        </div>

        <button className={`btn ${visited ? "done" : "primary"}`} onClick={visit} disabled={visited}>
          <Icon name="sparkle" size={18} />
          {visited ? "다녀온 곳으로 기록했어요" : "저도 다녀왔어요 · 꽃카드 받기"}
        </button>

        <div className="sheet-foot">
          {flagged === "user" ? (
            <span className="text-btn">신고가 접수됐어요</span>
          ) : flagged === "source-removal" ? (
            <span className="text-btn">링크 삭제 요청이 접수됐어요</span>
          ) : (
            <>
              <button className="text-btn" onClick={() => flag("user")}>
                부적절한 제보 신고
              </button>
              {report.source_url && (
                <button className="text-btn" onClick={() => flag("source-removal")}>
                  원 게시자예요 · 링크 삭제 요청
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
