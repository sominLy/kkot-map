"use client";

// 운영 대시보드: 방문자·제보·열람·길찾기·공유 일별 추이, 기능 출시 전후 비교, 기능별 사용량.

import { useEffect, useMemo, useState } from "react";
import { METRICS, type Day, type Metric, type Stats } from "@/lib/stats";

const RANGES = [7, 30, 90] as const;
const TILE_METRICS: Metric[] = ["visitors", "reports", "opens", "directions", "shares"];
const nf = new Intl.NumberFormat("ko-KR");
const md = (date: string) => `${Number(date.slice(5, 7))}.${Number(date.slice(8, 10))}`;

export default function AdminDashboard({ adminKey }: { adminKey: string }) {
  const [days, setDays] = useState<(typeof RANGES)[number]>(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [metric, setMetric] = useState<Metric>("visitors");

  useEffect(() => {
    let alive = true;
    setStats(null);
    setError("");
    fetch(`/api/admin?tab=stats&days=${days}`, { headers: { "x-admin-key": adminKey } })
      .then(async (res) => {
        const body = await res.json();
        if (!alive) return;
        if (!res.ok) setError(body.error ?? "불러오지 못했어요");
        else setStats(body);
      })
      .catch(() => alive && setError("불러오지 못했어요"));
    return () => {
      alive = false;
    };
  }, [days, adminKey]);

  return (
    <div className="dash">
      <div className="dash-filters">
        <div className="segmented" role="tablist" aria-label="기간">
          {RANGES.map((d) => (
            <button key={d} role="tab" aria-selected={days === d} className={days === d ? "on" : ""} onClick={() => setDays(d)}>
              최근 {d}일
            </button>
          ))}
        </div>
        {stats && (
          <span className="dash-range">
            {md(stats.range.from)} ~ {md(stats.range.to)} · 지난 기간과 비교
          </span>
        )}
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!stats && !error && <div className="skeleton" />}

      {stats && (
        <>
          {!stats.analyticsReady && (
            <p className="dash-note">
              방문자·열람·길찾기·공유는 <b>supabase/analytics.sql</b>을 실행한 뒤부터 쌓여요. 지금은 제보 수만
              보여요.
            </p>
          )}

          <div className="dash-tiles">
            {TILE_METRICS.map((m, i) => (
              <StatTile
                key={m}
                hero={i === 0}
                label={METRICS[m]}
                value={stats.totals.cur[m]}
                prev={stats.totals.prev[m]}
              />
            ))}
          </div>

          <section className="card dash-card">
            <div className="dash-card-head">
              <h3>일별 추이</h3>
              <span>세로선 = 기능 출시</span>
            </div>
            <div className="chip-row" role="tablist" aria-label="지표">
              {(Object.keys(METRICS) as Metric[]).map((m) => (
                <button key={m} role="tab" aria-selected={metric === m} className={`filter-chip${metric === m ? " on" : ""}`} onClick={() => setMetric(m)}>
                  {METRICS[m]}
                </button>
              ))}
            </div>
            <ColumnChart daily={stats.daily} metric={metric} releases={stats.releases} />
            <DailyTable daily={stats.daily} />
          </section>

          <section className="card dash-card">
            <div className="dash-card-head">
              <h3>전환</h3>
              <span>선택한 기간</span>
            </div>
            <div className="dash-funnels">
              <Funnel from="제보 시작" to="제보 완료" a={stats.totals.cur.reportStarts} b={stats.totals.cur.reports} />
              <Funnel from="명소 열람" to="길찾기" a={stats.totals.cur.opens} b={stats.totals.cur.directions} />
              <Funnel from="명소 열람" to="공유" a={stats.totals.cur.opens} b={stats.totals.cur.shares} />
            </div>
          </section>

          <section className="card dash-card">
            <div className="dash-card-head">
              <h3>기능 출시 전후 7일 · 하루 평균</h3>
              <span>출시 기록: lib/releases.ts</span>
            </div>
            <ReleaseTable releases={stats.releases} />
          </section>

          <div className="dash-grid">
            <Breakdown title="많이 본 명소" rows={stats.breakdowns.topSpots} />
            <Breakdown title="유입 경로" rows={stats.breakdowns.referrers} />
            <Breakdown title="탭 이동" rows={stats.breakdowns.tabs} labels={TAB_LABEL} />
            <Breakdown title="지도 필터" rows={stats.breakdowns.filters} labels={FILTER_LABEL} />
            <Breakdown title="다른 시즌 구경" rows={stats.breakdowns.seasonSwitch} />
            <Breakdown title="제보된 시즌" rows={stats.breakdowns.reportSeasons} />
            <Breakdown title="캘린더에 추가한 이벤트" rows={stats.breakdowns.calendar} />
            <Breakdown title="꽃카드 공유" rows={stats.breakdowns.cardShares} />
          </div>

          <section className="card dash-card">
            <div className="dash-card-head">
              <h3>전체 누적</h3>
              <span>기간 무관</span>
            </div>
            <dl className="dash-totals">
              <Total label="지도에 보이는 핀" value={stats.allTime.spots} />
              <Total label="사용자 제보" value={stats.allTime.userReports} />
              <Total label="사진 제보" value={stats.allTime.photoReports} />
              <Total label="좋아요" value={stats.allTime.likes} />
              <Total label="다녀왔어요" value={stats.allTime.visits} />
              <Total label="확인 투표" value={stats.allTime.votes} />
              <Total label="신고" value={stats.allTime.flags} />
              <Total label="검수 대기" value={stats.moderation.pending} />
              <Total label="신고로 숨김" value={stats.moderation.hidden} />
              <Total label="거절" value={stats.moderation.rejected} />
              <Total label="내 위치 버튼" value={stats.breakdowns.locate} sub="기간 내" />
            </dl>
          </section>
        </>
      )}
    </div>
  );
}

const TAB_LABEL: Record<string, string> = { map: "지도", info: "꽃도감", rank: "랭킹", my: "마이" };
const FILTER_LABEL: Record<string, string> = { all: "전체", blooming: "물드는 중", full: "절정", sns: "SNS 출처" };

function delta(cur: number, prev: number): { text: string; dir: "up" | "down" | "flat" } {
  if (cur === prev) return { text: "변화 없음", dir: "flat" };
  if (prev === 0) return { text: `+${nf.format(cur)} (새로 생김)`, dir: "up" };
  const pct = Math.round(((cur - prev) / prev) * 100);
  return { text: `${pct > 0 ? "+" : ""}${pct}%`, dir: pct > 0 ? "up" : pct < 0 ? "down" : "flat" };
}

function StatTile({ label, value, prev, hero }: { label: string; value: number; prev: number; hero?: boolean }) {
  const d = delta(value, prev);
  return (
    <div className={`card dash-tile${hero ? " hero" : ""}`}>
      <span className="dash-tile-label">{label}</span>
      <span className="dash-tile-value">{nf.format(value)}</span>
      <span className={`dash-delta ${d.dir}`}>
        {d.dir === "up" ? "▲ " : d.dir === "down" ? "▼ " : ""}
        {d.text}
        <span className="dash-delta-prev"> · 지난 기간 {nf.format(prev)}</span>
      </span>
    </div>
  );
}

/** 단일 지표 세로 막대. 출시일에 세로 헤어라인, 마우스·터치로 날짜별 값 확인. */
function ColumnChart({ daily, metric, releases }: { daily: Day[]; metric: Metric; releases: Stats["releases"] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640;
  const H = 200;
  const pad = { l: 34, r: 8, t: 10, b: 22 };
  const values = daily.map((d) => d[metric]);
  const max = Math.max(1, ...values);
  const step = niceStep(max);
  const top = Math.ceil(max / step) * step;
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  const slot = (W - pad.l - pad.r) / daily.length;
  const bw = Math.max(2, Math.min(24, slot - 2));
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / top);
  const x = (i: number) => pad.l + slot * i + (slot - bw) / 2;
  const labelEvery = Math.ceil(daily.length / 7);
  const relByDate = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const r of releases) m.set(r.date, [...(m.get(r.date) ?? []), r.title]);
    return m;
  }, [releases]);
  const h = hover !== null ? daily[hover] : null;

  return (
    <div className="dash-chart" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${METRICS[metric]} 일별 막대 그래프`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="dash-grid-line" />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" className="dash-axis">
              {nf.format(t)}
            </text>
          </g>
        ))}
        {daily.map((d, i) =>
          relByDate.has(d.date) ? (
            <line key={`r${d.date}`} x1={x(i) + bw / 2} x2={x(i) + bw / 2} y1={pad.t} y2={H - pad.b} className="dash-release-line" />
          ) : null
        )}
        {daily.map((d, i) => {
          const v = d[metric];
          const hgt = y(0) - y(v);
          const r = Math.min(4, bw / 2, hgt);
          return (
            <g key={d.date}>
              {v > 0 && (
                <path
                  d={`M${x(i)},${y(0)} V${y(v) + r} Q${x(i)},${y(v)} ${x(i) + r},${y(v)} H${x(i) + bw - r} Q${x(i) + bw},${y(v)} ${x(i) + bw},${y(v) + r} V${y(0)} Z`}
                  className={`dash-bar${hover === i ? " on" : ""}`}
                />
              )}
              {/* 막대보다 넓은 투명 영역으로 hover 판정 */}
              <rect
                x={pad.l + slot * i}
                y={pad.t}
                width={slot}
                height={H - pad.t - pad.b}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onTouchStart={() => setHover(i)}
              />
              {i % labelEvery === 0 && (
                <text x={x(i) + bw / 2} y={H - 6} textAnchor="middle" className="dash-axis">
                  {md(d.date)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {h && hover !== null && (
        <div
          className="dash-tooltip"
          style={{ left: `${((x(hover) + bw / 2) / W) * 100}%` }}
          role="status"
        >
          <b>{md(h.date)}</b> {METRICS[metric]} {nf.format(h[metric])}
          {relByDate.get(h.date)?.map((t) => (
            <span key={t} className="dash-tooltip-rel">
              🚀 {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function niceStep(max: number) {
  const raw = max / 4;
  const pow = 10 ** Math.floor(Math.log10(raw || 1));
  for (const m of [1, 2, 5, 10]) if (raw <= m * pow) return Math.max(1, m * pow);
  return Math.max(1, 10 * pow);
}

function DailyTable({ daily }: { daily: Day[] }) {
  return (
    <details className="dash-table-wrap">
      <summary>표로 보기</summary>
      <div className="dash-table-scroll">
        <table className="dash-table">
          <thead>
            <tr>
              <th>날짜</th>
              {(Object.keys(METRICS) as Metric[]).map((m) => (
                <th key={m}>{METRICS[m]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...daily].reverse().map((d) => (
              <tr key={d.date}>
                <td>{d.date}</td>
                {(Object.keys(METRICS) as Metric[]).map((m) => (
                  <td key={m}>{nf.format(d[m])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Funnel({ from, to, a, b }: { from: string; to: string; a: number; b: number }) {
  const pct = a > 0 ? Math.round((b / a) * 100) : null;
  return (
    <div className="dash-funnel">
      <span className="dash-funnel-pct">{pct === null ? "–" : `${pct}%`}</span>
      <span className="dash-funnel-label">
        {from} {nf.format(a)} → {to} {nf.format(b)}
      </span>
      <span className="dash-meter" aria-hidden>
        <span style={{ width: `${Math.min(100, pct ?? 0)}%` }} />
      </span>
    </div>
  );
}

function ReleaseTable({ releases }: { releases: Stats["releases"] }) {
  const cols: Metric[] = ["visitors", "reports", "opens", "directions"];
  return (
    <div className="dash-table-scroll">
      <table className="dash-table">
        <thead>
          <tr>
            <th>출시</th>
            {cols.map((m) => (
              <th key={m}>{METRICS[m]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {releases.map((r) => (
            <tr key={r.date + r.title}>
              <td className="dash-rel-title">
                <b>{md(r.date)}</b> {r.title}
                {r.daysAfter < 7 && <small> · 집계 중 {Math.max(0, r.daysAfter)}/7일</small>}
              </td>
              {cols.map((m) => {
                const d = delta(r.after[m], r.before[m]);
                return (
                  <td key={m}>
                    {nf.format(r.before[m])} → {nf.format(r.after[m])}
                    {(r.before[m] > 0 || r.after[m] > 0) && <span className={`dash-delta ${d.dir}`}> {d.text}</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Breakdown({
  title,
  rows,
  labels,
}: {
  title: string;
  rows: { key: string; count: number }[];
  labels?: Record<string, string>;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section className="card dash-card">
      <div className="dash-card-head">
        <h3>{title}</h3>
      </div>
      {rows.length === 0 ? (
        <p className="dash-empty">아직 데이터가 없어요</p>
      ) : (
        <ul className="dash-hbars">
          {rows.map((r) => (
            <li key={r.key} title={`${labels?.[r.key] ?? r.key}: ${nf.format(r.count)}`}>
              <span className="dash-hbar-label">{labels?.[r.key] ?? r.key}</span>
              <span className="dash-hbar-track">
                <span style={{ width: `${(r.count / max) * 100}%` }} />
              </span>
              <span className="dash-hbar-value">{nf.format(r.count)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Total({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div>
      <dt>
        {label}
        {sub && <small> · {sub}</small>}
      </dt>
      <dd>{nf.format(value)}</dd>
    </div>
  );
}
