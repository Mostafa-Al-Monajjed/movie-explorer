import Link from "next/link";
import { Film } from "lucide-react";
import { FavoritesLink } from "./FavoritesLink";
import { HeaderSearch } from "./HeaderSearch";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          aria-label="Movie Explorer home"
          className="flex items-center gap-2 text-lg font-bold"
        >
          <Film className="h-5 w-5 text-yellow-400" />
          <span className="hidden sm:inline">Movie Explorer</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <HeaderSearch />
          <nav
            aria-label="Main"
            className="flex items-center gap-4 text-sm text-neutral-300 sm:gap-6"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/movies" className="hover:text-white">
              Movies
            </Link>
            <FavoritesLink />
          </nav>
        </div>
      </div>
    </header>
  );
}
