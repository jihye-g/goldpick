import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "@/hooks/posts/keys";
import type { BookmarkStatus } from "@/models";
import { bookmarkApis } from "./apis";
import { bookmarkKeys } from "./keys";

// 누르는 즉시 아이콘을 바꾸고(낙관적 업데이트), 실패하면 이전 상태로 되돌린다
export function useToggleBookmark(postId: string) {
  const queryClient = useQueryClient();
  const queryKey = bookmarkKeys.detail(postId);

  return useMutation({
    mutationFn: (next: boolean) => (next ? bookmarkApis.addBookmark(postId) : bookmarkApis.removeBookmark(postId)),
    onMutate: async (next) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<BookmarkStatus>(queryKey);
      queryClient.setQueryData<BookmarkStatus>(queryKey, { bookmarked: next });
      return { previous };
    },
    onError: (_error, _next, context) => {
      if (context?.previous) queryClient.setQueryData(queryKey, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      // 목록 카드의 북마크 수
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
