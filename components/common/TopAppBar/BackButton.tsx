"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconButton } from "@/components/common/IconButton";
import { ChevronLeftIcon } from "@/components/common/Icon";

interface BackButtonProps {
  /** 지정하면 해당 경로로 이동, 없으면 브라우저 뒤로 가기 */
  href?: string;
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  if (href) {
    return <IconButton size="compact" label="뒤로 가기" render={<Link href={href} />} nativeButton={false}><ChevronLeftIcon /></IconButton>;
  }

  return (
    <IconButton size="compact" label="뒤로 가기" onClick={() => router.back()}>
      <ChevronLeftIcon />
    </IconButton>
  );
}
