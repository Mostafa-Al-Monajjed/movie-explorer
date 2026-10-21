// رابط الموقع: من Vercel تلقائيًا، أو من SITE_URL لو ربطت دومين خاص
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
