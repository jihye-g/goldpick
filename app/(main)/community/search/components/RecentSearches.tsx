"use client";

import { useRouter } from "next/navigation";
import { FilterChip } from "@/components/common/FilterChip";
import { communitySearchHref } from "@/components/features/community/searchParams";
import { useHydrateRecentSearches, useRecentSearchStore } from "@/stores/recentSearchStore";

// Figma: Section_최근 검색어 (3924:9949) — Head pt 16 · px 16, Chips pt 12 · gap 8
// 기록이 없으면(복원 전 포함) 섹션을 그리지 않는다 — 빈 상태 디자인은 기획 확인 대기 (search-policy Open Q2)
export function RecentSearches() {
  const router = useRouter();
  useHydrateRecentSearches();
  const keywords = useRecentSearchStore((s) => s.keywords);
  const addRecentSearch = useRecentSearchStore((s) => s.add);
  const clearRecentSearches = useRecentSearchStore((s) => s.clear);

  if (!keywords.length) return null;

  return (
    <section aria-labelledby="recent-searches-title">
      <div className="flex items-center justify-between px-[16px] pt-[16px]">
        <h2 id="recent-searches-title" className="text-14 font-bold text-text-primary">
          최근 검색어
        </h2>
        <button type="button" onClick={clearRecentSearches} className="text-12 font-medium text-text-tertiary">
          전체삭제
        </button>
      </div>
      <ul className="flex flex-wrap gap-[8px] px-[16px] pt-[12px]">
        {keywords.map((keyword) => (
          <li key={keyword} className="max-w-full">
            <FilterChip
              size="M"
              label={keyword}
              aria-pressed={undefined}
              className="block max-w-full truncate"
              onClick={() => {
                addRecentSearch(keyword);
                router.push(communitySearchHref({ q: keyword }));
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
