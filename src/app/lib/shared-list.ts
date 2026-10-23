export const MAX_SHARED_MOVIES = 30;
export const MAX_NAME_LENGTH = 30;

// "550,603,27205" ← [550, 603, 27205]: أرقام صحيحة فقط، بدون تكرار، بحد أقصى
export function parseIds(value?: string): number[] {
  if (!value) return [];

  const unique = new Set<number>();
  for (const part of value.split(",")) {
    const trimmed = part.trim();
    if (/^\d{1,8}$/.test(trimmed)) unique.add(Number(trimmed));
    if (unique.size >= MAX_SHARED_MOVIES) break;
  }
  return [...unique];
}

export function parseName(value?: string): string | undefined {
  const cleaned = value
    ?.replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME_LENGTH)
    .trim();
  return cleaned || undefined;
}

export function buildListPath(ids: number[], name?: string): string {
  const params = new URLSearchParams({
    ids: ids.slice(0, MAX_SHARED_MOVIES).join(","),
  });

  const cleaned = parseName(name);
  if (cleaned) params.set("name", cleaned);

  // الفاصلة مسموحة بالرابط، فنخليها مقروءة بدل %2C
  return `/list?${params.toString().replace(/%2C/g, ",")}`;
}
