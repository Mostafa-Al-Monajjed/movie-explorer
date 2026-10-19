import Link from "next/link";
import { Film } from "lucide-react";
import { HeaderSearch } from "./HeaderSearch";
import { FavoritesLink } from "./FavoritesLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Film className="h-5 w-5 text-yellow-400" />
          Movie Explorer
        </Link>
        <div className="flex items-center gap-6">
          <HeaderSearch />
          <nav className="flex items-center gap-6 text-sm text-neutral-300">
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
