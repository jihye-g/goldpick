import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">로그인</CardTitle>
      </CardHeader>
      <CardContent>
        {/* useSearchParams를 쓰는 Client Component는 Suspense 경계가 필요 */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
