"use client";

import { useRouter } from "next/navigation";
import { SortSelect } from "@/components/common/SortSelect";
import { SORT_OPTIONS } from "@/components/features/community/constants";
import { communityHref, type CommunityQuery } from "@/components/features/community/searchParams";

interface SearchToolbarProps {
  total: number;
  query: CommunityQuery;
}

// Figma: Toolbar_건수정렬 (3923:9835) — pt 12 · px 16, 총 N건 13/Bold + SortSelect
// 정렬을 바꾸면 1페이지로 돌아간다
export function SearchToolbar({ total, query }: SearchToolbarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-[16px] pt-[12px]">
      <p className="text-13 font-bold text-text-primary">총 {total.toLocaleString()}건</p>
      <SortSelect
        options={SORT_OPTIONS}
        value={query.sort ?? "latest"}
        onValueChange={(sort) =>
          router.replace(communityHref("/community/search", { ...query, sort, page: 1 }), { scroll: false })
        }
      />
    </div>
  );
}
