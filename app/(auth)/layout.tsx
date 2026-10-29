// 모바일 전체 화면 레이아웃 — 각 화면이 상단 바·하단 CTA를 직접 배치한다
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-bg-surface">{children}</div>;
}
