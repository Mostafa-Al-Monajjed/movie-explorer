import type { Metadata } from "next";
import { FavoritesView } from "../../components/FavoritesView";

export const metadata: Metadata = {
  title: "My Favorites",
  robots: { index: false }, // قائمة شخصية، ما لازم تظهر بجوجل
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Favorites</h1>
      <FavoritesView />
    </div>
  );
}
