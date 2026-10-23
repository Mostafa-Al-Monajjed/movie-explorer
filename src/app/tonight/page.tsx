import type { Metadata } from "next";
import { TonightPicker } from "@/components/TonightPicker";
import { TonightResult } from "@/components/TonightResult";
import { firstParam, type SearchParams } from "../lib/params";
import { tmdbImage } from "../lib/tmdb/image";
import { getTrendingMovies } from "../lib/tmdb/movies";
import { getTonightPick } from "../lib/tmdb/tonight";
import { findMood, findTime, parseSeed } from "../lib/tonight";

type Props = { searchParams: Promise<SearchParams> };

function parseRequest(params: SearchParams) {
  return {
    mood: findMood(firstParam(params.mood)),
    time: findTime(firstParam(params.time)),
    seed: parseSeed(firstParam(params.seed)),
  };
}

async function resolvePick(params: SearchParams) {
  const { mood, time, seed } = parseRequest(params);
  if (!mood || !time || seed === undefined) return null;

  const movie = await getTonightPick(mood.id, time.id, seed);
  return movie ? { movie, mood, time, seed } : null;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const pick = await resolvePick(await searchParams);

  if (!pick) {
    return {
      title: "Pick a Movie for Tonight",
      description:
        "Tell us your mood and how much time you have, and we'll pick a great movie for you.",
    };
  }

  const { movie } = pick;
  const title = `Tonight's pick: ${movie.title}`;
  const image = tmdbImage(movie.backdrop_path ?? movie.poster_path, "w780");

  return {
    title,
    description: movie.overview.slice(0, 160),
    robots: { index: false }, // صفحات النتائج المشاركة ما لازم تظهر بجوجل
    openGraph: { title, images: image ? [image] : [] },
  };
}

export default async function TonightPage({ searchParams }: Props) {
  const params = await searchParams;
  const { mood, time, seed } = parseRequest(params);
  const hasRequest = Boolean(mood && time && seed !== undefined);

  const [pick, trending] = await Promise.all([
    resolvePick(params),
    getTrendingMovies("week"),
  ]);

  const posters = trending.results
    .flatMap((movie) => (movie.poster_path ? [movie.poster_path] : []))
    .slice(0, 12);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="animate-fade-up mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          🎲 Tonight&apos;s Pick
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-400">
          Can&apos;t decide what to watch? Pick a mood and how long you have,
          and we&apos;ll choose a well-rated movie for you.
        </p>
      </header>

      <TonightPicker
        initialMood={mood?.id}
        initialTime={time?.id}
        posters={posters}
        hasResult={Boolean(pick)}
      >
        {pick ? (
          <TonightResult
            movie={pick.movie}
            mood={pick.mood}
            sharePath={`/tonight?${new URLSearchParams({
              mood: pick.mood.id,
              time: pick.time.id,
              seed: String(pick.seed),
            }).toString()}`}
          />
        ) : hasRequest ? (
          <p className="py-12 text-center text-neutral-400">
            We couldn&apos;t find a match for that combination. Try another mood
            or give us more time.
          </p>
        ) : (
          <p className="py-12 text-center text-neutral-400">
            Choose a mood, set your time, and hit the button. Your pick will
            appear here.
          </p>
        )}
      </TonightPicker>
    </div>
  );
}
