"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAuthApiError } from "@supabase/supabase-js";
import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormValues } from "@/components/forms/schema/auth";
import { useLogin } from "@/hooks/reactquery/auth";
import { MAX_LOGIN_FAILURES, useLoginAttemptStore } from "@/stores/loginAttemptStore";

// 직전 화면이 없으면 메인으로 (정책서 3.2). 외부 URL로 튕기지 않도록 내부 경로만 허용
function getRedirectPath(next: string | null) {
  return next?.startsWith("/") && !next.startsWith("//") ? next : "/root";
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}분 ${seconds}초`;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: login, isPending } = useLogin();
  const lockedUntil = useLoginAttemptStore((s) => s.lockedUntil);
  const recordFailure = useLoginAttemptStore((s) => s.recordFailure);
  const resetAttempts = useLoginAttemptStore((s) => s.reset);
  const [now, setNow] = useState(() => Date.now());
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    useLoginAttemptStore.persist.rehydrate();
  }, []);

  // 잠금 중에는 1초마다 남은 시간을 갱신하고, 끝나면 잠금을 푼다
  useEffect(() => {
    if (!lockedUntil) return;
    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= lockedUntil) {
        resetAttempts();
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockedUntil, resetAttempts]);

  const remainingMs = lockedUntil ? lockedUntil - now : 0;
  const isLocked = remainingMs > 0;

  const onSubmit = (values: LoginFormValues) => {
    if (useLoginAttemptStore.getState().isLocked()) return;
    setFormError(null);
    login(values, {
      onSuccess: () => {
        resetAttempts();
        router.replace(getRedirectPath(searchParams.get("next")));
        router.refresh();
      },
      onError: (error) => {
        if (isAuthApiError(error) && error.code === "invalid_credentials") {
          recordFailure();
          setNow(Date.now());
          const { failCount, lockedUntil: nextLockedUntil } = useLoginAttemptStore.getState();
          if (!nextLockedUntil) {
            setFormError(`이메일 또는 비밀번호가 일치하지 않습니다. (${failCount}/${MAX_LOGIN_FAILURES}회 실패)`);
          }
          return;
        }
        if (isAuthApiError(error) && error.code === "email_not_confirmed") {
          setFormError("이메일 인증을 완료한 뒤 로그인해주세요.");
          return;
        }
        setFormError("일시적인 오류로 로그인하지 못했습니다. 잠시 후 다시 시도해주세요.");
      },
    });
  };

  const alertMessage = isLocked
    ? `비밀번호를 ${MAX_LOGIN_FAILURES}회 잘못 입력해 로그인이 제한되었습니다. ${formatRemaining(remainingMs)} 후 다시 시도해주세요.`
    : formError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {alertMessage && (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending || isLocked}>
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
