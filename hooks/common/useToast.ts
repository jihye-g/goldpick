import { showToast } from "@/components/common/Toast";

type ToastAction = { label: string; onClick: () => void };

export function useToast() {
  return {
    show: (message: string, action?: ToastAction) => showToast({ message, action }),
    success: (message: string, action?: ToastAction) => showToast({ message, tone: "success", action }),
    error: (message: string, action?: ToastAction) => showToast({ message, tone: "error", action }),
    info: (message: string, action?: ToastAction) => showToast({ message, tone: "info", action }),
    warning: (message: string, action?: ToastAction) => showToast({ message, tone: "warning", action }),
  };
}
