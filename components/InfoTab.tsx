"use client";

import { useState } from "react";
import {
  FLOWER_SEASONS,
  FOLIAGE_2026,
  SOLAR_TERMS,
  TERM_SEASONS,
  dday,
  flowersAround,
  getCurrentTerm,
  isCurrentPeriod,
  type SolarTerm,
} from "@/lib/content";
import Icon from "./Icon";
import EventCalendar from "./EventCalendar";

const md = (date: string) => date.slice(5).replace("-", ".");
const MONTH_EMOJI = ["❄️", "❄️", "🌸", "🌸", "🌸", "🌻", "🌻", "🌻", "🍁", "🍁", "🍁", "❄️"];

/** 절기 하나의 제철 음식·할 일·속담·출처 */
function TermDetail({ term }: { term: SolarTerm }) {
  const flowers = flowersAround(term);
  return (
    <div className="term-detail">
      <div>
        <p className="field-label">제철 음식</p>
        <div className="chips">
          {term.foods.map((f) => (
            <span key={f} className="chip">
              {f}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="field-label">해보면 좋은 일</p>
        <ul className="todo">
          {term.todo.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      {term.saying && <blockquote className="saying">“{term.saying}”</blockquote>}
      {flowers.length > 0 && (
        <p className="term-flowers">
          <b>이 무렵 꽃</b> {flowers.map((f) => `${f.emoji} ${f.name}`).join("  ")}
        </p>
      )}
      <p className="term-sources">
        출처
        {term.sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer noopener">
            {s.label}
          </a>
        ))}
      </p>
    </div>
  );
}

export default function InfoTab() {
  // useState 초기화 함수로 첫 렌더부터 값이 채워지도록 (null 깜빡임 없음)
  const [now] = useState(() => new Date());
  const [{ current, next, daysLeft, progress }] = useState(() => getCurrentTerm(now));
  const [seasonTab, setSeasonTab] = useState(
    () => TERM_SEASONS.find((s) => s.terms.includes(current.name))?.name ?? "봄"
  );
  const nextIdx = FOLIAGE_2026.events.findIndex((e) => dday(e.date, now) >= 0);
  const seasonTerms = TERM_SEASONS.find((s) => s.name === seasonTab)!.terms.map(
    (n) => SOLAR_TERMS.find((t) => t.name === n)!
  );

  return (
    <div className="page">
      <div className="page-inner">
        <header className="page-head">
          <p className="eyebrow">Season guide</p>
          <h1>꽃도감</h1>
          <p>절기와 제철, 그리고 지금 어디가 물들고 있는지.</p>
        </header>

        <section className="hero-card">
          <p className="eyebrow">
            지금 절기 · {current.month}월 {current.day}일부터
          </p>
          <h2 className="hero-title">
            {current.name} <span className="hanja">{current.hanja}</span>
          </h2>
          <p className="term-meaning">{current.meaning}</p>
          <p className="hero-desc">{current.desc}</p>

          <div className="term-progress">
            <span className="progress">
              <span className="progress-fill" style={{ width: `${progress * 100}%` }} />
            </span>
            <span className="progress-label">
              <span>{current.name}</span>
              <span>
                「{next.name}」까지 {daysLeft}일 · {next.month}월 {next.day}일쯤
              </span>
            </span>
          </div>

          <TermDetail term={current} />
          <span className="hero-emoji" aria-hidden>
            {MONTH_EMOJI[now.getMonth()]}
          </span>
        </section>

        <EventCalendar />

        <div className="section-title">
          <h2>2026 단풍 달력</h2>
          <span>{md(FOLIAGE_2026.updated)} 기준</span>
        </div>
        <section className="card">
          <ol className="timeline">
            {FOLIAGE_2026.events.map((e, i) => {
              const d = dday(e.date, now);
              return (
                <li
                  key={`${e.place}-${e.kind}`}
                  className={d < 0 ? "past" : i === nextIdx ? "next" : ""}
                >
                  <span className="tl-date">{md(e.date)}</span>
                  <span className="tl-place">
                    {e.place} {e.kind === "first" ? "첫 단풍" : "절정"}
                    <small>
                      {e.kind === "first" ? "관측" : "예상"}
                      {e.note ? ` · ${e.note}` : ""}
                    </small>
                  </span>
                  <span className="tl-d">
                    {d < 0 ? (e.kind === "first" ? "관측" : "지남") : d === 0 ? "오늘" : `D-${d}`}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="card-foot">
            출처: {FOLIAGE_2026.source}. 첫 단풍은 산 전체의 약 20%가 물든 때를 말해요.
          </p>
        </section>

        <div className="section-title">
          <h2>24절기 한눈에</h2>
          <span>2024년 이후 자료 기준</span>
        </div>
        <section className="card term-intro">
          <p>
            24절기는 해가 하늘을 한 바퀴 도는 길(황도)을 15°씩 스물넷으로 나눈 계절 달력이에요.
            해의 위치로 정하기 때문에 양력 날짜가 해마다 거의 같아요(±1일). 봄·여름·가을·겨울에
            여섯 개씩 들고, 이름에는 그 무렵의 날씨와 농사가 담겨 있어요.
          </p>
          <p>
            다만 중국 화북 지방의 기후를 기준으로 만들어져서 우리나라 실제 날씨와는 조금 차이가
            나요.
          </p>
        </section>

        <div className="segmented four" role="tablist" aria-label="계절">
          {TERM_SEASONS.map((s) => (
            <button
              key={s.name}
              role="tab"
              aria-selected={seasonTab === s.name}
              className={seasonTab === s.name ? "on" : ""}
              onClick={() => setSeasonTab(s.name)}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        <section className="card term-list" key={seasonTab}>
          {seasonTerms.map((t) => {
            const isNow = t.name === current.name;
            return (
              <details key={t.name} open={isNow} className={isNow ? "now" : ""}>
                <summary>
                  <span className="tl-date">
                    {t.month}.{String(t.day).padStart(2, "0")}
                  </span>
                  <span className="tl-place">
                    <span>
                      {t.name} <span className="hanja">{t.hanja}</span>
                      {isNow && <span className="now-tag">NOW</span>}
                    </span>
                    <small>{t.desc}</small>
                  </span>
                  <Icon name="chevronDown" size={18} className="term-caret" />
                </summary>
                <div className="term-body">
                  <p className="term-meaning">
                    {t.meaning} · 태양 황경 {t.longitude}°
                  </p>
                  <TermDetail term={t} />
                </div>
              </details>
            );
          })}
        </section>

        <div className="section-title">
          <h2>시즌별 꽃 도감</h2>
          <span>명소는 예시예요</span>
        </div>
        <section className="card">
          {FLOWER_SEASONS.map((s) => {
            const isNow = isCurrentPeriod(s.period, now);
            return (
              <div key={s.period} className={`guide-row${isNow ? " now" : ""}`}>
                <div className="guide-period">
                  {s.period.replace(/\s/g, "")}
                  {isNow && <span className="now-tag">NOW</span>}
                </div>
                <ul>
                  {s.flowers.map((f) => (
                    <li key={f.name}>
                      <span>
                        {f.emoji} {f.name}
                      </span>
                      {f.spots && <small>{f.spots}</small>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <p className="disclaimer">
          절기 날짜는 해마다 하루 정도 차이가 날 수 있어요. 제철 음식과 풍습은 2024년 이후 게시된
          기사·글에서 모았고, 절기마다 출처를 남겼어요. 개화와 단풍 시기는 지역·날씨에 따라
          달라서 서로의 제보가 필요해요.
        </p>
      </div>
    </div>
  );
}
