"use client";

import { isAxiosError } from "axios";
import { BookmarkIcon } from "@/components/common/Icon";
import { IconButton } from "@/components/common/IconButton";
import { useBookmark, useToggleBookmark } from "@/hooks/bookmarks";
import { useToast } from "@/hooks/common/useToast";

interface BookmarkButtonProps {
  postId: string;
  /** 서버 페이지에서 확인한 첫 상태 */
  initialBookmarked: boolean;
}

export function BookmarkButton({ postId, initialBookmarked }: BookmarkButtonProps) {
  const toast = useToast();
  const { data } = useBookmark(postId, { bookmarked: initialBookmarked });
  const { mutate, isPending } = useToggleBookmark(postId);
  const bookmarked = data?.bookmarked ?? false;

  const handleClick = () =>
    mutate(!bookmarked, {
      onError: (error) =>
        toast.error(
          isAxiosError(error) && error.response?.status === 401
            ? "로그인 후 북마크할 수 있어요."
            : "북마크를 바꾸지 못했어요. 잠시 후 다시 시도해주세요."
        ),
    });

  return (
    <IconButton
      size="compact"
      label={bookmarked ? "북마크 해제" : "북마크"}
      aria-pressed={bookmarked}
      disabled={isPending}
      onClick={handleClick}
    >
      <BookmarkIcon active={bookmarked} />
    </IconButton>
  );
}
