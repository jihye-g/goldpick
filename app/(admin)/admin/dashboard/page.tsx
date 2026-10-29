import { DashboardOverview } from "./components/DashboardOverview";

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">관리자 대시보드</h1>
      <DashboardOverview />
    </div>
  );
}
