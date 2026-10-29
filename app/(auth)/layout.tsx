import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-16">
      <Link href="/root" className="text-2xl font-bold">골드픽</Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
