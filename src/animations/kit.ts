"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { dur, ease, stagger as staggers } from "./easings";
import { onIntro } from "./intro";

/**
 * Per-context helper passed to every animation module.
 * - `add(fn)` records tweens/ScrollTriggers created later (async callbacks) in the matchMedia
 *   context so they are reverted with it; it is a no-op once the context is gone.
 * - `claim()` lets specialised modules take elements away from the generic reveals.
 */
export type Kit = {
  alive: () => boolean;
  add: (fn: () => void) => void;
  claim: (els: Element | Element[] | NodeListOf<Element> | null | undefined) => void;
  isClaimed: (el: Element) => boolean;
  onDispose: (fn: () => void) => void;
  dispose: () => void;
};

export function createKit(ctx: gsap.Context, claimed: WeakSet<Element>): Kit {
  let alive = true;
  const disposers: Array<() => void> = [];
  return {
    alive: () => alive,
    add: (fn) => {
      if (alive) ctx.add(fn);
    },
    claim: (els) => {
      if (!els) return;
      const list = els instanceof Element ? [els] : Array.from(els);
      list.forEach((el) => claimed.add(el));
    },
    isClaimed: (el) => claimed.has(el),
    onDispose: (fn) => disposers.push(fn),
    dispose: () => {
      alive = false;
      disposers.splice(0).forEach((fn) => fn());
    },
  };
}

export const $ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

export const fontsReady = (): Promise<unknown> =>
  typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();

/** Run `fn` once the element scrolls into view (start clamped so bottom-of-page items still fire). */
export function onceInView(kit: Kit, trigger: Element, fn: () => void, start = "top 85%") {
  ScrollTrigger.create({
    trigger,
    start: `clamp(${start})`,
    once: true,
    onEnter: () => kit.add(fn),
  });
}

/**
 * SplitText reveal (chars or lines) with masks. The split happens at play time (after fonts),
 * and is reverted when the reveal completes, so the resting DOM is the original text:
 * no clipped glyphs, no stale lines after a resize, nothing extra for assistive tech.
 */
export function playSplit(
  kit: Kit,
  el: HTMLElement,
  type: "chars" | "lines",
  opts: {
    delay?: number;
    stagger?: number;
    duration?: number;
    from?: gsap.TweenVars;
    /** How the element was hidden before the split: CSS visibility (intro) or inline opacity (scroll). */
    hidden?: "visibility" | "opacity";
  } = {},
) {
  fontsReady().then(() =>
    kit.add(() => {
      const heading = /^H[1-6]$/.test(el.tagName);
      const parentHeading = !heading ? el.closest<HTMLElement>("h1,h2,h3,h4,h5,h6") : null;
      let addedLabel = false;
      if (parentHeading && !parentHeading.hasAttribute("aria-label")) {
        parentHeading.setAttribute("aria-label", (parentHeading.textContent ?? "").replace(/\s+/g, " ").trim());
        addedLabel = true;
      }
      const split = SplitText.create(el, {
        type: type === "chars" ? "words,chars" : "lines",
        mask: type,
        aria: heading ? "auto" : parentHeading ? "hidden" : "none",
      });
      const targets = type === "chars" ? split.chars : split.lines;
      gsap.set(el, opts.hidden === "opacity" ? { opacity: 1 } : { visibility: "visible" });
      const isChars = type === "chars";
      const restore = () => {
        split.revert();
        if (addedLabel) parentHeading?.removeAttribute("aria-label");
      };
      // Lines revert on completion (they must re-flow on resize). Chars stay split — reverting
      // would snap the kerning (inline-block chars lose kerning pairs) — and only their masks
      // are opened so no glyph stays clipped. They are reverted with the page context.
      const finish = () => {
        if (!isChars) return restore();
        split.masks.forEach((m) => ((m as HTMLElement).style.overflow = "visible"));
      };
      gsap.from(targets, {
        yPercent: isChars ? 110 : 100,
        duration: opts.duration ?? (isChars ? dur.xl : 1),
        ease: ease.outExpo.gsap,
        stagger: opts.stagger ?? (isChars ? 0.035 : staggers.lines),
        delay: opts.delay ?? 0,
        ...opts.from,
        onComplete: finish,
      });
      kit.onDispose(restore);
    }),
  );
}

/** Wait for "index:intro" inside a kit (auto-unsubscribes on dispose). */
export function whenIntro(kit: Kit, fn: () => void) {
  const off = onIntro(() => kit.add(fn));
  kit.onDispose(off);
}

export function introDelay(el: Element, fallback: number) {
  const holder = el.closest<HTMLElement>("[data-intro-delay]");
  const v = holder ? parseFloat(holder.dataset.introDelay ?? "") : NaN;
  return Number.isFinite(v) ? v : fallback;
}
