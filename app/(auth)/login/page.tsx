import { Suspense } from "react";
import { TopAppBar } from "@/components/common/TopAppBar";
import { LoginForm } from "./components/LoginForm";

// Figma: 02b_이메일 로그인 (1791:807)
export default function LoginPage() {
  return (
    <>
      <TopAppBar showBack />
      <main className="flex flex-1 flex-col gap-[12px]">
        <div className="flex flex-col gap-[2px] px-[16px] py-[8px]">
          <h1 className="text-20 font-bold text-text-primary">
            이메일로
            <br />
            로그인해 주세요
          </h1>
          <p className="text-14 font-semibold text-text-secondary">가입하신 이메일 주소가 아이디예요</p>
        </div>
        {/* useSearchParams를 쓰는 Client Component는 Suspense 경계가 필요 */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
