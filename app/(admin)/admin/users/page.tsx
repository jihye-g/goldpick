import { UserTable } from "./components/UserTable";

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">회원 관리</h1>
      <UserTable />
    </div>
  );
}
