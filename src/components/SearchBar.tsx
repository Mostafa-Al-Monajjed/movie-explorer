"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateParams } from "@/hooks/useUpdateParams";

export function SearchBar() {
  const { searchParams, update } = useUpdateParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const debouncedUpdate = useDebouncedCallback((term: string) => {
    update({ q: term.trim() || null });
  }, 400);

  function handleChange(term: string) {
    setValue(term);
    debouncedUpdate(term);
  }

  function clear() {
    setValue("");
    debouncedUpdate.cancel();
    update({ q: null });
  }

  return (
    <div className="relative w-full md:max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
        className="w-full rounded-full border border-neutral-800 bg-neutral-900 py-2.5 pl-10 pr-10 text-sm outline-hidden focus:border-yellow-400"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
