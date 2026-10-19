"use client";

import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useHydrated } from "../hooks/useHydrated";
import { useFavoritesStore } from "../store/favorites";
import { MovieGrid } from "./MovieGrid";
import { MovieGridSkeleton } from "./MovieGridSkeleton";

export function FavoritesView() {
  const hydrated = useHydrated();
  const favorites = useFavoritesStore((s) => s.favorites);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);

  if (!hydrated) return <MovieGridSkeleton count={5} />;

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <Heart className="h-12 w-12 text-neutral-600" />
        <h2 className="mt-4 text-xl font-semibold">No favorites yet</h2>
        <p className="mt-2 max-w-sm text-neutral-400">
          Tap the heart on any movie to save it here. Your list is stored in
          this browser.
        </p>
        <Link
          href="/movies"
          className="mt-6 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-300"
        >
          Browse movies
        </Link>
      </div>
    );
  }

  function handleClear() {
    if (window.confirm("Remove all movies from your favorites?")) {
      clearFavorites();
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-neutral-400">
          {favorites.length} {favorites.length === 1 ? "movie" : "movies"} saved
        </p>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-red-400 hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Clear all
        </button>
      </div>
      <MovieGrid movies={favorites} />
    </>
  );
}
