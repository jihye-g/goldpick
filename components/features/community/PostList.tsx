import Link from "next/link";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Icon3D } from "@/components/common/Icon";
import type { PostCategory, PostListResponse } from "@/models";
import { PostCard } from "./PostCard";
import { PostPagination } from "./PostPagination";
import { communityListHref, communitySearchHref, type SearchQuery } from "./searchParams";

interface PostListProps {
  data: PostListResponse | null;
  category: PostCategory | undefined;
  page: number;
  limit: number;
  /** 검색 화면이면 검색어·정렬 — 페이지 이동 주소를 검색 주소로 만든다 */
  search?: SearchQuery;
  /** 글이 0건일 때 보여줄 화면 (기본: 목록용 "게시글이 없습니다") */
  emptyState?: React.ReactNode;
}

// 서버에서 받은 목록을 그대로 그린다 — 상호작용은 PostPagination만
// /community 목록과 /community/search 결과가 함께 쓴다
export function PostList({ data, category, page, limit, search, emptyState }: PostListProps) {
  if (!data) {
    return <EmptyState title="게시글을 불러오지 못했습니다" description="잠시 후 다시 시도해주세요." className="py-16" />;
  }

  // 글은 있는데 마지막 페이지를 넘어선 주소(?page=999) — 1페이지로 돌아갈 길을 준다
  if (!data.data.length && data.total > 0) {
    const firstPageHref = search ? communitySearchHref({ ...search, category }) : communityListHref({ category });
    return (
      <EmptyState
        title="페이지를 찾을 수 없습니다"
        description="첫 페이지로 이동해주세요."
        icon={<Icon3D name="no-posts" />}
        action={
          <Button size="S" variant="secondary" render={<Link href={firstPageHref} />} nativeButton={false}>
            첫 페이지로
          </Button>
        }
        className="py-16"
      />
    );
  }

  if (!data.data.length) {
    return (
      emptyState ?? (
        <EmptyState
          title="게시글이 없습니다"
          description="첫 번째 게시글을 작성해보세요."
          icon={<Icon3D name="no-posts" />}
          className="py-16"
        />
      )
    );
  }

  return (
    <>
      <ul className="bg-bg-surface">
        {data.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
      <PostPagination
        category={category}
        currentPage={page}
        totalPages={Math.ceil(data.total / limit)}
        search={search}
      />
    </>
  );
}
