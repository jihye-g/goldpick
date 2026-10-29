import { cn } from "@/lib/utils";

export type ToastTone = "neutral" | "success" | "warning" | "error" | "info";

// Figma: Toast Leading (18px) — 색 원 + 진한 선 기호. success·info 원 색은 토큰에 없는 Figma 값.
const CIRCLE = "M2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9Z";

const ICONS: Record<Exclude<ToastTone, "neutral">, { fill: string; mark: string }> = {
  success: { fill: "fill-[#2f8f66]", mark: "M11.3565 7.48725L8.15625 10.6875L7.06537 9.59662" },
  warning: { fill: "fill-warning", mark: "M9 9V5.625M9 11.5016V11.5312" },
  error: { fill: "fill-error", mark: "M11.3865 6.61352L6.61351 11.3865M11.3865 11.3865L6.61351 6.61351" },
  info: { fill: "fill-[#4a72a3]", mark: "M9 9L9 12.375M9 6.49841V6.46875" },
};

export function ToastStatusIcon({ tone, className }: { tone: Exclude<ToastTone, "neutral">; className?: string }) {
  const { fill, mark } = ICONS[tone];
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d={CIRCLE} className={fill} />
      <path d={`${mark}${CIRCLE}`} className="stroke-text-primary" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
