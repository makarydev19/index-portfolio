import { useId } from "react";
import { GrainFilter, GrainRect, seeded, svgCommon, type CoverProps } from "./shared";

const BAR_W = 36;
const GAP = 16;
const COUNT = 24;
const START_X = (1600 - (COUNT * (BAR_W + GAP) - GAP)) / 2;
const BASE_Y = 820;

/** Seeded heights — identical on server and client. */
const rand = seeded(20260303);
const BARS = Array.from({ length: COUNT }, (_, i) => {
  const h = Math.round(90 + rand() * 470);
  return { x: START_X + i * (BAR_W + GAP), h };
});
/** Seeded random reveal order for the ANIMATION agent (data-order). */
const ORDER = (() => {
  const r = seeded(7);
  const idx = BARS.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const order: number[] = [];
  idx.forEach((barIndex, position) => (order[barIndex] = position));
  return order;
})();

function Bars({ dx = 0, fill, opacity = 1, hook = false }: { dx?: number; fill: string; opacity?: number; hook?: boolean }) {
  return (
    <g fill={fill} opacity={opacity} transform={dx ? `translate(${dx} 0)` : undefined}>
      {BARS.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={BASE_Y - b.h}
          width={BAR_W}
          height={b.h}
          {...(hook ? { "data-bar": "", "data-order": ORDER[i] } : {})}
        />
      ))}
    </g>
  );
}

/** 03 NOCTURNE — acid-lime equaliser glitching over an ultraviolet glow. */
export function NocturneCover({ title, className }: CoverProps) {
  const uid = useId().replace(/:/g, "");
  const glow = `noc-glow-${uid}`;
  const scan = `noc-scan-${uid}`;
  const grain = `noc-grain-${uid}`;

  return (
    <svg {...svgCommon} aria-label={title} className={className} data-art="nocturne">
      <defs>
        <radialGradient id={glow} cx="1100" cy="400" r="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6B2BFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6B2BFF" stopOpacity="0" />
        </radialGradient>
        <pattern id={scan} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="1" fill="#1A1A22" />
        </pattern>
        <GrainFilter id={grain} />
      </defs>

      <rect width="1600" height="1000" fill="#07070A" />

      <g data-depth="0.1">
        <circle cx="1100" cy="400" r="600" fill={`url(#${glow})`} />
      </g>

      {/* Glitch copies (depth 0.5) sit behind the main bars in paint order so the lime stays dominant. */}
      <g data-depth="0.5">
        <Bars dx={8} fill="#C6FF2E" opacity={0.35} />
        <Bars dx={-8} fill="#6B2BFF" opacity={0.6} />
        <rect x="0" y="840" width="1600" height="1" fill="#C6FF2E" />
      </g>

      <g data-depth="0.25" data-bars>
        <Bars fill="#C6FF2E" hook />
      </g>

      <rect width="1600" height="1000" fill={`url(#${scan})`} aria-hidden="true" />
      <GrainRect id={grain} opacity={0.08} />
    </svg>
  );
}
