import { createCn } from "cn/config";

// globals.css @theme 의 text-11 … text-32 를 글자 크기로 알려준다 (안 그러면 text-13 을 색상으로 보고 text-primary 와 합칠 때 지운다)
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["11", "12", "13", "14", "15", "16", "18", "20", "24", "28", "32"] }],
    },
  },
});

export function formatDate(value: string | number | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  }).format(new Date(value));
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// "방금 전" · "3분 전" · "1시간 전" · "어제" · "3일 전", 일주일 넘으면 날짜
export function formatRelativeTime(value: string | number | Date, now: number = Date.now()) {
  const diff = now - new Date(value).getTime();
  if (diff < MINUTE) return "방금 전";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}분 전`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}시간 전`;
  if (diff < 2 * DAY) return "어제";
  if (diff < 7 * DAY) return `${Math.floor(diff / DAY)}일 전`;
  return formatDate(value);
}
