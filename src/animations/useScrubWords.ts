"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ease } from "./easings";
import { $, type Kit } from "./kit";

const MUTED = "#5E5D59";
const SIGNAL = "#FF3B14";

/**
 * Home About statement (DESIGN.md §5.6): word-by-word scrubbed highlight across the
 * 250vh / 200vh sticky section, live "03 — 42%" meta, CTA fades in past 85%.
 * Toolbelt line (§5.7): words scrub 0.3 → 1.
 */
export function setupScrubWords(scope: HTMLElement, kit: Kit) {
  const section = scope.querySelector<HTMLElement>("[data-about-statement]");
  if (section) {
    const words = $(section, "[data-word]");
    const highlights = words.filter((w) => w.hasAttribute("data-highlight"));
    const meta = section.querySelector<HTMLElement>("[data-section-meta]");
    const cta = section.querySelector<HTMLElement>("[data-about-cta]");
    const originalMeta = meta?.textContent ?? "";
    kit.claim(cta);

    gsap.set(words, { opacity: 0.25, color: MUTED });
    gsap.set(cta, { opacity: 0, y: 12 });

    const tl = gsap.timeline({ defaults: { ease: "none", duration: 1 } });
    words.forEach((w, i) => {
      tl.to(w, { opacity: 1, color: highlights.includes(w) ? SIGNAL : "#0D0D0D" }, i * 0.5);
    });

    let ctaShown = false;
    let lastPct = -1;
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      animation: tl,
      onUpdate: (self) => {
        const pct = Math.round(self.progress * 100);
        if (meta && pct !== lastPct) {
          lastPct = pct;
          meta.textContent = `03 — ${pct}%`;
        }
        const show = self.progress > 0.85;
        if (show !== ctaShown) {
          ctaShown = show;
          kit.add(() =>
            gsap.to(cta, {
              opacity: show ? 1 : 0,
              y: show ? 0 : 12,
              duration: 0.6,
              ease: ease.outQuart.gsap,
              overwrite: true,
            }),
          );
        }
      },
    });

    kit.onDispose(() => {
      if (meta) meta.textContent = originalMeta;
    });
  }

  const toolbelt = scope.querySelector<HTMLElement>("[data-toolbelt]");
  if (toolbelt) {
    kit.claim(toolbelt);
    const words = $(toolbelt, "[data-word]");
    gsap.fromTo(
      words,
      { opacity: 0.3 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.15,
        scrollTrigger: { trigger: toolbelt, start: "top 85%", end: "clamp(bottom 50%)", scrub: true },
      },
    );
  }
}
