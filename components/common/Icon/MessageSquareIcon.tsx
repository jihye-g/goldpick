import type { IconProps } from "./types";

// Figma: message-square — 게시글 카드 댓글 수 (13px 채움형)
export function MessageSquareIcon(props: IconProps) {
  return (
    <svg width={13} height={13} viewBox="0 0 13 13" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.61739 11.7L6.33044 8.98696H9.7C10.8046 8.98696 11.7 8.09152 11.7 6.98696V3.3C11.7 2.19543 10.8046 1.3 9.7 1.3H3.3C2.19543 1.3 1.3 2.19543 1.3 3.3V6.98696C1.3 8.09153 2.19543 8.98696 3.3 8.98696H3.61739V11.7Z" />
    </svg>
  );
}
