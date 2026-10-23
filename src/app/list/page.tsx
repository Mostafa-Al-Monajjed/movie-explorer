import type { Metadata } from "next";
import Link from "next/link";
import { AddAllButton } from "../../components/AddAllButton";
import { MovieGrid } from "../../components/MovieGrid";
import { ShareButton } from "../../components/ShareButton";
import { toFavorite } from "../lib/favorites";
import { firstParam, type SearchParams } from "../lib/params";
import { buildListPath, parseIds, parseName } from "../lib/shared-list";
import { tmdbImage } from "../lib/tmdb/image";
import { getSharedMovies } from "../lib/tmdb/shared-list";

type Props = { searchParams: Promise<SearchParams> };

async function loadList(params: SearchParams) {
  const ids = parseIds(firstParam(params.ids));
  const name = parseName(firstParam(params.name));
  const { movies, missing } = await getSharedMovies(ids.join(","));
  return { name, movies, missing };
}

const listTitle = (name?: string) =>
  name ? `${name}'s movie list` : "A shared movie list";

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { name, movies } = await loadList(await searchParams);

  if (movies.length === 0) {
    return { title: "Shared list", robots: { index: false } };
  }

  const title = listTitle(name);
  const description = `${movies.length} movies including ${movies
    .slice(0, 3)
    .map((movie) => movie.title)
    .join(", ")}.`;
  const image = tmdbImage(
    movies[0].backdrop_path ?? movies[0].poster_path,
    "w780",
  );

  return {
    title,
    description,
    robots: { index: false }, // قوائم المستخدمين ما لازم تنفهرس
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function SharedListPage({ searchParams }: Props) {
  const { name, movies, missing } = await loadList(await searchParams);

  if (movies.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">
          This list is empty or the link is invalid
        </h1>
        <p className="mt-2 text-neutral-400">
          Ask your friend to share the link again, or start your own list.
        </p>
        <Link
          href="/movies"
          className="mt-6 inline-flex rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-300"
        >
          Browse movies
        </Link>
      </div>
    );
  }

  const title = listTitle(name);
  const cards = movies.map(toFavorite); // الحقول المطلوبة فقط تنتقل للمتصفح

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="animate-fade-up mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-yellow-400">
          Shared list
        </p>
        <h1 className="mt-1 text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-neutral-400">
          {movies.length} {movies.length === 1 ? "movie" : "movies"}
          {missing > 0 && ` (${missing} could not be loaded)`}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <AddAllButton movies={cards} />
          <ShareButton
            path={buildListPath(
              movies.map((movie) => movie.id),
              name,
            )}
            title={title}
            text="Check out this movie list"
            label="Share this list"
          />
        </div>
      </header>

      <MovieGrid movies={cards} />
    </div>
  );
}
