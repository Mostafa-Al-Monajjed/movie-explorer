import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../app/lib/tmdb/schemas";
import { tmdbImage } from "../app/lib/tmdb/image";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero({ movie }: { movie: Movie }) {
  const backdrop = tmdbImage(movie.backdrop_path, "w500");

  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10">
        <p
          className="animate-fade-up text-sm font-medium uppercase tracking-widest text-yellow-400"
          style={delay(100)}
        >
          Trending now
        </p>
        <h1
          className="animate-fade-up mt-2 text-4xl font-bold md:text-5xl"
          style={delay(220)}
        >
          {movie.title}
        </h1>
        <p
          className="animate-fade-up mt-3 line-clamp-3 max-w-2xl text-neutral-300"
          style={delay(340)}
        >
          {movie.overview}
        </p>
        <Link
          href={`/movie/${movie.id}`}
          style={delay(460)}
          className="animate-fade-up mt-5 inline-flex w-fit rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_8px_30px_rgba(250,204,21,0.35)] active:translate-y-0"
        >
          View details
        </Link>
      </div>
    </section>
  );
}
