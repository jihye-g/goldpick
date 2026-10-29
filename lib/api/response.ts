import { NextResponse } from "next/server";
import type { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// Route Handler 공통 응답 — 에러는 { message } 형태로 통일
export function errorResponse(status: number, message: string) {
  return NextResponse.json({ message }, { status });
}

export function validationError(error: z.ZodError) {
  return errorResponse(400, error.issues[0]?.message ?? "요청 값이 올바르지 않아요.");
}

export function serverError(error: unknown) {
  console.error(error);
  return errorResponse(500, "요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요.");
}

// 로그인 사용자 확인 — 없으면 401 응답을 함께 돌려준다
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user, unauthorized: user ? null : errorResponse(401, "로그인이 필요해요.") };
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
