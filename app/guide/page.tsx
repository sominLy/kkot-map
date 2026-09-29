import type { Metadata } from "next";
import Link from "next/link";
import InfoTab from "@/components/InfoTab";
import JsonLd from "@/components/JsonLd";
import { SEASON_EVENTS, eventStatus } from "@/lib/events";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// 절기·D-day가 날짜에 따라 바뀌므로 한 시간마다 다시 만든다
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "2026 단풍 시기·가을 축제 캘린더·24절기 제철 음식",
  description:
    "산림청 예측 기준 2026 단풍 절정 시기, 화담숲 가을 예약·억새·코스모스 축제 일정, 24절기별 제철 음식과 해보면 좋은 일을 한 페이지에서.",
  alternates: { canonical: "/guide" },
  openGraph: { url: "/guide", title: "2026 단풍 시기·가을 축제 캘린더 | 꽃맵" },
};

export default function GuidePage() {
  const now = new Date();
  // 지난 이벤트는 빼고, 진행 중이거나 다가오는 이벤트만 구조화 데이터로
  const events = SEASON_EVENTS.filter((e) => eventStatus(e, now).status !== "past");

  return (
    <>
      <InfoTab />
      <Link href="/" className="guide-back glass">
        ← 지도에서 보기
      </Link>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "꽃도감", item: `${SITE_URL}/guide` },
              ],
            },
            ...events.map((e) => ({
              "@type": "Event",
              name: e.title,
              startDate: e.start,
              ...(e.end ? { endDate: e.end } : {}),
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: { "@type": "Place", name: e.place, address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: e.place } },
              ...(e.note ? { description: e.note } : {}),
              url: `${SITE_URL}/guide`,
            })),
          ],
        }}
      />
    </>
  );
}
