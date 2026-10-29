import Image from "next/image";
import { cn } from "@/lib/utils";

// Figma: 3D icon (2144:51737) — 멀티컬러 PNG라 public/icons/3d/ 에 파일로 둔다.
const SIZES = {
  square: { width: 113, height: 113 },
  wide: { width: 113, height: 101 },
  status: { width: 113, height: 107 },
} as const;

const ICONS = {
  message: "square",
  block: "square",
  "no-saved-posts": "square",
  "no-saved-items": "square",
  "no-saved-stores": "square",
  "no-search-results": "square",
  "no-location-permission": "square",
  "no-reservation-history": "square",
  "no-new-notifications": "square",
  "no-registered-products": "square",
  "no-reviews-written": "square",
  "unstable-connection": "square",
  "temporary-error": "square",
  "no-posts": "square",
  "quote-request-sent": "square",
  "re-enrollment-not-permitted": "square",
  "account-deletion": "square",
  sun: "square",
  "no-photo": "wide",
  loading: "wide",
  "no-camera": "wide",
  "no-date": "wide",
  lock: "wide",
  success: "status",
  error: "status",
  info: "status",
  question: "status",
} as const satisfies Record<string, keyof typeof SIZES>;

export type Icon3DName = keyof typeof ICONS;

interface Icon3DProps {
  name: Icon3DName;
  /** 스크린리더용 설명. 비우면 장식용 이미지로 처리 */
  alt?: string;
  className?: string;
}

export function Icon3D({ name, alt = "", className }: Icon3DProps) {
  const { width, height } = SIZES[ICONS[name]];
  return <Image src={`/icons/3d/${name}.png`} alt={alt} width={width} height={height} className={cn("shrink-0", className)} />;
}
