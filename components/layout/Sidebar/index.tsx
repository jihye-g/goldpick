"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  title: string;
  items: { label: string; href: string }[];
}

export function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-56 flex-shrink-0 border-r border-border bg-muted/40">
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
        <nav className="mt-4 space-y-1">
          {items.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn("block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-foreground",
                pathname.startsWith(item.href) ? "bg-accent font-medium text-foreground" : "text-muted-foreground"
              )}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
