import type { Metadata } from "next";
import { Suspense } from "react";
import { getGenres } from "../lib/tmdb/movies";
import { GenreFilter } from "../../components/GenreFilter";
import { MovieGridSkeleton } from "../../components/MovieGridSkeleton";
import {
  MovieResults,
  type MoviesSearchParams,
} from "../../components/MovieResults";
import { SearchBar } from "../../components/SearchBar";
import { SortSelect } from "../../components/SortSelect";

export const metadata: Metadata = { title: "Browse Movies" };

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<MoviesSearchParams>;
}) {
  const params = await searchParams; // بـ Next 15+ هي Promise
  const { genres } = await getGenres();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Browse Movies</h1>

      <Suspense fallback={null}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar />
          <SortSelect />
        </div>
        <div className="mt-4">
          <GenreFilter genres={genres} />
        </div>
      </Suspense>

      <div className="mt-8">
        {/* الـ key يخلي الـ Skeleton يظهر مع كل تغيير بالبحث أو الفلتر */}
        <Suspense key={JSON.stringify(params)} fallback={<MovieGridSkeleton />}>
          <MovieResults params={params} />
        </Suspense>
      </div>
    </div>
  );
}
