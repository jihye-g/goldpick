import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  /** 위쪽 일러스트 — 보통 <Icon3D name="no-posts" /> */
  icon?: React.ReactNode;
  /** 아래 CTA — 보통 <Button size="M"> */
  action?: React.ReactNode;
  className?: string;
}

// Figma: EmptyState (2063:1119) — p 16 · gap 8, 제목 20/Bold · 설명 14/SemiBold tertiary (295w 가운데 정렬)
export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-[8px] p-[16px] text-center", className)}>
      {icon && <div className="flex items-center justify-center text-text-tertiary">{icon}</div>}
      <div className="flex flex-col items-center gap-[6px]">
        <div className="flex w-[295px] max-w-full flex-col gap-px">
          <p className="text-20 font-bold text-text-primary">{title}</p>
          {description && <p className="text-14 font-semibold text-text-tertiary">{description}</p>}
        </div>
        {action && <div className="flex items-center justify-center">{action}</div>}
      </div>
    </div>
  );
}
