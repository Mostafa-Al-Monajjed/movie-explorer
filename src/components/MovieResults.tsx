import Link from "next/link";
import { DEFAULT_SORT, SORT_OPTIONS } from "../app/lib/constants";
import {
  MAX_PAGE,
  buildPageHref,
  parsePage,
  type LinkParams,
} from "../app/lib/pagination";
import { discoverMovies, searchMovies } from "../app/lib/tmdb/movies";
import { MovieGrid } from "./MovieGrid";
import { Pagination } from "./Pagination";

export type MoviesSearchParams = {
  q?: string;
  genre?: string;
  sort?: string;
  page?: string;
};

const BASE_PATH = "/movies";

export async function MovieResults({ params }: { params: MoviesSearchParams }) {
  const query = params.q?.trim() || undefined;
  const genre =
    params.genre && /^\d+$/.test(params.genre) ? params.genre : undefined;
  const sort =
    SORT_OPTIONS.find((o) => o.value === params.sort)?.value ?? DEFAULT_SORT;
  const page = parsePage(params.page);

  const data = query
    ? await searchMovies(query, page)
    : await discoverMovies({ genre, sort, page });

  // endpoint البحث ما بيدعم فلتر النوع، فنفلتر نتائج الصفحة الحالية بس
  const movies =
    query && genre
      ? data.results.filter((m) => m.genre_ids?.includes(Number(genre)))
      : data.results;

  const totalPages = Math.min(data.total_pages, MAX_PAGE);

  // الفلاتر اللي لازم تنحفظ بكل رابط صفحة (القيمة الافتراضية ما نكتبها)
  const linkParams: LinkParams = {
    q: query,
    genre,
    sort: sort === DEFAULT_SORT ? undefined : sort,
  };

  // رقم صفحة أكبر من عدد الصفحات الفعلي (مثلًا ?q=batman&page=50)
  if (totalPages > 0 && page > totalPages) {
    return (
      <div className="py-16 text-center">
        <p className="text-neutral-400">This page doesn&apos;t exist.</p>
        <Link
          href={buildPageHref(BASE_PATH, linkParams, 1)}
          className="mt-4 inline-flex rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-300"
        >
          Go to first page
        </Link>
      </div>
    );
  }

  return (
    <>
      <MovieGrid movies={movies} />
      <Pagination
        page={page}
        totalPages={totalPages}
        basePath={BASE_PATH}
        params={linkParams}
      />
    </>
  );
}
