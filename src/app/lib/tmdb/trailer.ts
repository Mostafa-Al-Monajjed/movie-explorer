import type { Video } from "./schemas";

export function pickTrailer(videos: Video[]): Video | null {
  const youtube = videos.filter((v) => v.site === "YouTube");
  const newestFirst = (a: Video, b: Video) =>
    (b.published_at ?? "").localeCompare(a.published_at ?? "");

  const trailers = youtube
    .filter((v) => v.type === "Trailer")
    .sort(newestFirst);
  const teasers = youtube.filter((v) => v.type === "Teaser").sort(newestFirst);

  // الأولوية: تريلر رسمي ← أي تريلر ← تيزر
  return trailers.find((v) => v.official) ?? trailers[0] ?? teasers[0] ?? null;
}
