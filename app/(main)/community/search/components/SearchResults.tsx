import { connection } from "next/server";
import { EmptyState } from "@/components/common/EmptyState";
import { Icon3D } from "@/components/common/Icon";
import { PostList } from "@/components/features/community/PostList";
import { postKeys } from "@/hooks/posts/keys";
import { listPosts } from "@/lib/db/posts";
import { getQueryClient } from "@/lib/reactquery/getQueryClient";
import { createClient } from "@/lib/supabase/server";
import type { PostCategory, PostListParams, PostSort } from "@/models";
import { SearchToolbar } from "./SearchToolbar";

const LIMIT = 10;

// 서버 컴포넌트는 자기 Route Handler 를 fetch 하지 않고 같은 DB 함수(lib/db)를 직접 쓴다
// connection(): 결과는 요청 때만 그린다 — 작성 시각 표시(PostCard)가 읽는 Date.now() 가 프리렌더에서 실행되지 않게
async function searchPosts(params: PostListParams) {
  await connection();
  try {
    const supabase = await createClient();
    return await getQueryClient().fetchQuery({
      queryKey: postKeys.list(params),
      queryFn: () => listPosts(supabase, params),
    });
  } catch {
    return null;
  }
}

interface SearchResultsProps {
  q: string;
  category: PostCategory | undefined;
  sort: PostSort;
  page: number;
}

// Figma: Toolbar_건수정렬 (3923:9835) + PostList (3923:9632)
// 결과가 0건이면 "검색 결과 없음" (페이지를 넘어선 주소는 PostList 가 첫 페이지로 안내)
export async function SearchResults({ q, category, sort, page }: SearchResultsProps) {
  const data = await searchPosts({ page, limit: LIMIT, keyword: q, category, sort });
  const search = { q, sort };

  const emptyState = (
    <EmptyState
      title="검색 결과가 없습니다"
      description="다른 검색어로 다시 검색해보세요."
      icon={<Icon3D name="no-search-results" />}
      className="py-16"
    />
  );

  return (
    <>
      {data && data.total > 0 && <SearchToolbar total={data.total} search={search} category={category} />}
      <PostList data={data} category={category} page={page} limit={LIMIT} search={search} emptyState={emptyState} />
    </>
  );
}
