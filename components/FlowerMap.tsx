"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase, withInstagramSource, type Report, type Season } from "@/lib/supabase";
import { addMyPendingCopy, addMyReportId } from "@/lib/myReports";
import { bumpStat, collectFlower } from "@/lib/game";
import { dday, foliageHeadline } from "@/lib/content";
import { applyTheme, copyFor, isFoliage, pickActiveSeason, splitMemo } from "@/lib/theme";
import { toast } from "@/lib/toast";
import { track } from "@/lib/track";
import { useEscape } from "@/lib/useEscape";
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

type Filter = "all" | "blooming" | "full" | "sns";

function matches(r: Report, f: Filter) {
  if (f === "all") return true;
  if (f === "sns") return !!r.source_url;
  return r.bloom_state === f;
}

/** 두 좌표 사이 거리(km) */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const ONBOARD_KEY = "kkotmap-onboarded";

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

  const [filter, setFilter] = useState<Filter>("all");
  const [myPos, setMyPos] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboarding, setOnboarding] = useState(false);
  // ?spot=ID 공유 링크로 들어왔을 때 열어야 할 제보
  const pendingSpotRef = useRef<number | null>(null);
  const fittedSeasonRef = useRef<number | null>(null);

  useEffect(() => {
    track("app_open", { label: document.referrer ? new URL(document.referrer).hostname : "direct" });
  }, []);

  useEffect(() => {
    pickingRef.current = picking;
  }, [picking]);

  useEffect(() => {
    const id = Number(new URLSearchParams(location.search).get("spot"));
    if (id) pendingSpotRef.current = id;
    try {
      if (!localStorage.getItem(ONBOARD_KEY)) setOnboarding(true);
    } catch {
      // 저장소를 못 쓰는 브라우저면 안내를 건너뛴다
    }
  }, []);

  const closePicker = useCallback(() => setPickerOpen(false), []);
  useEscape(closePicker, pickerOpen);
  const cancelPicking = useCallback(() => setPicking(false), []);
  useEscape(cancelPicking, picking);

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
      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }
      setSeasons(data);
      const active = pickActiveSeason(data);
      setActiveSeason(active);
      // 공유 링크의 제보가 다른 시즌이면 그 시즌을 연다
      let view = active;
      if (pendingSpotRef.current) {
        const { data: spot } = await supabase
          .from("reports")
          .select("season_id")
          .eq("id", pendingSpotRef.current)
          .maybeSingle();
        view = data.find((s: Season) => s.id === spot?.season_id) ?? active;
      }
      setViewSeason(view);
    })();
  }, []);

  // 보고 있는 시즌이 바뀌면 제보를 다시 불러오고 마커를 교체
  useEffect(() => {
    if (!viewSeason) return;
    setLoading(true);
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
      setReports((data ?? []).map(withInstagramSource));
      setLoading(false);
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

    // 공유 링크로 들어온 제보가 있으면 그 자리로
    const pending = pendingSpotRef.current && reports.find((r) => r.id === pendingSpotRef.current);
    if (pending) {
      pendingSpotRef.current = null;
      fittedSeasonRef.current = viewSeason.id;
      setSelected(pending);
      map.morph(new naver.maps.LatLng(pending.lat, pending.lng), 14);
      return;
    }
    // 시즌을 처음 열 때 명소가 모두 보이도록 지도 범위를 맞춘다
    if (reports.length > 0 && fittedSeasonRef.current !== viewSeason.id) {
      fittedSeasonRef.current = viewSeason.id;
      const bounds = new naver.maps.LatLngBounds();
      for (const r of reports) bounds.extend(new naver.maps.LatLng(r.lat, r.lng));
      map.fitBounds(bounds, { top: 170, right: 40, bottom: 260, left: 40 });
    }
  }, [reports, viewSeason]);

  // 필터에 맞는 핀만 보이게
  useEffect(() => {
    for (const r of reports) markersRef.current.get(r.id)?.setVisible(matches(r, filter));
  }, [filter, reports]);

  const visibleSpots = useMemo(() => {
    const list = reports.filter((r) => matches(r, filter));
    if (myPos) {
      return list
        .map((r) => ({ r, km: distanceKm(myPos, r) }))
        .sort((a, b) => a.km - b.km)
        .slice(0, 20);
    }
    // 위치를 모르면 인스타 화제 → 사진 → 반응 많은 순
    return list
      .map((r) => ({ r, km: null as number | null }))
      .sort(
        (a, b) =>
          Number(!!b.r.source_url) - Number(!!a.r.source_url) ||
          Number(!!b.r.photo_url) - Number(!!a.r.photo_url) ||
          b.r.likes + b.r.fresh_votes - (a.r.likes + a.r.fresh_votes)
      )
      .slice(0, 20);
  }, [reports, filter, myPos]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myMarkerRef = useRef<any>(null);
  const [locating, setLocating] = useState(false);

  function goToMyLocation() {
    track("locate");
    if (!navigator.geolocation) {
      toast("이 브라우저는 위치 기능을 지원하지 않아요");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLocating(false);
        setMyPos({ lat: p.coords.latitude, lng: p.coords.longitude });
        toast("가까운 명소 순으로 정렬했어요");
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
        toast("위치를 가져오지 못했어요. 브라우저 위치 권한을 확인해 주세요");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function showOnMap(r: Report) {
    setTab("map");
    setSelected(r);
    mapRef.current?.morph(new naver.maps.LatLng(r.lat, r.lng), 15);
  }

  function dismissOnboarding() {
    setOnboarding(false);
    try {
      localStorage.setItem(ONBOARD_KEY, "1");
    } catch {
      // 무시
    }
  }

  const copy = copyFor(viewSeason);
  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: "전체" },
    { id: "blooming", label: `${copy.stateEmoji.blooming} ${copy.state.blooming}` },
    { id: "full", label: `${copy.stateEmoji.full} ${copy.state.full}` },
    { id: "sns", label: "📸 인스타 화제" },
  ].filter((f) => f.id !== "sns" || reports.some((r) => r.source_url)) as { id: Filter; label: string }[];
  const isViewingActive = viewSeason?.id === activeSeason?.id;
  const news = viewSeason && isFoliage(viewSeason) ? foliageHeadline() : null;

  return (
    <>
      <div ref={mapDivRef} className="map" style={{ width: "100vw", height: "100dvh" }} />

      {tab === "map" && (
        <div className="topbar">
          <button className="season-banner glass" onClick={() => setPickerOpen(true)}>
            <span className="season-disc">{viewSeason?.emoji ?? "🌸"}</span>
            <span className="season-text">
              <span className="eyebrow">{isViewingActive ? "지금 시즌" : "명소 구경 중"}</span>
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

          <div className="filter-row" role="toolbar" aria-label="명소 필터">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`filter-chip glass${filter === f.id ? " on" : ""}`}
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id);
                  track("filter", { label: f.id });
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <RainOverlay lat={37.5665} lng={126.978} />
        </div>
      )}

      {tab === "map" && !picking && (
        <section className="spot-strip-wrap" aria-label="명소 둘러보기">
          <p className="spot-count">
            {loading ? (
              "명소를 불러오는 중…"
            ) : (
              <>
                명소 <b>{visibleSpots.length < 20 ? visibleSpots.length : "20+"}</b>곳
                {myPos ? " · 가까운 순" : ""}
              </>
            )}
          </p>
          {!loading && visibleSpots.length === 0 && (
            <div className="spot-empty glass">
              {filter === "all"
                ? "아직 제보가 없어요. 가운데 + 버튼으로 첫 제보를 남겨주세요."
                : "이 조건에 맞는 명소가 없어요. 필터를 바꿔보세요."}
            </div>
          )}
          <div className="spot-strip">
            {visibleSpots.map(({ r, km }) => {
              const { title } = splitMemo(r.memo);
              return (
                <button
                  key={r.id}
                  className={`spot-card glass${selected?.id === r.id ? " on" : ""}`}
                  onClick={() => showOnMap(r)}
                >
                  <span className="spot-thumb">
                    {r.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.photo_url} alt="" loading="lazy" />
                    ) : (
                      viewSeason?.emoji
                    )}
                  </span>
                  <span className="spot-body">
                    <b>{title || "이름 없는 장소"}</b>
                    <span>
                      {copy.stateEmoji[r.bloom_state]} {copy.state[r.bloom_state]}
                      {km !== null ? ` · ${km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(km < 10 ? 1 : 0)}km`}` : ""}
                      {r.source_url ? " · 📸" : ""}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {tab === "map" && onboarding && (
        <div className="onboard glass" role="dialog" aria-label="꽃맵 사용법">
          <b>꽃맵, 이렇게 써요</b>
          <ol>
            <li>핀이나 아래 카드를 누르면 명소 정보와 길찾기가 나와요</li>
            <li>위쪽 칩으로 절정·인스타 화제 명소만 골라 볼 수 있어요</li>
            <li>꽃을 발견하면 가운데 + 버튼으로 제보해 주세요</li>
          </ol>
          <button className="btn primary" onClick={dismissOnboarding}>
            알겠어요
          </button>
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
                    track("season_switch", { label: s.flower_name });
                    setPickerOpen(false);
                    setTab("map");
                  }}
                >
                  <span>{s.emoji}</span>
                  {s.flower_name}
                  {s.id === activeSeason?.id && <em>지금</em>}
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
          hidden={picking}
          onPickOnMap={() => {
            setTab("map");
            setViewSeason(activeSeason);
            setPicking(true);
          }}
          onClose={() => {
            setReporting(false);
            setPicking(false);
            setDraftPos(null);
          }}
          onCreated={(r) => {
            addMyReportId(r.id);
            bumpStat("reports");
            const isNew = collectFlower(activeSeason.flower_name, activeSeason.emoji);
            setViewSeason(activeSeason);
            setReporting(false);
            setDraftPos(null);
            if (r.status === "pending") {
              addMyPendingCopy(r);
              toast("사진 제보는 확인 후 지도에 올라가요. 마이에서 상태를 볼 수 있어요");
            } else {
              setReports((prev) => [r, ...prev]);
              showOnMap(r);
              toast("제보를 올렸어요. 고마워요!");
            }
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
          track("tab", { label: t });
          setPicking(false);
        }}
        onReport={() => {
          track("report_start");
          setDraftPos(null);
          setReporting(true);
        }}
      />
    </>
  );
}
