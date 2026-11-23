"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTransition, type EntryMode } from "@/components/transition/TransitionProvider";
import { usePageMotion } from "@/animations/usePageMotion";
import { ease } from "@/animations/easings";
import { ScrollTrigger } from "@/lib/gsap";

const OUT_EXPO = ease.outExpo.bezier as unknown as [number, number, number, number];

/**
 * Page wrapper (DESIGN.md §5.3). Keyed by pathname so every route gets a fresh wrapper,
 * fresh GSAP context (usePageMotion) and a clean ScrollTrigger set — even between
 * /work/a and /work/b, where Next would otherwise keep the template mounted.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <PageWrapper key={pathname} pathname={pathname}>
      {children}
    </PageWrapper>
  );
}

function PageWrapper({ children, pathname }: { children: ReactNode; pathname: string }) {
  const { phase, navCount, reduced, onPageMounted } = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  // Entry mode is fixed at mount: curtain reveal, back/forward or reduced-motion fade, or none.
  const [mode] = useState<EntryMode>(() =>
    phase === "covered" ? "curtain" : navCount > 0 ? "fade" : "none",
  );

  usePageMotion(ref, pathname);

  useEffect(() => {
    onPageMounted(mode);
  }, [mode, onPageMounted]);

  const revealed = mode !== "curtain" || phase === "idle";

  if (mode === "none") {
    return (
      <div ref={ref} data-page-wrapper>
        {children}
      </div>
    );
  }

  const fade = reduced ? 0.2 : 0.4;

  return (
    <motion.div
      ref={ref}
      data-page-wrapper
      initial={mode === "curtain" ? { y: 80 } : { opacity: 0 }}
      animate={
        mode === "curtain"
          ? revealed
            ? { y: 0, transition: { duration: 0.9, ease: OUT_EXPO, delay: 0.25 } }
            : { y: 80 }
          : { opacity: 1, transition: { duration: fade, ease: "linear" } }
      }
      onAnimationComplete={() => {
        if (!revealed) return;
        // Drop the transform so position:fixed descendants and trigger maths use the real layout.
        if (ref.current) ref.current.style.transform = "";
        ScrollTrigger.refresh();
      }}
    >
      {children}
    </motion.div>
  );
}
