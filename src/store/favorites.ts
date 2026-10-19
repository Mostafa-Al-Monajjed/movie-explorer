import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FavoriteMovie } from "../app/lib/favorites";

const STORAGE_KEY = "movie-explorer-favorites";

interface FavoritesState {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => void;
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
            : [movie, ...state.favorites], // الأحدث أولًا
        })),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: STORAGE_KEY,
      version: 1, // لو غيّرنا شكل البيانات لاحقًا نرفع الرقم
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }), // نحفظ البيانات بس، مش الدوال
    },
  ),
);

// مزامنة بين التبويبات: لو أضفت مفضّلة بتبويب، التبويب الثاني يتحدث
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) void useFavoritesStore.persist.rehydrate();
  });
}
