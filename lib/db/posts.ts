import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Database,
  PostCategory,
  PostCreateRequest,
  PostDetail,
  PostListParams,
  PostListResponse,
  PostSort,
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

// uuid 형식이 아닌 id(예: /community/abc)는 Postgres 가 22P02 로 거절한다 — 없는 글로 취급
export const INVALID_TEXT_REPRESENTATION = "22P02";

// 정렬 컬럼 — 같은 값이면 최신순, 그래도 같으면 id 로 순서를 고정해 페이지가 바뀌어도 글이 겹치거나 빠지지 않게 한다
const SORT_COLUMNS: Record<PostSort, ("view_count" | "comment_count" | "created_at" | "id")[]> = {
  latest: ["created_at", "id"],
  views: ["view_count", "created_at", "id"],
  comments: ["comment_count", "created_at", "id"],
};

// 검색어를 PostgREST or 필터의 ilike 값으로 바꾼다 (docs/policy/search-policy.md)
// 1) `*` 는 PostgREST 가 `%` 로 바꾸는 와일드카드라 리터럴로 찾을 수 없어 뺀다
// 2) LIKE 이스케이프 `\ % _`  3) 큰따옴표 값으로 감싸 쉼표·괄호·점이 or 구문을 깨지 않게 한다
export function toOrIlikeValue(keyword: string) {
  const literal = keyword.replaceAll("*", "");
  if (!literal) return null;
  const pattern = `%${literal.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
  return `"${pattern.replace(/[\\"]/g, (char) => `\\${char}`)}"`;
}

// 마지막 페이지를 넘는 offset 은 PostgREST 가 416 으로 거절한다 — 빈 페이지로 취급하고 전체 개수만 따로 센다
const RANGE_NOT_SATISFIABLE = "PGRST103";

export async function listPosts(
  client: Client,
  { page = 1, limit = 10, keyword, category, sort = "latest" }: PostListParams = {}
): Promise<PostListResponse> {
  // `*` 만 입력한 검색어는 찾을 글자가 없다 — 전체 목록이 아니라 0건
  const keywordValue = keyword ? toOrIlikeValue(keyword) : undefined;
  if (keywordValue === null) return { data: [], total: 0 };
  const keywordFilter = keywordValue && `title.ilike.${keywordValue},content.ilike.${keywordValue}`;

  let query = client.from("posts").select(POST_COLUMNS, { count: "exact" });
  if (category) query = query.eq("category", category);
  if (keywordFilter) query = query.or(keywordFilter);
  for (const column of SORT_COLUMNS[sort]) query = query.order(column, { ascending: false });

  const { data, error, count } = await query.range((page - 1) * limit, page * limit - 1);
  if (error?.code === RANGE_NOT_SATISFIABLE) {
    let countQuery = client.from("posts").select("id", { count: "exact", head: true });
    if (category) countQuery = countQuery.eq("category", category);
    if (keywordFilter) countQuery = countQuery.or(keywordFilter);
    const { error: countError, count: total } = await countQuery;
    if (countError) throw countError;
    return { data: [], total: total ?? 0 };
  }
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
