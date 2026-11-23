/**
 * Motion tokens mirrored from globals.css (DESIGN.md §2.6) so CSS and GSAP never drift.
 */
export const ease = {
  outExpo: { css: "cubic-bezier(0.16, 1, 0.3, 1)", gsap: "expo.out", bezier: [0.16, 1, 0.3, 1] },
  inOutQuart: { css: "cubic-bezier(0.76, 0, 0.24, 1)", gsap: "power4.inOut", bezier: [0.76, 0, 0.24, 1] },
  outQuart: { css: "cubic-bezier(0.25, 1, 0.5, 1)", gsap: "power3.out", bezier: [0.25, 1, 0.5, 1] },
  inQuart: { css: "cubic-bezier(0.5, 0, 0.75, 0)", gsap: "power3.in", bezier: [0.5, 0, 0.75, 0] },
  spring: { gsap: "elastic.out(1, 0.4)" },
} as const;

/** Durations in seconds (GSAP / Framer) — CSS uses --dur-* in ms. */
export const dur = { xs: 0.15, s: 0.3, m: 0.6, l: 0.9, xl: 1.2 } as const;

export const stagger = { chars: 0.03, words: 0.04, lines: 0.08, items: 0.08 } as const;
