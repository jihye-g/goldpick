import { cva, type VariantProps } from "class-variance-authority";
import { CloseIcon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

// Figma: FilterChip (952:5068) — 기본/비활성은 테두리 + 넓은 좌우 여백, 선택은 테두리 없이 좁은 여백
const filterChipVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full text-center font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        L: "min-w-[66px] gap-[4px] py-[8px] text-14",
        M: "min-w-[60px] gap-[4px] py-[6px] text-13",
        S: "min-w-[53px] gap-[3px] py-[4px] text-12",
      },
      state: {
        default: "border border-border-default bg-bg-surface text-text-secondary",
        selected: "bg-primary text-text-primary",
        secondary: "bg-primary-pressed text-text-inverse",
        disabled: "border border-border-default bg-bg-muted text-text-tertiary",
      },
    },
    compoundVariants: [
      { size: "L", state: ["default", "disabled"], className: "px-[16px]" },
      { size: "L", state: ["selected", "secondary"], className: "px-[12px]" },
      { size: "M", state: ["default", "disabled"], className: "px-[14px]" },
      { size: "M", state: ["selected", "secondary"], className: "px-[10px]" },
      { size: "S", state: ["default", "disabled"], className: "px-[12px]" },
      { size: "S", state: ["selected", "secondary"], className: "px-[8px]" },
    ],
    defaultVariants: { size: "M", state: "default" },
  }
);

const removeIconSize = { L: "size-[14px]", M: "size-[13px]", S: "size-[12px]" } as const;

type FilterChipProps = Omit<React.ComponentProps<"button">, "children"> &
  Pick<VariantProps<typeof filterChipVariants>, "size"> & {
    label: string;
    selected?: boolean;
    /** 선택 시 진한 골드(primary-pressed) 배경 */
    tone?: "primary" | "secondary";
    /** 넘기면 라벨 오른쪽에 × 삭제 버튼이 붙는다 (Figma `삭제` — 최근 검색어 개별 삭제) */
    onRemove?: () => void;
  };

export function FilterChip({ label, size, selected = false, tone = "primary", disabled, onRemove, className, ...props }: FilterChipProps) {
  const state = disabled ? "disabled" : selected ? (tone === "secondary" ? "secondary" : "selected") : "default";

  // 버튼 안에 버튼을 둘 수 없어 칩 모양은 바깥 span 이 맡고, 라벨·× 를 각각 버튼으로 둔다
  if (onRemove) {
    return (
      <span className={cn(filterChipVariants({ size, state }), className)}>
        <button type="button" disabled={disabled} className="flex-1" {...props}>
          {label}
        </button>
        <button type="button" disabled={disabled} onClick={onRemove} aria-label={`${label} 삭제`} className="shrink-0">
          <CloseIcon className={removeIconSize[size ?? "M"]} />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      className={cn(filterChipVariants({ size, state }), className)}
      {...props}
    >
      {label}
    </button>
  );
}
