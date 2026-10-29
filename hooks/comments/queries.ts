import { useQuery } from "@tanstack/react-query";
import type { CommentSort } from "@/models";
import { commentApis } from "./apis";
import { commentKeys } from "./keys";

export function useComments(postId: string, sort: CommentSort) {
  return useQuery({
    queryKey: commentKeys.list(postId, sort),
    queryFn: () => commentApis.getComments(postId, sort),
    enabled: !!postId,
  });
}
