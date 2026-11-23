"use client";

import type { RefObject } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { createKit, fontsReady, type Kit } from "./kit";
import { setupIntro } from "./useSplitReveal";
import { setupRuleRows, setupScrollReveals } from "./useScrollReveal";
import { setupParallax } from "./useParallax";
import { setupScrubWords } from "./useScrubWords";
import { setupCountUp } from "./useCountUp";
import {
  setupCapabilities,
  setupCase,
  setupFooter,
  setupHeroStack,
  setupPrinciples,
  setupToolbox,
  setupWorkCards,
  setupWorkIndex,
} from "./sections";

declare global {
  interface Window {
    __indexAnimReady?: boolean;
  }
}

/** If anything throws, never leave gated content hidden: drop the CSS gate. */
function safely(fn: () => void) {
  try {
    fn();
  } catch (err) {
    document.documentElement.classList.remove("js-anim");
    if (process.env.NODE_ENV === "development") console.warn("[animations]", err);
  }
}

/**
 * All page-level motion for one route, scoped to the template's page wrapper.
 * Runs in a useGSAP context (reverted on route change → every ScrollTrigger and SplitText of
 * the old page is killed), split into gsap.matchMedia() branches:
 *  - motion-only, viewport-independent (intro, reveals, scrubs) — not re-run on resize;
 *  - motion + desktop/mobile (work rows, card parallax, principles).
 * Under prefers-reduced-motion nothing is set, so all content stays as server-rendered.
 */
export function usePageMotion(scope: RefObject<HTMLElement | null>, pathname: string) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      window.__indexAnimReady = true;
      const claimed = new WeakSet<Element>();
      const mm = gsap.matchMedia(root);

      // Viewport-dependent modules first, so they claim their elements before the generic pass.
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const kit: Kit = createKit(ctx, claimed);
        safely(() => {
          setupWorkIndex(root, kit, desktop);
          setupParallax(root, kit, desktop);
          if (desktop) setupPrinciples(root, kit);
        });
        return () => kit.dispose();
      });

      mm.add(MQ.motion, (ctx) => {
        const kit: Kit = createKit(ctx, claimed);
        safely(() => {
          setupHeroStack(root, kit);
          setupScrubWords(root, kit);
          setupCapabilities(root, kit);
          setupFooter(root, kit);
          setupWorkCards(root, kit);
          setupCase(root, kit);
          setupRuleRows(root, kit);
          setupToolbox(root, kit);
          setupCountUp(root, kit);
          setupIntro(root, kit);
          setupScrollReveals(root, kit);
        });
        return () => kit.dispose();
      });

      // Measurements depend on the web fonts: refresh once they are in.
      let live = true;
      fontsReady().then(() => live && ScrollTrigger.refresh());
      return () => {
        live = false;
        mm.revert();
      };
    },
    { scope, dependencies: [pathname] },
  );
}
