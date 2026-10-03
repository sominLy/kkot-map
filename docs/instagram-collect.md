# 인스타 사진 계정 단풍 게시물 수집 가이드

꽃맵의 단풍 명소에 **인스타그램 게시물 원문 링크**를 붙이는 작업이에요.
클라우드 세션에서는 인스타그램 접속이 막혀 있어서, **내 컴퓨터에서 실행하는 Claude**(Claude Code 데스크톱 앱·터미널, 또는 Claude in Chrome)로 진행합니다.
로그인은 내가 직접 하고, Claude는 브라우저 화면을 같이 보면서 링크만 모아요.

---

## 0. 준비 (처음 한 번)

1. 내 컴퓨터에 저장소 받기
   ```bash
   git clone https://github.com/sominLy/kkot-map.git
   cd kkot-map
   git checkout -b ig-foliage-links origin/main
   ```
2. Node.js 20 이상이 있어야 해요 (`node -v`로 확인).
3. 브라우저 준비 (둘 중 하나)
   - **Claude in Chrome 확장**: 평소 쓰는 크롬에서 instagram.com에 로그인해 둔 상태로 시작
   - **Claude Code + 브라우저 도구**(예: Playwright MCP): Claude가 창을 띄우면 그 창에서 내가 직접 로그인
4. 비밀번호·인증코드는 **Claude에게 말하지 말고 창에 직접 입력**하세요.

---

## 1. 규칙 (Claude에게도 그대로 전달됨)

| 항목 | 기준 |
|---|---|
| 출처 | 인스타그램 게시물(`/p/` 또는 `/reel/`)만. 블로그·기사·커뮤니티 X |
| 계정 | 팔로워 **5,000명 이상** (프로필에서 숫자 확인) |
| 기간 | 2025년 게시물은 **10월 1~31일**, 2026년 게시물은 **9월 21일 이후** |
| 내용 | 게시물이 특정 단풍·은행 **장소**를 알려주는 것 (장소가 불분명하면 제외) |
| 저작권 | 사진·캡션은 저장하지 않음. 링크와 계정 정보만. 설명은 **직접 쓴 한 줄** |
| 속도 | 계정당 게시물 10~15개 정도만 훑기. 빠른 연속 클릭·자동 스크롤 반복 금지 (계정 잠김 방지) |
| 좋아요·팔로우·댓글·DM | **절대 하지 않음** (읽기만) |

게시일은 URL에서 자동 계산되니 화면의 날짜를 따로 적을 필요는 없어요.

---

## 2. 시작할 계정

2026-10-03 기준 팔로워 5천 이상 확인된 사진 계정이에요. 여기서 시작하고, 게시물에 태그된 다른 사진 계정도 조건만 맞으면 추가해도 돼요.

| 계정 | 팔로워 |
|---|---|
| [@foto_ycy](https://www.instagram.com/foto_ycy/) | 41.3만 |
| [@soorakal](https://www.instagram.com/soorakal/) | 20.5만 |
| [@tour.toctoc](https://www.instagram.com/tour.toctoc/) | 18.2만 |
| [@siniple](https://www.instagram.com/siniple/) | 15.7만 |
| [@bigg_jun](https://www.instagram.com/bigg_jun/) | 14만 |
| [@travel_dongri](https://www.instagram.com/travel_dongri/) | 8.3만 |
| [@photographer_kimjoowon](https://www.instagram.com/photographer_kimjoowon/) | 8.2만 |
| [@colorny](https://www.instagram.com/colorny/) | 6.7만 |
| [@mongle_jyh](https://www.instagram.com/mongle_jyh/) | 6.3만 |
| [@ryuppeum](https://www.instagram.com/ryuppeum/) | 4.4만 |
| [@bella__story](https://www.instagram.com/bella__story/) | 1.6만 |
| [@hwanygallery](https://www.instagram.com/hwanygallery/) | 1만 |

팔로워 수는 수집할 때 프로필에서 **다시 확인한 숫자**를 적어요.

---

## 3. 결과 형식 — `seed/instagram-collected.json`

```json
{
  "_설명": "...",
  "posts": [
    {
      "url": "https://www.instagram.com/p/DQLXy-pk0W_/",
      "account": "siniple",
      "followers": 157000,
      "checkedAt": "2026-10-05",
      "spot": "광주 곤지암 화담숲",
      "lat": 37.341,
      "lng": 127.293,
      "desc": "곤지암 산자락을 따라 조성된 단풍 수목원"
    }
  ]
}
```

- `url`: 게시물 주소. `?igsh=...` 같은 뒷부분은 빼고 `https://www.instagram.com/p/코드/` 형태로
- `account`: `@` 없이 아이디만. **게시물을 올린 계정**이어야 해요 (리그램·협업이면 실제 작성자)
- `followers`: 프로필에서 본 숫자를 정수로 (15.7만 → 157000)
- `checkedAt`: 확인한 날짜
- `spot`: 명소 이름. **이미 지도에 있는 곳이면 아래 이름을 그대로** 써야 같은 핀에 붙어요
- `lat`, `lng`: 명소 대표 좌표 (네이버·카카오 지도에서 장소 검색 후 좌표). 기존 명소면 아래 값을 그대로
- `desc`: 직접 쓴 40자 이내 한 줄 설명. 캡션 문장·해시태그 복사 금지

### 이미 지도에 있는 명소 (이름·좌표 그대로 쓰기)

| spot | lat | lng |
|---|---|---|
| 광주 곤지암 화담숲 | 37.341 | 127.293 |
| 원주 반계리 은행나무 | 37.353 | 127.8445 |
| 괴산 문광저수지 은행나무길 | 36.79 | 127.745 |
| 아산 곡교천 은행나무길 | 36.783 | 126.98 |
| 경주 도리마을 은행나무숲 | 35.874 | 129.06 |
| 홍천 은행나무숲 | 37.842 | 128.326 |
| 가평 남이섬 메타세쿼이아 은행길 | 37.79 | 127.525 |
| 가평 아침고요수목원 | 37.7437 | 127.3525 |
| 평창 오대산 월정사 전나무숲 | 37.7317 | 128.5925 |
| 설악산 단풍 | 38.119 | 128.465 |
| 설악산 천불동계곡 | 38.163 | 128.472 |
| 설악산 토왕성폭포 | 38.158 | 128.5 |
| 주왕산 단풍 | 36.393 | 129.165 |
| 내장산 단풍 | 35.498 | 126.888 |
| 장성 백양사 | 35.441 | 126.883 |
| 대둔산 단풍 | 36.123 | 127.323 |
| 담양 메타세쿼이아길 | 35.324 | 126.991 |
| 서울 올림픽공원 | 37.5215 | 127.1213 |
| 대전 한밭수목원 | 36.3672 | 127.3881 |
| 대구 팔공산 단풍 | 35.975 | 128.697 |

---

## 4. 검사 → 반영 → SQL 만들기

```bash
node seed/ig-check.mjs            # 게시물마다 ✓/✗와 탈락 이유
node seed/ig-check.mjs --apply    # 통과한 것만 lib/instagram-verified.json에 추가
node seed/instagram-autumn.mjs    # supabase/autumn-2026.sql 다시 생성
npx tsc --noEmit && npm run build # 앱이 깨지지 않았는지
```

`instagram-autumn.mjs` 출력의 `✓ 날짜 명소` 줄이 지도에 링크가 붙는 곳이에요.

그다음 커밋·푸시하고 PR을 열면, 클라우드 세션의 Claude가 이어서 검토·배포할 수 있어요.
배포 후 **Supabase SQL Editor에서 `supabase/autumn-2026.sql`을 한 번 실행**하면 지도에 링크가 보여요.

---

## 5. Claude에게 붙여 넣을 프롬프트

아래를 통째로 복사해서 **내 컴퓨터의 Claude**에게 주세요 (저장소 폴더에서 실행).

````text
꽃맵(kkot-map) 저장소에서 작업해줘. docs/instagram-collect.md를 먼저 끝까지 읽고 그 규칙을 그대로 따라.

목표: 인스타그램 사진 계정들이 올린 "단풍·은행 명소" 게시물 링크를 모아서
seed/instagram-collected.json의 posts에 채우는 것.

진행 방식:
1. 브라우저를 열고 https://www.instagram.com/ 로 가. 로그인 화면이 나오면 멈추고
   "로그인해 주세요"라고 말한 뒤 기다려. 비밀번호·인증코드는 절대 묻지 말고, 내가 창에 직접 입력할게.
   로그인 완료라고 하면 이어서 해.
2. 가이드 2번 표의 계정을 위에서부터 하나씩 열어. 각 계정마다:
   a. 프로필 화면의 팔로워 수를 읽어서 정수로 기록해. 5,000 미만이면 그 계정은 건너뛰어.
   b. 게시물 그리드에서 단풍·은행·가을 풍경으로 보이는 게시물만 열어봐. 계정당 최대 15개.
   c. 열어본 게시물에서 장소가 분명한 것만 골라(캡션의 장소명, 위치 태그). 장소가 애매하면 버려.
   d. 주소창의 URL을 https://www.instagram.com/p/코드/ 형태로 정리해(쿼리스트링 제거).
      릴스면 /reel/코드/ 그대로 써도 돼.
   e. 게시일 기간은 터미널에서 확인해:
      node -e 'import("./seed/ig-date.mjs").then(m=>console.log(m.postedDate(process.argv[1]), m.inWindow(m.postedDate(process.argv[1]))))' "URL"
      false면 버려. (2025년은 10월, 2026년은 9월 21일 이후만)
   f. 게시물 작성자가 그 계정인지 확인해. 협업 게시물이면 실제 작성자 계정과 그 팔로워 수를 써.
3. 장소 이름·좌표:
   - 가이드의 "이미 지도에 있는 명소" 표에 있는 곳이면 spot/lat/lng를 표 그대로 써.
   - 새 장소면 "지역 + 장소명"으로 이름을 짓고(예: "청송 주산지"), 네이버·카카오 지도에서
     좌표를 찾아 소수 4자리까지 써.
4. desc는 장소를 설명하는 한 줄을 네 말로 써(40자 이내). 캡션 문장·해시태그·이모지 복사 금지.
5. 화면 속 사진은 저장·다운로드·스크린샷하지 마. 캡션도 파일에 남기지 마. 링크와 계정 정보만.
6. 좋아요·팔로우·댓글·저장·DM은 절대 누르지 마. 페이지 이동 사이에 몇 초씩 쉬어.
   "잠시 후 다시 시도" 같은 제한 화면이 뜨면 즉시 멈추고 나에게 알려.
7. 다 모았으면:
   node seed/ig-check.mjs
   → ✗ 항목은 고치거나 지워. 전부 ✓가 될 때까지.
   node seed/ig-check.mjs --apply
   node seed/instagram-autumn.mjs
   npx tsc --noEmit && npm run build
8. 결과를 표로 보여줘: 명소 | 게시일 | 계정(팔로워) | 링크.
   그리고 버린 게시물 수와 이유를 요약해.
9. 내가 확인하면 ig-foliage-links 브랜치에 커밋하고 푸시한 뒤 main으로 PR을 만들어.
   커밋에는 seed/instagram-collected.json, lib/instagram-verified.json, supabase/autumn-2026.sql만 넣어.

모르는 게 있거나 규칙에 안 맞는 경우가 애매하면 추측하지 말고 나한테 물어봐.
````

---

## 6. 클라우드 세션으로 돌아와서

PR 링크를 주면서 "인스타 단풍 링크 PR 확인하고 배포해줘"라고 하면 돼요.
클라우드 쪽 Claude가 `node seed/ig-check.mjs`로 다시 검사하고, 빌드 확인 후 배포·SQL 안내까지 이어서 합니다.
