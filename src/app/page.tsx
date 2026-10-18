import { getTrendingMovies } from "./lib/tmdb/movies";

export default async function HomePage() {
  const { results } = await getTrendingMovies();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Trending This Week</h1>
      <ul className="mt-4 space-y-1">
        {results.map((movie) => (
          <li key={movie.id}>
            {movie.title} ⭐ {movie.vote_average.toFixed(1)}
          </li>
        ))}
      </ul>
    </main>
  );
}
