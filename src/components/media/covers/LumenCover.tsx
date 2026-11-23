import { useId } from "react";
import { GrainFilter, GrainRect, svgCommon, type CoverProps } from "./shared";

const archPath = (x: number) => `M${x} 880V430A110 110 0 0 1 ${x + 220} 430V880Z`;

/** 01 Lumen Atelier — charcoal arches framing a terracotta sun. */
export function LumenCover({ title, className }: CoverProps) {
  const uid = useId().replace(/:/g, "");
  const sun = `lumen-sun-${uid}`;
  const mask = `lumen-mask-${uid}`;
  const grain = `lumen-grain-${uid}`;
  const blueprint = Array.from({ length: 8 }, (_, i) => 80 + i * 80);

  return (
    <svg {...svgCommon} aria-label={title} className={className} data-art="lumen">
      <defs>
        <linearGradient id={sun} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C2603E" />
          <stop offset="1" stopColor="#C2603E" stopOpacity="0.7" />
        </linearGradient>
        {/* Window arch: frame only — the inner arch is cut out so the sun shows through. */}
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
          <rect width="1600" height="1000" fill="#fff" />
          <path d="M888 880V430A82 82 0 0 1 1052 430V880Z" fill="#000" />
        </mask>
        <GrainFilter id={grain} />
      </defs>

      <rect width="1600" height="1000" fill="#EFE9E1" />

      <g data-depth="0.1">
        <circle cx="1120" cy="360" r="260" fill={`url(#${sun})`} />
      </g>

      <g data-depth="0.25" fill="#2B2A28">
        <path d={archPath(260)} />
        <path d={archPath(560)} />
        <path d={archPath(860)} mask={`url(#${mask})`} />
      </g>

      <g data-depth="0.5">
        <polygon points="0,880 1600,880 1600,1000 0,1000" fill="#D9CFC1" />
        <g stroke="#2B2A28" strokeOpacity="0.3" strokeWidth="1">
          {blueprint.map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="880" />
          ))}
        </g>
      </g>

      <GrainRect id={grain} opacity={0.1} />
    </svg>
  );
}
