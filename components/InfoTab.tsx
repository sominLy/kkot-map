"use client";

import { FLOWER_SEASONS, getCurrentTerm } from "@/lib/content";

export default function InfoTab() {
  const { current, next } = getCurrentTerm();

  return (
    <div className="sheet">
      <div className="term-card">
        <p className="term-label">지금 절기는</p>
        <h2 className="term-name">{current.name}</h2>
        <p className="term-desc">{current.desc}</p>
        <div className="term-foods">
          <span className="foods-label">🍽️ 요즘 제철</span>
          {current.foods.map((f) => (
            <span key={f} className="food-chip">
              {f}
            </span>
          ))}
        </div>
        <p className="term-next">
          다음 절기는 {next.month}월 {next.day}일쯤 「{next.name}」
        </p>
      </div>

      <h3 className="section-title">🗓️ 시즌별 꽃 도감</h3>
      {FLOWER_SEASONS.map((s) => (
        <div key={s.period} className="season-card">
          <p className="season-period">{s.period}</p>
          <ul>
            {s.flowers.map((f) => (
              <li key={f.name}>
                <span className="flower-name">
                  {f.emoji} {f.name}
                </span>
                {f.spots && <span className="flower-spots">{f.spots}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="disclaimer">
        절기 날짜는 해마다 하루 정도 차이가 날 수 있어요. 개화 시기는 지역·날씨에
        따라 달라요 — 그래서 서로의 제보가 필요하답니다 🌸
      </p>
    </div>
  );
}
