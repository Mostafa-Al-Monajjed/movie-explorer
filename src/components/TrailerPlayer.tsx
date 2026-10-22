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
    <div className="relative isolate py-2">
      {/* الإضاءة الملوّنة فقط: بدون إطار زجاجي وبدون طبقة ضباب */}
      {posterSrc && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 transition-opacity duration-1000 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] sm:-inset-x-16 sm:-inset-y-10 ${
            playing ? "opacity-100" : "opacity-60"
          }`}
        >
          <div className="animate-glow relative h-full w-full">
            <Image
              src={posterSrc}
              alt=""
              fill
              sizes="(min-width: 1152px) 700px, 70vw"
              className="scale-110 object-cover blur-2xl saturate-200 sm:blur-3xl"
            />
          </div>
        </div>
      )}

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
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
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 fill-black" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
