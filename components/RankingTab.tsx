"use client";

import { useEffect, useState } from "react";
import { supabase, type Report } from "@/lib/supabase";
import { splitMemo } from "@/lib/theme";
import Icon from "./Icon";

type Cluster = {
  lat: number;
  lng: number;
  count: number;
  label: string;
};

// 같은 동네(약 1km 그리드)로 묶어서 이번 주 제보 핫플을 센다
function clusterReports(reports: Report[]): Cluster[] {
  const grid = new Map<string, { reports: Report[] }>();
  for (const r of reports) {
    const key = `${Math.round(r.lat * 100)},${Math.round(r.lng * 100)}`;
    if (!grid.has(key)) grid.set(key, { reports: [] });
    grid.get(key)!.reports.push(r);
  }
  return [...grid.values()]
    .map(({ reports: rs }) => {
      const named = rs.find((r) => r.memo);
      return {
        lat: rs[0].lat,
        lng: rs[0].lng,
        count: rs.length,
        label: named ? splitMemo(named.memo).title : "이름 없는 동네",
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export default function RankingTab({
  onShowOnMap,
}: {
  onShowOnMap: (lat: number, lng: number) => void;
}) {
  const [weekly, setWeekly] = useState<Cluster[] | null>(null);
  const [topPhotos, setTopPhotos] = useState<Report[] | null>(null);

  useEffect(() => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
    supabase
      .from("reports")
      .select("*")
      .eq("hidden", false)
      .gte("created_at", weekAgo)
      .limit(1000)
      .then(({ data }) => setWeekly(clusterReports(data ?? [])));

    supabase
      .from("reports")
      .select("*")
      .eq("hidden", false)
      .not("photo_url", "is", null)
      .order("likes", { ascending: false })
      .limit(9)
      .then(({ data }) => setTopPhotos((data ?? []).filter((r) => r.likes > 0)));
  }, []);

  return (
    <div className="page">
      <div className="page-inner">
        <header className="page-head">
          <p className="eyebrow">This week</p>
          <h1>랭킹</h1>
          <p>이번 주 제보가 몰린 동네와 사랑받은 사진이에요.</p>
        </header>

        <div className="section-title">
          <h2>이번 주 제보 핫플</h2>
          <span>최근 7일</span>
        </div>
        {weekly === null && (
          <>
            <div className="skeleton" />
            <div className="skeleton" />
          </>
        )}
        {weekly?.length === 0 && (
          <p className="empty">이번 주 제보가 아직 없어요. 첫 제보의 주인공이 되어보세요.</p>
        )}
        {weekly && weekly.length > 0 && (
          <section className="card row-list">
            {weekly.map((c, i) => (
              <button key={`${c.lat},${c.lng}`} className="row" onClick={() => onShowOnMap(c.lat, c.lng)}>
                <span className={`row-rank${i < 3 ? " top" : ""}`}>{i + 1}</span>
                <span className="row-body">
                  <span className="row-title">{c.label}</span>
                  <span className="row-meta">이번 주 제보 {c.count}건</span>
                </span>
                <Icon name="chevronRight" size={18} className="row-go" />
              </button>
            ))}
          </section>
        )}

        <div className="section-title">
          <h2>좋아요 많은 사진</h2>
          <span>전체 기간</span>
        </div>
        {topPhotos === null && <div className="skeleton" style={{ height: 180 }} />}
        {topPhotos?.length === 0 && (
          <p className="empty">
            아직 좋아요를 받은 사진이 없어요.
            <br />
            마음에 드는 제보 사진에 하트를 눌러주세요.
          </p>
        )}
        {topPhotos && topPhotos.length > 0 && (
          <div className="photo-grid">
            {topPhotos.map((r) => (
              <button key={r.id} className="photo-cell" onClick={() => onShowOnMap(r.lat, r.lng)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.photo_url!} alt={r.memo || "제보 사진"} />
                <span>♥ {r.likes}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
