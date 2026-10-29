import { Sidebar } from "@/components/layout/Sidebar";

const providerNav = [
  { label: "대시보드", href: "/provider/dashboard" },
  { label: "내 콘텐츠", href: "/provider/contents" },
  { label: "통계", href: "/provider/status" },
  { label: "설정", href: "/provider/settings" },
];

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Provider" items={providerNav} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
