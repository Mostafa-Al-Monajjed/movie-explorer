"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// reducedMotion="user": لو المستخدم مفعّل "تقليل الحركة" بنظامه، نلغي حركات الانتقال
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
