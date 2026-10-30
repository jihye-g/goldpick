"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/common/Pagination";
import type { PostCategory } from "@/models";
import { communityListHref, communitySearchHref, type SearchQuery } from "./searchParams";

interface PostPaginationProps {
  category: PostCategory | undefined;
  currentPage: number;
  totalPages: number;
  search?: SearchQuery;
}

export function PostPagination({ category, currentPage, totalPages, search }: PostPaginationProps) {
  const router = useRouter();
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) =>
        router.push(search ? communitySearchHref({ ...search, category, page }) : communityListHref({ category, page }))
      }
      className="py-[16px]"
    />
  );
}
