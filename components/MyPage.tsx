"use client";

import { useEffect, useState } from "react";
import { supabase, type Report } from "@/lib/supabase";
import { getMyReportIds } from "@/lib/myReports";
import { FLOWER_SEASONS } from "@/lib/content";
import {
  getCollection,
  getStats,
  getTitle,
  shareCard,
  type CollectionEntry,
  type Stats,
} from "@/lib/game";

const ALL_FLOWERS = FLOWER_SEASONS.flatMap((s) =>
  s.flowers.map((f) => ({ name: f.name, emoji: f.emoji }))
).filter((f, i, arr) => arr.findIndex((x) => x.name === f.name) === i);

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
  const [stats, setStats] = useState<Stats | null>(null);
  const [collection, setCollection] = useState<Record<string, CollectionEntry>>({});

  useEffect(() => {
    setStats(getStats());
    setCollection(getCollection());
  }, []);

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

  const title = stats ? getTitle(stats) : null;
  const collected = Object.keys(collection).length;

  return (
    <div className="sheet">
      {title && stats && (
        <div className="term-card">
          <p className="term-label">나의 칭호</p>
          <h2 className="term-name">
            {title.current.emoji} {title.current.name}
          </h2>
          <p className="term-desc">
            제보 {stats.reports} · 방문 {stats.visits} · 좋아요 {stats.likesGiven} ·{" "}
            {title.score}점
          </p>
          {title.next && (
            <p className="term-next">
              {title.next.min - title.score}점 더 모으면 「{title.next.emoji}{" "}
              {title.next.name}」!
            </p>
          )}
        </div>
      )}

      <h3 className="section-title">
        🎴 꽃카드 컬렉션 ({collected}/{ALL_FLOWERS.length})
      </h3>
      <div className="collection-grid">
        {ALL_FLOWERS.map((f) => {
          const got = collection[f.name];
          return (
            <button
              key={f.name}
              className={`collection-cell${got ? " got" : ""}`}
              disabled={!got}
              onClick={() => shareCard(f.name, f.emoji)}
            >
              <span className="collection-emoji">{got ? f.emoji : "❔"}</span>
              <span className="collection-name">{got ? f.name : "???"}</span>
              {got && got.count > 1 && <span className="collection-count">×{got.count}</span>}
            </button>
          );
        })}
      </div>
      <p className="disclaimer">
        제보하거나 「저도 방문했어요!」를 누르면 그 시즌의 꽃카드를 모을 수 있어요.
        모은 카드를 누르면 친구에게 자랑할 수 있답니다 💌
      </p>

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
