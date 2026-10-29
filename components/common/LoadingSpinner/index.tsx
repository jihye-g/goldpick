import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
} as const;

interface LoadingSpinnerProps {
  size?: keyof typeof sizes;
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label="로딩 중"
      className={cn("animate-spin text-muted-foreground", sizes[size], className)}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
