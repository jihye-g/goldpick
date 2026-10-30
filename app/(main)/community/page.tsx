import Link from "next/link";
import { BottomNavigation } from "@/components/common/BottomNavigation";
import { Button } from "@/components/common/Button";
import { BellIcon, PlusIcon, SearchIcon } from "@/components/common/Icon";
import { IconButton } from "@/components/common/IconButton";
import { TopAppBar } from "@/components/common/TopAppBar";
import { CategoryChips } from "@/components/features/community/CategoryChips";
import { PostList } from "@/components/features/community/PostList";
import { parseCategory, parsePage } from "@/components/features/community/searchParams";
import { postKeys } from "@/hooks/posts/keys";
import { listPosts } from "@/lib/db/posts";
import { getQueryClient } from "@/lib/reactquery/getQueryClient";
import { createClient } from "@/lib/supabase/server";
import type { PostListParams } from "@/models";

const LIMIT = 10;

// 서버 컴포넌트는 자기 Route Handler 를 fetch 하지 않고 같은 DB 함수(lib/db)를 직접 쓴다
async function getPosts(params: PostListParams) {
  try {
    const supabase = await createClient();
    return await getQueryClient().fetchQuery({
      queryKey: postKeys.list(params),
      queryFn: () => listPosts(supabase, params),
    });
  } catch {
    return null;
  }
}

// Figma: 10_커뮤니티 (1919:36852)
export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const category = parseCategory(query.category);
  const page = parsePage(query.page);
  const data = await getPosts({ page, limit: LIMIT, category });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-bg-canvas">
      <TopAppBar
        title="커뮤니티"
        actions={
          <>
            {/* TODO: 알림 페이지가 생기면 실제 경로로 교체, 알림 점은 안 읽은 알림 수로 연결 */}
            <IconButton size="compact" label="검색" render={<Link href="/community/search" />} nativeButton={false}>
              <SearchIcon />
            </IconButton>
            <IconButton size="compact" label="알림" render={<Link href="/notifications" />} nativeButton={false}>
              <BellIcon badge />
            </IconButton>
          </>
        }
      />
      <div className="flex-1">
        <CategoryChips basePath="/community" query={{ category }} />
        <PostList data={data} basePath="/community" query={{ category, page }} limit={LIMIT} />
      </div>
      {/* Figma: FAB/글쓰기는 하단 내비 영역 위 10px, 오른쪽 16px */}
      <div className="sticky bottom-0">
        <Button
          size="fab"
          render={<Link href="/community/write" />}
          nativeButton={false}
          className="absolute right-[16px] bottom-[calc(100%+10px)]"
        >
          <PlusIcon />
          글쓰기
        </Button>
        <BottomNavigation />
      </div>
    </div>
  );
}
