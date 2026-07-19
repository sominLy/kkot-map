"use client";

export type Tab = "map" | "info" | "my";

export default function BottomBar({
  tab,
  onTab,
  onReport,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  onReport: () => void;
}) {
  return (
    <nav className="bottom-bar">
      <button className={tab === "map" ? "on" : ""} onClick={() => onTab("map")}>
        🗺️<span>지도</span>
      </button>
      <button className={tab === "info" ? "on" : ""} onClick={() => onTab("info")}>
        📖<span>꽃도감</span>
      </button>
      <button className="report-tab" onClick={onReport}>
        📍<span>제보하기</span>
      </button>
      <button className={tab === "my" ? "on" : ""} onClick={() => onTab("my")}>
        🙋<span>마이</span>
      </button>
    </nav>
  );
}
