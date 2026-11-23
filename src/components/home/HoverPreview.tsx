"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/types";
import { Media } from "@/components/media/Media";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ease } from "@/animations/easings";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/** An anchor point (x = frame left, y = frame vertical centre) or the live cursor. */
export type PreviewAnchor = "cursor" | DOMRect;

type Bezier = [number, number, number, number];
const OUT_EXPO = ease.outExpo.bezier as unknown as Bezier;
const IN_QUART = ease.inQuart.bezier as unknown as Bezier;
const OFFSET = 24;

const SHOW = { scale: [0.6, 1], opacity: [0, 1], transition: { duration: 0.45, ease: OUT_EXPO } };
const HIDE = { scale: 0.8, opacity: 0, transition: { duration: 0.3, ease: IN_QUART } };
const SHOW_REDUCED = { opacity: 1, scale: 1, transition: { duration: 0.15 } };
const HIDE_REDUCED = { opacity: 0, scale: 1, transition: { duration: 0.15 } };

/**
 * Cursor-following cover preview for the work index (DESIGN.md §5.5), desktop + fine pointer only.
 * Springs + velocity tilt on the frame, clip-path wipe between stacked covers (mounted once),
 * depth-layer drift from the frame's lag, a lagging label pill, and an anchored position for
 * keyboard focus. Reduced motion: static at the anchored position with a 0.15s fade.
 * Portalled to <body> so the page wrapper's entry transform can never offset position:fixed.
 */
export function HoverPreview({
  projects,
  activeIndex,
  anchor,
}: {
  projects: Project[];
  activeIndex: number | null;
  anchor: PreviewAnchor;
}) {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
  if (!enabled) return null;
  return createPortal(<Preview projects={projects} activeIndex={activeIndex} anchor={anchor} />, document.body);
}

function Preview({
  projects,
  activeIndex,
  anchor,
}: {
  projects: Project[];
  activeIndex: number | null;
  anchor: PreviewAnchor;
}) {
  const reduced = useReducedMotionPref();
  const frameRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const visible = activeIndex !== null;

  // Raw target (pointer or anchor) → springs.
  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);
  const x = useSpring(rawX, { stiffness: 170, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 170, damping: 22, mass: 0.6 });
  const rotate = useSpring(useTransform(useVelocity(x), [-2000, 2000], [-8, 8], { clamp: true }), {
    stiffness: 120,
    damping: 20,
  });
  // Label pill: an extra, softer x lag relative to the frame.
  const labelSpring = useSpring(rawX, { stiffness: 120, damping: 20 });
  const labelX = useTransform(() => labelSpring.get() - x.get());

  const anchorRef = useRef(anchor);
  const visibleRef = useRef(visible);
  const lastPointer = useRef({ x: -9999, y: -9999 });

  // Place the target. Cursor mode follows pointermove; anchor mode pins to the focused row.
  useLayoutEffect(() => {
    anchorRef.current = anchor;
    const wasHidden = !visibleRef.current;
    visibleRef.current = visible;
    if (!visible) return;
    const h = frameRef.current?.offsetHeight ?? 0;
    const tx = anchor === "cursor" ? lastPointer.current.x + OFFSET : anchor.x;
    const ty = anchor === "cursor" ? lastPointer.current.y + OFFSET : anchor.y - h / 2;
    rawX.set(tx);
    rawY.set(ty);
    if (wasHidden || reduced) {
      // Appear in place instead of flying in from the last spot.
      x.jump(tx);
      y.jump(ty);
      labelSpring.jump(tx);
    }
  }, [visible, anchor, reduced, rawX, rawY, x, y, labelSpring]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      lastPointer.current = { x: e.clientX, y: e.clientY };
      if (anchorRef.current !== "cursor" || reduced || !visibleRef.current) return;
      rawX.set(e.clientX + OFFSET);
      rawY.set(e.clientY + OFFSET);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, rawX, rawY]);

  // Cover switch: newest cover on top (activation counter) + clip wipe; inner art settles.
  const counter = useRef(10);
  useEffect(() => {
    if (activeIndex === null || !scope.current) return;
    const cover = scope.current.querySelector<HTMLElement>(`[data-preview-cover="${activeIndex}"]`);
    const art = cover?.querySelector<HTMLElement>("[data-preview-art]");
    if (!cover || !art) return;
    counter.current += 1;
    cover.style.zIndex = String(counter.current);
    if (reduced) {
      cover.style.clipPath = "inset(0% 0% 0% 0%)";
      return;
    }
    animate(
      cover,
      { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] },
      { duration: 0.6, ease: OUT_EXPO },
    );
    animate(art, { scale: [1.25, 1] }, { duration: 0.8, ease: OUT_EXPO });
  }, [activeIndex, reduced, animate, scope]);

  // Inner parallax: depth layers drift with the frame's lag behind its target.
  const layers = useRef<{ el: SVGElement; d: number }[]>([]);
  useEffect(() => {
    if (activeIndex === null || !scope.current) return;
    layers.current = Array.from(
      scope.current.querySelectorAll<SVGElement>(`[data-preview-cover="${activeIndex}"] [data-depth]`),
    ).map((el) => ({ el, d: parseFloat(el.dataset.depth ?? "0") }));
  }, [activeIndex, scope]);

  const drift = () => {
    if (reduced) return;
    const w = frameRef.current?.offsetWidth ?? 400;
    const lagX = (rawX.get() - x.get()) / (w / 2);
    const lagY = (rawY.get() - y.get()) / (w / 2);
    const cx = Math.max(-1, Math.min(1, lagX));
    const cy = Math.max(-1, Math.min(1, lagY));
    layers.current.forEach(({ el, d }) => {
      el.style.transform = `translate(${cx * d * 20}px, ${cy * d * 20}px)`;
    });
  };
  useMotionValueEvent(x, "change", drift);
  useMotionValueEvent(y, "change", drift);

  return (
    <motion.div
      ref={frameRef}
      aria-hidden="true"
      data-preview
      data-active-index={activeIndex ?? ""}
      className="pointer-events-none fixed left-0 top-0 z-40 w-[clamp(280px,26vw,420px)] will-change-transform"
      style={{ x, y, rotate: reduced ? 0 : rotate }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? (reduced ? SHOW_REDUCED : SHOW) : reduced ? HIDE_REDUCED : HIDE}
    >
      <div ref={scope} className="relative isolate aspect-[16/10] overflow-hidden bg-paper-2">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            data-preview-cover={i}
            className="absolute inset-0"
            style={{ zIndex: i === 0 ? 2 : 1, clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <div className="absolute inset-0" data-preview-art>
              <Media media={p.cover} sizes="420px" />
            </div>
          </div>
        ))}
      </div>
      <motion.span
        data-preview-label
        className="mono-s absolute -bottom-4 left-0 inline-flex h-8 items-center gap-2 rounded-pill bg-ink px-4 text-paper"
        style={{ x: reduced ? 0 : labelX }}
      >
        View case <ArrowIcon direction="e" size={10} />
      </motion.span>
    </motion.div>
  );
}
