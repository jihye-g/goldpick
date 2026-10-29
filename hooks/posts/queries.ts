import { useQuery } from "@tanstack/react-query";
import type { PostListParams } from "@/models";
import { postApis } from "./apis";
import { postKeys } from "./keys";

export function usePosts(params: PostListParams = {}) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postApis.getPosts(params),
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postApis.getPost(id),
    enabled: !!id,
  });
}
