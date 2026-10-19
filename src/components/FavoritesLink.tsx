"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useHydrated } from "../hooks/useHydrated";
import { useFavoritesStore } from "../store/favorites";

export function FavoritesLink() {
  const hydrated = useHydrated();
  const count = useFavoritesStore((s) => s.favorites.length);

  return (
    <Link
      href="/favorites"
      className="flex items-center gap-1.5 hover:text-white"
    >
      <Heart className="h-4 w-4" />
      Favorites
      {hydrated && count > 0 && (
        <span className="rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
