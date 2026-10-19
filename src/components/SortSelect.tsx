"use client";

import { DEFAULT_SORT, SORT_OPTIONS } from "../app/lib/constants";
import { useUpdateParams } from "@/hooks/useUpdateParams";

export function SortSelect() {
  const { searchParams, update } = useUpdateParams();
  const isSearching = Boolean(searchParams.get("q"));
  const current = searchParams.get("sort") ?? DEFAULT_SORT;

  return (
    <select
      value={current}
      disabled={isSearching}
      onChange={(e) =>
        update({
          sort: e.target.value === DEFAULT_SORT ? null : e.target.value,
        })
      }
      aria-label="Sort movies"
      title={isSearching ? "Sorting is unavailable while searching" : undefined}
      className="rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm outline-hidden focus:border-yellow-400 disabled:opacity-50"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
