import { cva, type VariantProps } from "class-variance-authority";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Figma: IconButton — 44px(p-10, 눌림 시 gray/200 원형 배경, 비활성 40%)
// compact: 앱바 트레일링처럼 24px 아이콘 자리를 그대로 차지해야 할 때
const iconButtonVariants = cva(
  "rounded-full bg-transparent p-0 text-text-primary hover:bg-transparent disabled:opacity-40 active:not-aria-[haspopup]:translate-y-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      size: {
        default: "size-[44px] p-[10px] active:bg-border-default",
        compact: "size-[24px] active:opacity-60",
      },
    },
    defaultVariants: { size: "default" },
  }
);

type IconButtonProps = Omit<React.ComponentProps<typeof UIButton>, "variant" | "size" | "aria-label"> &
  VariantProps<typeof iconButtonVariants> & {
    /** 아이콘만 있는 버튼이라 스크린리더용 이름이 필수 */
    label: string;
  };

export function IconButton({ size, label, className, ...props }: IconButtonProps) {
  return <UIButton variant="ghost" aria-label={label} className={cn(iconButtonVariants({ size }), className)} {...props} />;
}
