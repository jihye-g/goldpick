import { apiClient } from "@/lib/axios/client";
import type { PostCreateRequest, PostDetail, PostListParams, PostListResponse, PostUpdateRequest } from "@/models";

// Route Handler: app/api/posts · app/api/posts/[id]
export const postApis = {
  getPosts: async (params: PostListParams = {}): Promise<PostListResponse> => {
    const res = await apiClient.get("/posts", { params });
    return res.data;
  },
  getPost: async (id: string): Promise<PostDetail> => {
    const res = await apiClient.get(`/posts/${id}`);
    return res.data;
  },
  createPost: async (data: PostCreateRequest): Promise<{ id: string }> => {
    const res = await apiClient.post("/posts", data);
    return res.data;
  },
  updatePost: async (id: string, data: PostUpdateRequest): Promise<void> => {
    await apiClient.patch(`/posts/${id}`, data);
  },
  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
