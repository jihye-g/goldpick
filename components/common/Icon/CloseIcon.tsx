import type { IconProps } from "./types";

// Figma: Clear — SearchField 지우기 · 삭제 칩 (18px 원본)
export function CloseIcon(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M13.5 4.5L9 9M9 9L4.5 13.5M9 9L13.5 13.5M9 9L4.5 4.5" />
    </svg>
  );
}
