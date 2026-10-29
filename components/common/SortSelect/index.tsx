"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

export interface SortOption<T extends string = string> {
  value: T;
  label: string;
}

interface SortSelectProps<T extends string> {
  options: readonly SortOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}

// Figma: SortSelect (Default/Open) + Dropdown Option List — 열리면 primary-subtle 배경·골드 테두리, 화살표 뒤집힘
export function SortSelect<T extends string>({ options, value, onValueChange, className }: SortSelectProps<T>) {
  const current = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group flex min-w-[78px] items-center gap-[4px] rounded-md border border-border-default bg-bg-surface py-[8px] pr-[12px] pl-[16px] text-13 font-medium text-text-primary outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary data-popup-open:border-primary data-popup-open:bg-primary-subtle data-popup-open:text-price",
          className
        )}
      >
        <span className="flex-1 text-left">{current?.label}</span>
        <ChevronDownIcon className="size-[14px] text-text-tertiary group-data-popup-open:rotate-180 group-data-popup-open:text-price" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[120px] min-w-0 rounded-[8px] bg-bg-surface p-0 py-[4px] shadow-none ring-0 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.08)]"
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onValueChange(option.value)}
              aria-checked={selected}
              className={cn(
                "h-[40px] rounded-none px-[12px] py-0 text-14 text-text-primary focus:bg-bg-muted focus:text-text-primary",
                selected && "bg-warning-subtle font-semibold text-price focus:bg-warning-subtle focus:text-price"
              )}
            >
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 게시글상세 댓글 정렬처럼 옵션을 글자로 나란히 두는 형태 — 현재 값은 진하게, 나머지는 흐리게
export function SortTabs<T extends string>({ options, value, onValueChange, className }: SortSelectProps<T>) {
  return (
    <div role="radiogroup" aria-label="정렬" className={cn("flex items-center gap-[6px]", className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "text-13 font-medium whitespace-nowrap",
              selected ? "text-text-primary" : "text-text-tertiary"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
