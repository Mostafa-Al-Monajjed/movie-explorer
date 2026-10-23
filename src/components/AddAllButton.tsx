"use client";

import { Check, Heart } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import type { FavoriteMovie } from "../app/lib/favorites";
import { useFavoritesStore } from "../store/favorites";

export function AddAllButton({ movies }: { movies: FavoriteMovie[] }) {
  const hydrated = useHydrated();
  const favorites = useFavoritesStore((s) => s.favorites);
  const addFavorites = useFavoritesStore((s) => s.addFavorites);

  // قبل الـ Hydration نعرض العدد الكامل، فما يصير تعارض مع HTML السيرفر
  const missing = hydrated
    ? movies.filter((movie) => !favorites.some((f) => f.id === movie.id)).length
    : movies.length;
  const allSaved = hydrated && missing === 0;

  return (
    <button
      type="button"
      disabled={allSaved}
      onClick={() => addFavorites(movies)}
      className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_8px_30px_rgba(250,204,21,0.35)] active:translate-y-0 disabled:cursor-default disabled:bg-neutral-800 disabled:text-neutral-300 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      {allSaved ? (
        <>
          <Check className="h-4 w-4 text-green-400" />
          All saved to your favorites
        </>
      ) : (
        <>
          <Heart className="h-4 w-4" />
          Add {missing} to my favorites
        </>
      )}
    </button>
  );
}
