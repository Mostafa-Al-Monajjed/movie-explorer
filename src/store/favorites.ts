import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FavoriteMovie } from "../app/lib/favorites";

const STORAGE_KEY = "movie-explorer-favorites";

interface FavoritesState {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => void;
  addFavorites: (movies: FavoriteMovie[]) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (movie) =>
        set((state) => ({
          favorites: state.favorites.some((f) => f.id === movie.id)
            ? state.favorites.filter((f) => f.id !== movie.id)
            : [movie, ...state.favorites],
        })),

      // يضيف مجموعة أفلام بدون تكرار (نستخدمه بزر "Add all" بالقوائم المشاركة)
      addFavorites: (movies) =>
        set((state) => {
          const existing = new Set(state.favorites.map((f) => f.id));
          const fresh = movies.filter((movie) => !existing.has(movie.id));
          return { favorites: [...fresh, ...state.favorites] };
        }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) void useFavoritesStore.persist.rehydrate();
  });
}
