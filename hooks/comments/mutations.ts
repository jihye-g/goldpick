import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommentCreateRequest } from "@/models";
import { postKeys } from "@/hooks/posts/keys";
import { commentApis } from "./apis";
import { commentKeys } from "./keys";

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentCreateRequest) => commentApis.createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists(postId) });
      // 목록 카드의 댓글 수
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
