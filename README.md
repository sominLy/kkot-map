# 꽃맵 🌸

가슴속 삼천원·거지맵처럼 **사용자 제보로만** 채워지는 시즌 꽃 지도.
지금이 능소화 시즌이면 능소화가 핀 곳을, 단풍 시즌이면 단풍이 든 곳을 서로 알려줍니다.
네이버 지도 기반 웹앱 (Next.js + Supabase).

> 📌 최신 현황: [2026년 9월 말 기준 정리](docs/status-2026-09.md) — 지금 시즌은 🍁 단풍·은행

## 프라이버시·안전 설계

- **얼굴 사진 차단**: 업로드 전 브라우저에서 face-api.js로 얼굴을 감지, 얼굴이 있으면 업로드 거부
- **EXIF 제거**: 캔버스 재인코딩으로 사진 속 GPS·촬영시각 메타데이터를 완전 삭제
- **좌표 뭉개기**: 핀 위치를 소수 4자리(~11m)로 반올림해 특정 주택 지목 방지
- **수정·삭제 불가 RLS**: 익명 사용자는 읽기+제보만 가능, 남의 제보를 조작할 수 없음
- **신고 기능**: 부적절한 제보는 신고 → `hidden` 처리로 숨김
- **SNS 출처는 링크만**: 인스타그램 게시물의 사진·글은 가져오지 않고 원문 링크와 게시일만 저장. 게시자는 링크 삭제를 요청할 수 있음

## 시작하기

1. **네이버 지도 API**: [네이버클라우드 콘솔](https://console.ncloud.com) → Maps → Application 등록 → Web Dynamic Map 선택, 서비스 URL에 `http://localhost:3000` 추가 → Client ID 복사
2. **Supabase**: 프로젝트 생성 → SQL Editor에서 아래 순서로 실행 → Storage에서 `photos` 공개 버킷 생성
   1. `supabase/schema.sql`
   2. `supabase/RUN_ME.sql` (좋아요·방문, 전국 명소 333곳, SNS 화제 명소)
   3. `supabase/instagram-links.sql` (인스타 출처 링크)
   4. `supabase/autumn-2026.sql` (단풍 시즌 전환 + 인스타 단풍 명소)
3. `.env.local`에 `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 채우기
   - Vercel에서는 Production뿐 아니라 **Preview**에도 같은 변수를 넣어야 브랜치 미리보기에서 데이터가 보여요. 없으면 화면만 뜨고 제보는 비어 보입니다.
4. 실행:

```bash
npm run dev
```

## 시즌 바꾸기

앱이 날짜를 보고 그달 제철 시즌을 자동으로 고릅니다(10~11월 단풍·은행, 3~4월 벚꽃 등, `lib/theme.ts`의 `pickActiveSeason`). DB의 `is_active` 시즌이 지금 철이면 그걸 우선합니다. 직접 지정하려면:

Supabase 테이블 편집기에서 `seasons`의 `is_active`를 옮기면 됩니다.

```sql
update seasons set is_active = (flower_name = '단풍·은행');
```

보고 있는 시즌에 따라 앱의 테마 색과 문구가 바뀝니다 (`lib/theme.ts`). 단풍 시즌에는 "물드는 중 · 절정 · 낙엽 졌어요"로 표시돼요.

## 인스타그램 명소 추가하기

`seed/instagram-autumn.mjs`의 후보 목록에 게시물 URL을 넣고 실행하면 SQL이 다시 만들어집니다.

```bash
node seed/instagram-autumn.mjs   # → supabase/autumn-2026.sql
```

- 게시일은 인스타 shortcode에서 계산합니다(로그인·접속 불필요).
- 기간 필터: 2025년은 10월 게시물, 2026년은 9월 21일 이후 게시물만 사용합니다.

## 콘텐츠

- **24절기** (`lib/content.ts`): 절기마다 한자·이름 풀이·제철 음식·해보면 좋은 일·속담. 음식·할 일·속담은 2024년 이후 게시된 자료에서만 모았고 절기마다 출처 링크가 있습니다.
- **2026 단풍 달력**: 산림청 단풍절정 예측지도(9/22 발표), 기상청 첫 단풍 관측.
- **시즌 이벤트 캘린더** (`lib/events.ts`): 2024년 1월부터의 예약 오픈(화담숲 등)·꽃 축제·한정 개방 일정. 이벤트마다 출처 링크가 있고, 작년 일정과 비교해 볼 수 있어요.
