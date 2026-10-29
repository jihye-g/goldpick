"use client";

import { Button } from "@/components/common/Button";
import { Toast } from "@/components/common/Toast";
import { useToast } from "@/hooks/common/useToast";

// 캡처용 — 5가지 tone을 화면에 고정으로 늘어놓는다
export function ToastPreview() {
  const undo = { label: "실행취소", onClick: () => {} };
  return (
    <div className="flex flex-col gap-[8px]">
      <Toast message="찜을 해제했어요" action={undo} />
      <Toast tone="success" message="저장했어요" action={undo} />
      <Toast tone="warning" message="잠시 후 다시 시도해주세요" />
      <Toast tone="error" message="전송하지 못했어요" />
      <Toast tone="info" message="새 댓글이 있어요" />
    </div>
  );
}

// 실제 sonner로 화면 아래에 띄워 본다
export function ToastDemo() {
  const toast = useToast();
  const undo = { label: "실행취소", onClick: () => {} };
  return (
    <div className="flex flex-wrap gap-[8px]">
      <Button variant="secondary" size="S" onClick={() => toast.show("찜을 해제했어요", undo)}>neutral</Button>
      <Button variant="secondary" size="S" onClick={() => toast.success("저장했어요", undo)}>success</Button>
      <Button variant="secondary" size="S" onClick={() => toast.warning("잠시 후 다시 시도해주세요")}>warning</Button>
      <Button variant="secondary" size="S" onClick={() => toast.error("전송하지 못했어요")}>error</Button>
      <Button variant="secondary" size="S" onClick={() => toast.info("새 댓글이 있어요")}>info</Button>
    </div>
  );
}
