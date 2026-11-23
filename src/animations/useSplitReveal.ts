"use client";

import { gsap } from "@/lib/gsap";
import { dur, ease } from "./easings";
import { $, introDelay, playSplit, whenIntro, type Kit } from "./kit";

/**
 * Generic page intro (DESIGN.md §5.4 / §5.10–5.12) for everything inside [data-intro]
 * that a specialised module has not claimed. Initial states are applied immediately
 * (the html.js-anim CSS already hides them before hydration) and played on "index:intro".
 */
export function setupIntro(scope: HTMLElement, kit: Kit) {
  $(scope, "[data-intro]").forEach((section) => {
    const free = (sel: string) => $(section, sel).filter((el) => !kit.isClaimed(el));

    const rules = free('[data-anim="rule"]');
    const fades = free('[data-anim="fade-up"]');
    const chars = free('[data-anim="split-chars"]');
    const lines = free('[data-anim="split-lines"]');
    const clips = free('[data-anim="clip-reveal"]');
    const counts = free("[data-work-count]");
    kit.claim([...rules, ...fades, ...chars, ...lines, ...clips, ...counts]);

    gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(fades, { opacity: 0, y: 14 });
    gsap.set(counts, { opacity: 0 });
    clips.forEach((c) => {
      gsap.set(c, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(c.querySelector("[data-anim-inner]"), { scale: 1.2 });
    });

    whenIntro(kit, () => {
      rules.forEach((r) =>
        gsap.to(r, { scaleX: 1, duration: dur.xl, ease: ease.outExpo.gsap, delay: introDelay(r, 0) }),
      );

      // Fade-ups: grouped by their delay holder so each group staggers on its own clock.
      const groups = new Map<number, HTMLElement[]>();
      fades.forEach((f) => {
        const d = introDelay(f, 0.1);
        groups.set(d, [...(groups.get(d) ?? []), f]);
      });
      groups.forEach((els, d) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: ease.outExpo.gsap, stagger: 0.06, delay: d }),
      );

      gsap.to(counts, { opacity: 1, duration: 0.6, ease: ease.outQuart.gsap, delay: 0.6 });

      clips.forEach((c) => {
        const delay = introDelay(c, 0.2);
        gsap.to(c, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: ease.outExpo.gsap, delay });
        gsap.to(c.querySelector("[data-anim-inner]"), { scale: 1, duration: 1.3, ease: ease.outExpo.gsap, delay });
      });

      chars.forEach((el) =>
        playSplit(kit, el, "chars", {
          delay: introDelay(el, 0.15),
          stagger: parseFloat(el.dataset.stagger ?? "") || 0.035,
        }),
      );
      lines.forEach((el) =>
        playSplit(kit, el, "lines", {
          delay: introDelay(el, 0.2),
          stagger: parseFloat(el.dataset.stagger ?? "") || 0.08,
        }),
      );
    });
  });
}
