import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toFavorite } from "../app/lib/favorites";
import { formatRuntime } from "../app/lib/format";
import { tmdbImage } from "../app/lib/tmdb/image";
import type { MovieDetails } from "../app/lib/tmdb/schemas";
import { pickTrailer } from "../app/lib/tmdb/trailer";
import type { Mood } from "../app/lib/tonight";
import { FavoriteButton } from "./FavoriteButton";
import { ShareButton } from "./ShareButton";

interface TonightResultProps {
  movie: MovieDetails;
  mood: Mood;
  sharePath: string;
}

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-sm text-neutral-200";

export function TonightResult({ movie, mood, sharePath }: TonightResultProps) {
  const poster = tmdbImage(movie.poster_path, "w500");
  const backdrop = tmdbImage(movie.backdrop_path, "w780");
  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const hasTrailer = pickTrailer(movie.videos.results) !== null;

  return (
    <article className="relative isolate overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60">
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          sizes="(min-width: 896px) 880px, 100vw"
          className="-z-10 object-cover opacity-20 blur-sm"
        />
      )}

      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
        <div className="animate-reveal relative mx-auto aspect-[2/3] w-44 shrink-0 overflow-hidden rounded-xl bg-neutral-800 shadow-2xl shadow-yellow-400/10 sm:mx-0 sm:w-56">
          {poster ? (
            <Image
              src={poster}
              alt={`${movie.title} poster`}
              fill
              sizes="224px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No poster
            </div>
          )}
        </div>

        <div
          className="animate-fade-up flex-1"
          style={{ animationDelay: "250ms" }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-yellow-400">
            Tonight&apos;s pick
          </p>
          <h2 className="mt-1 text-3xl font-bold">
            {movie.title}
            {year && (
              <span className="font-normal text-neutral-400"> ({year})</span>
            )}
          </h2>

          <ul className="mt-4 flex flex-wrap gap-2">
            <li className={chip}>
              <span aria-hidden="true">{mood.emoji}</span>
              {mood.label}
            </li>
            {runtime && (
              <li className={chip}>
                <Clock className="h-4 w-4" />
                {runtime}
              </li>
            )}
            <li className={chip}>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </li>
            {hasTrailer && (
              <li className={chip}>
                <span aria-hidden="true">🎬</span>
                Trailer available
              </li>
            )}
          </ul>

          {movie.tagline && (
            <p className="mt-4 italic text-neutral-300">{movie.tagline}</p>
          )}
          <p className="mt-3 line-clamp-5 leading-relaxed text-neutral-300">
            {movie.overview || "No overview available yet."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/movie/${movie.id}`}
              className="inline-flex rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_8px_30px_rgba(250,204,21,0.35)]"
            >
              {hasTrailer ? "Details & trailer" : "View details"}
            </Link>
            <Link
              href={`/movie/${movie.id}#where-to-watch`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400 hover:text-yellow-400"
            >
              Where to watch
            </Link>
            <FavoriteButton movie={toFavorite(movie)} variant="full" />
            <ShareButton
              path={sharePath}
              title={`Tonight's pick: ${movie.title}`}
              text={`I'm watching ${movie.title} tonight. What about you?`}
              label="Share this pick"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
