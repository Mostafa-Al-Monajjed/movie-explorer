"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-neutral-400">
        We couldn&apos;t load the movies. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-300"
      >
        Try again
      </button>
    </div>
  );
}
