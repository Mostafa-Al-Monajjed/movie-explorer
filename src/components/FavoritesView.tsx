"use client";

import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useHydrated } from "../hooks/useHydrated";
import {
  buildListPath,
  MAX_NAME_LENGTH,
  MAX_SHARED_MOVIES,
} from "../app/lib/shared-list";
import { useFavoritesStore } from "@/store/favorites";
import { MovieGrid } from "./MovieGrid";
import { MovieGridSkeleton } from "./MovieGridSkeleton";
import { ShareButton } from "./ShareButton";

export function FavoritesView() {
  const hydrated = useHydrated();
  const favorites = useFavoritesStore((s) => s.favorites);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);
  const [name, setName] = useState("");

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

  const shareIds = favorites
    .slice(0, MAX_SHARED_MOVIES)
    .map((movie) => movie.id);
  const cleanName = name.trim();

  return (
    <>
      <section
        aria-labelledby="share-heading"
        className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5"
      >
        <h2 id="share-heading" className="font-semibold">
          Share your list
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Anyone with the link can see your{" "}
          {favorites.length > MAX_SHARED_MOVIES
            ? `${MAX_SHARED_MOVIES} most recent favorites`
            : "favorites"}
          . No account needed: the link contains only movie IDs and your
          optional name.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            placeholder="Your name (optional)"
            aria-label="Your name (optional)"
            className="w-full rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm outline-hidden transition-shadow focus:border-yellow-400 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.12)] sm:max-w-xs"
          />
          <ShareButton
            path={buildListPath(shareIds, name)}
            title={cleanName ? `${cleanName}'s movie list` : "My movie list"}
            text="Check out my movie list"
            label="Share my list"
          />
        </div>
      </section>

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
