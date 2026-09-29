"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { addMyReportId } from "@/lib/myReports";
import { bumpStat, collectFlower } from "@/lib/game";
import { dday, foliageHeadline } from "@/lib/content";
import { applyTheme, isFoliage } from "@/lib/theme";
import CardModal from "./CardModal";
import ReportModal from "./ReportModal";
import ReportPopup from "./ReportPopup";
import BottomBar, { type Tab } from "./BottomBar";
import InfoTab from "./InfoTab";
import MyPage from "./MyPage";
import RankingTab from "./RankingTab";
import RainOverlay from "./RainOverlay";
import Icon from "./Icon";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const naver: any;
}

function pinHtml(report: Report, emoji: string) {
  const sns = report.source_url ? " sns" : "";
  return `<div class="pin ${report.bloom_state}${sns}"><span class="pin-emoji">${emoji}</span></div>`;
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

  // 보고 있는 시즌 색으로 앱 전체 톤을 바꾼다 (단풍이면 단풍색)
  useEffect(() => {
    if (viewSeason) applyTheme(viewSeason);
  }, [viewSeason]);

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
          content: pinHtml(report, viewSeason.emoji),
          anchor: new naver.maps.Point(18, 43),
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
            icon: { content: '<div class="me-dot"></div>', anchor: new naver.maps.Point(9, 9) },
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
  const news = viewSeason && isFoliage(viewSeason) ? foliageHeadline() : null;

  return (
    <>
      <div ref={mapDivRef} className="map" />

      {tab === "map" && (
        <div className="topbar">
          <button className="season-banner glass" onClick={() => setPickerOpen(true)}>
            <span className="season-disc">{viewSeason?.emoji ?? "🌸"}</span>
            <span className="season-text">
              <span className="eyebrow">{isViewingActive ? "Now · 지금 시즌" : "명소 구경 중"}</span>
              <strong>
                {viewSeason
                  ? `${viewSeason.flower_name} ${isViewingActive ? "시즌" : "명소"}`
                  : "시즌을 불러오는 중…"}
              </strong>
            </span>
            <span className="season-caret">
              <Icon name="chevronDown" size={18} />
            </span>
          </button>

          {news?.observed && (
            <div className="news-chip glass">
              <span className="news-dot" />
              <span>
                {news.observed.place} 첫 단풍 <b>{Number(news.observed.date.slice(5, 7))}/{Number(news.observed.date.slice(8))}</b> 관측
              </span>
              {news.nextPeak && (
                <span className="dchip">
                  {news.nextPeak.place} 절정 D-{dday(news.nextPeak.date)}
                </span>
              )}
            </div>
          )}

          <RainOverlay lat={37.5665} lng={126.978} />
        </div>
      )}

      {tab === "map" && !picking && (
        <div className="fab-stack">
          <button
            className="round-btn glass"
            onClick={goToMyLocation}
            disabled={locating}
            aria-label="내 위치로 이동"
          >
            <Icon name="locate" size={22} />
          </button>
        </div>
      )}

      {picking && (
        <div className="picking-bar">
          <Icon name="pin" size={18} />
          지도를 눌러 위치를 골라주세요
          <button onClick={() => setPicking(false)}>취소</button>
        </div>
      )}

      {pickerOpen && (
        <div className="sheet-backdrop" onClick={() => setPickerOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <div>
                <p className="eyebrow">Season</p>
                <h2>어떤 풍경을 구경할까요?</h2>
                <p>
                  제보는 지금 시즌({activeSeason?.emoji} {activeSeason?.flower_name})만 받아요.
                  다른 꽃은 명소 구경용이에요.
                </p>
              </div>
              <button className="icon-btn" onClick={() => setPickerOpen(false)} aria-label="닫기">
                <Icon name="close" size={18} />
              </button>
            </div>
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
          </div>
        </div>
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
      {tab === "my" && <MyPage seasons={seasons} onShowOnMap={showOnMap} />}

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
