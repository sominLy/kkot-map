"use client";

import { useState } from "react";
import { shareCard } from "@/lib/game";
import { splitMemo } from "@/lib/theme";
import Icon from "./Icon";

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
  const [today] = useState(() => new Date());

  async function share() {
    const result = await shareCard(flower, emoji, place);
    if (result === "copied") setShareMsg("클립보드에 복사됐어요. 친구에게 붙여넣어 보세요");
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet card-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="card-earned">
          <p className="eyebrow">{isNew ? "New card" : "Card"}</p>
          <h2>{isNew ? "새로운 꽃카드를 모았어요" : "꽃카드를 하나 더 모았어요"}</h2>
        </div>
        <div className="flower-card">
          <span className="flower-card-top">
            <span>KKOT MAP</span>
            <span>
              {today.getFullYear()}.{String(today.getMonth() + 1).padStart(2, "0")}
            </span>
          </span>
          <span className="flower-card-emoji">{emoji}</span>
          <span>
            <span className="flower-card-name">{flower}</span>
            {place && <span className="flower-card-place">{splitMemo(place).title}</span>}
          </span>
        </div>
        <button className="btn primary" onClick={share}>
          <Icon name="sparkle" size={18} />
          친구에게 카드 보내기
        </button>
        {shareMsg && <p className="disclaimer">{shareMsg}</p>}
        <button className="text-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
