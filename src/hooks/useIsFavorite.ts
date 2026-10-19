"use client";

import { useHydrated } from "../hooks/useHydrated";
import { useFavoritesStore } from "../store/favorites";

export function useIsFavorite(id: number) {
  const hydrated = useHydrated();
  // الـ selector يرجّع boolean، فكل كرت يتحدث لما تتغير حالته هو بس
  const isFavorite = useFavoritesStore((s) =>
    s.favorites.some((f) => f.id === id),
  );

  return hydrated && isFavorite;
}
