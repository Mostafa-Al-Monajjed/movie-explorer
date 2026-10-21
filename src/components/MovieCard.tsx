import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { toFavorite, type FavoriteMovie } from "../app/lib/favorites";
import { tmdbImage } from "../app/lib/tmdb/image";
import { FavoriteButton } from "./FavoriteButton";

export function MovieCard({ movie }: { movie: FavoriteMovie }) {
  const poster = tmdbImage(movie.poster_path, "w500");
  const year = movie.release_date?.slice(0, 4);

  return (
    <div className="group relative transition-transform duration-300 ease-out hover:-translate-y-1.5">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-neutral-800 transition-shadow duration-300 group-hover:shadow-[0_12px_40px_-8px_rgba(250,204,21,0.35)]">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-500">
              No poster
            </div>
          )}
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-medium">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "NR"}
          </div>
        </div>
        <h3 className="mt-2 line-clamp-1 text-sm font-semibold group-hover:text-yellow-400">
          {movie.title}
        </h3>
        {year && <p className="text-xs text-neutral-400">{year}</p>}
      </Link>

      {/* الزر بجانب الرابط مش جواه، لأن الزر داخل <a> غير صحيح */}
      <FavoriteButton
        movie={toFavorite(movie)}
        className="absolute right-2 top-2"
      />
    </div>
  );
}
