import { EmptyState } from "@/components/common/EmptyState";
import { Icon3D } from "@/components/common/Icon";
import type { PostListResponse } from "@/models";
import { PostCard } from "./PostCard";
import { PostPagination } from "./PostPagination";
import type { CommunityQuery } from "./searchParams";

interface PostListProps {
  data: PostListResponse | null;
  basePath: string;
  query: CommunityQuery;
  limit: number;
  /** 결과가 0건일 때 안내 — 없으면 "게시글이 없습니다" */
  empty?: { title: string; description: string };
}

const DEFAULT_EMPTY = { title: "게시글이 없습니다", description: "첫 번째 게시글을 작성해보세요." };

// 서버에서 받은 목록을 그대로 그린다 — 상호작용은 PostPagination만
export function PostList({ data, basePath, query, limit, empty = DEFAULT_EMPTY }: PostListProps) {
  if (!data) {
    return <EmptyState title="게시글을 불러오지 못했습니다" description="잠시 후 다시 시도해주세요." className="py-16" />;
  }

  if (!data.data.length) {
    return (
      <EmptyState
        title={empty.title}
        description={empty.description}
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
      <PostPagination basePath={basePath} query={query} totalPages={Math.ceil(data.total / limit)} />
    </>
  );
}
