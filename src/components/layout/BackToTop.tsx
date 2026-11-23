"use client";

import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/** "BACK TO TOP ↑" — routes through the smooth-scroll context (Lenis once added). */
export function BackToTop({ className }: { className?: string }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <a
      href="#top"
      className={className}
      data-scroll-to="top"
      onClick={(e) => {
        e.preventDefault();
        scrollTo(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      <span className="link-h">Back to top</span> <ArrowIcon direction="n" size={11} />
    </a>
  );
}
