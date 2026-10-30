import type { Database } from "./database";

export type PostCategory = Database["public"]["Enums"]["post_category"];

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  author: string;
  thumbnailUrl: string | null;
  viewCount: number;
  commentCount: number;
  bookmarkCount: number;
  createdAt: string;
}

export interface PostDetail extends Post {
  authorAvatarUrl: string | null;
  imageUrls: string[];
}

// latest: 최신순 · popular: 조회수순
export type PostSort = "latest" | "popular";

export interface PostListParams {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: PostCategory;
  sort?: PostSort;
}

export interface PostListResponse {
  data: Post[];
  total: number;
}

export type PostCreateRequest = Pick<Post, "category" | "title" | "content">;
export type PostUpdateRequest = Partial<PostCreateRequest>;
