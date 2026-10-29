"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const SIBLINGS = 2;

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  const start = Math.max(2, current - SIBLINGS);
  const end = Math.min(total - 1, current + SIBLINGS);
  const items: (number | "ellipsis")[] = [1];
  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < total - 1) items.push("ellipsis");
  if (total > 1) items.push(total);
  return items;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="페이지 이동" className={cn("flex items-center justify-center gap-1", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="이전 페이지"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      {getPageItems(currentPage, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={item}
            variant={item === currentPage ? "default" : "ghost"}
            size="icon"
            aria-current={item === currentPage ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        )
      )}
      <Button
        variant="ghost"
        size="icon"
        aria-label="다음 페이지"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
