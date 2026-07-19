"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import ReportModal from "./ReportModal";
import ReportPopup from "./ReportPopup";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const naver: any;
}

export default function FlowerMap() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<number, any>>(new Map());

  const [season, setSeason] = useState<Season | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [picking, setPicking] = useState(false);
  const pickingRef = useRef(false);
  const [draftPos, setDraftPos] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<Report | null>(null);

  useEffect(() => {
    pickingRef.current = picking;
  }, [picking]);

  useEffect(() => {
    if (!mapDivRef.current || typeof naver === "undefined") return;
    const map = new naver.maps.Map(mapDivRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 13,
    });
    mapRef.current = map;

    naver.maps.Event.addListener(map, "click", (e: { coord: { y: number; x: number } }) => {
      if (pickingRef.current) {
        setDraftPos({ lat: e.coord.y, lng: e.coord.x });
        setPicking(false);
      } else {
        setSelected(null);
      }
    });

    (async () => {
      const { data: s } = await supabase
        .from("seasons")
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .single();
      if (!s) return;
      setSeason(s);
      const { data: r } = await supabase
        .from("reports")
        .select("*")
        .eq("season_id", s.id)
        .eq("hidden", false)
        .order("created_at", { ascending: false })
        .limit(500);
      setReports(r ?? []);
    })();
  }, []);

  // 제보 목록이 바뀌면 마커 동기화
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !season) return;
    for (const report of reports) {
      if (markersRef.current.has(report.id)) continue;
      const marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(report.lat, report.lng),
        icon: {
          content: `<div style="font-size:26px;filter:${
            report.bloom_state === "faded" ? "grayscale(1)" : "none"
          }">${season.emoji}</div>`,
          anchor: new naver.maps.Point(13, 13),
        },
      });
      naver.maps.Event.addListener(marker, "click", () => setSelected(report));
      markersRef.current.set(report.id, marker);
    }
  }, [reports, season]);

  return (
    <>
      <div ref={mapDivRef} style={{ width: "100vw", height: "100vh" }} />

      <div className="season-banner">
        {season
          ? `${season.emoji} 지금은 ${season.flower_name} 시즌!`
          : "시즌 정보를 불러오는 중…"}
      </div>

      {season && (
        <button
          className={`report-fab${picking ? " picking" : ""}`}
          onClick={() => setPicking((p) => !p)}
        >
          {picking ? "지도를 눌러 위치를 골라주세요 (취소)" : `📍 ${season.flower_name} 제보하기`}
        </button>
      )}

      {draftPos && season && (
        <ReportModal
          season={season}
          pos={draftPos}
          onClose={() => setDraftPos(null)}
          onCreated={(r) => {
            setReports((prev) => [r, ...prev]);
            setDraftPos(null);
          }}
        />
      )}

      {selected && (
        <ReportPopup report={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
