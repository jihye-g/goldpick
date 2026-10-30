"use client";

import { useRouter } from "next/navigation";
import { FilterChip } from "@/components/common/FilterChip";
import type { PostCategory } from "@/models";
import { CATEGORY_FILTERS } from "./constants";
import { communityListHref, communitySearchHref, type SearchQuery } from "./searchParams";

interface CategoryChipsProps {
  value: PostCategory | undefined;
  /** 검색 화면이면 검색어·정렬을 유지한 채 카테고리만 바꾼다 */
  search?: SearchQuery;
}

// Figma: CategoryChips (2003:4157) — pt 10 · pb 12 · pl 16, gap 8, 가로 스크롤
// 선택하면 ?category= 만 바꾸고 페이지는 1로 돌아간다 (목록은 서버에서 다시 그림)
export function CategoryChips({ value, search }: CategoryChipsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-[8px] overflow-x-auto border-b border-divider bg-bg-surface pt-[10px] pb-[12px] pl-[16px] [scrollbar-width:none]">
      {CATEGORY_FILTERS.map((filter) => (
        <FilterChip
          key={filter.label}
          size="M"
          label={filter.label}
          selected={filter.value === value}
          onClick={() =>
            router.replace(
              search
                ? communitySearchHref({ ...search, category: filter.value })
                : communityListHref({ category: filter.value }),
              { scroll: false }
            )
          }
        />
      ))}
    </div>
  );
}
