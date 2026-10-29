import type { IconProps } from "./types";

// Figma: Bottom Navigation · calendar (예약 탭) — 24px 프레임 안 18px 벡터를 24 좌표로 옮김
export function CalendarIcon(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M9 4.4994V5.99952M9 5.99952V7.49964M9 5.99952H6.75C5.92157 5.99952 5.25 6.67115 5.25 7.49964V10.49988M9 5.99952H15M15 4.4994V5.99952M15 5.99952V7.49964M15 5.99952H17.25C18.0784 5.99952 18.75 6.67115 18.75 7.49964V10.49988M5.25 10.49988H18.75M5.25 10.49988V18.0005C5.25 18.829 5.92157 19.5006 6.75 19.5006H17.25C18.0784 19.5006 18.75 18.829 18.75 18.0005V10.49988" />
    </svg>
  );
}
