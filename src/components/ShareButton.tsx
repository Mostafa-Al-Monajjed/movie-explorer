"use client";

import { Check, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonProps {
  path: string; // مسار نسبي مثل /tonight?mood=mind&time=any&seed=7
  title: string;
  text?: string;
  label?: string;
  className?: string;
}

export function ShareButton({
  path,
  title,
  text,
  label = "Share",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function handleShare() {
    const url = new URL(path, window.location.origin).toString();

    // قائمة المشاركة الأصلية (موبايل وبعض المتصفحات)
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        // المستخدم أغلق النافذة: ما في داعي لأي رد فعل
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }

    // البديل: نسخ الرابط
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400 hover:text-yellow-400 active:translate-y-0 ${className}`}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        {copied ? "Link copied!" : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </>
  );
}
