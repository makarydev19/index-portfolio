"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ease } from "./easings";

/**
 * Header hide/show on scroll (DESIGN.md §5.9). Both [data-header-layer] elements (the blended
 * header and the non-blended red-signal layer) move together: yPercent 0 ↔ -100.
 * Always shown while `forceShow` (menu open, curtain transition), while focus is inside the
 * header, near the top of the page, and under reduced motion (never hidden).
 */
export function useHeaderHide(forceShow: boolean, resetKey: string) {
  const hidden = useRef(false);
  const force = useRef(forceShow);
  const setHiddenRef = useRef<(h: boolean) => void>(() => {});

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-header-layer]");
      const header = document.querySelector<HTMLElement>("header[data-header]");
      const setHidden = (h: boolean) => {
        if (hidden.current === h) return;
        hidden.current = h;
        gsap.to(layers, { yPercent: h ? -100 : 0, duration: 0.5, ease: ease.outQuart.gsap, overwrite: true });
      };
      setHiddenRef.current = setHidden;

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const focusInside = !!header && header.contains(document.activeElement);
          if (force.current || focusInside || window.scrollY <= 120) return setHidden(false);
          if (self.direction === 1) setHidden(true);
          else if (self.direction === -1) setHidden(false);
        },
      });
      const onFocus = () => setHidden(false);
      header?.addEventListener("focusin", onFocus);

      return () => {
        st.kill();
        header?.removeEventListener("focusin", onFocus);
        setHiddenRef.current = () => {};
        hidden.current = false;
      };
    });
    return () => mm.revert();
  });

  useEffect(() => {
    force.current = forceShow;
    if (forceShow) setHiddenRef.current(false);
  }, [forceShow]);

  useEffect(() => {
    setHiddenRef.current(false);
  }, [resetKey]);
}
