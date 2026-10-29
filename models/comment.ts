export type CommentSort = "oldest" | "latest";

export interface Comment {
  id: string;
  author: string;
  authorAvatarUrl: string | null;
  /** 비밀 댓글을 볼 권한이 없으면 null (원글·댓글 작성자만 열람) */
  content: string | null;
  isSecret: boolean;
  createdAt: string;
}

export interface CommentListResponse {
  data: Comment[];
  total: number;
}

export type CommentCreateRequest = { content: string; isSecret: boolean };
