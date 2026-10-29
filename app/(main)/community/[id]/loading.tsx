import { LoadingPage } from "@/components/common/Loading";

// params를 await하는 페이지라 Cache Components에서 Suspense 경계가 필요하다
export default function Loading() {
  return <LoadingPage />;
}
