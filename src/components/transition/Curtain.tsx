"use client";

import { motion } from "motion/react";
import { ease } from "@/animations/easings";
import type { CurtainColors } from "./types";

const CURTAIN_EASE = ease.inOutQuart.bezier as unknown as [number, number, number, number];
const RISE_EASE = ease.outExpo.bezier as unknown as [number, number, number, number];
const EXIT_EASE = ease.inQuart.bezier as unknown as [number, number, number, number];

/**
 * Curtain panel (DESIGN.md §5.3). Mounted by TransitionProvider inside <AnimatePresence>
 * while a transition runs: rises over the page (cover), holds the label, then lifts away (exit).
 */
export function Curtain({
  label,
  index,
  colors,
  onCovered,
}: {
  label: string;
  index?: string;
  colors: CurtainColors;
  onCovered?: () => void;
}) {
  const chars = Array.from(label);

  return (
    <motion.div
      aria-hidden="true"
      data-curtain
      className="fixed inset-0 z-[150] flex items-center will-change-transform"
      style={{ backgroundColor: colors.bg, color: colors.fg }}
      initial={{ y: "100%" }}
      animate={{ y: "0%", transition: { duration: 0.7, ease: CURTAIN_EASE } }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: CURTAIN_EASE, delay: 0.15 } }}
      onAnimationComplete={(def) => {
        // Fires for both animate and exit; only the cover ("0%") hands over to the router.
        if (typeof def === "object" && def && "y" in def && def.y === "0%") onCovered?.();
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: colors.accent }} data-curtain-line />
      <motion.div
        className="wrap-site"
        exit={{ y: "-60%", opacity: 0, transition: { duration: 0.4, ease: EXIT_EASE } }}
      >
        {index ? (
          <motion.p
            className="mono mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.35 } }}
          >
            ({index})
          </motion.p>
        ) : null}
        <p className="text-display-xl display-features overflow-hidden pb-[0.1em]" data-curtain-mask>
          <span className="inline-block whitespace-pre" data-curtain-label>
            {chars.map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                data-curtain-char
                initial={{ y: "110%" }}
                animate={{ y: "0%", transition: { duration: 0.6, ease: RISE_EASE, delay: 0.3 + i * 0.025 } }}
              >
                {c === " " ? " " : c}
              </motion.span>
            ))}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
