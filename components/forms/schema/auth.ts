import { z } from "zod";

// 로그인은 필수값·이메일 형식만 검사한다 (정책서 3.0, 3.1)
export const loginSchema = z.object({
  email: z.string().trim().min(1, "이메일을 입력해주세요.").pipe(z.email("올바른 이메일 형식이 아닙니다.")),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const signupSchema = z.object({
  email: z.email("올바른 이메일을 입력해주세요"),
  name: z.string().min(2, "이름은 2자 이상 입력해주세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
