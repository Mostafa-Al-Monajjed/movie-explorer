"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { REGION_COOKIE } from "../app/lib/region";

interface RegionSelectProps {
  regions: { code: string; name: string }[];
  current: string;
}

export function RegionSelect({ regions, current }: RegionSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(code: string) {
    // cookie بسيطة لحفظ الاختيار سنة كاملة، والسيرفر بيقرأها بالطلب التالي
    document.cookie = `${REGION_COOKIE}=${code}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => router.refresh());
  }

  return (
    <label className="flex items-center gap-2 text-sm text-neutral-300">
      <Globe aria-hidden="true" className="h-4 w-4" />
      <span className="sr-only">Country</span>
      <select
        value={current}
        disabled={isPending}
        aria-busy={isPending}
        onChange={(e) => handleChange(e.target.value)}
        className="max-w-48 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm outline-hidden transition-colors focus:border-yellow-400 disabled:opacity-60"
      >
        {regions.map((region) => (
          <option key={region.code} value={region.code}>
            {region.name}
          </option>
        ))}
      </select>
    </label>
  );
}
