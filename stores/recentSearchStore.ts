import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_RECENT_SEARCHES = 10;

interface RecentSearchState {
  keywords: string[];
  add: (keyword: string) => void;
  clear: () => void;
}

// 저장소를 쓸 수 없으면(쿠키 차단·일부 웹뷰) zustand 가 persist API 를 만들지 않는다 — 그때는 메모리에서만 쓰고 막지 않는다
function hasHydrated() {
  return useRecentSearchStore.persist?.hasHydrated() ?? true;
}

// 저장값은 사용자가 고칠 수 있는 localStorage 라 그대로 믿지 않는다 — 문자열만, 중복 없이, 최대 개수까지
function sanitizeKeywords(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const keywords = value.filter((item): item is string => typeof item === "string").map((item) => item.trim());
  return [...new Set(keywords.filter(Boolean))].slice(0, MAX_RECENT_SEARCHES);
}

// 최근 검색어는 기기(브라우저) 단위로 localStorage에 둔다 (docs/policy/search-policy.md)
// skipHydration: 서버·첫 렌더는 빈 목록으로 그려 하이드레이션 불일치를 막고, useHydrateRecentSearches 가 복원한다
// 복원 전에 쓰면 저장된 기록을 빈 목록 기준으로 덮어쓰므로 add·clear 는 복원 후에만 동작한다
export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set) => ({
      keywords: [],
      add: (keyword) => {
        if (!hasHydrated()) return;
        const value = keyword.trim();
        if (!value) return;
        set((state) => ({
          keywords: [value, ...state.keywords.filter((item) => item !== value)].slice(0, MAX_RECENT_SEARCHES),
        }));
      },
      clear: () => {
        if (!hasHydrated()) return;
        set({ keywords: [] });
      },
    }),
    {
      name: "goldpick:recent-searches",
      partialize: (state) => ({ keywords: state.keywords }),
      merge: (persisted, current) => ({
        ...current,
        keywords: sanitizeKeywords((persisted as { keywords?: unknown } | undefined)?.keywords),
      }),
      skipHydration: true,
    }
  )
);

// 스토어를 읽거나 쓰는 컴포넌트마다 호출 — 페이지당 한 번만 복원된다
export function useHydrateRecentSearches() {
  useEffect(() => {
    if (!hasHydrated()) void useRecentSearchStore.persist.rehydrate();
  }, []);
}
