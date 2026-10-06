// 대시보드 집계 (서버에서만 사용). 날짜는 한국 시간 기준 하루 단위로 묶는다.

import { RELEASES } from "./releases";

export type StatReport = {
  id: number;
  season_id: number;
  memo: string;
  photo_url: string | null;
  source_url: string | null;
  status?: string | null;
  hidden: boolean;
  likes?: number;
  visits?: number;
  fresh_votes: number;
  faded_votes: number;
  created_at: string;
};

export type StatEvent = { kind: string; report_id: number | null; label: string | null; created_at: string };

export const METRICS = {
  visitors: "방문자",
  reports: "사용자 제보",
  photoReports: "사진 제보",
  reportStarts: "제보 시작",
  opens: "명소 열람",
  directions: "길찾기",
  shares: "공유",
} as const;
export type Metric = keyof typeof METRICS;
export type Day = { date: string } & Record<Metric, number>;
type Count = { key: string; count: number };

const KST = 9 * 3600e3;
export const kstDate = (iso: string) => new Date(new Date(iso).getTime() + KST).toISOString().slice(0, 10);
const addDays = (date: string, n: number) =>
  new Date(Date.parse(`${date}T00:00:00Z`) + n * 86400e3).toISOString().slice(0, 10);

/** 운영자·SNS 시드("이름 — 설명")가 아닌 실제 사용자 제보 */
export const isUserReport = (r: StatReport) => !r.source_url && !r.memo.includes(" — ");

const EVENT_METRIC: Record<string, Metric> = {
  app_open: "visitors",
  report_start: "reportStarts",
  open_report: "opens",
  directions: "directions",
  share: "shares",
};

function emptyDay(date: string): Day {
  return { date, visitors: 0, reports: 0, photoReports: 0, reportStarts: 0, opens: 0, directions: 0, shares: 0 };
}

/** from~to(포함) 날짜별 지표 */
function dailySeries(reports: StatReport[], events: StatEvent[], from: string, to: string): Day[] {
  const days = new Map<string, Day>();
  for (let d = from; d <= to; d = addDays(d, 1)) days.set(d, emptyDay(d));
  for (const r of reports) {
    if (!isUserReport(r)) continue;
    const day = days.get(kstDate(r.created_at));
    if (!day) continue;
    day.reports++;
    if (r.photo_url || r.status === "pending" || r.status === "rejected") day.photoReports++;
  }
  for (const e of events) {
    const m = EVENT_METRIC[e.kind];
    const day = m && days.get(kstDate(e.created_at));
    if (day) day[m]++;
  }
  return [...days.values()];
}

function sum(days: Day[]): Record<Metric, number> {
  const out = emptyDay("");
  for (const d of days) for (const k of Object.keys(METRICS) as Metric[]) out[k] += d[k];
  const { date: _, ...rest } = out;
  return rest;
}

function countBy(items: (string | null | undefined)[], limit = 8): Count[] {
  const m = new Map<string, number>();
  for (const k of items) if (k) m.set(k, (m.get(k) ?? 0) + 1);
  return [...m.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function buildStats(opts: {
  reports: StatReport[];
  events: StatEvent[];
  seasons: { id: number; flower_name: string; emoji: string }[];
  flags: number;
  analyticsReady: boolean;
  days: number;
  now?: Date;
}) {
  const { reports, events, seasons, days } = opts;
  const today = kstDate((opts.now ?? new Date()).toISOString());
  const from = addDays(today, -(days - 1));
  const prevFrom = addDays(from, -days);
  const prevTo = addDays(from, -1);

  const daily = dailySeries(reports, events, from, today);
  const prevDaily = dailySeries(reports, events, prevFrom, prevTo);

  const inRange = (iso: string) => {
    const d = kstDate(iso);
    return d >= from && d <= today;
  };
  const rangeEvents = events.filter((e) => inRange(e.created_at));
  const labels = (kind: string) => rangeEvents.filter((e) => e.kind === kind).map((e) => e.label);
  const seasonName = (id: number) => {
    const s = seasons.find((x) => x.id === id);
    return s ? `${s.emoji} ${s.flower_name}` : `시즌 ${id}`;
  };
  const title = (id: number) => {
    const r = reports.find((x) => x.id === id);
    return r ? r.memo.split("—")[0].trim() || `제보 #${id}` : `제보 #${id}`;
  };

  const user = reports.filter(isUserReport);
  const visible = reports.filter((r) => !r.hidden && (r.status ?? "approved") === "approved");

  // 기능 출시 전후 7일의 하루 평균 비교 (출시일 당일은 '후'에 포함, 아직 7일이 안 됐으면 지난 날만)
  const avg = (days: Day[]) => {
    const s = sum(days);
    for (const k of Object.keys(s) as Metric[]) s[k] = Math.round((s[k] / Math.max(1, days.length)) * 10) / 10;
    return s;
  };
  const releases = RELEASES.map((rel) => {
    const before = avg(dailySeries(reports, events, addDays(rel.date, -7), addDays(rel.date, -1)));
    const afterTo = addDays(rel.date, 6);
    const afterDays = rel.date <= today ? dailySeries(reports, events, rel.date, afterTo < today ? afterTo : today) : [];
    return { ...rel, before, after: avg(afterDays), daysAfter: afterDays.length };
  });

  return {
    range: { days, from, to: today },
    analyticsReady: opts.analyticsReady,
    daily,
    totals: { cur: sum(daily), prev: sum(prevDaily) },
    allTime: {
      userReports: user.length,
      photoReports: user.filter((r) => r.photo_url || r.status === "pending" || r.status === "rejected").length,
      spots: visible.length,
      likes: visible.reduce((a, r) => a + (r.likes ?? 0), 0),
      visits: visible.reduce((a, r) => a + (r.visits ?? 0), 0),
      votes: visible.reduce((a, r) => a + r.fresh_votes + r.faded_votes, 0),
      flags: opts.flags,
    },
    moderation: {
      pending: reports.filter((r) => r.status === "pending" && !r.hidden).length,
      hidden: reports.filter((r) => r.hidden).length,
      rejected: reports.filter((r) => r.status === "rejected").length,
    },
    breakdowns: {
      tabs: countBy(labels("tab")),
      filters: countBy(labels("filter")),
      referrers: countBy(labels("app_open")),
      seasonSwitch: countBy(labels("season_switch")),
      calendar: countBy(labels("calendar_add"), 6),
      cardShares: countBy(labels("card_share"), 6),
      locate: labels("locate").length,
      topSpots: countBy(
        rangeEvents.filter((e) => e.kind === "open_report" && e.report_id).map((e) => String(e.report_id)),
        10
      ).map((c) => ({ key: title(Number(c.key)), count: c.count })),
      reportSeasons: countBy(
        user.filter((r) => inRange(r.created_at)).map((r) => seasonName(r.season_id)),
        8
      ),
    },
    releases,
  };
}

export type Stats = ReturnType<typeof buildStats>;
