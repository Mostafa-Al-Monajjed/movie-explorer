export const MAX_PAGE = 500; // أقصى صفحة بتقبلها TMDB

export type LinkParams = Record<string, string | undefined>;

// يحوّل أي قيمة بالرابط لرقم صفحة صالح بين 1 و500
export function parsePage(value?: string): number {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.min(MAX_PAGE, Math.max(1, n)) : 1;
}

// يبني رابط الصفحة ويحافظ على باقي الفلاتر، والصفحة 1 بدون ?page
export function buildPageHref(
  basePath: string,
  params: LinkParams,
  page: number,
): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value && key !== "page") search.set(key, value);
  }
  if (page > 1) search.set("page", String(page));

  const qs = search.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

// يرجّع أرقام الصفحات مع "…"، مثل: [1, "…", 9, 10, 11, "…", 500]
export function getPageNumbers(
  current: number,
  total: number,
): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current - 1, current, current + 1]);

  // قرب البداية أو النهاية نعرض أرقام أكتر، فالشكل ما يقفز بين الصفحات
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= total - 2)
    [total - 1, total - 2, total - 3].forEach((p) => pages.add(p));

  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "…")[] = [];
  sorted.forEach((page, index) => {
    if (index > 0) {
      const gap = page - sorted[index - 1];
      if (gap === 2)
        result.push(page - 1); // فجوة صفحة وحدة: نعرضها بدل "…"
      else if (gap > 2) result.push("…");
    }
    result.push(page);
  });

  return result;
}
