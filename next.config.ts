import type { NextConfig } from "next";

// 기본 보안 헤더: 다른 사이트의 iframe에 넣지 못하게, MIME 추측 금지, 리퍼러 최소화,
// 위치는 이 사이트에서만, 카메라·마이크는 쓰지 않음
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(self), camera=(), microphone=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
