"use client";

import type { Genre } from "../app/lib/tmdb/schemas";
import { useUpdateParams } from "../hooks/useUpdateParams";

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active
          ? "border-yellow-400 bg-yellow-400 text-black"
          : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600"
      }`}
    >
      {label}
    </button>
  );
}

export function GenreFilter({ genres }: { genres: Genre[] }) {
  const { searchParams, update } = useUpdateParams();
  const active = searchParams.get("genre");

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      role="group"
      aria-label="Filter by genre"
    >
      <Chip
        label="All"
        active={!active}
        onClick={() => update({ genre: null })}
      />
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          active={active === String(genre.id)}
          onClick={() => update({ genre: String(genre.id) })}
        />
      ))}
    </div>
  );
}
