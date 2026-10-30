import { NextResponse, type NextRequest } from "next/server";
import { postSchema } from "@/components/forms/schema/community";
import { parseCategory, parseKeyword, parsePage, parseSort } from "@/components/features/community/searchParams";
import { readJson, requireUser, serverError, validationError } from "@/lib/api/response";
import { createPost, listPosts } from "@/lib/db/posts";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

function parseLimit(value: string | null) {
  const limit = Number(value);
  return Number.isInteger(limit) && limit > 0 ? Math.min(limit, MAX_LIMIT) : DEFAULT_LIMIT;
}

// GET /api/posts?page=1&limit=10&category=question&keyword=금&sort=views — 누구나
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const supabase = await createClient();
    const result = await listPosts(supabase, {
      page: parsePage(searchParams.get("page") ?? undefined),
      limit: parseLimit(searchParams.get("limit")),
      category: parseCategory(searchParams.get("category") ?? undefined),
      keyword: parseKeyword(searchParams.get("keyword") ?? undefined),
      sort: parseSort(searchParams.get("sort") ?? undefined),
    });
    return NextResponse.json(result);
  } catch (error) {
    return serverError(error);
  }
}

// POST /api/posts — 로그인 사용자 (author_id 는 DB 기본값 auth.uid())
export async function POST(request: Request) {
  const { supabase, unauthorized } = await requireUser();
  if (unauthorized) return unauthorized;

  const parsed = postSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const created = await createPost(supabase, parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
