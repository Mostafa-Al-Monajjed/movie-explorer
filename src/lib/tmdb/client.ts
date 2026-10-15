import "server-only"; // يمنع استيراد هذا الملف بأي Client Component
import { z } from "zod";

const BASE_URL = "https://api.themoviedb.org/3";

export class TMDBError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "TMDBError";
  }
}

export async function tmdbFetch<S extends z.ZodType>(
  path: string,
  schema: S,
  params: Record<string, string | number | undefined> = {},
  revalidate = 3600, // يعيد الجلب كل ساعة (ISR)
): Promise<z.infer<S>> {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) throw new Error("Missing TMDB_ACCESS_TOKEN in .env.local");

  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new TMDBError(`TMDB request failed (${res.status})`, res.status);
  }

  return schema.parse(await res.json()); // يتحقق من شكل البيانات
}
