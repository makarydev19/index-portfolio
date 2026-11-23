"use client";

import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/** Muted looping video; autoplay is off under reduced motion. */
export function MediaVideo({ src, poster, alt, className }: { src: string; poster?: string; alt: string; className?: string }) {
  const reduced = useReducedMotionPref();
  return (
    <video
      key={reduced ? "still" : "play"}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduced}
      aria-label={alt}
    />
  );
}
