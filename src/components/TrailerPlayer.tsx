"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

interface TrailerPlayerProps {
  videoKey: string;
  title: string;
  posterSrc: string | null;
}

// قناع بيخلي الضوء يتلاشى بنعومة عند الأطراف
const FADE_MASK =
  "[mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_82%)]";

export function TrailerPlayer({
  videoKey,
  title,
  posterSrc,
}: TrailerPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group/trailer relative isolate py-2">
      {posterSrc && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 transition-all duration-1000 ease-out sm:-inset-x-24 sm:-inset-y-14 ${FADE_MASK} ${
            playing
              ? "scale-105 opacity-100"
              : "opacity-75 group-hover/trailer:opacity-100"
          }`}
        >
          <div className="animate-glow-in absolute inset-0">
            <div className="animate-glow relative h-full w-full will-change-transform">
              <Image
                src={posterSrc}
                alt=""
                fill
                sizes="(min-width: 1152px) 900px, 80vw"
                className="scale-110 object-cover blur-3xl saturate-[2.5] brightness-125"
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_0_60px_-12px_rgba(255,255,255,0.12)] ring-1 ring-white/10 transition-shadow duration-700 group-hover/trailer:shadow-[0_0_90px_-10px_rgba(255,255,255,0.22)]">
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
                className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-yellow-400/40" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-black" />
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
