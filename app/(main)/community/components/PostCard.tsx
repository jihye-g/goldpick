import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/common/Badge";
import { IconButton } from "@/components/common/IconButton";
import { BookmarkIcon, DotVerticalIcon, MessageSquareIcon } from "@/components/common/Icon";
import type { Post } from "@/models";
import { formatRelativeTime } from "@/lib/utils";
import { CATEGORY_LABEL } from "@/components/features/community/constants";

// Figma: Post (2651:10794) — px 16 · py 12, 본문 gap 12, 썸네일 있으면 제목 옆 64px
export function PostCard({ post }: { post: Post }) {
  return (
    <li className="relative flex border-b border-divider px-[16px] py-[12px]">
      <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-start justify-between">
            <Badge tone="primary" variant="subtle">
              {CATEGORY_LABEL[post.category]}
            </Badge>
            {/* TODO: 더보기 메뉴(신고·차단) BottomSheet 연결 */}
            <IconButton size="compact" label="더보기" className="relative z-10 size-[18px] text-border-strong">
              <DotVerticalIcon className="size-[18px]" />
            </IconButton>
          </div>
          <div className="flex items-start gap-[4px]">
            <div className="flex min-w-0 flex-1 flex-col">
              <h2 className="text-15 font-semibold text-text-primary">
                <Link href={`/community/${post.id}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="line-clamp-1 text-13 text-text-secondary">{post.content}</p>
            </div>
            {post.thumbnailUrl && (
              <Image
                src={post.thumbnailUrl}
                alt=""
                width={64}
                height={64}
                unoptimized
                className="size-[64px] shrink-0 rounded-[10px] border border-border-default bg-bg-muted object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-[5px] text-12 whitespace-nowrap text-text-tertiary">
          <p className="flex min-w-0 flex-1 items-center gap-[4px]">
            <span>{formatRelativeTime(post.createdAt)}</span>
            <span aria-hidden="true">·</span>
            <span>조회 {post.viewCount}</span>
          </p>
          <div className="flex shrink-0 items-center gap-[6px]">
            <span className="flex items-center gap-[2px]">
              <MessageSquareIcon className="size-[13px]" />
              <span className="sr-only">댓글</span>
              {post.commentCount}
            </span>
            <span className="flex items-center gap-[2px]">
              <BookmarkIcon filled className="size-[13px]" />
              <span className="sr-only">북마크</span>
              {post.bookmarkCount}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
