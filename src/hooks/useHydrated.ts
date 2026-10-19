"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// السيرفر ووقت الـ Hydration يرجّع false، وبعدها المتصفح يرجّع true
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
