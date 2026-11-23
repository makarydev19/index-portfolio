"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const SPRING = { stiffness: 150, damping: 18 };

/**
 * About portrait pointer tilt (DESIGN.md §5.12): rotateX/rotateY ±6° with perspective 800,
 * Framer springs. Fine pointer + motion only; otherwise a plain wrapper.
 */
export function PortraitTilt({ className, children }: { className?: string; children: ReactNode }) {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={className}
      data-portrait-tilt
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={enabled ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
    >
      {children}
    </motion.div>
  );
}
