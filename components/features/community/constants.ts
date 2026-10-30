import type { SortOption } from "@/components/common/SortSelect";
import type { PostCategory, PostSort } from "@/models";

export const CATEGORY_LABEL: Record<PostCategory, string> = {
  free: "자유",
  question: "질문",
  review: "후기",
  sell: "금팔기",
};

export const CATEGORY_FILTERS: { value: PostCategory | undefined; label: string }[] = [
  { value: undefined, label: "전체" },
  ...(Object.entries(CATEGORY_LABEL) as [PostCategory, string][]).map(([value, label]) => ({ value, label })),
];

// 정렬 옵션은 Figma에 "최신순"만 보여 나머지는 가정 (docs/policy/search-policy.md)
export const SORT_OPTIONS: readonly SortOption<PostSort>[] = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
  { value: "comments", label: "댓글순" },
];

// 검색어 최대 길이 — 입력창 maxLength · URL 파싱 · Zod 스키마가 같은 값을 쓴다
export const KEYWORD_MAX_LENGTH = 50;

export const SEARCH_PLACEHOLDER = "게시글 제목 · 내용 검색";
