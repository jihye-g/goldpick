import { apiClient } from "@/lib/axios/client";
import type { CommentCreateRequest, CommentListResponse, CommentSort } from "@/models";

// Route Handler: app/api/posts/[id]/comments
export const commentApis = {
  getComments: async (postId: string, sort: CommentSort): Promise<CommentListResponse> => {
    const res = await apiClient.get(`/posts/${postId}/comments`, { params: { sort } });
    return res.data;
  },
  createComment: async (postId: string, data: CommentCreateRequest): Promise<{ id: string }> => {
    const res = await apiClient.post(`/posts/${postId}/comments`, data);
    return res.data;
  },
};
