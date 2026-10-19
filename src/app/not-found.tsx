import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 text-neutral-400">
        We couldn&apos;t find that page or movie.
      </p>
      <Link
        href="/movies"
        className="mt-6 inline-flex rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-300"
      >
        Browse movies
      </Link>
    </div>
  );
}
