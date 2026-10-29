import type { SupabaseClient } from "@supabase/supabase-js";
import type { CommentCreateRequest, CommentListResponse, CommentSort, Database } from "@/models";

// 서버 전용 — Route Handler(app/api/posts/[id]/comments)가 lib/supabase/server 클라이언트를 넘겨 쓴다
type Client = SupabaseClient<Database>;

// 댓글 content 칸은 직접 읽을 수 없다 — get_post_comments 가 비밀 댓글 내용을 권한에 따라 null 로 돌려준다
export async function listComments(client: Client, postId: string, sort: CommentSort): Promise<CommentListResponse> {
  const { data, error } = await client.rpc("get_post_comments", { p_post_id: postId, p_sort: sort });
  if (error) throw error;
  const comments = data.map((row) => ({
    id: row.id,
    author: row.author_nickname,
    authorAvatarUrl: (row.author_avatar_url as string | null) ?? null,
    content: (row.content as string | null) ?? null,
    isSecret: row.is_secret,
    createdAt: row.created_at,
  }));
  return { data: comments, total: comments.length };
}

// 저장 후 content 를 돌려받으면 칸 권한에 막히므로 id 만 돌려받는다
export async function createComment(client: Client, postId: string, data: CommentCreateRequest): Promise<{ id: string }> {
  const { data: created, error } = await client
    .from("comments")
    .insert({ post_id: postId, content: data.content, is_secret: data.isSecret })
    .select("id")
    .single();
  if (error) throw error;
  return created;
}
