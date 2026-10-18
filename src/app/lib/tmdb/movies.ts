import { tmdbFetch } from "./client";
import { PaginatedMoviesSchema } from "./schemas";

export function getTrendingMovies(timeWindow: "day" | "week" = "week") {
  return tmdbFetch(`/trending/movie/${timeWindow}`, PaginatedMoviesSchema);
}
