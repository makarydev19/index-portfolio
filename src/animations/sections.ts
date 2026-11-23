"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { dur, ease } from "./easings";
import { $, onceInView, playSplit, whenIntro, type Kit } from "./kit";

const EXPO = ease.outExpo.gsap;

/** Home hero right-hand mono stack (§5.4 step 5). The rest of the hero uses the generic intro. */
export function setupHeroStack(scope: HTMLElement, kit: Kit) {
  const items = $(scope, "[data-hero-stack] > li");
  if (!items.length) return;
  kit.claim(items);
  gsap.set(items, { opacity: 0, y: 10 });
  whenIntro(kit, () =>
    gsap.to(items, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.7 }),
  );
}

/** Home work index rows (§5.5): rule draws, then the cells rise inside the row's clip. */
export function setupWorkIndex(scope: HTMLElement, kit: Kit, desktop: boolean) {
  $(scope, "li[data-row-index]").forEach((row) => {
    const rules = $(row, '[data-anim="rule"]');
    const link = row.querySelector<HTMLElement>(".work-row__link");
    const cells = $(row, "[data-row-cell]").filter((c) => getComputedStyle(c).display !== "none");
    const cover = row.querySelector<HTMLElement>('[data-anim="clip-reveal"]');
    kit.claim(rules);
    kit.claim(cells);
    gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

    if (desktop) {
      kit.claim(cover);
      gsap.set(cells, { yPercent: 100, opacity: 0 });
      onceInView(kit, row, () => {
        gsap.to(rules, { scaleX: 1, duration: 1, ease: EXPO });
        gsap.set(link, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.to(cells, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: EXPO,
          stagger: 0.05,
          delay: 0.1,
          onComplete: () => {
            gsap.set(link, { clearProps: "clipPath" });
          },
        });
      });
    } else {
      gsap.set(cells, { y: 20, opacity: 0 });
      onceInView(kit, row, () => {
        gsap.to(rules, { scaleX: 1, duration: 1, ease: EXPO });
        gsap.to(cells, { y: 0, opacity: 1, duration: 0.8, ease: EXPO, stagger: 0.05, delay: 0.25 });
      });
    }
  });
}

/** Capabilities columns (§5.7): rules stagger, then each column's contents. */
export function setupCapabilities(scope: HTMLElement, kit: Kit) {
  const cols = $(scope, "[data-cap-col]");
  if (!cols.length) return;
  const rules = cols.map((c) => c.querySelector('[data-anim="rule"]')).filter(Boolean) as HTMLElement[];
  const contents = cols.map((c) => $(c, '[data-anim="fade-up"]'));
  kit.claim(rules);
  contents.forEach((c) => kit.claim(c));
  gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
  contents.forEach((c) => gsap.set(c, { opacity: 0, y: 30 }));

  onceInView(
    kit,
    cols[0].parentElement ?? cols[0],
    () => {
      gsap.to(rules, { scaleX: 1, duration: 1, ease: EXPO, stagger: 0.1 });
      contents.forEach((c, i) =>
        gsap.to(c, { opacity: 1, y: 0, duration: 0.8, ease: EXPO, stagger: 0.06, delay: 0.3 + i * 0.1 }),
      );
    },
    "top 80%",
  );
}

/** Footer (§5.8): "Let's talk" chars, magnetic button pop, bottom rows. */
export function setupFooter(scope: HTMLElement, kit: Kit) {
  const footer = scope.querySelector<HTMLElement>("#contact");
  if (!footer) return;
  const title = footer.querySelector<HTMLElement>('[data-anim="split-chars"]');
  const button = footer.querySelector<HTMLElement>("[data-magnetic]");
  const fades = $(footer, '[data-anim="fade-up"]');
  kit.claim(title);
  kit.claim(fades);

  gsap.set(title, { opacity: 0 });
  gsap.set(button, { scale: 0, rotate: -30 });
  gsap.set(fades, { opacity: 0, y: 20 });

  onceInView(
    kit,
    footer,
    () => {
      if (title) playSplit(kit, title, "chars", { hidden: "opacity", stagger: 0.03 });
      gsap.to(button, { scale: 1, rotate: 0, duration: 1, ease: EXPO, delay: 0.4 });
      gsap.to(fades, { opacity: 1, y: 0, duration: 0.8, ease: EXPO, stagger: 0.06, delay: 0.2 });
    },
    "top 70%",
  );
}

/** /work cards (§5.10): clip-path cover reveal, inner scale, meta/title/summary rise. */
export function setupWorkCards(scope: HTMLElement, kit: Kit) {
  $(scope, "[data-work-card]").forEach((card) => {
    const frame = card.querySelector<HTMLElement>('[data-anim="clip-reveal"]');
    const inner = frame?.querySelector("[data-anim-inner]") ?? null;
    const fades = $(card, '[data-anim="fade-up"]');
    kit.claim(frame);
    kit.claim(fades);
    gsap.set(frame, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(inner, { scale: 1.3 });
    gsap.set(fades, { opacity: 0, y: 24 });
    onceInView(kit, card, () => {
      gsap.to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: dur.xl, ease: EXPO });
      gsap.to(inner, { scale: 1, duration: 1.4, ease: EXPO });
      gsap.to(fades, { opacity: 1, y: 0, duration: 0.8, ease: EXPO, stagger: 0.06, delay: 0.3 });
    });
  });
}

/** Case study extras (§5.11): cover frame scrub, NOCTURNE bars, palette, pills. */
export function setupCase(scope: HTMLElement, kit: Kit) {
  const cover = scope.querySelector<HTMLElement>("[data-case-cover]");
  if (cover) {
    kit.claim(cover);
    gsap.fromTo(
      cover,
      { clipPath: "inset(14% 10% 14% 10%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: cover, start: "top 90%", end: "clamp(top 20%)", scrub: 0.5 },
      },
    );
    const bars = $<SVGRectElement>(cover, "[data-bar]").sort(
      (a, b) => Number(a.dataset.order ?? 0) - Number(b.dataset.order ?? 0),
    );
    if (bars.length) {
      gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      onceInView(kit, cover, () =>
        gsap.to(bars, { scaleY: 1, duration: 0.8, ease: EXPO, stagger: 0.02, delay: 0.2 }),
      );
    }
  }

  const swatches = $(scope, "[data-swatch]");
  if (swatches.length) {
    const labels = $(scope, "[data-swatch-label]");
    gsap.set(swatches, { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(labels, { opacity: 0 });
    onceInView(
      kit,
      swatches[0].parentElement ?? swatches[0],
      () => {
        gsap.to(swatches, { scaleY: 1, duration: 1, ease: EXPO, stagger: 0.08 });
        gsap.to(labels, { opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.7 });
      },
      "top 80%",
    );
  }

  const pills = $(scope, "li[data-pill]");
  if (pills.length) {
    gsap.set(pills, { opacity: 0, y: 12 });
    onceInView(kit, pills[0].parentElement ?? pills[0], () =>
      gsap.to(pills, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.04 }),
    );
  }
}

/** /about toolbox cells (§5.12): rules stagger, then names rise. */
export function setupToolbox(scope: HTMLElement, kit: Kit) {
  const cells = $(scope, "li[data-tool]");
  if (!cells.length) return;
  const rules = cells.map((c) => c.querySelector('[data-anim="rule"]')).filter(Boolean) as HTMLElement[];
  const texts = cells.flatMap((c) => $(c, "p, h3"));
  kit.claim(rules);
  gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(texts, { opacity: 0, y: 20 });
  onceInView(kit, cells[0].parentElement ?? cells[0], () => {
    gsap.to(rules, { scaleX: 1, duration: 1, ease: EXPO, stagger: 0.05 });
    gsap.to(texts, { opacity: 1, y: 0, duration: 0.8, ease: EXPO, stagger: 0.03, delay: 0.3 });
  });
}

/**
 * /about principles (desktop, §5.12): the item crossing 60% of the viewport is active
 * (others dim to 0.3) and the sticky counter rolls to its number.
 */
export function setupPrinciples(scope: HTMLElement, kit: Kit) {
  const items = $(scope, "li[data-principle]");
  const current = scope.querySelector<HTMLElement>("[data-principles-current]");
  if (!items.length || !current) return;
  const original = current.textContent ?? "";
  let active = -1;

  const setActive = (i: number) => {
    if (i === active) return;
    const prev = active;
    active = i;
    items.forEach((el, j) => gsap.to(el, { opacity: j === i ? 1 : 0.3, duration: 0.3, ease: ease.outQuart.gsap }));
    const label = String(i + 1).padStart(2, "0");
    if (prev === -1) {
      current.textContent = label;
      return;
    }
    const dir = i > prev ? 1 : -1;
    gsap
      .timeline()
      .to(current, { yPercent: -100 * dir, duration: 0.2, ease: ease.inQuart.gsap })
      .add(() => {
        current.textContent = label;
      })
      .fromTo(current, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.4, ease: EXPO });
  };

  items.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 60%",
      end: "bottom 60%",
      onToggle: (self) => {
        if (self.isActive) kit.add(() => setActive(i));
      },
    });
  });
  kit.add(() => setActive(0));

  kit.onDispose(() => {
    current.textContent = original;
  });
}
