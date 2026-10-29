import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_LOGIN_FAILURES = 5;
export const LOGIN_LOCK_MS = 10 * 60 * 1000;

interface LoginAttemptState {
  failCount: number;
  lockedUntil: number | null;
  isLocked: () => boolean;
  recordFailure: () => void;
  reset: () => void;
}

// 로그인 실패 횟수·잠금은 기기(브라우저) 단위로 localStorage에 둔다 (정책서 3.2)
export const useLoginAttemptStore = create<LoginAttemptState>()(
  persist(
    (set, get) => ({
      failCount: 0,
      lockedUntil: null,
      isLocked: () => {
        const { lockedUntil } = get();
        return lockedUntil !== null && Date.now() < lockedUntil;
      },
      recordFailure: () => {
        const failCount = get().failCount + 1;
        if (failCount >= MAX_LOGIN_FAILURES) {
          set({ failCount: 0, lockedUntil: Date.now() + LOGIN_LOCK_MS });
        } else {
          set({ failCount });
        }
      },
      reset: () => set({ failCount: 0, lockedUntil: null }),
    }),
    // SSR 하이드레이션 불일치를 피하려고 클라이언트 마운트 후 rehydrate()로 읽는다
    { name: "goldpick-login-attempt", skipHydration: true }
  )
);
