import { SearchField } from "@/components/common/SearchField";
import { BackButton } from "@/components/common/TopAppBar/BackButton";
import { SEARCH_PLACEHOLDER } from "@/components/features/community/constants";
import { parseKeyword } from "@/components/features/community/searchParams";
import { SearchHeader } from "./SearchHeader";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// 검색어가 바뀔 때마다(새 검색·최근 검색어·뒤로가기) key 로 다시 마운트해 입력창 값을 URL 과 맞춘다
export async function SearchHeaderSection({ searchParams }: { searchParams: SearchParams }) {
  const q = parseKeyword((await searchParams).q);
  return <SearchHeader key={q ?? ""} defaultQuery={q} />;
}

// searchParams 를 읽는 동안 보여줄 빈 검색창 — 입력은 받지 않는다
export function SearchHeaderFallback() {
  return (
    <header className="flex h-[56px] shrink-0 items-center gap-[10px] bg-bg-surface px-[16px]">
      <BackButton href="/community" />
      <SearchField readOnly tabIndex={-1} aria-hidden placeholder={SEARCH_PLACEHOLDER} className="min-w-0 flex-1" />
    </header>
  );
}
