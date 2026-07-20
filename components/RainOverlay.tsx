"use client";

import { useEffect, useState } from "react";

// Open-Meteo 날씨 코드 중 비/소나기/뇌우
const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);

type Drop = { left: number; delay: number; duration: number; opacity: number };

export default function RainOverlay({ lat, lng }: { lat: number; lng: number }) {
  const [raining, setRaining] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=precipitation,weather_code`
    )
      .then((r) => r.json())
      .then((d) => {
        const code = d?.current?.weather_code;
        const precip = d?.current?.precipitation ?? 0;
        if (precip > 0 || RAIN_CODES.has(code)) {
          setRaining(true);
          setDrops(
            Array.from({ length: 60 }, () => ({
              left: Math.random() * 100,
              delay: Math.random() * 2,
              duration: 0.6 + Math.random() * 0.7,
              opacity: 0.25 + Math.random() * 0.4,
            }))
          );
        }
      })
      .catch(() => {});
  }, [lat, lng]);

  if (!raining) return null;

  return (
    <>
      <div className="rain-overlay" aria-hidden>
        {drops.map((d, i) => (
          <span
            key={i}
            className="rain-drop"
            style={{
              left: `${d.left}%`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>
      <div className="rain-bubble">🌧️ 꽃들이 비를 마시고 있어요~</div>
    </>
  );
}
