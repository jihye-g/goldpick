import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Figma: Avatar — Small 32 · medium 40 · 44 · Large 56, 사진이 없으면 이름 첫 글자
// 배경·테두리 색은 디자인 시스템 토큰에 없는 값이라 Figma 값을 그대로 쓴다.
const avatarVariants = cva("border border-[#e6e2da] bg-[#efece6] after:hidden", {
  variants: {
    size: {
      sm: "size-[32px]",
      md: "size-[40px]",
      lg: "size-[44px]",
      xl: "size-[56px]",
    },
  },
  defaultVariants: { size: "sm" },
});

const fallbackText = {
  sm: "text-13",
  md: "text-14",
  lg: "text-16",
  xl: "text-20",
} as const;

type AvatarProps = VariantProps<typeof avatarVariants> & {
  /** 대체 글자(첫 글자)와 이미지 alt에 쓰는 이름 */
  name: string;
  src?: string | null;
  className?: string;
};

export function Avatar({ name, src, size, className }: AvatarProps) {
  const sizeKey = size ?? "sm";
  return (
    <UIAvatar className={cn(avatarVariants({ size }), className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className={cn("bg-transparent font-medium text-text-tertiary", fallbackText[sizeKey])}>
        {name.charAt(0)}
      </AvatarFallback>
    </UIAvatar>
  );
}
