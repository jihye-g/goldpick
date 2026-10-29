import type { PostCategory } from "@/models";
import { CATEGORY_LABEL } from "./constants";

export function parseCategory(value: string | string[] | undefined): PostCategory | undefined {
  return typeof value === "string" && value in CATEGORY_LABEL ? (value as PostCategory) : undefined;
}

export function parsePage(value: string | string[] | undefined) {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

// 목록 주소 — 기본값(전체·1페이지)은 쿼리에서 뺀다
export function communityListHref({ category, page = 1 }: { category?: PostCategory; page?: number }) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/community?${query}` : "/community";
}
