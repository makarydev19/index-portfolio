"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

export const PRELOADER_FLAG = "index:loaded";

/**
 * 000→100 preloader (DESIGN.md §5.2). First visit per session, home entry only, never under
 * reduced motion — the gate is decided by the inline boot script in layout.tsx (html.preload),
 * which also paints an ink cover before hydration so there is no flash of the page.
 * `onIntro` fires at t≈2.3s (while the halves part); `onComplete` after the layer is gone.
 */
export function Preloader({ onIntro, onComplete }: { onIntro: () => void; onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      // Our layer is painted now: drop the pre-hydration CSS cover.
      document.documentElement.classList.remove("preload");

      const q = gsap.utils.selector(el);
      const count = q("[data-preloader-count]")[0] as HTMLElement;
      const status = q("[data-preloader-status]")[0] as HTMLElement;
      const labels = q("[data-preloader-label]");
      const counter = { v: 0 };
      const render = () => {
        count.textContent = String(Math.round(counter.v)).padStart(3, "0");
      };

      let fontsReady = false;
      const fonts = document.fonts?.ready ?? Promise.resolve();
      const fontTimeout = window.setTimeout(() => (fontsReady = true), 3000);
      fonts.then(() => (fontsReady = true));

      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      tl.from(labels, { opacity: 0, y: 8, duration: 0.4, ease: "power3.out" }, 0)
        .to(counter, { v: 90, duration: 1.6 * 0.9, ease: "power2.inOut", onUpdate: render }, 0.1)
        .fromTo(q("[data-preloader-bar]"), { scaleX: 0 }, { scaleX: 0.9, duration: 1.6 * 0.9, ease: "power2.inOut" }, 0.1)
        // Hold at 90 until fonts are ready (DESIGN.md: never pass 90 before document.fonts.ready).
        .addPause(">", () => {
          const resume = () => tl.resume();
          if (fontsReady) resume();
          else fonts.then(resume);
          window.setTimeout(resume, 3000);
        })
        .to(counter, { v: 100, duration: 0.3, ease: "power2.out", onUpdate: render })
        .to(q("[data-preloader-bar]"), { scaleX: 1, duration: 0.3, ease: "power2.out" }, "<")
        .add(() => {
          status.textContent = "Loaded";
        })
        .to([count, ...labels], { yPercent: -100, duration: 0.5, ease: "power3.in", stagger: 0.05 })
        .to(q("[data-preloader-bar]"), { opacity: 0, duration: 0.3 }, "<")
        .addLabel("split", "-=0.3")
        .to(q('[data-preloader-half="top"]'), { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "split")
        .to(q('[data-preloader-half="bottom"]'), { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, "split")
        .add(onIntro, "split+=0.4")
        .add(() => {
          try {
            sessionStorage.setItem(PRELOADER_FLAG, "1");
          } catch {
            /* storage blocked: the preloader may show again, which is harmless */
          }
          onComplete();
        });

      return () => window.clearTimeout(fontTimeout);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="fixed inset-0 z-[200] text-paper" data-preloader role="status" aria-live="polite">
      <span className="sr-only" data-preloader-status>
        Loading
      </span>
      <div className="absolute inset-x-0 top-0 h-[calc(50%+1px)] bg-ink will-change-transform" data-preloader-half="top" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-ink will-change-transform" data-preloader-half="bottom" />
      <div className="relative flex h-full flex-col justify-between py-6 wrap-site" data-preloader-content>
        <div className="flex justify-between gap-4">
          <span className="mono overflow-hidden">
            <span className="inline-block" data-preloader-label>
              {site.name} — Index
            </span>
          </span>
          <span className="mono overflow-hidden text-right">
            <span className="inline-block" data-preloader-label>
              Loading fonts &amp; assets
            </span>
          </span>
        </div>
        <span className="overflow-hidden pb-2" aria-hidden="true">
          <span
            className="text-display-xl inline-block font-mono font-medium tabular-nums tracking-normal"
            data-preloader-count
          >
            000
          </span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal" data-preloader-bar />
    </div>
  );
}
