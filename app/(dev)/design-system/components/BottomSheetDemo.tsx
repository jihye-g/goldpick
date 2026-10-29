"use client";

import { useState } from "react";
import { BottomSheet, BottomSheetItem } from "@/components/common/BottomSheet";
import { Button } from "@/components/common/Button";

export function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="M" onClick={() => setOpen(true)}>
        바텀시트 열기
      </Button>
      <BottomSheet open={open} onOpenChange={setOpen} title="이 게시글을 신고할까요?">
        <div className="flex flex-col">
          <BottomSheetItem onClick={() => setOpen(false)}>신고하기</BottomSheetItem>
          <BottomSheetItem onClick={() => setOpen(false)}>차단하기</BottomSheetItem>
        </div>
        <Button variant="secondary" size="M" className="w-full" onClick={() => setOpen(false)}>
          취소
        </Button>
      </BottomSheet>
    </>
  );
}
