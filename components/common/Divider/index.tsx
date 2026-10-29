import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DividerProps = React.ComponentProps<typeof Separator> & {
  /** line: 1px 구분선(divider 색) · band: 8px 구역 띠(게시글상세 본문/댓글 사이) */
  variant?: "line" | "band";
};

// Figma: Divider (1061:604/606) + SectionBand
export function Divider({ variant = "line", orientation = "horizontal", className, ...props }: DividerProps) {
  return (
    <Separator
      orientation={orientation}
      className={cn(variant === "band" ? "h-[8px] bg-bg-muted data-horizontal:h-[8px]" : "bg-divider", className)}
      {...props}
    />
  );
}
