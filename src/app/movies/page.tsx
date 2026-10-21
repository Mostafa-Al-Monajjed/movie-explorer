import type { Metadata } from "next";
import { Suspense } from "react";
import { GenreFilter } from "../../components/GenreFilter";
import { MovieGridSkeleton } from "../../components/MovieGridSkeleton";
import {
  MovieResults,
  type MoviesSearchParams,
} from "@/components/MovieResults";
import { SearchBar } from "../../components/SearchBar";
import { SortSelect } from "../../components/SortSelect";
import { parsePage } from "../lib/pagination";
import { getGenres } from "../lib/tmdb/movies";

type Props = { searchParams: Promise<MoviesSearchParams> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { page, q } = await searchParams;
  const pageNumber = parsePage(page);

  return {
    title:
      pageNumber > 1 ? `Browse Movies (Page ${pageNumber})` : "Browse Movies",
    robots: q?.trim() ? { index: false } : undefined,
  };
}

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams;
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
        {/* params فيها page، فالـ Skeleton يظهر مع كل تغيير صفحة */}
        <Suspense key={JSON.stringify(params)} fallback={<MovieGridSkeleton />}>
          <MovieResults params={params} />
        </Suspense>
      </div>
    </div>
  );
}
