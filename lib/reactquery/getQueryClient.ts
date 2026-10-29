import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

// 서버 컴포넌트용 — 요청마다 하나의 QueryClient (같은 요청 안에서는 공유)
export const getQueryClient = cache(
  () => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
);
