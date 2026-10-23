import { tmdbFetch } from "./client";
import {
  WatchProvidersResponseSchema,
  WatchRegionsResponseSchema,
} from "./schemas";

export function getWatchProviders(movieId: number) {
  // التوفّر بيتغيّر بشكل متكرر، فنجدد البيانات كل 6 ساعات
  return tmdbFetch(
    `/movie/${movieId}/watch/providers`,
    WatchProvidersResponseSchema,
    {},
    21600,
  );
}

export function getWatchRegions() {
  // قائمة الدول المدعومة نادرًا ما تتغير: 24 ساعة
  return tmdbFetch(
    "/watch/providers/regions",
    WatchRegionsResponseSchema,
    {},
    86400,
  );
}
