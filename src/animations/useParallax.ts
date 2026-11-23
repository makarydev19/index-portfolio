"use client";

import { gsap } from "@/lib/gsap";
import { $, type Kit } from "./kit";

/**
 * Scrubbed, transform-only parallax (DESIGN.md §5.4, §5.8, §5.10–5.12).
 */
export function setupParallax(scope: HTMLElement, kit: Kit, desktop: boolean) {
  // Home hero: name drifts down, statement up + fades, meta row lifts.
  const hero = scope.querySelector<HTMLElement>("[data-hero]");
  if (hero) {
    const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
    const name = hero.querySelector("[data-hero-name]");
    const statement = hero.querySelector('p[data-anim="split-lines"]');
    const meta = hero.querySelector("[data-hero-meta]");
    gsap.fromTo(name, { yPercent: 0 }, { yPercent: 35, ease: "none", immediateRender: false, scrollTrigger: st });
    gsap.fromTo(
      statement,
      { yPercent: 0, opacity: 1 },
      { yPercent: -20, opacity: 0.2, ease: "none", immediateRender: false, scrollTrigger: { ...st } },
    );
    gsap.fromTo(meta, { y: 0 }, { y: -40, ease: "none", immediateRender: false, scrollTrigger: { ...st } });
  }

  // Footer "reveal from under": inner content yPercent -30 → 0 as the footer enters.
  const footerInner = scope.querySelector<HTMLElement>("[data-footer-inner]");
  if (footerInner) {
    gsap.fromTo(
      footerInner,
      { yPercent: -30 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: footerInner.parentElement, start: "top bottom", end: "clamp(top top)", scrub: true },
      },
    );
  }

  // /work cards: offset cards 10 → -10, others 0 → -4 (two-column layouts only).
  if (desktop) {
    $(scope, "[data-work-card][data-parallax]").forEach((card) => {
      const [from, to] = (card.dataset.parallax ?? "0,0").split(",").map(Number);
      gsap.fromTo(
        card,
        { yPercent: from },
        {
          yPercent: to,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  }

  // Case cover: depth layers + whole-art scale; VANTA light sweep.
  const cover = scope.querySelector<HTMLElement>("[data-case-cover]");
  if (cover) {
    const st = { trigger: cover, start: "top bottom", end: "bottom top", scrub: true };
    $<SVGGElement>(cover, "[data-depth]").forEach((layer) => {
      const d = parseFloat(layer.dataset.depth ?? "0");
      gsap.fromTo(layer, { yPercent: d * 20 }, { yPercent: -d * 20, ease: "none", scrollTrigger: { ...st } });
    });
    gsap.fromTo(
      cover.querySelector("[data-anim-inner]"),
      { scale: 1.15 },
      { scale: 1, ease: "none", scrollTrigger: { ...st } },
    );
    const sweep = cover.querySelector("[data-sweep]");
    if (sweep) gsap.fromTo(sweep, { x: -800 }, { x: 1600, ease: "none", scrollTrigger: { ...st } });
  }

  // NextProject peek: yPercent 20 → -20.
  $(scope, "[data-next-peek]").forEach((peek) => {
    gsap.fromTo(
      peek,
      { yPercent: 20 },
      {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: peek, start: "top bottom", end: "clamp(bottom top)", scrub: true },
      },
    );
  });

  // About portrait halftone: dots drift up across the hero.
  const dots = scope.querySelector("[data-portrait] [data-dots]");
  if (dots) {
    const section = dots.closest("section");
    gsap.fromTo(
      dots,
      { y: 0 },
      { y: -40, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } },
    );
  }

  void kit;
}
