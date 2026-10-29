import { NextResponse } from "next/server";
import { errorResponse, requireUser, serverError } from "@/lib/api/response";
import { addBookmark, isBookmarked, PostNotFoundError, removeBookmark } from "@/lib/db/bookmarks";
import { createClient } from "@/lib/supabase/server";
import type { BookmarkStatus } from "@/models";

type Context = { params: Promise<{ id: string }> };

// GET /api/posts/:id/bookmark — 내 북마크 여부 (로그인 안 했으면 false)
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  try {
    const status: BookmarkStatus = { bookmarked: await isBookmarked(await createClient(), id) };
    return NextResponse.json(status);
  } catch (error) {
    return serverError(error);
  }
}

// POST /api/posts/:id/bookmark — 북마크 켜기 (로그인 사용자)
export async function POST(_request: Request, { params }: Context) {
  const { id } = await params;
  const { supabase, unauthorized } = await requireUser();
  if (unauthorized) return unauthorized;

  try {
    await addBookmark(supabase, id);
    const status: BookmarkStatus = { bookmarked: true };
    return NextResponse.json(status);
  } catch (error) {
    if (error instanceof PostNotFoundError) return errorResponse(404, "게시글을 찾을 수 없어요.");
    return serverError(error);
  }
}

// DELETE /api/posts/:id/bookmark — 북마크 끄기 (로그인 사용자)
export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const { supabase, unauthorized } = await requireUser();
  if (unauthorized) return unauthorized;

  try {
    await removeBookmark(supabase, id);
    const status: BookmarkStatus = { bookmarked: false };
    return NextResponse.json(status);
  } catch (error) {
    if (error instanceof PostNotFoundError) return errorResponse(404, "게시글을 찾을 수 없어요.");
    return serverError(error);
  }
}
