import Image from "next/image";
import { Avatar } from "@/components/common/Avatar";
import { Badge } from "@/components/common/Badge";
import { EyeIcon } from "@/components/common/Icon";
import type { PostDetail } from "@/models";
import { formatRelativeTime } from "@/lib/utils";
import { CATEGORY_LABEL } from "@/components/features/community/constants";

// Figma: PostBody (2651:10457) — px 16 · py 12, 뱃지·작성자·본문 gap 8, 이미지 pt 14, 조회 py 8
export function PostBody({ post }: { post: PostDetail }) {
  return (
    <article className="flex flex-col px-[16px] py-[12px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col items-start gap-[8px]">
          <Badge tone="primary" variant="subtle">
            {CATEGORY_LABEL[post.category]}
          </Badge>
          <div className="flex w-full items-center gap-[10px]">
            <Avatar name={post.author} src={post.authorAvatarUrl} className="size-[36px] shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-px">
              <p className="text-14 font-semibold text-text-primary">{post.author}</p>
              <p className="text-12 text-text-tertiary">
                {formatRelativeTime(post.createdAt)} · 조회 {post.viewCount}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[6px] text-text-primary">
          <h2 className="text-18 font-bold">{post.title}</h2>
          <p className="text-14 whitespace-pre-line">{post.content}</p>
        </div>
      </div>
      {post.imageUrls.length > 0 && (
        <div className="flex flex-col gap-[8px] pt-[14px]">
          {post.imageUrls.map((url) => (
            <Image
              key={url}
              src={url}
              alt=""
              width={343}
              height={150}
              unoptimized
              className="h-[150px] w-full rounded-[12px] bg-bg-muted object-cover"
            />
          ))}
        </div>
      )}
      <div className="flex items-center gap-[5px] py-[8px]">
        {/* Figma eye-open 18px · 선 2 → 24 viewBox 기준 8/3 */}
        <EyeIcon className="size-[18px] text-text-tertiary" strokeWidth={8 / 3} />
        <span className="text-12 font-medium text-text-secondary">{post.viewCount}명이 봤어요</span>
      </div>
    </article>
  );
}
