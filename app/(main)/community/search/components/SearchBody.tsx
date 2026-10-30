import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CategoryChips } from "@/components/features/community/CategoryChips";
import { parseCategory, parseKeyword, parsePage, parseSort } from "@/components/features/community/searchParams";
import { RecentSearches } from "./RecentSearches";
import { SearchResults } from "./SearchResults";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// q 가 없으면 10a(최근 검색어), 있으면 10b(칩 + 결과)
// 결과만 조건별 key 를 단 Suspense 로 감싸 필터·정렬·페이지를 바꾸면 결과 영역만 로딩된다
export async function SearchBody({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const q = parseKeyword(query.q);

  if (!q) {
    return (
      <div className="flex-1">
        <RecentSearches />
      </div>
    );
  }

  const category = parseCategory(query.category);
  const sort = parseSort(query.sort);
  const page = parsePage(query.page);

  return (
    <div className="flex flex-1 flex-col bg-bg-surface">
      <CategoryChips value={category} search={{ q, sort }} />
      <Suspense
        key={`${q}|${category ?? ""}|${sort}|${page}`}
        fallback={
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        }
      >
        <SearchResults q={q} category={category} sort={sort} page={page} />
      </Suspense>
    </div>
  );
}
