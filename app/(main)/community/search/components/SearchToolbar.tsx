"use client";

import { useRouter } from "next/navigation";
import { SortSelect } from "@/components/common/SortSelect";
import { SORT_OPTIONS } from "@/components/features/community/constants";
import { communitySearchHref, type SearchQuery } from "@/components/features/community/searchParams";
import type { PostCategory } from "@/models";

interface SearchToolbarProps {
  total: number;
  search: SearchQuery;
  category: PostCategory | undefined;
}

// Figma: Toolbar_건수정렬 (3923:9835) — pt 12 · px 16, "총 N건" 13/Bold + SortSelect
// 정렬을 바꾸면 검색어·카테고리는 유지하고 1페이지로 (히스토리는 쌓지 않음)
export function SearchToolbar({ total, search, category }: SearchToolbarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-[16px] pt-[12px]">
      <p className="text-13 font-bold text-text-primary">{`총 ${total.toLocaleString()}건`}</p>
      <SortSelect
        options={SORT_OPTIONS}
        value={search.sort}
        onValueChange={(sort) => router.replace(communitySearchHref({ q: search.q, category, sort }), { scroll: false })}
      />
    </div>
  );
}
