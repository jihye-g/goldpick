import type { IconProps } from "./types";

interface MessageCircleIconProps extends IconProps {
  /** 안 읽은 메시지 빨간 점 (아이콘 우상단, 24px 박스 밖으로 살짝 나감) */
  badge?: boolean;
}

// Figma: Bottom Navigation · message-circle (채팅 탭)
export function MessageCircleIcon({ badge = false, ...props }: MessageCircleIconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" overflow="visible" aria-hidden="true" {...props}>
      <path
        d="M5.24323 15.2564C5.35352 15.5347 5.37807 15.8395 5.31373 16.1318L4.51492 18.5994C4.48918 18.7246 4.49584 18.8542 4.53425 18.9761C4.57267 19.0979 4.64158 19.2079 4.73444 19.2957C4.8273 19.3835 4.94104 19.446 5.06486 19.4775C5.18869 19.509 5.3185 19.5083 5.44199 19.4755L8.00194 18.727C8.27775 18.6722 8.56339 18.6962 8.82626 18.796C10.4279 19.5439 12.2423 19.7022 13.9493 19.2428C15.6562 18.7834 17.1461 17.7359 18.156 16.2851C19.1659 14.8342 19.631 13.0733 19.4691 11.3131C19.3072 9.5528 18.5288 7.90627 17.2712 6.66397C16.0137 5.42168 14.3577 4.66346 12.5956 4.52309C10.8335 4.38273 9.07838 4.86923 7.64 5.89678C6.20161 6.92432 5.17237 8.42686 4.73386 10.1393C4.29534 11.8518 4.47574 13.6641 5.24323 15.2564Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {badge && <circle cx={23.2} cy={4.5} r={2.5} className="fill-error" />}
    </svg>
  );
}
