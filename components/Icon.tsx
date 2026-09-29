// 앱 크롬(탭·버튼)용 선 아이콘. 꽃 자체는 이모지로, 도구는 아이콘으로 구분한다.

const PATHS = {
  map: "M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 7.5 9 4Zm0 0v13m6-9.5v12",
  book: "M4 19V5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h14v-3M9 7h7",
  plus: "M12 5v14M5 12h14",
  trophy: "M8 4h8v4a4 4 0 0 1-8 0V4Zm8 1h3v1a3 3 0 0 1-3 3M8 5H5v1a3 3 0 0 0 3 3m4 3v4m-4 4h8m-6-4h4v4h-4z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  locate: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v3m0 14v3M2 12h3m14 0h3",
  chevronDown: "m6 9 6 6 6-6",
  chevronRight: "m9 6 6 6-6 6",
  close: "M6 6l12 12M18 6 6 18",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  pin: "M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  camera: "M4 8h3l2-3h6l2 3h3v11H4V8Zm8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  external: "M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  flag: "M5 21V4m0 0h11l-2 4 2 4H5",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15m-1-1 8-8",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  size = 22,
  stroke = 1.8,
  className,
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
