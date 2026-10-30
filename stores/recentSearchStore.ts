import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_RECENT_SEARCHES = 10;

interface RecentSearchState {
  keywords: string[];
  add: (keyword: string) => void;
  clear: () => void;
}

// 최근 검색어는 기기(브라우저) 단위로 localStorage에 둔다 (docs/policy/search-policy.md)
// skipHydration: 서버·첫 렌더는 빈 목록으로 그려 하이드레이션 불일치를 막고, useHydrateRecentSearches 가 복원한다
// 복원 전에 쓰면 저장된 기록을 빈 목록 기준으로 덮어쓰므로 add·clear 는 복원 후에만 동작한다
export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set) => ({
      keywords: [],
      add: (keyword) => {
        if (!useRecentSearchStore.persist.hasHydrated()) return;
        const value = keyword.trim();
        if (!value) return;
        set((state) => ({
          keywords: [value, ...state.keywords.filter((item) => item !== value)].slice(0, MAX_RECENT_SEARCHES),
        }));
      },
      clear: () => {
        if (!useRecentSearchStore.persist.hasHydrated()) return;
        set({ keywords: [] });
      },
    }),
    {
      name: "goldpick:recent-searches",
      partialize: (state) => ({ keywords: state.keywords }),
      skipHydration: true,
    }
  )
);

// 스토어를 읽거나 쓰는 컴포넌트마다 호출 — 페이지당 한 번만 복원된다
export function useHydrateRecentSearches() {
  useEffect(() => {
    if (!useRecentSearchStore.persist.hasHydrated()) void useRecentSearchStore.persist.rehydrate();
  }, []);
}
