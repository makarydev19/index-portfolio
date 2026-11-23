"use client";

import type { RefObject } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { ease } from "./easings";

const ZONE = 80;

/**
 * Magnetic button (DESIGN.md §5.8). Fine pointer + motion only; touch and reduced motion keep
 * the plain CSS colour swap. The pointermove listener is attached only while the button is in
 * the viewport (IntersectionObserver gate).
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.fine}`, () => {
        const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");
        const fill = el.querySelector<HTMLElement>("[data-magnetic-fill]");
        const strength = parseFloat(el.dataset.strength ?? "") || 0.35;
        el.setAttribute("data-magnetic-ready", "");

        type QT = ReturnType<typeof gsap.quickTo>;
        let movers: [QT, QT, QT, QT] | null = null;
        const getMovers = () =>
          (movers ??= [
            gsap.quickTo(el, "x", { duration: 0.6, ease: ease.outQuart.gsap }),
            gsap.quickTo(el, "y", { duration: 0.6, ease: ease.outQuart.gsap }),
            gsap.quickTo(inner, "x", { duration: 0.6, ease: ease.outQuart.gsap }),
            gsap.quickTo(inner, "y", { duration: 0.6, ease: ease.outQuart.gsap }),
          ]);

        let inZone = false;
        const release = () => {
          inZone = false;
          movers = null;
          gsap.to([el, inner], { x: 0, y: 0, duration: 1, ease: ease.spring.gsap, overwrite: "auto" });
        };

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          // Measure from the resting centre (remove our own offset) to avoid a feedback loop.
          const cx = r.left + r.width / 2 - (gsap.getProperty(el, "x") as number);
          const cy = r.top + r.height / 2 - (gsap.getProperty(el, "y") as number);
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const within = Math.abs(dx) <= r.width / 2 + ZONE && Math.abs(dy) <= r.height / 2 + ZONE;
          if (within) {
            inZone = true;
            const [x, y, ix, iy] = getMovers();
            x(dx * strength);
            y(dy * strength);
            ix(dx * 0.15);
            iy(dy * 0.15);
          } else if (inZone) {
            release();
          }
        };

        const origin = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          return `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
        };
        const onEnter = (e: PointerEvent) => {
          el.classList.add("is-filled");
          gsap.fromTo(
            fill,
            { scale: 0, transformOrigin: origin(e) },
            { scale: 1, duration: 0.5, ease: ease.outExpo.gsap, overwrite: true },
          );
        };
        const onLeave = (e: PointerEvent) => {
          el.classList.remove("is-filled");
          gsap.to(fill, { scale: 0, transformOrigin: origin(e), duration: 0.4, ease: ease.inQuart.gsap, overwrite: true });
        };
        const onDown = () => gsap.to(el, { scale: 0.95, duration: 0.15, ease: ease.outQuart.gsap, overwrite: "auto" });
        const onUp = () => gsap.to(el, { scale: 1, duration: 0.6, ease: ease.spring.gsap, overwrite: "auto" });

        let listening = false;
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !listening) {
            window.addEventListener("pointermove", onMove, { passive: true });
            listening = true;
          } else if (!entry.isIntersecting && listening) {
            window.removeEventListener("pointermove", onMove);
            listening = false;
            if (inZone) release();
          }
        });
        io.observe(el);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointerup", onUp);

        return () => {
          io.disconnect();
          window.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
          el.removeEventListener("pointerdown", onDown);
          el.removeEventListener("pointerup", onUp);
          el.removeAttribute("data-magnetic-ready");
          el.classList.remove("is-filled");
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
}
