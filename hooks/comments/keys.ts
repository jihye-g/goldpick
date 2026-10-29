import type { CommentSort } from "@/models";

export const commentKeys = {
  all: ["comments"] as const,
  lists: (postId: string) => [...commentKeys.all, "list", postId] as const,
  list: (postId: string, sort: CommentSort) => [...commentKeys.lists(postId), sort] as const,
};
