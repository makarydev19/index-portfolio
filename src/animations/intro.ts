"use client";

/**
 * "index:intro" coordination (DESIGN.md §5.2 / §5.3).
 * The page-level intros (hero SplitText etc.) wait for this signal, which fires
 * after the preloader, after the curtain has lifted, or one frame after a plain mount.
 * A tiny store (not just a window event) so late subscribers never miss it.
 */
export const INTRO_EVENT = "index:intro";

let fired = false;
const listeners = new Set<() => void>();

/** Called when a navigation starts: the next page must wait for its own intro. */
export function resetIntro() {
  fired = false;
}

export function dispatchIntro() {
  if (fired) return;
  fired = true;
  const pending = Array.from(listeners);
  listeners.clear();
  // Deliver in a microtask: when dispatched from a GSAP timeline callback (the preloader),
  // GSAP would otherwise record the listeners' new contexts as children of that timeline's
  // context, and kill them when the preloader unmounts.
  queueMicrotask(() => {
    pending.forEach((fn) => fn());
    window.dispatchEvent(new Event(INTRO_EVENT));
  });
}

/** Runs `fn` when the intro fires (immediately if it already has). Returns an unsubscribe. */
export function onIntro(fn: () => void): () => void {
  if (fired) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
