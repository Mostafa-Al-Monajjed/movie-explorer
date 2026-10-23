import { cache } from "react";
import { findMood, findTime, pageForSeed, pickIndex } from "../../lib/tonight";
import { discoverTonight, getMovieDetails } from "./movies";
import type { MovieDetails } from "./schemas";

// cache: الصفحة و generateMetadata يشاركوا نفس النتيجة بدون طلب مكرر
export const getTonightPick = cache(
  async (
    moodId: string,
    timeId: string,
    seed: number,
  ): Promise<MovieDetails | null> => {
    const mood = findMood(moodId);
    const time = findTime(timeId);
    if (!mood || !time) return null;

    const filters = { genres: mood.genres, maxRuntime: time.maxRuntime };

    let data = await discoverTonight({ ...filters, page: pageForSeed(seed) });
    let pool = data.results.filter((movie) => movie.poster_path);

    // لو الصفحة العشوائية فاضية (فلاتر ضيقة)، نرجع للصفحة الأولى
    if (pool.length === 0) {
      data = await discoverTonight({ ...filters, page: 1 });
      pool = data.results.filter((movie) => movie.poster_path);
    }
    if (pool.length === 0) return null;

    const pick = pool[pickIndex(seed, pool.length)];
    return getMovieDetails(pick.id); // الـ discover ما بيرجّع المدة، فنجيب التفاصيل
  },
);
