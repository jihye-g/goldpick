import type { PostCategory, PostSort } from "@/models";
import { CATEGORY_LABEL, KEYWORD_MAX_LENGTH, SORT_OPTIONS } from "./constants";

// 검색 화면에서 목록 컴포넌트(칩·페이지네이션)가 주소를 만들 때 필요한 값 — 서버→클라이언트로 넘기므로 직렬화 가능한 값만
export interface SearchQuery {
  q: string;
  sort: PostSort;
}

export function parseCategory(value: string | string[] | undefined): PostCategory | undefined {
  return typeof value === "string" && value in CATEGORY_LABEL ? (value as PostCategory) : undefined;
}

// 너무 큰 값은 DB offset 범위를 넘어 조회 자체가 실패하므로 상한을 둔다
const MAX_PAGE = 10_000;

export function parsePage(value: string | string[] | undefined) {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 ? Math.min(page, MAX_PAGE) : 1;
}

// 공백뿐이면 검색어 없음(10a), 너무 길면 앞부분만 쓴다
export function parseKeyword(value: string | string[] | undefined) {
  if (typeof value !== "string") return undefined;
  const keyword = value.trim().slice(0, KEYWORD_MAX_LENGTH).trim();
  return keyword || undefined;
}

export function parseSort(value: string | string[] | undefined): PostSort {
  return SORT_OPTIONS.find((option) => option.value === value)?.value ?? "latest";
}

// 목록 주소 — 기본값(전체·1페이지)은 쿼리에서 뺀다
export function communityListHref({ category, page = 1 }: { category?: PostCategory; page?: number }) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/community?${query}` : "/community";
}

// 검색 주소 — 기본값(최신순·1페이지)은 쿼리에서 뺀다
export function communitySearchHref({
  q,
  category,
  sort = "latest",
  page = 1,
}: {
  q: string;
  category?: PostCategory;
  sort?: PostSort;
  page?: number;
}) {
  const params = new URLSearchParams({ q });
  if (category) params.set("category", category);
  if (sort !== "latest") params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  return `/community/search?${params.toString()}`;
}
