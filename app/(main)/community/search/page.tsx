import { CategoryChips } from "@/components/features/community/CategoryChips";
import { PostList } from "@/components/features/community/PostList";
import {
  parseCategory,
  parseKeyword,
  parsePage,
  parseSort,
  type CommunityQuery,
} from "@/components/features/community/searchParams";
import { postKeys } from "@/hooks/posts/keys";
import { listPosts } from "@/lib/db/posts";
import { getQueryClient } from "@/lib/reactquery/getQueryClient";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { PostListParams } from "@/models";
import { RecentSearches } from "./components/RecentSearches";
import { SearchHeader } from "./components/SearchHeader";
import { SearchToolbar } from "./components/SearchToolbar";

const LIMIT = 10;
const BASE_PATH = "/community/search";

// 서버 컴포넌트는 자기 Route Handler 를 fetch 하지 않고 같은 DB 함수(lib/db)를 직접 쓴다
async function searchPosts(params: PostListParams) {
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

// Figma: 10a_커뮤니티_검색 (3924:9771) — 검색어 없으면 최근 검색어
//        10b_커뮤니티_검색결과 (3923:9620) — ?q= 가 있으면 카테고리 칩 · 총 N건/정렬 · 게시글 목록
export default async function CommunitySearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const keyword = parseKeyword(params.q);
  const query: CommunityQuery = {
    q: keyword,
    category: parseCategory(params.category),
    sort: parseSort(params.sort),
    page: parsePage(params.page),
  };
  const data = keyword
    ? await searchPosts({ keyword, category: query.category, sort: query.sort, page: query.page, limit: LIMIT })
    : null;

  return (
    <div className={cn("mx-auto flex min-h-dvh w-full max-w-[480px] flex-col", keyword ? "bg-bg-surface" : "bg-bg-canvas")}>
      <SearchHeader key={keyword} keyword={keyword} />
      {keyword ? (
        <main className="flex-1">
          <CategoryChips basePath={BASE_PATH} query={query} />
          {data && <SearchToolbar total={data.total} query={query} />}
          <PostList
            data={data}
            basePath={BASE_PATH}
            query={query}
            limit={LIMIT}
            empty={{ title: "검색 결과가 없습니다", description: "다른 검색어로 다시 검색해보세요." }}
          />
        </main>
      ) : (
        <main className="flex-1">
          <RecentSearches />
        </main>
      )}
    </div>
  );
}
