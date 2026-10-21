"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useIsFavorite } from "../hooks/useIsFavorite";
import type { FavoriteMovie } from "../app/lib/favorites";
import { useFavoritesStore } from "../store/favorites";

interface FavoriteButtonProps {
  movie: FavoriteMovie;
  variant?: "icon" | "full";
  className?: string;
}

export function FavoriteButton({
  movie,
  variant = "icon",
  className = "",
}: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(movie.id);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const [pops, setPops] = useState(0);

  function handleClick() {
    if (!isFavorite) setPops((n) => n + 1); // نحرّك القلب عند الإضافة فقط
    toggleFavorite(movie);
  }

  // الـ key بيعيد إنشاء العنصر عند كل إضافة، فينقز بنابض (Spring)
  // وعند أول تحميل pops = 0، فما في أنيميشن للقلوب المحفوظة
  const heart = (iconClass: string) => (
    <motion.span
      key={pops}
      initial={pops > 0 ? { scale: 0.4 } : false}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
      className="inline-flex"
    >
      <Heart
        className={`${iconClass} ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
      />
    </motion.span>
  );

  if (variant === "full") {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
          isFavorite
            ? "border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20"
            : "border-neutral-700 text-neutral-200 hover:border-red-400 hover:text-red-400"
        } ${className}`}
      >
        {heart("h-4 w-4")}
        {isFavorite ? "Saved to favorites" : "Add to favorites"}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
      aria-pressed={isFavorite}
      aria-label={`Favorite ${movie.title}`}
      className={`z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur ${className}`}
    >
      {heart(`h-4 w-4 ${isFavorite ? "" : "text-white"}`)}
    </motion.button>
  );
}
