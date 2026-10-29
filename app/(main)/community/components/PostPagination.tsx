"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/common/Pagination";
import { communityListHref } from "@/components/features/community/searchParams";
import type { PostCategory } from "@/models";

interface PostPaginationProps {
  category: PostCategory | undefined;
  currentPage: number;
  totalPages: number;
}

export function PostPagination({ category, currentPage, totalPages }: PostPaginationProps) {
  const router = useRouter();
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => router.push(communityListHref({ category, page }))}
      className="py-[16px]"
    />
  );
}
