import { useCallback, useMemo, useSyncExternalStore } from "react";

// 같은 탭 안의 다른 훅 인스턴스에도 변경을 알리기 위한 이벤트
const LOCAL_STORAGE_EVENT = "local-storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCAL_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCAL_STORAGE_EVENT, callback);
  };
}

function readItem(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 서버 스냅샷은 null → 하이드레이션 후 실제 값으로 바뀐다
  const raw = useSyncExternalStore(subscribe, () => readItem(key), () => null);
  const value = useMemo(() => parse(raw, initialValue), [raw, initialValue]);

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = parse(readItem(key), initialValue);
      const resolved = next instanceof Function ? next(prev) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {}
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
    },
    [key, initialValue]
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {}
    window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
  }, [key]);

  return [value, setStoredValue, remove] as const;
}
