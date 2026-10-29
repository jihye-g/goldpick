import type { IconProps } from "./types";

// Figma: Bottom Navigation · user (MY 탭) — 24px 프레임 안 18px 벡터를 24 좌표로 옮김
export function UserIcon(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M17.2506 18.75V17.25C17.2506 16.4544 16.9345 15.6913 16.3718 15.1287C15.8091 14.5661 15.046 14.25 14.2503 14.25H9.74974C8.954 14.25 8.19085 14.5661 7.62818 15.1287C7.06551 15.6913 6.7494 16.4544 6.7494 17.25V18.75M15.0003 8.25C15.0003 9.90685 13.657 11.25 12 11.25C10.34296 11.25 8.99966 9.90685 8.99966 8.25C8.99966 6.59315 10.34296 5.25 12 5.25C13.657 5.25 15.0003 6.59315 15.0003 8.25Z" />
    </svg>
  );
}
