export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl animate-pulse flex-col gap-8 px-4 py-10 md:flex-row">
      <div className="aspect-[2/3] w-48 shrink-0 self-center rounded-xl bg-neutral-800 md:w-72 md:self-start" />
      <div className="flex-1 space-y-4">
        <div className="h-10 w-2/3 rounded bg-neutral-800" />
        <div className="h-4 w-1/3 rounded bg-neutral-800" />
        <div className="h-24 w-full rounded bg-neutral-800" />
      </div>
    </div>
  );
}
