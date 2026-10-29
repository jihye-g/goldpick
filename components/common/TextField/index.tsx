import { useId } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const fieldStatus = {
  default: "border-border-default focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
  error: "border-error",
  success: "border-success",
} as const;

const captionStatus = {
  default: "text-text-secondary",
  error: "text-error-text",
  success: "text-success-text",
} as const;

type TextFieldProps = React.ComponentProps<typeof Input> & {
  label?: string;
  /** 라벨 옆 빨간 * 표시 */
  required?: boolean;
  /** 아래 안내·오류 문구 */
  caption?: string;
  /** 오른쪽 아래 글자 수 (예: "12/50") */
  counter?: string;
  status?: keyof typeof fieldStatus;
  /** 입력칸 안 왼쪽 18px 아이콘 */
  leadingIcon?: React.ReactNode;
  /** 입력칸 안 오른쪽 아이콘·단위(예: "원") */
  trailing?: React.ReactNode;
  /** 입력칸 바깥 오른쪽 버튼 (예: 인증요청) */
  action?: React.ReactNode;
  /** outline: 기본 입력칸 · filled: 댓글 입력바처럼 테두리 없는 회색 알약 */
  variant?: "outline" | "filled";
  containerClassName?: string;
};

// Figma: Input — 라벨 14/Medium · 필드 48h 모서리 12 · 값 15/Medium · 캡션 13/Regular
// 포커스 2px 테두리는 레이아웃이 밀리지 않게 1px 테두리 + 1px ring으로 표현
// filled — Figma: CommentInputBar Field (3090:1895) 46h · p 16 · 완전 둥근 모서리 · 16/SemiBold
export function TextField({
  variant = "outline",
  label,
  required,
  caption,
  counter,
  status = "default",
  leadingIcon,
  trailing,
  action,
  disabled,
  id,
  className,
  containerClassName,
  ...props
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const captionId = caption ? `${inputId}-caption` : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-[6px]", containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="flex items-start gap-[2px] font-medium">
          <span className="text-14 text-text-primary">{label}</span>
          {required && <span className="text-13 text-error-text">*</span>}
        </label>
      )}
      <div className="flex w-full items-start gap-[6px]">
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-[8px] text-text-tertiary",
            variant === "filled"
              ? "h-[46px] rounded-full bg-bg-muted p-[16px] focus-within:ring-1 focus-within:ring-primary"
              : cn("h-[48px] rounded-lg border bg-bg-surface px-[16px] py-[12px]", disabled ? "border-border-default bg-bg-muted" : fieldStatus[status])
          )}
        >
          {leadingIcon && <span className="flex shrink-0 [&_svg]:size-[18px]">{leadingIcon}</span>}
          <Input
            id={inputId}
            disabled={disabled}
            aria-invalid={status === "error" || undefined}
            aria-describedby={captionId}
            className={cn(
              "h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-text-primary placeholder:text-text-tertiary",
              variant === "filled"
                ? "text-16 font-semibold md:text-16"
                : "text-15 font-medium md:text-15",
              "focus-visible:ring-0 aria-invalid:ring-0 disabled:bg-transparent disabled:opacity-100 dark:bg-transparent",
              className
            )}
            {...props}
          />
          {trailing && (
            <span className="flex shrink-0 items-center text-15 font-medium text-text-primary [&_svg]:size-[18px] [&_svg]:text-text-tertiary">
              {trailing}
            </span>
          )}
        </div>
        {action}
      </div>
      {(caption || counter) && (
        <div className="flex w-full items-center justify-between gap-[8px]">
          <p id={captionId} className={cn("text-13", captionStatus[status])}>
            {caption}
          </p>
          {counter && <span className="shrink-0 text-12 text-text-tertiary">{counter}</span>}
        </div>
      )}
    </div>
  );
}
