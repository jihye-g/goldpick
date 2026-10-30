"use client";

import { useRouter } from "next/navigation";
import { FilterChip } from "@/components/common/FilterChip";
import { communityHref } from "@/components/features/community/searchParams";
import { useRecentSearchStore } from "@/stores/recentSearchStore";

// Figma: Section_최근 검색어 (3924:9949) — Head pt 16 · px 16 (제목 14/Bold, 전체삭제 12/Medium tertiary), Chips pt 12 · gap 8
// 저장소 rehydrate 는 같은 화면의 SearchHeader 가 맡는다
export function RecentSearches() {
  const router = useRouter();
  const keywords = useRecentSearchStore((s) => s.keywords);
  const addRecentSearch = useRecentSearchStore((s) => s.add);
  const removeRecentSearch = useRecentSearchStore((s) => s.remove);
  const clearRecentSearches = useRecentSearchStore((s) => s.clear);

  if (!keywords.length) return null;

  const search = (keyword: string) => {
    addRecentSearch(keyword);
    router.push(communityHref("/community/search", { q: keyword }));
  };

  return (
    <section aria-labelledby="recent-search-title">
      <div className="flex items-center justify-between px-[16px] pt-[16px]">
        <h2 id="recent-search-title" className="text-14 font-bold text-text-primary">
          최근 검색어
        </h2>
        <button type="button" onClick={clearRecentSearches} className="text-12 font-medium text-text-tertiary">
          전체삭제
        </button>
      </div>
      <ul className="flex gap-[8px] overflow-x-auto px-[16px] pt-[12px] [scrollbar-width:none]">
        {keywords.map((keyword) => (
          <li key={keyword} className="shrink-0">
            <FilterChip
              size="M"
              label={keyword}
              onClick={() => search(keyword)}
              onRemove={() => removeRecentSearch(keyword)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
