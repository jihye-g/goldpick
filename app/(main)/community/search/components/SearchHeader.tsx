"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchBar } from "@/components/common/SearchBar";
import { BackButton } from "@/components/common/TopAppBar/BackButton";
import { communityHref } from "@/components/features/community/searchParams";
import { searchSchema, type SearchFormValues } from "@/components/forms/schema/community";
import { useToast } from "@/hooks/common";
import { useRecentSearchStore } from "@/stores/recentSearchStore";

// Figma: SearchHeader (3924:9774) — 56h surface, 뒤로가기 24px(left 16) · 검색창(left 50, 오른쪽 16)
// 검색어가 바뀌면 page.tsx 에서 key 로 다시 마운트해 입력값을 URL 과 맞춘다
export function SearchHeader({ keyword }: { keyword: string }) {
  const router = useRouter();
  const toast = useToast();
  const addRecentSearch = useRecentSearchStore((s) => s.add);
  const { register, handleSubmit, setValue, setFocus, control } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { keyword },
  });
  const currentKeyword = useWatch({ control, name: "keyword" });

  // 저장된 최근 검색어를 먼저 읽어야 add() 가 기존 목록을 덮어쓰지 않는다
  useEffect(() => {
    useRecentSearchStore.persist.rehydrate();
  }, []);

  const onSubmit = ({ keyword: next }: SearchFormValues) => {
    addRecentSearch(next);
    router.push(communityHref("/community/search", { q: next }));
  };

  const handleClear = () => {
    setValue("keyword", "");
    setFocus("keyword");
  };

  return (
    <header className="flex h-[56px] items-center gap-[10px] bg-bg-surface px-[16px]">
      <BackButton />
      <form
        role="search"
        className="min-w-0 flex-1"
        onSubmit={handleSubmit(onSubmit, (errors) => toast.show(errors.keyword?.message ?? "검색어를 확인해주세요."))}
      >
        <SearchBar
          {...register("keyword")}
          aria-label="커뮤니티 검색"
          placeholder="게시글 제목 · 내용 검색"
          maxLength={50}
          autoFocus={!keyword}
          showClear={!!currentKeyword}
          onClear={handleClear}
        />
      </form>
    </header>
  );
}
