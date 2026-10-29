"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "홈", href: "/root" },
  { label: "커뮤니티", href: "/community" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-lg items-center justify-between px-4">
        <Link href="/root" className="text-lg font-bold">골드픽</Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn("text-sm transition-colors hover:text-foreground",
                pathname === item.href ? "font-semibold text-foreground" : "text-muted-foreground"
              )}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={`/login?next=${encodeURIComponent(pathname)}`}
          className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          로그인
        </Link>
      </div>
    </header>
  );
}
