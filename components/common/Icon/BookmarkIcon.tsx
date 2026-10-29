import { useId } from "react";
import type { IconProps } from "./types";

const OUTLINE_PATH =
  "M12 18.775L7.2 20.7892C6.4381 21.1063 5.71429 21.0458 5.02857 20.6079C4.34286 20.17 4 19.5497 4 18.747V4.22755C4 3.61208 4.224 3.08539 4.672 2.64748C5.12 2.20956 5.65791 1.99023 6.28571 1.98948H17.7143C18.3429 1.98948 18.8811 2.20882 19.3291 2.64748C19.7771 3.08614 20.0008 3.61283 20 4.22755V18.747C20 19.549 19.6571 20.1693 18.9714 20.6079C18.2857 21.0466 17.5619 21.107 16.8 20.7892L12 18.775Z";

interface BookmarkIconProps extends IconProps {
  /** true: 채움형(게시글 카드 북마크 수), false: 외곽선형(상세 앱바) */
  filled?: boolean;
  /** 앱바 북마크 켜짐 — 24px 외곽선과 같은 모양을 채운다 (Figma에 켜짐 상태가 없어 외곽선 path를 채움) */
  active?: boolean;
}

// Figma: Bookmark (1459:7495) — 외곽선은 Figma의 안쪽 선(inside stroke 2px)을 clipPath로 재현
export function BookmarkIcon({ filled = false, active = false, ...props }: BookmarkIconProps) {
  const clipId = useId();

  if (active) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d={OUTLINE_PATH} />
      </svg>
    );
  }

  if (filled) {
    return (
      <svg width={24} height={24} viewBox="0 0 13 13" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M6.5 9.75L4.225 10.725C3.86389 10.8785 3.52083 10.8492 3.19583 10.6372C2.87083 10.4253 2.70833 10.125 2.70833 9.73646V2.70833C2.70833 2.41042 2.8145 2.15547 3.02683 1.9435C3.23917 1.73153 3.49411 1.62536 3.79167 1.625H9.20833C9.50625 1.625 9.76138 1.73117 9.97371 1.9435C10.186 2.15583 10.292 2.41078 10.2917 2.70833V9.73646C10.2917 10.1247 10.1292 10.4249 9.80417 10.6372C9.47917 10.8496 9.13611 10.8788 8.775 10.725L6.5 9.75Z" />
      </svg>
    );
  }

  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <clipPath id={clipId}>
        <path d={OUTLINE_PATH} />
      </clipPath>
      <path d={OUTLINE_PATH} stroke="currentColor" strokeWidth={4} clipPath={`url(#${clipId})`} />
    </svg>
  );
}
