import { z } from "zod";

// 길이 제한은 DB check 제약(posts·comments)과 맞춘다
export const postSchema = z.object({
  category: z.enum(["free", "question", "review", "sell"], "카테고리를 선택해주세요."),
  title: z.string().trim().min(1, "제목을 입력해주세요.").max(100, "제목은 100자까지 입력할 수 있어요."),
  content: z.string().trim().min(1, "내용을 입력해주세요.").max(5000, "내용은 5000자까지 입력할 수 있어요."),
});

export const postUpdateSchema = postSchema.partial();

export const commentSchema = z.object({
  content: z.string().trim().min(1, "댓글을 입력해주세요.").max(500, "댓글은 500자까지 입력할 수 있어요."),
  isSecret: z.boolean(),
});

export const searchSchema = z.object({
  keyword: z.string().trim().min(1, "검색어를 입력해주세요.").max(50, "검색어는 50자까지 입력할 수 있어요."),
});

export type PostFormValues = z.infer<typeof postSchema>;
export type CommentFormValues = z.infer<typeof commentSchema>;
export type SearchFormValues = z.infer<typeof searchSchema>;
