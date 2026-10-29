import { NextResponse, type NextRequest } from "next/server";
import { commentSchema } from "@/components/forms/schema/community";
import { readJson, requireUser, serverError, validationError } from "@/lib/api/response";
import { createComment, listComments } from "@/lib/db/comments";
import { createClient } from "@/lib/supabase/server";
import type { CommentSort } from "@/models";

type Context = { params: Promise<{ id: string }> };

// GET /api/posts/:id/comments?sort=oldest|latest — 누구나. 비밀 댓글 내용은 글쓴이·댓글 작성자에게만
export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const sort: CommentSort = request.nextUrl.searchParams.get("sort") === "latest" ? "latest" : "oldest";

  try {
    return NextResponse.json(await listComments(await createClient(), id, sort));
  } catch (error) {
    return serverError(error);
  }
}

// POST /api/posts/:id/comments — 로그인 사용자
export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  const { supabase, unauthorized } = await requireUser();
  if (unauthorized) return unauthorized;

  const parsed = commentSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const created = await createComment(supabase, id, parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
