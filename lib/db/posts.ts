import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Database,
  PostCategory,
  PostCreateRequest,
  PostDetail,
  PostListParams,
  PostListResponse,
  PostUpdateRequest,
} from "@/models";

// 서버 전용 — Route Handler(app/api/posts)와 서버 페이지가 lib/supabase/server 클라이언트를 넘겨 쓴다
type Client = SupabaseClient<Database>;

// 작성자 닉네임·사진은 profiles 를 함께 읽는다
const POST_COLUMNS =
  "id, category, title, content, images, view_count, comment_count, bookmark_count, created_at, author:profiles!posts_author_id_fkey(nickname, avatar_url)";

interface PostRow {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  images: string[];
  view_count: number;
  comment_count: number;
  bookmark_count: number;
  created_at: string;
  author: { nickname: string; avatar_url: string | null } | null;
}

function toPostDetail(row: PostRow): PostDetail {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    content: row.content,
    author: row.author?.nickname ?? "알 수 없음",
    authorAvatarUrl: row.author?.avatar_url ?? null,
    thumbnailUrl: row.images[0] ?? null,
    imageUrls: row.images,
    viewCount: row.view_count,
    commentCount: row.comment_count,
    bookmarkCount: row.bookmark_count,
    createdAt: row.created_at,
  };
}

// uuid 형식이 아닌 id(예: /community/search)는 Postgres 가 22P02 로 거절한다 — 없는 글로 취급
export const INVALID_TEXT_REPRESENTATION = "22P02";

// 검색어를 PostgREST or() 필터 값으로 쓴다 — LIKE 와일드카드(% _ \)는 글자 그대로, 쉼표·괄호가 있어도 깨지지 않게 큰따옴표로 감싼다
function toIlikePattern(keyword: string) {
  const escaped = keyword.replace(/[\\%_]/g, "\\$&");
  return `"%${escaped.replace(/["\\]/g, "\\$&")}%"`;
}

export async function listPosts(
  client: Client,
  { page = 1, limit = 10, keyword, category, sort = "latest" }: PostListParams = {}
): Promise<PostListResponse> {
  let query = client.from("posts").select(POST_COLUMNS, { count: "exact" });
  if (category) query = query.eq("category", category);
  if (keyword) {
    const pattern = toIlikePattern(keyword);
    query = query.or(`title.ilike.${pattern},content.ilike.${pattern}`);
  }
  if (sort === "popular") query = query.order("view_count", { ascending: false });

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  if (error) throw error;
  return { data: data.map(toPostDetail), total: count ?? 0 };
}

export async function getPost(client: Client, id: string): Promise<PostDetail | null> {
  const { data, error } = await client.from("posts").select(POST_COLUMNS).eq("id", id).maybeSingle();
  if (error?.code === INVALID_TEXT_REPRESENTATION) return null;
  if (error) throw error;
  return data ? toPostDetail(data) : null;
}

export async function increasePostView(client: Client, id: string): Promise<void> {
  const { error } = await client.rpc("increment_post_view", { p_post_id: id });
  if (error && error.code !== INVALID_TEXT_REPRESENTATION) throw error;
}

export async function createPost(client: Client, data: PostCreateRequest): Promise<{ id: string }> {
  const { data: created, error } = await client.from("posts").insert(data).select("id").single();
  if (error) throw error;
  return created;
}

// RLS 로 본인 글만 바뀐다 — 바뀐 행이 없으면 false (없는 글이거나 남의 글)
export async function updatePost(client: Client, id: string, data: PostUpdateRequest): Promise<boolean> {
  const { data: updated, error } = await client.from("posts").update(data).eq("id", id).select("id");
  if (error?.code === INVALID_TEXT_REPRESENTATION) return false;
  if (error) throw error;
  return updated.length > 0;
}

export async function deletePost(client: Client, id: string): Promise<boolean> {
  const { data: deleted, error } = await client.from("posts").delete().eq("id", id).select("id");
  if (error?.code === INVALID_TEXT_REPRESENTATION) return false;
  if (error) throw error;
  return deleted.length > 0;
}
