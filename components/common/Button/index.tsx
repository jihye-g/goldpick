import { cva, type VariantProps } from "class-variance-authority";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Figma: Button (952:4604) — L=48h/24px·16 · M=44h/20px·16 · S=36h/16px·14, 높이 고정
const buttonVariants = cva(
  "rounded-md border border-transparent font-bold disabled:opacity-100 active:not-aria-[haspopup]:translate-y-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-text-primary hover:bg-primary-hover disabled:bg-border-default disabled:text-text-tertiary",
        secondary:
          "border-border-default bg-bg-surface text-text-primary hover:bg-bg-muted disabled:bg-bg-muted disabled:text-text-tertiary",
        ghost: "bg-transparent text-text-primary hover:bg-bg-muted disabled:text-text-tertiary",
        danger: "bg-error text-text-inverse hover:bg-error/90 disabled:bg-border-default disabled:text-text-tertiary",
        "ghost-dark":
          "border-white/50 bg-white/10 text-text-inverse hover:bg-white/20 disabled:border-white/35 disabled:text-white/70",
      },
      size: {
        L: "h-[48px] px-[24px] text-16",
        M: "h-[44px] px-[20px] text-16",
        S: "h-[36px] px-[16px] text-14",
        // Figma: FAB/글쓰기 (2003:4292) — 80×44 알약, 20px 아이콘 + 14/SemiBold, shadow/md
        fab: "h-[44px] w-[80px] gap-0 rounded-full px-0 text-14 font-semibold shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] [&_svg:not([class*='size-'])]:size-[20px]",
      },
    },
    defaultVariants: { variant: "primary", size: "L" },
  }
);

type ButtonProps = Omit<React.ComponentProps<typeof UIButton>, "variant" | "size"> & VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <UIButton className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
