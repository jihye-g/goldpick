import { ContentTable } from "./components/ContentTable";

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">콘텐츠 관리</h1>
      <ContentTable />
    </div>
  );
}
