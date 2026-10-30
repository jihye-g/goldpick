"use client";

import { useRouter } from "next/navigation";
import { FilterChip } from "@/components/common/FilterChip";
import { CATEGORY_FILTERS } from "./constants";
import { communityHref, type CommunityQuery } from "./searchParams";

interface CategoryChipsProps {
  /** 목록(/community) 또는 검색(/community/search) 경로 */
  basePath: string;
  /** 현재 쿼리 — 카테고리만 바꾸고 검색어·정렬은 유지한다 */
  query: CommunityQuery;
}

// Figma: CategoryChips (2003:4157) — pt 10 · pb 12 · pl 16, gap 8, 가로 스크롤
// 선택하면 ?category= 만 바꾸고 페이지는 1로 돌아간다 (목록은 서버에서 다시 그림)
export function CategoryChips({ basePath, query }: CategoryChipsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-[8px] overflow-x-auto border-b border-divider bg-bg-surface pt-[10px] pb-[12px] pl-[16px] [scrollbar-width:none]">
      {CATEGORY_FILTERS.map((filter) => (
        <FilterChip
          key={filter.label}
          size="M"
          label={filter.label}
          selected={filter.value === query.category}
          onClick={() =>
            router.replace(communityHref(basePath, { ...query, category: filter.value, page: 1 }), { scroll: false })
          }
        />
      ))}
    </div>
  );
}
