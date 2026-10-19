"use client";

import { Heart } from "lucide-react";
import { useIsFavorite } from "@/hooks/useIsFavorite";
import type { FavoriteMovie } from "../app/lib/favorites";
import { useFavoritesStore } from "../store/favorites";

interface FavoriteButtonProps {
  movie: FavoriteMovie;
  variant?: "icon" | "full";
  className?: string;
}

export function FavoriteButton({
  movie,
  variant = "icon",
  className = "",
}: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(movie.id);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggleFavorite(movie)}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
          isFavorite
            ? "border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20"
            : "border-neutral-700 text-neutral-200 hover:border-red-400 hover:text-red-400"
        } ${className}`}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        {isFavorite ? "Saved to favorites" : "Add to favorites"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(movie)}
      aria-pressed={isFavorite}
      aria-label={`Favorite ${movie.title}`}
      className={`z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur transition-transform hover:scale-110 ${className}`}
    >
      <Heart
        className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
      />
    </button>
  );
}