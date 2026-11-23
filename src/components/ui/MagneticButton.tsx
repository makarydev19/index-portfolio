"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/animations/useMagnetic";

/**
 * Big red circle CTA. Static / touch / reduced motion: hover/focus swaps signal → ink with
 * paper text. Fine pointer + motion: magnetic pull (useMagnetic), label parallax and an ink
 * disc that grows from the pointer's entry point.
 * Position the button through a wrapper — never put layout transforms on [data-magnetic].
 */
export function MagneticButton({
  href,
  children,
  size = "lg",
  strength = 0.35,
  className,
}: {
  href: string;
  children: ReactNode;
  size?: "lg" | "md";
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);

  return (
    <a
      ref={ref}
      href={href}
      data-magnetic
      data-strength={strength}
      className={cn(
        "magnetic relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-signal text-ink",
        size === "lg" ? "size-40 lg:size-[220px]" : "size-40",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-magnetic-fill
        className="pointer-events-none absolute inset-0 -z-10 scale-0 rounded-pill bg-ink"
      />
      <span data-magnetic-inner className="mono relative inline-flex items-center gap-1.5 px-4 text-center">
        {children}
      </span>
    </a>
  );
}
