import { tmdbFetch } from "./client";
import {
  GenresResponseSchema,
  MovieDetailsSchema,
  MovieSchema,
  PaginatedMoviesSchema,
} from "./schemas";

export function getTrendingMovies(timeWindow: "day" | "week" = "week") {
  return tmdbFetch(`/trending/movie/${timeWindow}`, PaginatedMoviesSchema);
}

export function getPopularMovies(page = 1) {
  return tmdbFetch("/movie/popular", PaginatedMoviesSchema, { page });
}

export function getGenres() {
  return tmdbFetch("/genre/movie/list", GenresResponseSchema, {}, 86400);
}

export function searchMovies(query: string, page = 1) {
  return tmdbFetch("/search/movie", PaginatedMoviesSchema, {
    query,
    page,
    include_adult: "false",
  });
}

export function discoverMovies({
  genre,
  sort = "popularity.desc",
  page = 1,
}: {
  genre?: string;
  sort?: string;
  page?: number;
}) {
  return tmdbFetch("/discover/movie", PaginatedMoviesSchema, {
    with_genres: genre,
    sort_by: sort,
    page,
    include_adult: "false",
    "vote_count.gte": sort.startsWith("vote_average") ? 300 : undefined,
    "primary_release_date.lte": sort.startsWith("primary_release_date")
      ? new Date().toISOString().slice(0, 10)
      : undefined,
  });
}

export function getMovieDetails(id: number) {
  return tmdbFetch(`/movie/${id}`, MovieDetailsSchema, {
    append_to_response: "videos,credits",
    include_video_language: "en,null", // فيديوهات إنجليزية حتى لو لغة الطلب غير ذلك
  });
}

// ملخص فيلم (نستخدمه بالقوائم المشاركة)
export function getMovieSummary(id: number) {
  return tmdbFetch(`/movie/${id}`, MovieSchema);
}

export function discoverTonight({
  genres,
  maxRuntime,
  page = 1,
}: {
  genres: string;
  maxRuntime?: number;
  page?: number;
}) {
  return tmdbFetch("/discover/movie", PaginatedMoviesSchema, {
    with_genres: genres, // الفاصلة "|" بتعني "أو"
    "with_runtime.gte": 60, // نستبعد الأفلام القصيرة جدًا
    "with_runtime.lte": maxRuntime,
    "vote_average.gte": 7,
    "vote_count.gte": 500, // ما ننخدع بأفلام بتقييم عالي من أصوات قليلة
    "primary_release_date.lte": new Date().toISOString().slice(0, 10), // أفلام صدرت فعلًا
    sort_by: "popularity.desc",
    include_adult: "false",
    page,
  });
}
