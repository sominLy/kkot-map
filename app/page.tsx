import FlowerMap from "@/components/FlowerMap";
import JsonLd from "@/components/JsonLd";
import { SITE_DESC, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">꽃맵 — 전국 꽃·단풍 명소 지도</h1>
      <FlowerMap />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "ko-KR", description: SITE_DESC },
            {
              "@type": "WebApplication",
              name: SITE_NAME,
              url: SITE_URL,
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              inLanguage: "ko-KR",
              description: SITE_DESC,
              offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
            },
          ],
        }}
      />
    </>
  );
}
