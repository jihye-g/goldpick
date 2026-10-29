"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, type SignupFormValues } from "@/components/forms/schema/auth";
import { useSignup } from "@/hooks/reactquery/auth";
import { useToast } from "@/hooks/common";

const fields = [
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
  { name: "name", label: "이름", type: "text", autoComplete: "name" },
  { name: "password", label: "비밀번호", type: "password", autoComplete: "new-password" },
  { name: "confirmPassword", label: "비밀번호 확인", type: "password", autoComplete: "new-password" },
] as const;

export function SignupForm() {
  const router = useRouter();
  const toast = useToast();
  const { mutate: signup, isPending } = useSignup();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = ({ email, name, password }: SignupFormValues) => {
    signup({ email, name, password }, {
      onSuccess: () => {
        toast.success("가입 확인 메일을 보냈습니다. 메일 인증 후 로그인해주세요.");
        router.push("/login");
      },
      onError: () => toast.error("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요."),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input id={field.name} type={field.type} autoComplete={field.autoComplete} {...register(field.name)} />
          {errors[field.name] && <p className="text-sm text-destructive">{errors[field.name]?.message}</p>}
        </div>
      ))}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "가입 중..." : "회원가입"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
