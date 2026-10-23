import { cache } from "react";
import { getMovieSummary } from "./movies";

// المفتاح نص ("550,603") عشان الـ cache يتعرف على الطلب المكرر
export const getSharedMovies = cache(async (idsKey: string) => {
  const ids = idsKey ? idsKey.split(",").map(Number) : [];

  // allSettled: لو فيلم واحد انحذف من TMDB، باقي القائمة تظهر عادي
  const results = await Promise.allSettled(
    ids.map((id) => getMovieSummary(id)),
  );
  const movies = results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

  return { movies, missing: ids.length - movies.length };
});
