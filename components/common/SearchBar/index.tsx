"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = "검색어를 입력하세요", defaultValue = "", className }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full items-center gap-2", className)}>
      <div className="relative flex-1">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="pr-8"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="검색어 지우기"
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <Button type="submit" size="icon" aria-label="검색">
        <Search className="size-4" />
      </Button>
    </form>
  );
}
