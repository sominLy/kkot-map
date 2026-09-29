"use client";

import { useState } from "react";
import {
  EVENT_KIND_LABEL,
  SEASON_EVENTS,
  eventRange,
  eventStatus,
  type SeasonEvent,
} from "@/lib/events";

const YEARS = [...new Set(SEASON_EVENTS.map((e) => e.start.slice(0, 4)))];

function statusLabel(e: SeasonEvent, now: Date): { text: string; cls: string } {
  const { status, d } = eventStatus(e, now);
  if (status === "ongoing") return { text: e.kind === "booking" && d === 0 ? "오늘" : "진행 중", cls: "live" };
  if (status === "upcoming") return { text: d === 0 ? "오늘" : `D-${d}`, cls: "soon" };
  return { text: "지남", cls: "done" };
}

/** 같은 이벤트의 작년 일정 (예측이 아니라 기록) */
function lastYear(e: SeasonEvent): SeasonEvent | undefined {
  const prev = String(Number(e.start.slice(0, 4)) - 1);
  return SEASON_EVENTS.find((x) => x.title === e.title && x.start.startsWith(prev));
}

export default function EventCalendar() {
  const [now] = useState(() => new Date());
  const thisYear = String(now.getFullYear());
  const [year, setYear] = useState(YEARS.includes(thisYear) ? thisYear : YEARS.at(-1)!);

  // 지금 진행 중이거나 60일 안에 시작하는 이벤트
  const live = SEASON_EVENTS.filter((e) => {
    const { status, d } = eventStatus(e, now);
    return status === "ongoing" || (status === "upcoming" && d <= 60);
  }).sort((a, b) => a.start.localeCompare(b.start));

  const months = new Map<number, SeasonEvent[]>();
  for (const e of SEASON_EVENTS.filter((x) => x.start.startsWith(year))) {
    const m = Number(e.start.slice(5, 7));
    months.set(m, [...(months.get(m) ?? []), e]);
  }

  return (
    <>
      <div className="section-title">
        <h2>시즌 이벤트 캘린더</h2>
        <span>2024.01 ~ 지금</span>
      </div>

      {live.length > 0 && (
        <div className="event-strip" role="list" aria-label="진행 중이거나 곧 열리는 이벤트">
          {live.map((e) => {
            const s = statusLabel(e, now);
            const prev = lastYear(e);
            return (
              <a
                key={`${e.title}-${e.start}`}
                role="listitem"
                className={`event-card ${s.cls}`}
                href={e.source.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="event-card-top">
                  <span className="event-emoji">{e.emoji}</span>
                  <span className={`event-badge ${s.cls}`}>{s.text}</span>
                </span>
                <b>{e.title}</b>
                <span className="event-when">{eventRange(e)}</span>
                <span className="event-where">{e.place}</span>
                {prev && <span className="event-prev">작년 {eventRange(prev)}</span>}
              </a>
            );
          })}
        </div>
      )}

      <div className="segmented years" role="tablist" aria-label="연도">
        {YEARS.map((y) => (
          <button
            key={y}
            role="tab"
            aria-selected={year === y}
            className={year === y ? "on" : ""}
            onClick={() => setYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <section className="card event-list" key={year}>
        {[...months.entries()].map(([m, events]) => (
          <div key={m} className="month-group">
            <p className="month-label">{m}월</p>
            <ul>
              {events.map((e) => {
                const s = statusLabel(e, now);
                return (
                  <li key={`${e.title}-${e.start}`} className={s.cls}>
                    <span className="event-emoji">{e.emoji}</span>
                    <span className="row-body">
                      <span className="event-title">
                        {e.title}
                        <span className={`kind ${e.kind}`}>{EVENT_KIND_LABEL[e.kind]}</span>
                      </span>
                      <span className="row-meta">
                        {eventRange(e)} · {e.place}
                        {e.note ? ` · ${e.note}` : ""}
                      </span>
                      <a href={e.source.url} target="_blank" rel="noreferrer noopener">
                        출처 · {e.source.label}
                      </a>
                    </span>
                    <span className={`event-badge ${s.cls}`}>{s.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
      <p className="disclaimer">
        일정은 각 출처의 공식 발표 기준이에요. 작년 일정은 참고용 기록이고, 올해 일정은 주최 측
        공지를 한 번 더 확인해 주세요.
      </p>
    </>
  );
}
