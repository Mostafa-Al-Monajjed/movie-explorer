import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { Calendar, Clock, Star, Tv } from "lucide-react";
import { CastList } from "../../../components/CastList";
import { FadeIn } from "../../../components/FadeIn";
import { FavoriteButton } from "../../../components/FavoriteButton";
import { TrailerPlayer } from "../../../components/TrailerPlayer";
import { WhereToWatch } from "../../../components/WhereToWatch";
import { WhereToWatchSkeleton } from "../../../components/WhereToWatchSkeleton";
import { toFavorite } from "../../../app/lib/favorites";
import { formatDate, formatRuntime } from "../../../app/lib/format";
import { TMDBError } from "../../../app/lib/tmdb/client";
import { tmdbImage } from "../../../app/lib/tmdb/image";
import { getMovieDetails } from "../../../app/lib/tmdb/movies";
import { pickTrailer } from "../../../app/lib/tmdb/trailer";

type Props = { params: Promise<{ id: string }> };

// cache: الصفحة و generateMetadata يستخدموا نفس النتيجة بدون طلب مكرر
const loadMovie = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) notFound();

  try {
    return await getMovieDetails(Number(id));
  } catch (error) {
    if (error instanceof TMDBError && error.status === 404) notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await loadMovie(id);

  const description =
    movie.overview.slice(0, 160) ||
    `Details, trailer and cast for ${movie.title}.`;
  const image = tmdbImage(movie.backdrop_path ?? movie.poster_path, "w780");

  return {
    title: movie.title,
    description,
    openGraph: {
      title: movie.title,
      description,
      type: "video.movie",
      images: image ? [image] : [],
    },
  };
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;
  const movie = await loadMovie(id);

  const backdrop = tmdbImage(movie.backdrop_path, "w1280");
  const poster = tmdbImage(movie.poster_path, "w500");
  const trailer = pickTrailer(movie.videos.results);
  const director = movie.credits.crew.find(
    (person) => person.job === "Director",
  );
  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const releaseDate = formatDate(movie.release_date);
  const cast = movie.credits.cast.slice(0, 12);

  return (
    // overflow-x-clip: إضاءة التريلر بتمتد برا حدود الصفحة، فهذا يمنع شريط التمرير الأفقي
    <article className="overflow-x-clip">
      <section className="relative isolate overflow-hidden">
        {backdrop && (
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />

        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/movies"
            className="text-sm text-neutral-300 hover:text-white"
          >
            ← Back to movies
          </Link>

          <div className="mt-6 flex flex-col gap-8 md:flex-row">
            <div className="animate-fade-up relative aspect-[2/3] w-48 shrink-0 self-center overflow-hidden rounded-xl bg-neutral-800 shadow-2xl md:w-72 md:self-start">
              {poster ? (
                <Image
                  src={poster}
                  alt={`${movie.title} poster`}
                  fill
                  priority
                  sizes="(min-width: 768px) 288px, 192px"
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
              style={{ animationDelay: "150ms" }}
            >
              <h1 className="text-3xl font-bold md:text-4xl">
                {movie.title}
                {year && (
                  <span className="font-normal text-neutral-400">
                    {" "}
                    ({year})
                  </span>
                )}
              </h1>

              {movie.tagline && (
                <p className="mt-2 italic text-neutral-300">{movie.tagline}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <strong className="text-white">
                    {movie.vote_average > 0
                      ? movie.vote_average.toFixed(1)
                      : "NR"}
                  </strong>
                  {movie.vote_count > 0 && (
                    <span className="text-neutral-400">
                      ({movie.vote_count.toLocaleString("en-US")} votes)
                    </span>
                  )}
                </span>
                {runtime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {runtime}
                  </span>
                )}
                {releaseDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {releaseDate}
                  </span>
                )}
              </div>

              {movie.genres.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>
                      <Link
                        href={`/movies?genre=${genre.id}`}
                        className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200 transition-colors hover:border-yellow-400 hover:text-yellow-400"
                      >
                        {genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <h2 className="mt-6 text-lg font-semibold">Overview</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-neutral-300">
                {movie.overview || "No overview available yet."}
              </p>

              {director && (
                <p className="mt-4 text-sm text-neutral-400">
                  Directed by{" "}
                  <strong className="text-white">{director.name}</strong>
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <FavoriteButton movie={toFavorite(movie)} variant="full" />
                <a
                  href="#where-to-watch"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_8px_30px_rgba(250,204,21,0.35)] active:translate-y-0"
                >
                  <Tv aria-hidden="true" className="h-4 w-4" />
                  Where to watch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16">
        {/* Suspense: الصفحة تظهر فورًا، وقسم المنصات يوصل لما تجهز بياناته */}
        <Suspense fallback={<WhereToWatchSkeleton />}>
          <WhereToWatch movieId={movie.id} />
        </Suspense>

        <FadeIn>
          <section aria-labelledby="trailer-heading">
            <h2 id="trailer-heading" className="mb-4 text-2xl font-bold">
              Trailer
            </h2>
            {trailer ? (
              <>
                <TrailerPlayer
                  videoKey={trailer.key}
                  title={movie.title}
                  posterSrc={tmdbImage(movie.backdrop_path, "w780")}
                />
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-neutral-400 hover:text-white"
                >
                  Watch on YouTube ↗
                </a>
              </>
            ) : (
              <p className="text-neutral-400">No trailer available yet.</p>
            )}
          </section>
        </FadeIn>

        {cast.length > 0 && (
          <FadeIn>
            <section aria-labelledby="cast-heading">
              <h2 id="cast-heading" className="mb-4 text-2xl font-bold">
                Top Cast
              </h2>
              <CastList cast={cast} />
            </section>
          </FadeIn>
        )}
      </div>
    </article>
  );
}
