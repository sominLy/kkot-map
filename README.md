# 꽃맵 🌸

가슴속 삼천원·거지맵처럼 **사용자 제보로만** 채워지는 시즌 꽃 지도.
지금이 능소화 시즌이면 능소화가 핀 곳을, 장미 시즌이면 장미가 핀 곳을 서로 알려줍니다.
네이버 지도 기반 웹앱 (Next.js + Supabase).

## 프라이버시·안전 설계

- **얼굴 사진 차단**: 업로드 전 브라우저에서 face-api.js로 얼굴을 감지, 얼굴이 있으면 업로드 거부
- **EXIF 제거**: 캔버스 재인코딩으로 사진 속 GPS·촬영시각 메타데이터를 완전 삭제
- **좌표 뭉개기**: 핀 위치를 소수 4자리(~11m)로 반올림해 특정 주택 지목 방지
- **수정·삭제 불가 RLS**: 익명 사용자는 읽기+제보만 가능, 남의 제보를 조작할 수 없음
- **신고 기능**: 부적절한 제보는 신고 → `hidden` 처리로 숨김

## 시작하기

1. **네이버 지도 API**: [네이버클라우드 콘솔](https://console.ncloud.com) → Maps → Application 등록 → Web Dynamic Map 선택, 서비스 URL에 `http://localhost:3000` 추가 → Client ID 복사
2. **Supabase**: 프로젝트 생성 → SQL Editor에 `supabase/schema.sql` 실행 → Storage에서 `photos` 공개 버킷 생성
3. `.env.local`에 세 값 채우기
4. 실행:

```bash
npm run dev
```

## 시즌 바꾸기

Supabase 테이블 편집기에서 `seasons`에 새 꽃을 추가하고 `is_active`를 옮기면 됩니다.

```sql
update seasons set is_active = false;
insert into seasons (flower_name, emoji, is_active) values ('장미', '🌹', true);
```
