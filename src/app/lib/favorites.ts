import type { Movie } from "../lib/tmdb/schemas";

// الحقول الأساسية اللي يحتاجها الكرت، وهي اللي نخزنها بس
export type FavoriteMovie = Pick<
  Movie,
  "id" | "title" | "poster_path" | "release_date" | "vote_average"
>;

// نحفظ الحقول المطلوبة فقط، حتى لو وصلنا Movie أو MovieDetails كامل
export function toFavorite(movie: FavoriteMovie): FavoriteMovie {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
}
