import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../app/lib/tmdb/schemas";
import { tmdbImage } from "../app/lib/tmdb/image";

export function Hero({ movie }: { movie: Movie }) {
  const backdrop = tmdbImage(movie.backdrop_path, "w500");

  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-yellow-400">
          Trending now
        </p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{movie.title}</h1>
        <p className="mt-3 line-clamp-3 max-w-2xl text-neutral-300">
          {movie.overview}
        </p>
        <Link
          href={`/movie/${movie.id}`}
          className="mt-5 inline-flex w-fit rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-300"
        >
          View details
        </Link>
      </div>
    </section>
  );
}
