import { useCallback, useState } from "react";

export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const goToPage = useCallback((next: number) => setPage(Math.max(1, next)), []);
  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const reset = useCallback(() => setPage(initialPage), [initialPage]);

  return { page, limit, setLimit, goToPage, nextPage, prevPage, reset };
}
