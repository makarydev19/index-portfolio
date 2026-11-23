"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single GSAP entry point (DESIGN.md §5). Plugins are registered once, client-side only.
 * Import gsap / ScrollTrigger / SplitText / useGSAP from here, never from "gsap" directly.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.config({ nullTargetWarn: false });
  // Mobile address-bar show/hide must not trigger a full refresh mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** gsap.matchMedia() condition set used by every animation module. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

export type MQConditions = { motion: boolean; reduce: boolean; desktop: boolean; fine: boolean };

export { gsap, ScrollTrigger, SplitText, useGSAP };
