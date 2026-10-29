"use client";

import { useId } from "react";
import { Checkbox as UICheckbox } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof UICheckbox>;

// Figma: Checkbox — 20px · 모서리 4 · 테두리 1.5, 체크/부분선택은 primary 채움 + 흰 표시
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <UICheckbox
      className={cn(
        "group/checkbox size-[20px] rounded-[4px] border-[1.5px] border-border-default bg-bg-surface after:hidden",
        "data-checked:border-transparent data-checked:bg-primary data-checked:text-text-inverse",
        "data-indeterminate:border-transparent data-indeterminate:bg-primary data-indeterminate:text-text-inverse",
        "disabled:opacity-100 data-disabled:border-bg-muted data-disabled:data-checked:bg-bg-muted",
        className
      )}
      indicator={
        <>
          <CheckIcon className="size-[24px] group-data-indeterminate/checkbox:hidden" />
          <span className="hidden h-[2px] w-[12px] rounded-[1px] bg-bg-surface group-data-indeterminate/checkbox:block" />
        </>
      }
      {...props}
    />
  );
}

type CheckboxFieldProps = CheckboxProps & {
  label: string;
  /** 오른쪽 끝 보조 문구 */
  caption?: string;
};

// Figma: checkbox_label — 체크박스 + 라벨(14/Medium, gap 6) + 선택 캡션(13/Regular)
export function CheckboxField({ label, caption, className, id, ...props }: CheckboxFieldProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;
  return (
    <div className={cn("flex items-center gap-[8px]", className)}>
      <label htmlFor={checkboxId} className="flex min-w-0 flex-1 items-center gap-[6px]">
        <Checkbox id={checkboxId} {...props} />
        <span className="text-14 font-medium text-text-primary">{label}</span>
      </label>
      {caption && <span className="shrink-0 text-13 text-text-secondary">{caption}</span>}
    </div>
  );
}
