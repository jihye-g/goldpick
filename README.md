# 골드픽 (goldpick)

내 주변 귀금속샵을 찾고 시세·후기를 확인하는 위치기반 서비스의 웹 프론트엔드입니다.
서비스 정책·화면 정의·PRD는 [`docs/index.md`](./docs/index.md)에서 시작합니다.

## 기술 스택

- Next.js 16 (App Router, `cacheComponents`) · React 19 · TypeScript
- Supabase (`@supabase/ssr`) — 인증·DB
- TanStack React Query — 서버 데이터, Zustand — 클라이언트 전역 상태
- React Hook Form + Zod — 폼
- Tailwind CSS v4 + shadcn/ui(base-ui) — 스타일·UI, sonner — 토스트

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
```

| 환경변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(publishable) 키 |
| `NEXT_PUBLIC_API_URL` | 외부 API 서버 주소 (기본 `http://localhost:8000`) |

그 밖의 명령어: `npm run build`, `npm run start`, `npm run lint`

## 구현된 기능

### 커뮤니티 (`/community`)
- 게시글 목록: 카테고리 칩 필터(전체·자유·질문·후기·금팔기), 페이지네이션(10개씩). 필터·페이지는 URL 쿼리(`?category=&page=`)로 유지
- 목록은 서버 컴포넌트에서 `lib/db`로 직접 조회해 첫 화면을 그림
- 게시글 상세(`/community/[id]`): 본문·이미지, 조회수 증가(링크 prefetch 때는 올리지 않음), 북마크 토글
- 댓글: 오래된순/최신순 정렬, 댓글 작성(비밀 댓글 선택 가능, 500자 제한)
- 화면 이동만 연결된 곳: 글쓰기 버튼(`/community/write`), 검색·알림 아이콘

### 디자인 시스템 (`/design-system`)
- `components/common` 공용 컴포넌트(Button, TextField, Checkbox, SortSelect, Toast, BottomSheet, Loading 등)를 Figma 노드 기준으로 한 화면에 모아 확인하는 개발용 페이지

### 아직 뼈대만 있는 화면
- 판매자(`/provider/dashboard|contents|status|settings`), 관리자(`/admin/dashboard|contents|users|status`): "화면을 구현하세요" 안내 문구만 있음
- `/root`: 랜딩 Hero 섹션만 있음 (`/`는 `/root`로 이동)

## API (Route Handler)

| 경로 | 메서드 | 설명 |
|---|---|---|
| `/api/posts` | GET, POST | 게시글 목록 / 작성 |
| `/api/posts/[id]` | GET, PATCH, DELETE | 게시글 상세 / 수정 / 삭제 |
| `/api/posts/[id]/comments` | GET, POST | 댓글 목록 / 작성 |
| `/api/posts/[id]/bookmark` | GET, POST, DELETE | 북마크 여부 / 추가 / 해제 |

## 폴더 구조

```
app/
├── (main)/community/        # 커뮤니티 목록·상세 (페이지별 components/ 포함)
├── (auth)/login/            # 로그인
├── (client)/root, signup/   # 랜딩, 회원가입
├── (provider)/provider/     # 판매자 화면 (뼈대)
├── (admin)/admin/           # 관리자 화면 (뼈대)
├── (dev)/design-system/     # 공용 컴포넌트 확인용
└── api/posts/               # Route Handler
components/
├── ui/                      # shadcn 원자 컴포넌트
├── common/                  # 공용 컴포넌트 (Button, Toast, Modal, Icon ...)
├── features/community/      # 커뮤니티 도메인 상수·URL 헬퍼
├── forms/schema/            # Zod 스키마 (auth, community)
└── layout/                  # Header, Footer, Sidebar
hooks/
├── posts|comments|bookmarks/  # React Query 훅 (apis·keys·queries·mutations·index)
├── reactquery/auth/         # 로그인·회원가입·내 정보
└── common/                  # useAuth, useToast, useModal, useDebounce ...
lib/
├── db/                      # Supabase 쿼리 (posts, comments, bookmarks)
├── supabase/                # client.ts(브라우저) / server.ts(서버)
└── axios, api, reactquery, providers
models/                      # database.ts(Supabase 생성 타입, 직접 수정 금지) + 도메인 모델
stores/                      # Zustand 스토어
proxy.ts                     # 인증·보호 경로 (Next.js 16 middleware)
docs/                        # 정책서·PRD·ERD·디자인 문서
```

데이터 흐름은 `Client Component → hooks/[도메인] → app/api → lib/db` 입니다. 서버 컴포넌트(`page.tsx`)는 Route Handler를 거치지 않고 `lib/db`를 직접 호출합니다. 코드 작성 규칙은 [`AGENTS.md`](./AGENTS.md)를 따릅니다.
