import { Avatar } from "@/components/common/Avatar";
import { DotVerticalIcon, LockIcon } from "@/components/common/Icon";
import { IconButton } from "@/components/common/IconButton";
import type { Comment } from "@/models";
import { formatRelativeTime } from "@/lib/utils";

// Figma: Comment (2612:1305) — 기본 / 비밀-잠금(열람 권한 없음) / 비밀-열람(헤드에 13px 자물쇠)
// 자물쇠 선 굵기는 크기별 Figma 값(18px→1, 13px→2)을 24 viewBox 기준으로 환산
export function CommentItem({ comment }: { comment: Comment }) {
  const locked = comment.content === null;

  return (
    <li className="flex items-start gap-[10px]">
      <Avatar name={comment.author} src={comment.authorAvatarUrl} size="sm" className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <div className="flex items-center gap-[6px] whitespace-nowrap">
          <span className="text-13 font-semibold text-text-primary">{comment.author}</span>
          <span className="text-12 text-text-tertiary">{formatRelativeTime(comment.createdAt)}</span>
          {comment.isSecret && !locked && (
            <LockIcon role="img" aria-label="비밀 댓글" className="size-[13px] text-text-tertiary" strokeWidth={48 / 13} />
          )}
        </div>
        {locked ? (
          <p className="flex items-center gap-[4px] py-[7px] text-13 text-text-tertiary">
            <LockIcon className="size-[18px] text-text-secondary" strokeWidth={4 / 3} />
            비밀 댓글입니다
          </p>
        ) : (
          <p className="text-13 break-words text-text-secondary">{comment.content}</p>
        )}
      </div>
      {/* TODO: 더보기(신고·차단) BottomSheet 연결 */}
      <IconButton size="compact" label="댓글 더보기" className="size-[26px] shrink-0 rounded-md text-text-tertiary">
        <DotVerticalIcon className="size-[16px]" />
      </IconButton>
    </li>
  );
}
