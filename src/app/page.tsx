import Link from "next/link";
import { getTrendingMovies } from "../app/lib/tmdb/movies";
import { Hero } from "../components/Hero";
import { MovieGrid } from "../components/MovieGrid";
import { FadeIn } from "../components/FadeIn";

export default async function HomePage() {
  const { results } = await getTrendingMovies("week");

  const featured = results.find((m) => m.backdrop_path) ?? results[0];
  const others = results.filter((m) => m.id !== featured?.id).slice(0, 10);

  return (
    <>
      {featured && <Hero movie={featured} />}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <Link
          href="/tonight"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-yellow-400/30 bg-linear-to-r from-yellow-400/10 to-transparent p-6 transition-colors hover:border-yellow-400/60"
        >
          <div>
            <h2 className="text-xl font-bold">
              Can&apos;t decide what to watch?
            </h2>
            <p className="mt-1 text-neutral-300">
              Tell us your mood and we&apos;ll pick a great movie for tonight.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-yellow-400 px-5 py-2 font-semibold text-black transition-transform group-hover:scale-105">
            Pick for me 🎲
          </span>
        </Link>
      </section>
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
        <FadeIn>
          <MovieGrid movies={others} />
        </FadeIn>
      </section>
    </>
  );
}
