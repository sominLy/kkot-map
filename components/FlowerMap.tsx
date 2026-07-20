"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { addMyReportId } from "@/lib/myReports";
import { bumpStat, collectFlower } from "@/lib/game";
import CardModal from "./CardModal";
import ReportModal from "./ReportModal";
import ReportPopup from "./ReportPopup";
import BottomBar, { type Tab } from "./BottomBar";
import InfoTab from "./InfoTab";
import MyPage from "./MyPage";
import RankingTab from "./RankingTab";
import RainOverlay from "./RainOverlay";

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

  const [tab, setTab] = useState<Tab>("map");
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  const [viewSeason, setViewSeason] = useState<Season | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [picking, setPicking] = useState(false);
  const pickingRef = useRef(false);
  const [reporting, setReporting] = useState(false);
  const [draftPos, setDraftPos] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<Report | null>(null);
  const [earnedCard, setEarnedCard] = useState<{
    flower: string;
    emoji: string;
    isNew: boolean;
    place?: string;
  } | null>(null);

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
        setReporting(true);
      } else {
        setSelected(null);
      }
    });

    (async () => {
      const { data } = await supabase.from("seasons").select("*").order("id");
      if (!data || data.length === 0) return;
      setSeasons(data);
      const active = data.find((s: Season) => s.is_active) ?? data[0];
      setActiveSeason(active);
      setViewSeason(active);
    })();
  }, []);

  // 보고 있는 시즌이 바뀌면 제보를 다시 불러오고 마커를 교체
  useEffect(() => {
    if (!viewSeason) return;
    (async () => {
      const { data } = await supabase
        .from("reports")
        .select("*")
        .eq("season_id", viewSeason.id)
        .eq("hidden", false)
        .order("created_at", { ascending: false })
        .limit(500);
      for (const marker of markersRef.current.values()) marker.setMap(null);
      markersRef.current.clear();
      setSelected(null);
      setReports(data ?? []);
    })();
  }, [viewSeason]);

  // 제보 목록이 바뀌면 마커 동기화
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !viewSeason) return;
    for (const report of reports) {
      if (markersRef.current.has(report.id)) continue;
      const marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(report.lat, report.lng),
        icon: {
          content: `<div style="font-size:26px;filter:${
            report.bloom_state === "faded" ? "grayscale(1)" : "none"
          }">${viewSeason.emoji}</div>`,
          anchor: new naver.maps.Point(13, 13),
        },
      });
      naver.maps.Event.addListener(marker, "click", () => setSelected(report));
      markersRef.current.set(report.id, marker);
    }
  }, [reports, viewSeason]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myMarkerRef = useRef<any>(null);
  const [locating, setLocating] = useState(false);

  function goToMyLocation() {
    if (!navigator.geolocation) {
      alert("이 브라우저는 위치 기능을 지원하지 않아요");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLocating(false);
        const pos = new naver.maps.LatLng(p.coords.latitude, p.coords.longitude);
        if (!myMarkerRef.current) {
          myMarkerRef.current = new naver.maps.Marker({
            map: mapRef.current,
            position: pos,
            icon: {
              content:
                '<div style="width:16px;height:16px;border-radius:50%;background:#4285f4;border:3px solid #fff;box-shadow:0 0 8px rgba(66,133,244,.6)"></div>',
              anchor: new naver.maps.Point(8, 8),
            },
          });
        } else {
          myMarkerRef.current.setPosition(pos);
        }
        mapRef.current?.morph(pos, 15);
      },
      () => {
        setLocating(false);
        alert("위치를 가져오지 못했어요. 브라우저 위치 권한을 확인해주세요.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function showOnMap(r: Report) {
    setTab("map");
    setSelected(r);
    mapRef.current?.morph(new naver.maps.LatLng(r.lat, r.lng), 15);
  }

  const isViewingActive = viewSeason?.id === activeSeason?.id;

  return (
    <>
      <div ref={mapDivRef} style={{ width: "100vw", height: "100vh" }} />

      {tab === "map" && <RainOverlay lat={37.5665} lng={126.978} />}

      {tab === "map" && (
        <button className="season-banner" onClick={() => setPickerOpen(true)}>
          {viewSeason
            ? isViewingActive
              ? `${viewSeason.emoji} 지금은 ${viewSeason.flower_name} 시즌!`
              : `${viewSeason.emoji} ${viewSeason.flower_name} 명소 구경 중`
            : "시즌 정보를 불러오는 중…"}
          <span className="season-caret">▾</span>
        </button>
      )}

      {pickerOpen && (
        <div className="modal-backdrop" onClick={() => setPickerOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>어떤 꽃을 구경할까요?</h2>
            <div className="season-grid">
              {seasons.map((s) => (
                <button
                  key={s.id}
                  className={`season-chip${viewSeason?.id === s.id ? " on" : ""}`}
                  onClick={() => {
                    setViewSeason(s);
                    setPickerOpen(false);
                    setTab("map");
                  }}
                >
                  <span>{s.emoji}</span>
                  {s.flower_name}
                  {s.is_active && <em>NOW</em>}
                </button>
              ))}
            </div>
            <p className="privacy-note">
              제보는 지금 시즌({activeSeason?.emoji} {activeSeason?.flower_name})
              꽃만 가능해요. 다른 꽃은 명소 구경용이에요 🌸
            </p>
          </div>
        </div>
      )}

      {tab === "map" && (
        <button
          className="locate-btn"
          onClick={goToMyLocation}
          disabled={locating}
          aria-label="내 위치로 이동"
        >
          {locating ? "⏳" : "🧭"}
        </button>
      )}

      {picking && (
        <button className="report-fab picking" onClick={() => setPicking(false)}>
          지도를 눌러 위치를 골라주세요 (취소)
        </button>
      )}

      {tab === "info" && <InfoTab />}
      {tab === "rank" && (
        <RankingTab
          onShowOnMap={(lat, lng) => {
            setTab("map");
            mapRef.current?.morph(new naver.maps.LatLng(lat, lng), 14);
          }}
        />
      )}
      {tab === "my" && <MyPage onShowOnMap={showOnMap} />}

      {reporting && activeSeason && (
        <ReportModal
          season={activeSeason}
          pos={draftPos}
          onPickOnMap={() => {
            setReporting(false);
            setTab("map");
            setViewSeason(activeSeason);
            setPicking(true);
          }}
          onClose={() => {
            setReporting(false);
            setDraftPos(null);
          }}
          onCreated={(r) => {
            addMyReportId(r.id);
            bumpStat("reports");
            const isNew = collectFlower(activeSeason.flower_name, activeSeason.emoji);
            setViewSeason(activeSeason);
            setReports((prev) => [r, ...prev]);
            setReporting(false);
            setDraftPos(null);
            showOnMap(r);
            setEarnedCard({
              flower: activeSeason.flower_name,
              emoji: activeSeason.emoji,
              isNew,
              place: r.memo || undefined,
            });
          }}
        />
      )}

      {selected && viewSeason && (
        <ReportPopup
          report={selected}
          season={viewSeason}
          onClose={() => setSelected(null)}
          onEarnCard={(isNew) =>
            setEarnedCard({
              flower: viewSeason.flower_name,
              emoji: viewSeason.emoji,
              isNew,
              place: selected.memo || undefined,
            })
          }
        />
      )}

      {earnedCard && (
        <CardModal
          flower={earnedCard.flower}
          emoji={earnedCard.emoji}
          place={earnedCard.place}
          isNew={earnedCard.isNew}
          onClose={() => setEarnedCard(null)}
        />
      )}

      <BottomBar
        tab={tab}
        onTab={(t) => {
          setTab(t);
          setPicking(false);
        }}
        onReport={() => {
          setDraftPos(null);
          setReporting(true);
        }}
      />
    </>
  );
}
