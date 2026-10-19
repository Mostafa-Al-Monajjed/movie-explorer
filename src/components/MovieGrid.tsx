import type { FavoriteMovie } from "../app/lib/favorites";
import { MovieCard } from "./MovieCard";

export function MovieGrid({ movies }: { movies: FavoriteMovie[] }) {
  if (movies.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-400">No movies found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
