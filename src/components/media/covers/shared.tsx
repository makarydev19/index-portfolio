/** Shared SVG grain filter for covers (feTurbulence 0.8 / 2 octaves). */
export function GrainFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  );
}

export function GrainRect({ id, opacity = 0.1 }: { id: string; opacity?: number }) {
  return (
    <rect
      aria-hidden="true"
      width="1600"
      height="1000"
      filter={`url(#${id})`}
      opacity={opacity}
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

/** Deterministic PRNG (mulberry32) — never Math.random at render (hydration-safe). */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type CoverProps = { title: string; className?: string };

export const svgCommon = {
  viewBox: "0 0 1600 1000",
  preserveAspectRatio: "xMidYMid slice",
  xmlns: "http://www.w3.org/2000/svg",
  role: "img",
} as const;
