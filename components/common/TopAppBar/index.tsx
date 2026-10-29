import { cn } from "@/lib/utils";
import { BackButton } from "./BackButton";

interface TopAppBarProps {
  title: string;
  /** 왼쪽 뒤로 가기 버튼 표시 */
  showBack?: boolean;
  /** 뒤로 가기 대상 경로. 없으면 브라우저 히스토리로 이동 */
  backHref?: string;
  /** 제목 오른쪽 보조 텍스트 (예: "히스토리") */
  caption?: React.ReactNode;
  /** 오른쪽 아이콘 0~2개 — IconButton size="compact" 사용 */
  actions?: React.ReactNode;
  className?: string;
}

// Figma: Top App Bar (1055:620) — 56h, 좌우 16, 뒤로 있으면 gap 4 / 없으면 gap 12, 트레일링 gap 8
export function TopAppBar({ title, showBack = false, backHref, caption, actions, className }: TopAppBarProps) {
  return (
    <header
      className={cn(
        "flex h-[56px] items-center bg-bg-surface px-[16px]",
        showBack ? "gap-[4px]" : "gap-[12px]",
        className
      )}
    >
      {showBack && <BackButton href={backHref} />}
      <h1 className="min-w-0 flex-1 truncate text-18 font-semibold text-text-primary">{title}</h1>
      {caption && <span className="shrink-0 text-14 font-medium text-text-secondary">{caption}</span>}
      {actions && <div className="flex shrink-0 items-center gap-[8px]">{actions}</div>}
    </header>
  );
}
