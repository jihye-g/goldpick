import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
