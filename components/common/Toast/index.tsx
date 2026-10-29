"use client";

import { toast } from "sonner";
import { ToastStatusIcon, type ToastTone } from "./StatusIcon";

export type { ToastTone };

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  message: string;
  tone?: ToastTone;
  action?: ToastAction;
}

// Figma: Toast — 343w · 진한 배경(#1f1b16) · 모서리 12 · 메시지 13/Medium 흰색 · 액션 13/Bold primary
export function Toast({ message, tone = "neutral", action }: ToastProps) {
  return (
    <div
      role="status"
      className="flex w-[343px] max-w-[calc(100vw-32px)] items-center gap-[12px] rounded-[12px] bg-text-primary px-[16px] py-[14px] drop-shadow-[0px_4px_8px_rgba(0,0,0,0.22)]"
    >
      <div className="flex min-w-0 flex-1 items-center gap-[4px]">
        {tone !== "neutral" && <ToastStatusIcon tone={tone} />}
        <p className="min-w-0 flex-1 text-13 font-medium text-text-inverse">{message}</p>
      </div>
      {action && (
        <button type="button" onClick={action.onClick} className="shrink-0 text-13 font-bold whitespace-nowrap text-primary">
          {action.label}
        </button>
      )}
    </div>
  );
}

/** 디자인 시스템 토스트를 띄운다. 액션을 누르면 실행 후 바로 닫힌다. */
export function showToast({ message, tone, action }: ToastProps) {
  return toast.custom(
    (id) => (
      <Toast
        message={message}
        tone={tone}
        action={action && { label: action.label, onClick: () => { action.onClick(); toast.dismiss(id); } }}
      />
    ),
    { position: "bottom-center" }
  );
}
