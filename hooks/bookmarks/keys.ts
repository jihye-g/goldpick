export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  detail: (postId: string) => [...bookmarkKeys.all, postId] as const,
};
