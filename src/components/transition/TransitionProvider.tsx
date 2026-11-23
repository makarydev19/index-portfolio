"use client";

import { AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { dispatchIntro, resetIntro } from "@/animations/intro";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { Curtain } from "./Curtain";
import { Preloader } from "./Preloader";
import { DEFAULT_CURTAIN, type CurtainColors, type TransitionPhase, type TransitionTarget } from "./types";

/** How the page wrapper (template.tsx) should enter. */
export type EntryMode = "none" | "curtain" | "fade";

type TransitionContextValue = {
  phase: TransitionPhase;
  target: TransitionTarget | null;
  /** Number of client-side route changes so far (0 on the entry page). */
  navCount: number;
  reduced: boolean;
  navigate: (href: string, label?: string, colors?: CurtainColors, index?: string) => void;
  onPageMounted: (mode: EntryMode) => void;
  setPhase: (phase: TransitionPhase) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

/** Minimum time the curtain stays up (from cover start) so its label can be read. */
const MIN_HOLD_MS = 1050;

// Decided once by the inline boot script in layout.tsx (html.preload) before hydration.
const subscribeNoop = () => () => {};
// Read once and cache: the Preloader removes the class as soon as it paints.
let preloadAtBootCache: boolean | null = null;
const getPreloadSnapshot = () =>
  (preloadAtBootCache ??= document.documentElement.classList.contains("preload"));
const getPreloadServerSnapshot = () => false;

function focusHeading() {
  const h1 = document.querySelector<HTMLElement>("main h1");
  (h1 ?? document.getElementById("main"))?.focus({ preventScroll: true });
}

function setBusy(busy: boolean) {
  const main = document.getElementById("main");
  if (!main) return;
  if (busy) main.setAttribute("aria-busy", "true");
  else main.removeAttribute("aria-busy");
}

/**
 * Curtain transition state machine (DESIGN.md §5.3):
 * idle → navigate() → "covering" (curtain rises) → cover done → "covered" + router.push →
 * new page mounts (template.tsx → onPageMounted) → scroll top, refresh → "idle" →
 * curtain exit reveals the page → dispatch "index:intro".
 * Reduced motion: no curtain, router.push directly, the template crossfades.
 * Also hosts the first-visit <Preloader>.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotionPref();
  const { lock, unlock, scrollTo } = useSmoothScroll();

  const [phase, setPhaseState] = useState<TransitionPhase>("idle");
  const [target, setTarget] = useState<TransitionTarget | null>(null);
  const phaseRef = useRef<TransitionPhase>("idle");
  const coverStartRef = useRef(0);

  const setPhase = useCallback((p: TransitionPhase) => {
    phaseRef.current = p;
    setPhaseState(p);
  }, []);

  // Count route changes (state adjusted during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  const [navCount, setNavCount] = useState(0);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setNavCount((n) => n + 1);
  }

  // Preloader: first visit + home entry + motion allowed (boot script decides).
  const preloadAtBoot = useSyncExternalStore(subscribeNoop, getPreloadSnapshot, getPreloadServerSnapshot);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const preloading = preloadAtBoot && !preloaderDone;
  const preloadingRef = useRef(false);
  useEffect(() => {
    preloadingRef.current = preloading;
    if (preloading) lock("preloader");
  }, [preloading, lock]);

  const finishPreloader = useCallback(() => {
    setPreloaderDone(true);
    unlock("preloader");
    ScrollTrigger.refresh();
  }, [unlock]);

  // Back/forward: no curtain; the next page waits for its own intro (fired on mount).
  useEffect(() => {
    const onPop = () => resetIntro();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback<TransitionContextValue["navigate"]>(
    (href, label = "", colors = DEFAULT_CURTAIN, index) => {
      if (phaseRef.current !== "idle") return;
      resetIntro();
      setBusy(true);
      if (reduced) {
        router.push(href);
        return;
      }
      setTarget({ href, label, colors, index });
      coverStartRef.current = performance.now();
      lock("curtain");
      setPhase("covering");
    },
    [reduced, router, lock, setPhase],
  );

  const onCovered = useCallback(() => {
    if (phaseRef.current !== "covering" || !target) return;
    setPhase("covered");
    router.push(target.href);
  }, [router, target, setPhase]);

  const onPageMounted = useCallback(
    (mode: EntryMode) => {
      const refresh = () => ScrollTrigger.refresh();
      if (mode === "curtain" && phaseRef.current === "covered") {
        scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        refresh();
        focusHeading();
        const wait = Math.max(0, MIN_HOLD_MS - (performance.now() - coverStartRef.current));
        window.setTimeout(() => setPhase("idle"), wait);
        return;
      }
      setBusy(false);
      if (mode === "fade") window.setTimeout(focusHeading, 200);
      const preloadPending = document.documentElement.classList.contains("preload") || preloadingRef.current;
      if (mode === "none" && preloadPending) return; // the preloader fires the intro
      requestAnimationFrame(() => {
        refresh();
        dispatchIntro();
      });
    },
    [scrollTo, setPhase],
  );

  const onCurtainGone = useCallback(() => {
    unlock("curtain");
    setBusy(false);
    setTarget(null);
    dispatchIntro();
    // Focus the new <h1> once the intro has made it visible (a visibility:hidden heading
    // cannot take focus); this also wins over the clicked link / restored menu toggle.
    window.setTimeout(focusHeading, 200);
    ScrollTrigger.refresh();
  }, [unlock]);

  const value = useMemo(
    () => ({ phase, target, navCount, reduced, navigate, onPageMounted, setPhase }),
    [phase, target, navCount, reduced, navigate, onPageMounted, setPhase],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <AnimatePresence onExitComplete={onCurtainGone}>
        {phase !== "idle" && target ? (
          <Curtain
            key="curtain"
            label={target.label || "Index"}
            index={target.index}
            colors={target.colors}
            onCovered={onCovered}
          />
        ) : null}
      </AnimatePresence>
      {preloading ? <Preloader onIntro={dispatchIntro} onComplete={finishPreloader} /> : null}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used inside <TransitionProvider>");
  return ctx;
}

/** Non-throwing variant for components that may render outside the provider. */
export function useOptionalTransition() {
  return useContext(TransitionContext);
}
