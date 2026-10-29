"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon, HomeIcon, MessageCircleIcon, UserIcon, UsersIcon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

// TODO: 예약·채팅·MY 페이지가 생기면 실제 경로로 교체
const NAV_ITEMS = [
  { href: "/", label: "홈", icon: HomeIcon },
  { href: "/reservations", label: "예약", icon: CalendarIcon },
  { href: "/community", label: "커뮤니티", icon: UsersIcon },
  { href: "/chat", label: "채팅", icon: MessageCircleIcon },
  { href: "/my", label: "MY", icon: UserIcon },
] as const;

interface BottomNavigationProps {
  /** 채팅 탭 안 읽음 빨간 점 */
  chatBadge?: boolean;
  className?: string;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

// Figma: Bottom Navigation — 흰 알약(px 8 · py 10) 안 탭 5개, 현재 탭은 canvas 배경 + primary 아이콘
export function BottomNavigation({ chatBadge = false, className }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="주요 메뉴"
      className={cn("bg-linear-to-b from-bg-surface/0 to-bg-surface px-[16px] pt-[10px] pb-[12px]", className)}
    >
      <ul className="flex items-center justify-between rounded-full bg-bg-surface px-[8px] py-[10px] drop-shadow-[0px_4px_6px_rgba(0,0,0,0.08)]">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          const isCommunity = href === "/community";
          return (
            <li key={href} className="min-w-0 flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex flex-col items-center gap-[2px] rounded-full py-[8px]",
                  active && "bg-bg-canvas"
                )}
              >
                <span
                  className={cn(
                    "flex size-[24px] items-center justify-center transition-transform group-active:scale-[0.96]",
                    active ? "text-primary" : "text-text-tertiary",
                    isCommunity && "drop-shadow-[0px_4px_4px_rgba(255,199,44,0.3)]"
                  )}
                >
                  {href === "/chat" ? (
                    <MessageCircleIcon badge={chatBadge} className="size-[24px]" />
                  ) : (
                    <Icon className={isCommunity ? "size-[20px]" : "size-[24px]"} />
                  )}
                </span>
                <span
                  className={cn(
                    "text-11 whitespace-nowrap",
                    active ? "font-bold text-primary-pressed" : "font-medium text-text-tertiary"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
