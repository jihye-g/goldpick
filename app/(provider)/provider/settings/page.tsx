import { SettingsForm } from "./components/SettingsForm";

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">설정</h1>
      <SettingsForm />
    </div>
  );
}
