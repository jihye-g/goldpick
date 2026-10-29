import { EmptyState } from "@/components/common/EmptyState";
import { Icon3D } from "@/components/common/Icon";
import type { PostCategory, PostListResponse } from "@/models";
import { PostCard } from "./PostCard";
import { PostPagination } from "./PostPagination";

interface PostListProps {
  data: PostListResponse | null;
  category: PostCategory | undefined;
  page: number;
  limit: number;
}

// 서버에서 받은 목록을 그대로 그린다 — 상호작용은 PostPagination만
export function PostList({ data, category, page, limit }: PostListProps) {
  if (!data) {
    return <EmptyState title="게시글을 불러오지 못했습니다" description="잠시 후 다시 시도해주세요." className="py-16" />;
  }

  if (!data.data.length) {
    return (
      <EmptyState
        title="게시글이 없습니다"
        description="첫 번째 게시글을 작성해보세요."
        icon={<Icon3D name="no-posts" />}
        className="py-16"
      />
    );
  }

  return (
    <>
      <ul className="bg-bg-surface">
        {data.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
      <PostPagination category={category} currentPage={page} totalPages={Math.ceil(data.total / limit)} />
    </>
  );
}
