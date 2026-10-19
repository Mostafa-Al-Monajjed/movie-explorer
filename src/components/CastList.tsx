import Image from "next/image";
import type { CastMember } from "../app/lib/tmdb/schemas";
import { tmdbImage } from "../app/lib/tmdb/image";

export function CastList({ cast }: { cast: CastMember[] }) {
  return (
    <ul className="flex gap-4 overflow-x-auto pb-4">
      {cast.map((person, index) => {
        const photo = tmdbImage(person.profile_path, "w185");

        return (
          <li key={`${person.id}-${index}`} className="w-28 shrink-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-800">
              {photo ? (
                <Image
                  src={photo}
                  alt={person.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-neutral-500">
                  No photo
                </div>
              )}
            </div>
            <p className="mt-2 line-clamp-1 text-sm font-medium">
              {person.name}
            </p>
            {person.character && (
              <p className="line-clamp-1 text-xs text-neutral-400">
                {person.character}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
