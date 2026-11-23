import { useId } from "react";
import { GrainFilter } from "./covers/shared";

const COLS = 28;
const ROWS = 35;
const CELL = 20;
const STROKE_HALF = 22;
const FALLOFF = 34;
const MAX_R = 9;

type Seg = [number, number, number, number];
/** "Y" and "N" strokes in pixel space (cell centres = i*20+10). */
const SEGMENTS: Seg[] = [
  [70, 190, 150, 350],
  [250, 190, 150, 350],
  [150, 350, 150, 530],
  [330, 530, 330, 190],
  [330, 190, 490, 530],
  [490, 530, 490, 190],
];

function distToSeg(px: number, py: number, [x1, y1, x2, y2]: Seg) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

/** Deterministic halftone dots (computed once at module load). */
const DOTS = (() => {
  const dots: { cx: number; cy: number; r: number; signal: boolean }[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cx = col * CELL + 10;
      const cy = row * CELL + 10;
      const d = Math.min(...SEGMENTS.map((s) => distToSeg(cx, cy, s)));
      const k = Math.max(0, 1 - Math.max(0, d - STROKE_HALF) / FALLOFF);
      // A faint ambient field keeps the halftone texture visible around the letters.
      const ambient = 1.1 + 0.9 * Math.abs(Math.sin(col * 0.7 + row * 0.45));
      const r = Math.max(ambient, MAX_R * k);
      dots.push({ cx, cy, r: Number(r.toFixed(2)), signal: col === 24 && row === 9 });
    }
  }
  return dots;
})();

/** Placeholder portrait — halftone monogram "YN" with one signal-red dot. */
export function Portrait({ title, className }: { title: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const grain = `portrait-grain-${uid}`;
  return (
    <svg
      viewBox="0 0 560 700"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title}
      className={className}
      data-art="portrait"
    >
      <defs>
        <GrainFilter id={grain} />
      </defs>
      <rect width="560" height="700" fill="#E4E2DC" />
      {/* ANIMATION: [data-dots] scrubs y 0→-40 over the hero. */}
      <g data-dots data-depth="0.25">
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.signal ? MAX_R : d.r} fill={d.signal ? "#FF3B14" : "#0D0D0D"} />
        ))}
      </g>
      <rect width="560" height="700" filter={`url(#${grain})`} opacity="0.08" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
