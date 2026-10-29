import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-screen-lg flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">내 주변 귀금속샵, 골드픽에서</h1>
      <p className="text-muted-foreground">가까운 귀금속샵을 찾고 시세와 후기를 한눈에 확인하세요.</p>
      <Link href="/community" className={buttonVariants({ size: "lg" })}>
        커뮤니티 둘러보기
      </Link>
    </section>
  );
}
