import { Suspense } from "react";
import { SearchBody } from "./components/SearchBody";
import { SearchHeaderFallback, SearchHeaderSection } from "./components/SearchHeaderSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Figma: 10a_커뮤니티_검색 (3924:9771) · 10b_커뮤니티_검색결과 (3923:9620)
// 검색 상태는 전부 URL(?q=&category=&sort=&page=)에 있다 — q 가 없으면 최근 검색어(10a), 있으면 결과(10b)
// Cache Components 에서 searchParams 는 Suspense 안에서만 읽을 수 있어서, 페이지는 기다리지 않고
// 헤더·본문이 각자 Suspense 안에서 읽는다. 그래야 필터를 바꿔도 헤더(입력창)는 그대로 있고 결과만 다시 그려진다
export default function CommunitySearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-bg-canvas">
      {/* Figma 헤더에는 제목이 없어 화면에는 숨기고 스크린리더용으로만 둔다 */}
      <h1 className="sr-only">커뮤니티 검색</h1>
      <Suspense fallback={<SearchHeaderFallback />}>
        <SearchHeaderSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={null}>
        <SearchBody searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
