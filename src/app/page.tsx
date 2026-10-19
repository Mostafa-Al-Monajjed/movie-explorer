import Link from "next/link";
import { getTrendingMovies } from "../app/lib/tmdb/movies";
import { Hero } from "../components/Hero";
import { MovieGrid } from "../components/MovieGrid";

export default async function HomePage() {
  const { results } = await getTrendingMovies("week");

  const featured = results.find((m) => m.backdrop_path) ?? results[0];
  const others = results.filter((m) => m.id !== featured?.id).slice(0, 10);

  return (
    <>
      {featured && <Hero movie={featured} />}

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Trending This Week</h2>
          <Link
            href="/movies"
            className="text-sm text-yellow-400 hover:underline"
          >
            Browse all →
          </Link>
        </div>
        <MovieGrid movies={others} />
      </section>
    </>
  );
}
