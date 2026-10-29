import { cva, type VariantProps } from "class-variance-authority";
import { Badge as UIBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Figma: Badge (952:4818) — Tone 6 × Style 3, 12/Medium, px 8 · py 2, 완전 둥근 모서리
const badgeVariants = cva("h-auto gap-0 rounded-full px-[8px] py-[2px] text-12 font-medium", {
  variants: {
    tone: { neutral: "", primary: "", success: "", warning: "", error: "", info: "" },
    variant: {
      subtle: "border-transparent",
      solid: "border-transparent text-text-inverse",
      outline: "bg-bg-surface",
    },
  },
  compoundVariants: [
    { tone: "neutral", variant: "subtle", className: "bg-bg-muted text-text-secondary" },
    { tone: "primary", variant: "subtle", className: "bg-primary-subtle text-primary-pressed" },
    { tone: "success", variant: "subtle", className: "bg-success-subtle text-success-text" },
    { tone: "warning", variant: "subtle", className: "bg-warning-subtle text-warning-text" },
    { tone: "error", variant: "subtle", className: "bg-error-subtle text-error-text" },
    { tone: "info", variant: "subtle", className: "bg-info-subtle text-info" },

    { tone: "neutral", variant: "solid", className: "bg-text-secondary" },
    { tone: "primary", variant: "solid", className: "bg-primary text-text-primary" },
    { tone: "success", variant: "solid", className: "bg-success-text" },
    { tone: "warning", variant: "solid", className: "bg-warning-text" },
    { tone: "error", variant: "solid", className: "bg-error-text" },
    { tone: "info", variant: "solid", className: "bg-info" },

    { tone: "neutral", variant: "outline", className: "border-text-secondary text-text-secondary" },
    { tone: "primary", variant: "outline", className: "border-primary-pressed text-primary-pressed" },
    { tone: "success", variant: "outline", className: "border-success-text text-success-text" },
    { tone: "warning", variant: "outline", className: "border-warning-text text-warning-text" },
    { tone: "error", variant: "outline", className: "border-error-text text-error-text" },
    { tone: "info", variant: "outline", className: "border-info text-info" },
  ],
  defaultVariants: { tone: "neutral", variant: "subtle" },
});

type BadgeProps = Omit<React.ComponentProps<typeof UIBadge>, "variant"> & VariantProps<typeof badgeVariants>;

export function Badge({ tone, variant, className, ...props }: BadgeProps) {
  return <UIBadge className={cn(badgeVariants({ tone, variant }), className)} {...props} />;
}
