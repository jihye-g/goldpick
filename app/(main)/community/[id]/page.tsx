import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Divider } from "@/components/common/Divider";
import { DotVerticalIcon } from "@/components/common/Icon";
import { IconButton } from "@/components/common/IconButton";
import { TopAppBar } from "@/components/common/TopAppBar";
import { postKeys } from "@/hooks/posts/keys";
import { isBookmarked } from "@/lib/db/bookmarks";
import { getPost as fetchPost, increasePostView } from "@/lib/db/posts";
import { getQueryClient } from "@/lib/reactquery/getQueryClient";
import { createClient } from "@/lib/supabase/server";
import { BookmarkButton } from "./components/BookmarkButton";
import { CommentInputBar } from "./components/CommentInputBar";
import { CommentSection } from "./components/CommentSection";
import { PostBody } from "./components/PostBody";

// 조회수를 먼저 올리고 읽어서 방금 본 것까지 반영된 숫자를 보여준다 (조회수 실패는 화면을 막지 않음)
// connection(): 아래는 실제 요청 때만 실행 — 프리렌더·prefetch 때 조회수가 오르지 않고,
// QueryClient·작성 시각 표시가 읽는 Date.now() 도 요청 시점 값이 된다 (navigation() 은 정적 프리렌더에서 실행돼 Date.now() 에러)
async function getPostDetail(id: string) {
  await connection();
  const supabase = await createClient();
  await increasePostView(supabase, id).catch(() => {});
  const [post, bookmarked] = await Promise.all([
    getQueryClient().fetchQuery({
      queryKey: postKeys.detail(id),
      queryFn: () => fetchPost(supabase, id),
    }),
    isBookmarked(supabase, id).catch(() => false),
  ]);
  if (!post) notFound();
  return { post, bookmarked };
}

// Figma: 20_게시글상세 (2651:10451)
// 본문은 서버에서 그리고, 북마크·댓글 정렬·목록·입력바만 Client Component
// 댓글은 비밀 댓글 열람 권한이 로그인 쿠키에 달려 있어 서버에서 미리 불러오지 않는다
export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { post, bookmarked } = await getPostDetail(id);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-bg-surface">
      <TopAppBar
        title="커뮤니티"
        showBack
        backHref="/community"
        actions={
          <>
            <BookmarkButton postId={id} initialBookmarked={bookmarked} />
            {/* TODO: 더보기(수정·삭제·신고) BottomSheet 연결 */}
            <IconButton size="compact" label="더보기">
              <DotVerticalIcon />
            </IconButton>
          </>
        }
      />
      <div className="flex-1">
        <PostBody post={post} />
        <Divider variant="band" />
        <CommentSection postId={id} />
      </div>
      <CommentInputBar postId={id} />
    </div>
  );
}
