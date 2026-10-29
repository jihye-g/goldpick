import { StatusSummary } from "./components/StatusSummary";

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">통계</h1>
      <StatusSummary />
    </div>
  );
}
