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

export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
] as const satisfies readonly { value: PostSort; label: string }[];
