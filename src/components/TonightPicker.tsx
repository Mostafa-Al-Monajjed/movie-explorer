"use client";

import { Dices } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import { tmdbImage } from "../app/lib/tmdb/image";
import { MOODS, TIMES, type MoodId, type TimeId } from "../app/lib/tonight";

interface TonightPickerProps {
  initialMood?: MoodId;
  initialTime?: TimeId;
  posters: string[]; // بوسترات للـ "رول" المتحرك
  hasResult: boolean;
  children: ReactNode; // النتيجة (Server Component)
}

const SPIN_MS = 1400;

function Reel({ posters }: { posters: string[] }) {
  const urls = posters.flatMap((path) => {
    const url = tmdbImage(path, "w185");
    return url ? [url] : [];
  });

  if (urls.length < 4) {
    return (
      <div className="flex flex-col items-center py-16 text-neutral-400">
        <Dices className="h-10 w-10 animate-spin text-yellow-400" />
        <p className="mt-4">Picking something great…</p>
      </div>
    );
  }

  // نكرر القائمة مرتين، فالحركة -50% بتتكرر بسلاسة بدون قفزة
  const strip = [...urls, ...urls];

  return (
    <div className="py-6">
      <p className="sr-only">Picking a movie for you</p>
      <div className="relative mx-auto h-56 max-w-2xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-reel flex w-max">
          {strip.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt=""
              width={149}
              height={224}
              className="mr-3 h-56 w-[149px] shrink-0 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
      <p aria-hidden="true" className="mt-4 text-center text-neutral-400">
        Picking something great…
      </p>
    </div>
  );
}

export function TonightPicker({
  initialMood,
  initialTime,
  posters,
  hasResult,
  children,
}: TonightPickerProps) {
  const router = useRouter();
  const [mood, setMood] = useState<MoodId | undefined>(initialMood);
  const [time, setTime] = useState<TimeId>(initialTime ?? "medium");
  const [pendingSeed, setPendingSeed] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const busy = pendingSeed !== null || isPending;

  // بعد ما تدور البوسترات مدة قصيرة، ننتقل للرابط (والسيرفر يجيب الفيلم)
  useEffect(() => {
    if (pendingSeed === null || !mood) return;

    const id = window.setTimeout(() => {
      const params = new URLSearchParams({
        mood,
        time,
        seed: String(pendingSeed),
      });
      startTransition(() => {
        router.push(`/tonight?${params.toString()}`, { scroll: false });
      });
      setPendingSeed(null);
    }, SPIN_MS);

    return () => window.clearTimeout(id);
  }, [pendingSeed, mood, time, router]);

  function surprise() {
    if (!mood || busy) return;
    setPendingSeed(Math.floor(Math.random() * 1000000));
  }

  return (
    <div>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
          1 · What&apos;s the mood?
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MOODS.map((m) => {
            const active = mood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center rounded-2xl border px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                  active
                    ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_30px_-8px_rgba(250,204,21,0.5)]"
                    : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
                }`}
              >
                <span aria-hidden="true" className="text-3xl">
                  {m.emoji}
                </span>
                <span className="mt-2 text-sm font-medium">{m.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset disabled={busy} className="mt-8 min-w-0">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
          2 · How much time do you have?
        </legend>
        <div className="flex flex-wrap gap-3">
          {TIMES.map((t) => {
            const active = time === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setTime(t.id)}
                className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 active:scale-95 ${
                  active
                    ? "border-yellow-400 bg-yellow-400 font-semibold text-black"
                    : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={surprise}
          disabled={!mood || busy}
          className="group inline-flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-3.5 text-lg font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(250,204,21,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <Dices className="h-6 w-6 transition-transform duration-500 group-hover:rotate-180" />
          {hasResult ? "Another one" : "Surprise me"}
        </button>
        {!mood && (
          <p className="mt-3 text-sm text-neutral-400">
            Pick a mood to continue
          </p>
        )}
      </div>

      <div className="mt-10" aria-live="polite">
        {busy ? <Reel posters={posters} /> : children}
      </div>
    </div>
  );
}
