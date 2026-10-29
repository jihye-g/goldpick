import type { IconProps } from "./types";

// Figma: chevron-left (410:1582) — 뒤로
export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 17L10 12L15 7" />
    </svg>
  );
}
