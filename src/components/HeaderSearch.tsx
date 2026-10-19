import { Search } from "lucide-react";

export function HeaderSearch() {
  return (
    <form action="/movies" role="search" className="relative hidden sm:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="search"
        name="q"
        placeholder="Search movies..."
        aria-label="Search movies"
        className="w-48 rounded-full border border-neutral-800 bg-neutral-900 py-1.5 pl-9 pr-3 text-sm outline-hidden focus:border-yellow-400"
      />
    </form>
  );
}
