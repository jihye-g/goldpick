import { apiClient } from "@/lib/axios/client";
import type { BookmarkStatus } from "@/models";

// Route Handler: app/api/posts/[id]/bookmark
export const bookmarkApis = {
  getBookmark: async (postId: string): Promise<BookmarkStatus> => {
    const res = await apiClient.get(`/posts/${postId}/bookmark`);
    return res.data;
  },
  addBookmark: async (postId: string): Promise<BookmarkStatus> => {
    const res = await apiClient.post(`/posts/${postId}/bookmark`);
    return res.data;
  },
  removeBookmark: async (postId: string): Promise<BookmarkStatus> => {
    const res = await apiClient.delete(`/posts/${postId}/bookmark`);
    return res.data;
  },
};
