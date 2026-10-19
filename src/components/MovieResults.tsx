import { DEFAULT_SORT, SORT_OPTIONS } from "../app/lib/constants";
import { discoverMovies, searchMovies } from "../app/lib/tmdb/movies";
import type { Movie } from "../app/lib/tmdb/schemas";
import { MovieGrid } from "./MovieGrid";

export type MoviesSearchParams = {
  q?: string;
  genre?: string;
  sort?: string;
  page?: string;
};

export async function MovieResults({ params }: { params: MoviesSearchParams }) {
  const query = params.q?.trim();
  const genre =
    params.genre && /^\d+$/.test(params.genre) ? params.genre : undefined;
  const sort =
    SORT_OPTIONS.find((o) => o.value === params.sort)?.value ?? DEFAULT_SORT;
  const page = Math.min(500, Math.max(1, Number(params.page) || 1)); // TMDB أقصى صفحة 500

  let movies: Movie[];

  if (query) {
    // endpoint البحث ما بيدعم فلتر النوع، فنفلتر نتائج الصفحة الحالية بس
    const data = await searchMovies(query, page);
    movies = genre
      ? data.results.filter((m) => m.genre_ids?.includes(Number(genre)))
      : data.results;
  } else {
    const data = await discoverMovies({ genre, sort, page });
    movies = data.results;
  }

  return <MovieGrid movies={movies} />;
}
