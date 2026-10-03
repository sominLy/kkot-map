// 이벤트를 휴대폰·구글 캘린더에 넣을 수 있는 .ics 파일로 내려받기 (하루 종일 일정)
import type { SeasonEvent } from "./events";

const ymd = (s: string) => s.replace(/-/g, "");

function nextDay(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + 1));
  return t.toISOString().slice(0, 10).replace(/-/g, "");
}

const esc = (s: string) => s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

export function downloadIcs(e: SeasonEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//kkot-map//season-events//KO",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${ymd(e.start)}-${encodeURIComponent(e.title)}@kkot-map`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${ymd(e.start)}`,
    `DTEND;VALUE=DATE:${nextDay(e.end ?? e.start)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.place)}`,
    `DESCRIPTION:${esc([e.note, `출처: ${e.source.url}`].filter(Boolean).join("\n"))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${e.title}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
