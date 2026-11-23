"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * prefers-reduced-motion as a boolean. The ANIMATION agent may swap the
 * implementation for Framer's `useReducedMotion` (DESIGN.md §5) — keep the API.
 */
export function useReducedMotionPref(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
