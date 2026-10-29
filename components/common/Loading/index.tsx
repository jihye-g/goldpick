import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Figma: Loading Type=Spinner (1042:550) — 16px 점 3개(골드 3단계), gap 28, 0.2s씩 늦게 튀어오름
const DOTS = [
  { color: "bg-primary-pressed", delay: "[animation-delay:0ms]" },
  { color: "bg-primary-hover", delay: "[animation-delay:200ms]" },
  { color: "bg-primary", delay: "[animation-delay:400ms]" },
] as const;

export function LoadingDots({ label = "불러오는 중", className }: { label?: string; className?: string }) {
  return (
    <div role="status" aria-label={label} className={cn("flex items-center gap-[28px] px-[8px] py-[12px]", className)}>
      {DOTS.map(({ color, delay }) => (
        <span key={color} className={cn("size-[16px] rounded-full opacity-60 animate-loading-dot motion-reduce:animate-none", color, delay)} />
      ))}
    </div>
  );
}

// Figma: Loading Type=Skeleton (1056:981) — 14h 막대 3줄(160/200/120), gap 8, 모서리 4
const SKELETON_WIDTHS = ["w-[160px]", "w-[200px]", "w-[120px]"] as const;

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div role="status" aria-label="불러오는 중" className={cn("flex flex-col items-start gap-[8px]", className)}>
      {SKELETON_WIDTHS.map((width) => (
        <Skeleton key={width} className={cn("h-[14px] max-w-full rounded-[4px] bg-bg-muted", width)} />
      ))}
    </div>
  );
}

// 페이지 전체 로딩 — 가운데 점 3개
export function LoadingPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingDots />
    </div>
  );
}
