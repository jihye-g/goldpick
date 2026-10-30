import { z } from "zod";
import { KEYWORD_MAX_LENGTH } from "@/components/features/community/constants";

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

// 검색창은 빈 값이면 에러 문구 없이 제출만 막는다 — 길이는 입력창 maxLength 로도 막는다
export const searchSchema = z.object({
  q: z.string().trim().min(1).max(KEYWORD_MAX_LENGTH),
});

export type PostFormValues = z.infer<typeof postSchema>;
export type SearchFormValues = z.infer<typeof searchSchema>;
export type CommentFormValues = z.infer<typeof commentSchema>;
