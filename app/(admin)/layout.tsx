import { Sidebar } from "@/components/layout/Sidebar";

const adminNav = [
  { label: "대시보드", href: "/admin/dashboard" },
  { label: "회원 관리", href: "/admin/users" },
  { label: "콘텐츠 관리", href: "/admin/contents" },
  { label: "통계", href: "/admin/status" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Admin" items={adminNav} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
