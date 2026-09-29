"use client";

import { useEffect, useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { getMyReportIds } from "@/lib/myReports";
import { FLOWER_SEASONS } from "@/lib/content";
import { copyFor, splitMemo } from "@/lib/theme";
import {
  getCollection,
  getStats,
  getTitle,
  shareCard,
  type CollectionEntry,
  type Stats,
} from "@/lib/game";
import Icon from "./Icon";

const ALL_FLOWERS = FLOWER_SEASONS.flatMap((s) =>
  s.flowers.map((f) => ({ name: f.name, emoji: f.emoji }))
).filter((f, i, arr) => arr.findIndex((x) => x.name === f.name) === i);

export default function MyPage({
  seasons,
  onShowOnMap,
}: {
  seasons: Season[];
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

  // 다음 칭호까지 진행률 (마지막 칭호면 가득)
  const progress = title
    ? title.next
      ? (title.score - title.current.min) / (title.next.min - title.current.min)
      : 1
    : 0;

  return (
    <div className="page">
      <div className="page-inner">
        <header className="page-head">
          <p className="eyebrow">My garden</p>
          <h1>마이</h1>
          <p>제보하고 다녀올수록 칭호가 자라요.</p>
        </header>

        {title && stats && (
          <section className="hero-card">
            <div className="title-row">
              <span className="title-disc">{title.current.emoji}</span>
              <div>
                <p className="eyebrow">나의 칭호</p>
                <h2 className="hero-title" style={{ fontSize: 28 }}>
                  {title.current.name}
                </h2>
              </div>
            </div>

            <div className="progress" role="progressbar" aria-valuenow={Math.round(progress * 100)}>
              <span className="progress-fill" style={{ width: `${progress * 100}%` }} />
              <span className="progress-knob" style={{ left: `${progress * 100}%` }}>
                {title.next?.emoji ?? "👑"}
              </span>
            </div>
            <p className="progress-label">
              <span>{title.score}점</span>
              <span>
                {title.next
                  ? `${title.next.min - title.score}점 더 모으면 「${title.next.name}」`
                  : "최고 칭호를 달성했어요"}
              </span>
            </p>

            <div className="stat-grid">
              <div className="stat">
                <b>{stats.reports}</b>
                <span>제보</span>
              </div>
              <div className="stat">
                <b>{stats.visits}</b>
                <span>방문</span>
              </div>
              <div className="stat">
                <b>{stats.likesGiven}</b>
                <span>좋아요</span>
              </div>
            </div>
          </section>
        )}

        <div className="section-title">
          <h2>꽃카드 컬렉션</h2>
          <span>
            {collected} / {ALL_FLOWERS.length}
          </span>
        </div>
        <div className="collection-grid">
          {ALL_FLOWERS.map((f) => {
            const got = collection[f.name];
            return (
              <button
                key={f.name}
                className={`collection-cell${got ? " got" : ""}`}
                disabled={!got}
                onClick={() => shareCard(f.name, f.emoji)}
                aria-label={got ? `${f.name} 카드 공유하기` : "아직 모으지 않은 카드"}
              >
                <span className="collection-emoji">{f.emoji}</span>
                <span className="collection-name">{got ? f.name : "???"}</span>
                {got && got.count > 1 && <span className="collection-count">×{got.count}</span>}
              </button>
            );
          })}
        </div>
        <p className="disclaimer">
          제보하거나 「저도 다녀왔어요」를 누르면 그 시즌의 꽃카드를 모아요. 모은 카드를 누르면
          친구에게 보낼 수 있어요.
        </p>

        <div className="section-title">
          <h2>내가 제보한 곳</h2>
          {mine && mine.length > 0 && <span>{mine.length}곳</span>}
        </div>
        {mine === null && <div className="skeleton" />}
        {mine?.length === 0 && (
          <p className="empty">
            아직 제보한 곳이 없어요.
            <br />
            가운데 + 버튼으로 첫 제보를 남겨보세요.
          </p>
        )}
        {mine && mine.length > 0 && (
          <section className="card row-list">
            {mine.map((r) => {
              const season = seasons.find((s) => s.id === r.season_id) ?? null;
              const copy = copyFor(season);
              return (
                <button key={r.id} className="row" onClick={() => onShowOnMap(r)}>
                  <span className="collection-emoji">{season?.emoji ?? "🌸"}</span>
                  <span className="row-body">
                    <span className="row-title">{splitMemo(r.memo).title || "(메모 없음)"}</span>
                    <span className="row-meta">
                      {copy.state[r.bloom_state]} · {new Date(r.created_at).toLocaleDateString("ko-KR")}{" "}
                      · {copy.freshCount} {r.fresh_votes}
                    </span>
                  </span>
                  <Icon name="chevronRight" size={18} className="row-go" />
                </button>
              );
            })}
          </section>
        )}
        <p className="disclaimer">내 제보는 이 브라우저에만 기억돼요 (로그인 없는 익명 서비스라서요).</p>
      </div>
    </div>
  );
}
