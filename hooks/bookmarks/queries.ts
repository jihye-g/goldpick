import { useQuery } from "@tanstack/react-query";
import type { BookmarkStatus } from "@/models";
import { bookmarkApis } from "./apis";
import { bookmarkKeys } from "./keys";

// initialData: 서버 페이지에서 미리 확인한 북마크 여부 (첫 화면에서 깜빡이지 않게)
export function useBookmark(postId: string, initialData?: BookmarkStatus) {
  return useQuery({
    queryKey: bookmarkKeys.detail(postId),
    queryFn: () => bookmarkApis.getBookmark(postId),
    initialData,
    enabled: !!postId,
  });
}
