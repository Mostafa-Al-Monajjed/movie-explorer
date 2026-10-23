export const MOODS = [
  { id: "laugh", label: "Laugh", emoji: "😂", genres: "35" },
  { id: "thrill", label: "Thrilled", emoji: "😱", genres: "53|27|80" },
  { id: "mind", label: "Mind-bending", emoji: "🤯", genres: "878|9648" },
  { id: "adrenaline", label: "Adrenaline", emoji: "💥", genres: "28|12" },
  { id: "feels", label: "Feel something", emoji: "🥹", genres: "18|10749" },
  { id: "family", label: "Family", emoji: "🧸", genres: "10751|16" },
] as const;

export const TIMES = [
  { id: "short", label: "Under 90 min", maxRuntime: 90 },
  { id: "medium", label: "Up to 2 hours", maxRuntime: 120 },
  { id: "any", label: "All night", maxRuntime: undefined },
] as const;

export type Mood = (typeof MOODS)[number];
export type Time = (typeof TIMES)[number];
export type MoodId = Mood["id"];
export type TimeId = Time["id"];

export const findMood = (id?: string): Mood | undefined =>
  MOODS.find((m) => m.id === id);
export const findTime = (id?: string): Time | undefined =>
  TIMES.find((t) => t.id === id);

// الـ seed لازم يكون رقم صحيح قصير، وأي قيمة غريبة بالرابط بنتجاهلها
export function parseSeed(value?: string): number | undefined {
  if (!value || !/^\d{1,9}$/.test(value)) return undefined;
  return Number(value);
}

// دالة خلط (hash): نفس الـ seed دايمًا بيعطي نفس الرقم
export function pickIndex(seed: number, length: number): number {
  let h = (seed + 0x9e3779b9) | 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) % length;
}

// نختار من أول 5 صفحات (حوالي 100 فيلم) من أشهر الأفلام المطابقة
export const POOL_PAGES = 5;
export const pageForSeed = (seed: number) =>
  pickIndex(seed + 101, POOL_PAGES) + 1;
