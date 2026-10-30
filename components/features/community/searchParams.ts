import type { PostCategory, PostSort } from "@/models";
import { CATEGORY_LABEL, SORT_OPTIONS } from "./constants";

export function parseCategory(value: string | string[] | undefined): PostCategory | undefined {
  return typeof value === "string" && value in CATEGORY_LABEL ? (value as PostCategory) : undefined;
}

export function parsePage(value: string | string[] | undefined) {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

export function parseSort(value: string | string[] | undefined): PostSort {
  return SORT_OPTIONS.find((option) => option.value === value)?.value ?? "latest";
}

export function parseKeyword(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

export interface CommunityQuery {
  q?: string;
  category?: PostCategory;
  sort?: PostSort;
  page?: number;
}

// 목록·검색 주소 — 기본값(검색어 없음·전체·최신순·1페이지)은 쿼리에서 뺀다
export function communityHref(path: string, { q, category, sort, page = 1 }: CommunityQuery = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (sort && sort !== "latest") params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}
