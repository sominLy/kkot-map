"use client";

import { useEffect, useState } from "react";
import { supabase, type Report } from "@/lib/supabase";

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
    .map(({ reports: rs }) => ({
      lat: rs[0].lat,
      lng: rs[0].lng,
      count: rs.length,
      label: rs.find((r) => r.memo)?.memo.split("—")[0].trim() ?? "이름 없는 동네",
    }))
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
    <div className="sheet">
      <h3 className="section-title">🏆 이번 주 제보 핫플</h3>
      {weekly === null && <p className="empty">불러오는 중…</p>}
      {weekly?.length === 0 && (
        <p className="empty">이번 주 제보가 아직 없어요. 첫 제보의 주인공이 되어보세요!</p>
      )}
      {weekly?.map((c, i) => (
        <button
          key={`${c.lat},${c.lng}`}
          className="my-report"
          onClick={() => onShowOnMap(c.lat, c.lng)}
        >
          <span className="my-report-memo">
            {["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][i]} {c.label}
          </span>
          <span className="my-report-meta">이번 주 제보 {c.count}건 · 눌러서 지도 보기</span>
        </button>
      ))}

      <h3 className="section-title">❤️ 좋아요 많은 사진</h3>
      {topPhotos === null && <p className="empty">불러오는 중…</p>}
      {topPhotos?.length === 0 && (
        <p className="empty">
          아직 좋아요 받은 사진이 없어요.
          <br />
          마음에 드는 제보 사진에 ❤️를 눌러주세요!
        </p>
      )}
      {topPhotos && topPhotos.length > 0 && (
        <div className="photo-grid">
          {topPhotos.map((r) => (
            <button key={r.id} className="photo-cell" onClick={() => onShowOnMap(r.lat, r.lng)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.photo_url!} alt={r.memo || "제보 사진"} />
              <span>❤️ {r.likes}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
