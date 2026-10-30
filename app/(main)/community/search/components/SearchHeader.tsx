"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { SearchField } from "@/components/common/SearchField";
import { BackButton } from "@/components/common/TopAppBar/BackButton";
import { KEYWORD_MAX_LENGTH, SEARCH_PLACEHOLDER } from "@/components/features/community/constants";
import { communitySearchHref } from "@/components/features/community/searchParams";
import { searchSchema, type SearchFormValues } from "@/components/forms/schema/community";
import { useHydrateRecentSearches, useRecentSearchStore } from "@/stores/recentSearchStore";

// Figma: SearchHeader (3924:9774) — 56h, 뒤로 24 · gap 10 · SearchField
// 뒤로는 항상 /community — 공유 링크로 바로 들어와도 앱 밖으로 나가지 않게
// 제출하면 카테고리·정렬은 초기화하고 새 검색어로 이동, 빈 값은 에러 문구 없이 무시한다
export function SearchHeader({ defaultQuery }: { defaultQuery?: string }) {
  const router = useRouter();
  useHydrateRecentSearches();
  const addRecentSearch = useRecentSearchStore((s) => s.add);
  const { register, handleSubmit, setValue, setFocus, control } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { q: defaultQuery ?? "" },
  });
  const q = useWatch({ control, name: "q" });

  const onSubmit = ({ q }: SearchFormValues) => {
    addRecentSearch(q);
    router.push(communitySearchHref({ q }));
  };

  return (
    <header className="flex h-[56px] shrink-0 items-center gap-[10px] bg-bg-surface px-[16px]">
      <BackButton href="/community" />
      <form role="search" onSubmit={handleSubmit(onSubmit)} className="min-w-0 flex-1">
        <SearchField
          {...register("q")}
          // 서버 HTML 에도 검색어가 보이게 — RHF 는 하이드레이션 후에야 값을 넣는다
          defaultValue={defaultQuery}
          aria-label="게시글 검색"
          placeholder={SEARCH_PLACEHOLDER}
          maxLength={KEYWORD_MAX_LENGTH}
          autoFocus={!defaultQuery}
          showClear={!!q}
          onClear={() => {
            setValue("q", "");
            setFocus("q");
          }}
        />
      </form>
    </header>
  );
}
