"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/common/Pagination";
import { communityHref, type CommunityQuery } from "./searchParams";

interface PostPaginationProps {
  basePath: string;
  query: CommunityQuery;
  totalPages: number;
}

export function PostPagination({ basePath, query, totalPages }: PostPaginationProps) {
  const router = useRouter();
  return (
    <Pagination
      currentPage={query.page ?? 1}
      totalPages={totalPages}
      onPageChange={(page) => router.push(communityHref(basePath, { ...query, page }))}
      className="py-[16px]"
    />
  );
}
