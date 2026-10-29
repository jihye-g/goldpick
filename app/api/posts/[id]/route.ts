import { NextResponse } from "next/server";
import { postUpdateSchema } from "@/components/forms/schema/community";
import { errorResponse, readJson, requireUser, serverError, validationError } from "@/lib/api/response";
import { deletePost, getPost, updatePost } from "@/lib/db/posts";
import { createClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ id: string }> };

// GET /api/posts/:id — 누구나
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  try {
    const post = await getPost(await createClient(), id);
    return post ? NextResponse.json(post) : errorResponse(404, "게시글을 찾을 수 없어요.");
  } catch (error) {
    return serverError(error);
  }
}

// PATCH /api/posts/:id — 작성자만 (RLS). 남의 글이면 바뀐 행이 없어 404
export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const { supabase, unauthorized } = await requireUser();
  if (unauthorized) return unauthorized;

  const parsed = postUpdateSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const updated = await updatePost(supabase, id, parsed.data);
    return updated ? new NextResponse(null, { status: 204 }) : errorResponse(404, "수정할 수 있는 게시글이 없어요.");
  } catch (error) {
    return serverError(error);
  }
}

// DELETE /api/posts/:id — 작성자만 (RLS)
export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const { supabase, unauthorized } = await requireUser();
  if (unauthorized) return unauthorized;

  try {
    const deleted = await deletePost(supabase, id);
    return deleted ? new NextResponse(null, { status: 204 }) : errorResponse(404, "삭제할 수 있는 게시글이 없어요.");
  } catch (error) {
    return serverError(error);
  }
}
