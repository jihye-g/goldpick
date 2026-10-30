import { CloseIcon, SearchIcon } from "@/components/common/Icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  /** 지우기(×) 버튼 클릭 — 넘기면 showClear 일 때 버튼이 보인다 */
  onClear?: () => void;
  /** 입력값이 있을 때 true */
  showClear?: boolean;
  containerClassName?: string;
};

// Figma: SearchField (2073:1132) — 44h 알약 · canvas 배경 · 좌 16 / 우 14(지우기 있을 때) · gap 8
// 검색 아이콘 20px secondary, 값 14/Medium, 지우기 18px tertiary. 폼(제출)은 쓰는 쪽에서 감싼다.
export function SearchBar({ onClear, showClear = false, containerClassName, className, ...props }: SearchBarProps) {
  const clearVisible = showClear && onClear;

  return (
    <div
      className={cn(
        "flex h-[44px] w-full items-center gap-[8px] rounded-full bg-bg-canvas pl-[16px] focus-within:ring-1 focus-within:ring-primary",
        clearVisible ? "pr-[14px]" : "pr-[16px]",
        containerClassName
      )}
    >
      <SearchIcon className="size-[20px] shrink-0 text-text-secondary" />
      <Input
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        className={cn(
          "h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-14 font-medium text-text-primary placeholder:text-text-tertiary md:text-14",
          "focus-visible:ring-0 dark:bg-transparent [&::-webkit-search-cancel-button]:appearance-none",
          className
        )}
        {...props}
      />
      {clearVisible && (
        <button type="button" onClick={onClear} aria-label="검색어 지우기" className="shrink-0 text-text-tertiary">
          <CloseIcon className="size-[18px]" />
        </button>
      )}
    </div>
  );
}
