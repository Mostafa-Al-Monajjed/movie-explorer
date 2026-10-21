import type { MetadataRoute } from "next";
import { siteUrl } from "../app/lib/site";
import { getTrendingMovies } from "../app/lib/tmdb/movies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/movies`, changeFrequency: "daily", priority: 0.8 },
  ];

  try {
    const { results } = await getTrendingMovies("week");
    return [
      ...pages,
      ...results.map((movie) => ({
        url: `${siteUrl}/movie/${movie.id}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return pages; // لو TMDB فشلت، الخريطة الأساسية تبقى شغالة
  }
}
