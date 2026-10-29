<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 개발 규칙

### 1. 퍼블리싱은 TailwindCSS
- 스타일은 Tailwind 유틸리티 클래스로 작성한다. 별도 CSS 파일, CSS-in-JS, inline `style`은 쓰지 않는다 (동적 값이 꼭 필요할 때만 예외).
- 조건부 클래스는 `cn()`(`@/lib/utils`)으로 합친다.
- 색상·간격은 하드코딩 hex(`bg-[#006FFD]`)보다 테마 토큰(`bg-primary`, `text-muted-foreground`)을 우선한다.

### 2. UI는 `components/common` 공용 컴포넌트를 만들어 재사용
- 여러 화면에서 쓰는 UI(검색창, 페이지네이션, 모달, 빈 상태, 로딩 등)는 `components/common/`에 공용 컴포넌트로 만들고 그것을 가져다 쓴다.
- 필요한 공용 컴포넌트가 없으면 화면 안에 직접 만들지 말고 `components/common/`에 먼저 만든다.
- 공용 컴포넌트는 `components/ui/`(shadcn 원자 컴포넌트)를 조합해서 만든다.

### 3. 데이터 페칭은 `hooks/[domain]/` → Route Handler(`app/api/`) → `lib/db/`
- 모든 서버 데이터 조회·변경은 React Query로 한다. 컴포넌트에서 `fetch`/`axios`/`supabase`를 직접 호출하지 않는다.
- 흐름: Client Component → `hooks/[domain]`(React Query) → `app/api/...`(Route Handler) → `lib/db/[domain].ts`(Supabase 쿼리).
- 서버 컴포넌트(`page.tsx`)는 자기 Route Handler를 fetch하지 않고 `lib/db/`를 `lib/supabase/server` 클라이언트로 직접 호출한다.
- 타입: Supabase 생성 타입은 `models/database.ts`(`generate_typescript_types`로 생성, 직접 수정 금지), 화면·API용 모델은 `models/[domain].ts`.
- 도메인마다 아래 5개 파일 구조를 유지한다.
  ```
  hooks/[domain]/
  ├── apis.ts       # Route Handler 호출 함수 (apiClient, 타입은 models/에서)
  ├── keys.ts       # 쿼리 키 팩토리
  ├── queries.ts    # useQuery 훅
  ├── mutations.ts  # useMutation 훅 (성공 시 keys로 invalidate)
  └── index.ts      # re-export
  ```

### 4. 페이지 구조: `[페이지명]/page.tsx` + `[페이지명]/components/`
- 페이지는 `app/(그룹)/[페이지명]/page.tsx`로 만든다.
- 그 페이지의 하위 컴포넌트는 같은 폴더의 `components/`에 둔다.
  ```
  app/(main)/community/
  ├── page.tsx
  ├── components/
  │   ├── PostCard.tsx
  │   └── CategoryChips.tsx
  └── [id]/
      ├── page.tsx
      └── components/
          ├── CommentItem.tsx
          └── CommentInputBar.tsx
  ```
- 도메인 컴포넌트(게시글 카드·댓글 아이템 등)가 2개 이상 페이지에서 쓰이게 되면 `components/features/[도메인]/`으로 옮긴다.
- 도메인과 무관한 범용 UI(검색창·모달·빈 상태 등)는 `components/common/`에 둔다.

### 5. 공용 컴포넌트·UI는 shadcn/ui 우선
- 새 UI가 필요하면 먼저 shadcn/ui에 있는지 확인하고 `npx shadcn@latest add <component>`로 추가한다 (`components/ui/`에 생성됨).
- shadcn/ui에 없는 경우에만 직접 만들고, shadcn 컴포넌트를 조합하거나 같은 스타일(`cva` variant + `cn`)로 작성한다.

### 6. `page.tsx` 최상위는 Server Component
- `page.tsx`에는 `"use client"`를 붙이지 않는다. 레이아웃·정적 영역·초기 데이터 준비는 서버에서 한다.
- 상태, 이벤트 핸들러, React Query 훅, 브라우저 API가 필요한 부분만 `components/` 안의 Client Component(`"use client"`)로 분리해서 `page.tsx`에 끼워 넣는다.
- `"use client"` 경계는 가능한 한 트리의 아래쪽(작은 단위)에 둔다.

### 7. 상태관리는 Zustand
- 서버 데이터는 React Query 캐시가 담당하고, 클라이언트 전역 상태(UI 상태, 장바구니, 필터 등)만 Zustand로 관리한다.
- 스토어는 `stores/[이름]Store.ts`에 도메인별로 나누고, 컴포넌트에서는 selector로 필요한 값만 구독한다 (`useCartStore((s) => s.items)`).
- 서버 데이터를 Zustand에 복사해 두지 않는다.

### 8. 폼은 React Hook Form + Zod
- 모든 폼은 `useForm` + `zodResolver`로 만든다. 입력값을 `useState`로 하나씩 관리하지 않는다.
- Zod 스키마와 `z.infer` 타입은 `components/forms/schema/[도메인].ts`에 둔다.
- 에러 메시지는 `formState.errors.[필드].message`로 표시하고, 제출 중(`isSubmitting` / mutation `isPending`)에는 버튼을 비활성화한다.

### 9. 텍스트 에디터는 Tiptap
- 리치 텍스트 입력은 Tiptap(`@tiptap/react`, `@tiptap/starter-kit`)으로 만든다.
- 에디터는 `components/common/Editor/`에 공용 컴포넌트로 하나만 두고 재사용한다 (Client Component).
- React Hook Form과는 `Controller`로 연결한다.

### 10. 인증은 `proxy.ts` 기반
- 인증·권한 체크와 리다이렉트는 루트의 `proxy.ts`(Next.js 16+의 middleware)에서 한다. 페이지·컴포넌트마다 로그인 체크 후 `redirect`하는 코드를 흩어 두지 않는다.
- `proxy.ts`에서 Supabase 세션을 갱신하고, 보호 경로(`/provider/*`, `/admin/*`, 마이페이지 등)에 세션이 없으면 `/login`으로 보낸다.
- 보호 경로는 `proxy.ts`의 상수 배열과 `config.matcher`로 한곳에서 관리한다.
