"use client";

import { ClearIcon, SearchIcon } from "@/components/common/Icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  /** 값이 있을 때 오른쪽 지우기(×) 버튼을 보여준다 */
  showClear?: boolean;
  onClear?: () => void;
};

// Figma: SearchField (2073:1132) — 44h 알약, canvas 배경, 돋보기 20 · 14/Medium · 지우기 18 (Filled 상태는 pr 14)
// 입력값은 부모(RHF register 등)가 관리하고, 지우기 버튼 표시 여부만 showClear 로 받는다
export function SearchField({ showClear = false, onClear, className, ...props }: SearchFieldProps) {
  return (
    <div
      className={cn(
        "flex h-[44px] items-center gap-[8px] rounded-full bg-bg-canvas pl-[16px]",
        showClear ? "pr-[14px]" : "pr-[16px]",
        className
      )}
    >
      <SearchIcon className="size-[20px] shrink-0 text-text-secondary" />
      <Input
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        className="h-auto flex-1 rounded-none border-0 bg-transparent p-0 text-14 font-medium text-text-primary placeholder:text-text-tertiary focus-visible:ring-0 md:text-14 dark:bg-transparent [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      {showClear && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={onClear}
          className="flex shrink-0 items-center justify-center text-text-tertiary"
        >
          <ClearIcon className="size-[18px]" />
        </button>
      )}
    </div>
  );
}
