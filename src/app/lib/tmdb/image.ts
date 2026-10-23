export type ImageSize =
  | "w92"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original";

export function tmdbImage(path: string | null, size: ImageSize = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
