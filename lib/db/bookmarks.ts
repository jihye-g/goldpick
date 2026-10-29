import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/models";
import { INVALID_TEXT_REPRESENTATION } from "./posts";

// 서버 전용 — Route Handler(app/api/posts/[id]/bookmark)와 상세 페이지가 쓴다
// bookmarks 는 RLS 로 본인 행만 보이고 바뀐다 (user_id 기본값 auth.uid())
type Client = SupabaseClient<Database>;

const FOREIGN_KEY_VIOLATION = "23503";

export class PostNotFoundError extends Error {}

// 로그인하지 않았으면 RLS 로 아무 행도 보이지 않아 false
export async function isBookmarked(client: Client, postId: string): Promise<boolean> {
  const { data, error } = await client.from("bookmarks").select("post_id").eq("post_id", postId).maybeSingle();
  if (error?.code === INVALID_TEXT_REPRESENTATION) return false;
  if (error) throw error;
  return data !== null;
}

// 이미 북마크했으면 아무것도 하지 않는다 (두 번 눌러도 안전)
export async function addBookmark(client: Client, postId: string): Promise<void> {
  const { error } = await client
    .from("bookmarks")
    .upsert({ post_id: postId }, { onConflict: "user_id,post_id", ignoreDuplicates: true });
  if (error?.code === FOREIGN_KEY_VIOLATION || error?.code === INVALID_TEXT_REPRESENTATION) throw new PostNotFoundError();
  if (error) throw error;
}

export async function removeBookmark(client: Client, postId: string): Promise<void> {
  const { error } = await client.from("bookmarks").delete().eq("post_id", postId);
  if (error?.code === INVALID_TEXT_REPRESENTATION) throw new PostNotFoundError();
  if (error) throw error;
}
