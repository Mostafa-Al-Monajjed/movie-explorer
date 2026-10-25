import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import {
  siteAuthor,
  siteDescription,
  siteName,
  siteUrl,
} from "../app/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// الصق هنا رمز التحقق من Google Search Console (قيمة content فقط) بعد ما تحصل عليه بالخطوة 4
const GOOGLE_VERIFICATION = "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteAuthor }],
  creator: siteAuthor,
  openGraph: { siteName, type: "website", locale: "en_US" },
  verification: GOOGLE_VERIFICATION
    ? { google: GOOGLE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-yellow-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
