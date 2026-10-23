export const REGION_COOKIE = "region";
export const DEFAULT_REGION = "US";

export type RegionSource = "saved" | "detected" | "default";

const isRegionCode = (value?: string | null): value is string =>
  typeof value === "string" && /^[A-Z]{2}$/.test(value);

// الأولوية: اختيار المستخدم ← دولته من Vercel ← الافتراضي
// وكل قيمة لازم تكون ضمن الدول اللي بتدعمها TMDB، وإلا بنتجاهلها
export function resolveRegion({
  saved,
  detected,
  available,
}: {
  saved?: string;
  detected?: string | null;
  available: ReadonlySet<string>;
}): { region: string; source: RegionSource } {
  const savedCode = saved?.toUpperCase();
  if (isRegionCode(savedCode) && available.has(savedCode)) {
    return { region: savedCode, source: "saved" };
  }

  const detectedCode = detected?.toUpperCase();
  if (isRegionCode(detectedCode) && available.has(detectedCode)) {
    return { region: detectedCode, source: "detected" };
  }

  return { region: DEFAULT_REGION, source: "default" };
}
