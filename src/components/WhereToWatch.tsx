import { ExternalLink } from "lucide-react";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import type { ReactNode } from "react";
import { REGION_COOKIE, resolveRegion } from "../app/lib/region";
import { tmdbImage } from "../app/lib/tmdb/image";
import type { RegionProviders, WatchProvider } from "../app/lib/tmdb/schemas";
import { getWatchProviders, getWatchRegions } from "../app/lib/tmdb/watch";
import { RegionSelect } from "./RegionSelect";

const GROUPS = [
  { key: "flatrate", label: "Stream", hint: "Included with a subscription" },
  { key: "free", label: "Free", hint: "No payment needed" },
  { key: "ads", label: "Free with ads", hint: "Ad-supported" },
  { key: "rent", label: "Rent", hint: "Pay per rental" },
  { key: "buy", label: "Buy", hint: "Own it digitally" },
] as const;

const byPriority = (a: WatchProvider, b: WatchProvider) =>
  (a.display_priority ?? 999) - (b.display_priority ?? 999);

// الإطار المشترك: العنوان، خيار الدولة، وذكر المصدر (JustWatch شرط من TMDB)
function Section({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section
      id="where-to-watch"
      aria-labelledby="watch-heading"
      className="scroll-mt-24"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="watch-heading" className="text-2xl font-bold">
          Where to Watch
        </h2>
        {action}
      </div>

      <div aria-live="polite">{children}</div>

      <p className="mt-4 text-xs text-neutral-400">
        Streaming availability data provided by{" "}
        <a
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          JustWatch
        </a>
        . Availability changes often and varies by country.
      </p>
    </section>
  );
}

function ProviderGroup({
  label,
  hint,
  providers,
}: {
  label: string;
  hint: string;
  providers: WatchProvider[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">
        {label} <span className="font-normal text-neutral-400">· {hint}</span>
      </h3>
      <ul className="mt-3 flex flex-wrap gap-4">
        {[...providers].sort(byPriority).map((provider) => {
          const logo = tmdbImage(provider.logo_path, "w92");

          return (
            <li
              key={provider.provider_id}
              className="flex w-16 flex-col items-center gap-2 text-center"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-neutral-800" />
              )}
              <span className="text-xs leading-tight text-neutral-300">
                {provider.provider_name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// نمسك الخطأ هون، فمشكلة بهالقسم ما بتخرّب صفحة الفيلم كلها
async function loadAvailability(movieId: number) {
  try {
    const [regions, providers] = await Promise.all([
      getWatchRegions(),
      getWatchProviders(movieId),
    ]);
    return { regions: regions.results, byRegion: providers.results };
  } catch {
    return null;
  }
}

export async function WhereToWatch({ movieId }: { movieId: number }) {
  const availability = await loadAvailability(movieId);

  if (!availability) {
    return (
      <Section>
        <p className="text-neutral-400">
          Streaming availability is unavailable right now. Please try again
          later.
        </p>
      </Section>
    );
  }

  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const { regions, byRegion } = availability;

  const { region, source } = resolveRegion({
    saved: cookieStore.get(REGION_COOKIE)?.value,
    detected: headerStore.get("x-vercel-ip-country"), // موجود على Vercel فقط
    available: new Set(regions.map((r) => r.iso_3166_1)),
  });

  const options = regions
    .map((r) => ({ code: r.iso_3166_1, name: r.english_name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const countryName = options.find((o) => o.code === region)?.name ?? region;
  const info: RegionProviders | undefined = byRegion[region];

  const groups = GROUPS.flatMap((group) => {
    const providers = info?.[group.key];
    return providers && providers.length > 0 ? [{ ...group, providers }] : [];
  });

  const sourceHint =
    source === "detected"
      ? "Based on your location"
      : source === "default"
        ? "Choose your country to see local options"
        : null;

  return (
    <Section action={<RegionSelect regions={options} current={region} />}>
      {sourceHint && (
        <p className="mb-4 text-sm text-neutral-400">{sourceHint}</p>
      )}

      {groups.length > 0 ? (
        <div className="space-y-6">
          {groups.map((group) => (
            <ProviderGroup
              key={group.key}
              label={group.label}
              hint={group.hint}
              providers={group.providers}
            />
          ))}
        </div>
      ) : (
        <p className="text-neutral-400">
          No streaming, rental, or purchase options are listed for {countryName}{" "}
          yet. Try another country.
        </p>
      )}

      {info?.link && (
        <a
          href={info.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_8px_30px_rgba(250,204,21,0.35)] active:translate-y-0"
        >
          See all options
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      )}
    </Section>
  );
}
