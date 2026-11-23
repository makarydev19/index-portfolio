"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * Lenis smooth scroll (DESIGN.md §5.1), synced to the GSAP ticker and ScrollTrigger.
 * Not instantiated under prefers-reduced-motion: native scroll + instant scrollTo.
 * `lock(key)` / `unlock(key)` stop Lenis while the preloader, menu or a curtain runs.
 */
type ScrollTarget = number | string | HTMLElement;
type ScrollOptions = { immediate?: boolean };

type SmoothScrollContextValue = {
  /** Lenis instance (null before mount and under reduced motion). */
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  lock: (key: string) => void;
  unlock: (key: string) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
});

function resolveTop(target: ScrollTarget): number {
  if (typeof target === "number") return target;
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(new Set<string>());

  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, wheelMultiplier: 1, autoRaf: false });
    const raf = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    if (locks.current.size) instance.stop();
    lenisRef.current = instance;
    // Publishing an external instance to React state is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  const scrollTo = useCallback<SmoothScrollContextValue["scrollTo"]>((target, options) => {
    const l = lenisRef.current;
    if (l) {
      l.scrollTo(target, options?.immediate ? { immediate: true, force: true } : { duration: 1.6, easing: easeOutQuart });
      return;
    }
    window.scrollTo({ top: resolveTop(target), behavior: "auto" });
  }, []);

  const lock = useCallback((key: string) => {
    locks.current.add(key);
    lenisRef.current?.stop();
  }, []);

  const unlock = useCallback((key: string) => {
    locks.current.delete(key);
    if (!locks.current.size) lenisRef.current?.start();
  }, []);

  const value = useMemo(() => ({ lenis, scrollTo, lock, unlock }), [lenis, scrollTo, lock, unlock]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/** Alias named in DESIGN.md §6.1. */
export const useLenis = useSmoothScroll;
