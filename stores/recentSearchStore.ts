import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_RECENT_SEARCHES = 10;

interface RecentSearchState {
  keywords: string[];
  add: (keyword: string) => void;
  remove: (keyword: string) => void;
  clear: () => void;
}

// 커뮤니티 최근 검색어 — 기기(브라우저) 단위 localStorage. 최신이 앞, 같은 검색어는 맨 앞으로 옮긴다
export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set) => ({
      keywords: [],
      add: (keyword) =>
        set((state) => ({
          keywords: [keyword, ...state.keywords.filter((item) => item !== keyword)].slice(0, MAX_RECENT_SEARCHES),
        })),
      remove: (keyword) => set((state) => ({ keywords: state.keywords.filter((item) => item !== keyword) })),
      clear: () => set({ keywords: [] }),
    }),
    // SSR 하이드레이션 불일치를 피하려고 클라이언트 마운트 후 rehydrate()로 읽는다
    { name: "goldpick-community-recent-search", skipHydration: true }
  )
);
