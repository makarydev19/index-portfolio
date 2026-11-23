"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { dur, ease } from "./easings";
import { $, onceInView, playSplit, type Kit } from "./kit";

/**
 * Generic scroll reveals (once) for every [data-anim] element no other module claimed:
 * rule draw, fade-up batches, masked line splits and clip-path reveals.
 */
export function setupScrollReveals(scope: HTMLElement, kit: Kit) {
  const free = (sel: string) => $(scope, sel).filter((el) => !kit.isClaimed(el) && !el.closest("[data-intro]"));

  // Rules: scaleX 0→1 from the left.
  free('[data-anim="rule"]').forEach((r) => {
    gsap.set(r, { scaleX: 0, transformOrigin: "left center" });
    onceInView(kit, r, () => gsap.to(r, { scaleX: 1, duration: 1, ease: ease.outExpo.gsap }), "top 92%");
  });

  // Fade-ups: batched so siblings entering together stagger.
  const fades = free('[data-anim="fade-up"]');
  if (fades.length) {
    gsap.set(fades, { opacity: 0, y: 24 });
    ScrollTrigger.batch(fades, {
      start: "clamp(top 90%)",
      once: true,
      onEnter: (batch) =>
        kit.add(() =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: ease.outExpo.gsap, stagger: 0.06, overwrite: true }),
        ),
    });
  }

  // Masked line reveals (split at play time).
  free('[data-anim="split-lines"]').forEach((el) => {
    gsap.set(el, { opacity: 0 });
    const tight = el.closest("[data-case-section]") && !el.classList.contains("text-lead");
    onceInView(kit, el, () =>
      playSplit(kit, el, "lines", {
        hidden: "opacity",
        stagger: tight ? 0.06 : 0.08,
        duration: tight ? dur.l : 1,
      }),
    );
  });

  free('[data-anim="split-chars"]').forEach((el) => {
    gsap.set(el, { opacity: 0 });
    onceInView(kit, el, () => playSplit(kit, el, "chars", { hidden: "opacity", stagger: 0.03 }));
  });

  // Clip reveals (mobile index covers): inset(0 0 100% 0) → inset(0), inner 1.15 → 1.
  free('[data-anim="clip-reveal"]').forEach((el) => {
    const inner = el.querySelector("[data-anim-inner]");
    gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(inner, { scale: 1.15 });
    onceInView(kit, el, () => {
      gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: ease.outExpo.gsap });
      gsap.to(inner, { scale: 1, duration: 1.2, ease: ease.outExpo.gsap });
    });
  });
}

/** Hairline rows (motion highlights, experience): rule draws, then cells rise. */
export function setupRuleRows(scope: HTMLElement, kit: Kit) {
  $(scope, "li[data-hl-row]").forEach((row) => {
    const rule = row.querySelector('[data-anim="rule"]');
    const cells = $(row, "[data-row-cell]");
    kit.claim(rule);
    kit.claim(cells);
    gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(cells, { opacity: 0, y: 20 });
    onceInView(kit, row, () => {
      gsap.to(rule, { scaleX: 1, duration: 1, ease: ease.outExpo.gsap });
      gsap.to(cells, { opacity: 1, y: 0, duration: 0.8, ease: ease.outExpo.gsap, stagger: 0.05, delay: 0.1 });
    });
  });
}
