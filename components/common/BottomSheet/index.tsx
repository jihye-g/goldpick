"use client";

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

// Figma: BottomSheet (1058:966) — 위 모서리 16 · 좌우 20 · 위 12/아래 16 · 손잡이 120×6 · 제목 18/Bold
export function BottomSheet({ open, onOpenChange, title, description, children, className }: BottomSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn(
          "items-center gap-[20px] rounded-t-[16px] border-t-0 bg-bg-surface px-[20px] pt-[12px] pb-[16px] text-text-primary shadow-sheet",
          className
        )}
      >
        <div aria-hidden className="h-[6px] w-[120px] shrink-0 rounded-full bg-border-strong" />
        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex w-full flex-col gap-[12px]">
            <SheetTitle className="text-18 font-bold text-text-primary">{title}</SheetTitle>
            {description && (
              <SheetDescription className="text-14 text-text-secondary">{description}</SheetDescription>
            )}
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// 바텀시트 메뉴 한 줄 (예: 신고하기 · 차단하기) — 44h, 16/Regular
export function BottomSheetItem({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn("flex h-[44px] w-full items-center text-left text-16 text-text-primary", className)}
      {...props}
    />
  );
}
