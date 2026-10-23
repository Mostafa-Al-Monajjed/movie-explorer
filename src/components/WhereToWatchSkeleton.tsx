export function WhereToWatchSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading where to watch">
      <div className="skeleton mb-4 h-8 w-48 rounded" />
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-12 w-12 rounded-xl" />
        ))}
      </div>
    </section>
  );
}
