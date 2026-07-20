"use client";

import { useState } from "react";
import { shareCard } from "@/lib/game";

export default function CardModal({
  flower,
  emoji,
  place,
  isNew,
  onClose,
}: {
  flower: string;
  emoji: string;
  place?: string;
  isNew: boolean;
  onClose: () => void;
}) {
  const [shareMsg, setShareMsg] = useState("");

  async function share() {
    const result = await shareCard(flower, emoji, place);
    if (result === "copied") setShareMsg("클립보드에 복사됐어요! 친구에게 붙여넣기 해보세요");
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal card-modal" onClick={(e) => e.stopPropagation()}>
        <p className="card-earned">{isNew ? "✨ 새로운 꽃카드 획득!" : "🎴 꽃카드 획득!"}</p>
        <div className="flower-card">
          <span className="flower-card-emoji">{emoji}</span>
          <span className="flower-card-name">{flower}</span>
          {place && <span className="flower-card-place">{place}</span>}
          <span className="flower-card-date">
            {new Date().toLocaleDateString("ko-KR")}
          </span>
        </div>
        <button className="submit" onClick={share}>
          💌 친구에게 카드 보내기
        </button>
        {shareMsg && <p className="privacy-note">{shareMsg}</p>}
        <button className="card-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
