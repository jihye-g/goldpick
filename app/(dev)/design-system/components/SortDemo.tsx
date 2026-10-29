"use client";

import { useState } from "react";
import { SortSelect, SortTabs } from "@/components/common/SortSelect";

const SELECT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "oldest", label: "등록순" },
  { value: "distance", label: "거리순" },
] as const;

const TAB_OPTIONS = [
  { value: "oldest", label: "등록순" },
  { value: "latest", label: "최신순" },
] as const;

export function SortSelectDemo() {
  const [value, setValue] = useState<(typeof SELECT_OPTIONS)[number]["value"]>("oldest");
  return <SortSelect options={SELECT_OPTIONS} value={value} onValueChange={setValue} />;
}

export function SortTabsDemo() {
  const [value, setValue] = useState<(typeof TAB_OPTIONS)[number]["value"]>("oldest");
  return <SortTabs options={TAB_OPTIONS} value={value} onValueChange={setValue} />;
}
