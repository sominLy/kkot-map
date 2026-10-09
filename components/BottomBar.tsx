"use client";

import Icon, { type IconName } from "./Icon";

export type Tab = "map" | "info" | "rank" | "my";

const TABS: { id: Tab; icon: IconName; label: string }[] = [
  { id: "map", icon: "map", label: "지도" },
  { id: "info", icon: "book", label: "도감" },
  { id: "rank", icon: "trophy", label: "랭킹" },
  { id: "my", icon: "user", label: "마이" },
];

export default function BottomBar({
  tab,
  onTab,
  onReport,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  onReport: () => void;
}) {
  const button = (t: (typeof TABS)[number]) => (
    <button
      key={t.id}
      className={`tab${tab === t.id ? " on" : ""}`}
      onClick={() => onTab(t.id)}
      aria-current={tab === t.id ? "page" : undefined}
    >
      <Icon name={t.icon} size={24} stroke={tab === t.id ? 2.2 : 1.7} />
      {t.label}
    </button>
  );

  return (
    <nav className="tabbar glass">
      {TABS.slice(0, 2).map(button)}
      <button className="tab-report" onClick={onReport}>
        <span>
          <Icon name="plus" size={20} stroke={2.4} />
        </span>
        제보
      </button>
      {TABS.slice(2).map(button)}
    </nav>
  );
}
