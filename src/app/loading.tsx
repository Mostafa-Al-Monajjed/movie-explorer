import { MovieGridSkeleton } from "@/components/MovieGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-neutral-800" />
      <MovieGridSkeleton />
    </div>
  );
}
