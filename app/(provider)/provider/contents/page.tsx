import { ContentList } from "./components/ContentList";

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">내 콘텐츠</h1>
      <ContentList />
    </div>
  );
}
