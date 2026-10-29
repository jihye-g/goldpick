"use client";

import { useState } from "react";
import { LoadingDots } from "@/components/common/Loading";
import { SortTabs } from "@/components/common/SortSelect";
import { useComments } from "@/hooks/comments";
import type { CommentSort } from "@/models";
import { CommentItem } from "./CommentItem";

const SORT_OPTIONS = [
  { value: "oldest", label: "등록순" },
  { value: "latest", label: "최신순" },
] as const;

// Figma: Comments (2651:10479) — p 16 · gap 14, 헤더 16/Bold + 정렬 글자 탭
export function CommentSection({ postId }: { postId: string }) {
  const [sort, setSort] = useState<CommentSort>("oldest");
  const { data, isLoading } = useComments(postId, sort);

  return (
    <section aria-label="댓글" className="flex flex-col gap-[14px] p-[16px]">
      <div className="flex items-start gap-[8px]">
        <h3 className="min-w-0 flex-1 text-16 font-bold text-text-primary">댓글 {data?.total ?? 0}</h3>
        <SortTabs options={SORT_OPTIONS} value={sort} onValueChange={setSort} className="self-stretch" />
      </div>
      {isLoading ? (
        <LoadingDots className="self-center" />
      ) : (
        <ul className="flex flex-col gap-[14px]">
          {data?.data.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
}
