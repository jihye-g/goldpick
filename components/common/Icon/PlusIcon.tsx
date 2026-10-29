import type { IconProps } from "./types";

// Figma: plus-02 — FAB 글쓰기
export function PlusIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M10 5V10M10 10L10 15M10 10H15M10 10L5 10" />
    </svg>
  );
}
