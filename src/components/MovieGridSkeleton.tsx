export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-xl bg-neutral-800" />
          <div className="mt-2 h-4 w-3/4 rounded bg-neutral-800" />
          <div className="mt-1 h-3 w-1/4 rounded bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}
