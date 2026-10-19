"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

interface TrailerPlayerProps {
  videoKey: string;
  title: string;
  posterSrc: string | null;
}

export function TrailerPlayer({
  videoKey,
  title,
  posterSrc,
}: TrailerPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
          title={`${title} trailer`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play trailer for ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {posterSrc && (
            <Image
              src={posterSrc}
              alt=""
              fill
              sizes="(min-width: 1152px) 1100px, 100vw"
              className="object-cover opacity-70 transition-opacity group-hover:opacity-90"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-black" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
