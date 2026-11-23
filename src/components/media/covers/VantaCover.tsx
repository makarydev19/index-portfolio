import { useId } from "react";
import { GrainFilter, GrainRect, svgCommon, type CoverProps } from "./shared";

/**
 * Low-wedge hypercar silhouette, ~1100 wide, centred, wheels on the ground line (y=700).
 * Wheel arches are cut out of the body (large arcs, r=78 around wheel centres at y=634).
 */
const CAR =
  "M250 660V604C258 566 300 548 400 536L560 512C640 438 760 402 860 410C940 418 1000 466 1060 508L1250 556C1318 572 1348 598 1352 636V660H1203.5A78 78 0 1 0 1056.5 660H453.5A78 78 0 1 0 306.5 660Z";

const ticks = Array.from({ length: 12 }, (_, i) => 200 + i * 40);

/** 04 VANTA — silver silhouette crossed by a cyan light sweep on graphite. */
export function VantaCover({ title, className }: CoverProps) {
  const uid = useId().replace(/:/g, "");
  const bg = `vanta-bg-${uid}`;
  const body = `vanta-body-${uid}`;
  const sweep = `vanta-sweep-${uid}`;
  const clip = `vanta-clip-${uid}`;
  const glow = `vanta-glow-${uid}`;
  const grain = `vanta-grain-${uid}`;

  return (
    <svg {...svgCommon} aria-label={title} className={className} data-art="vanta">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15171A" />
          <stop offset="1" stopColor="#2A2E33" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFC5CC" />
          <stop offset="1" stopColor="#2A2E33" />
        </linearGradient>
        <linearGradient id={sweep} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3DE7FF" stopOpacity="0" />
          <stop offset="0.45" stopColor="#3DE7FF" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#3DE7FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3DE7FF" stopOpacity="0.25" />
          <stop offset="1" stopColor="#3DE7FF" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <path d={CAR} />
        </clipPath>
        <GrainFilter id={grain} />
      </defs>

      <rect width="1600" height="1000" fill={`url(#${bg})`} />

      <g data-depth="0.1" stroke="#3DE7FF" strokeOpacity="0.4" strokeWidth="1" fill="none">
        <line x1="0" y1="700" x2="1600" y2="700" />
        {ticks.map((y) => (
          <g key={y}>
            <line x1="40" y1={y} x2={y % 200 === 0 ? 80 : 64} y2={y} />
            <line x1={y % 200 === 0 ? 1520 : 1536} y1={y} x2="1560" y2={y} />
          </g>
        ))}
        <path d="M80 140V80H140" />
        <path d="M1520 860V920H1460" />
        <text
          x="110"
          y="132"
          fill="#3DE7FF"
          fillOpacity="0.7"
          stroke="none"
          fontSize="18"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="2"
        >
          V—01 / 1,020 KW
        </text>
      </g>

      <g data-depth="0.25">
        <circle cx="380" cy="634" r="64" fill="#0B0C0E" stroke="#BFC5CC" strokeOpacity="0.35" strokeWidth="3" />
        <circle cx="1130" cy="634" r="64" fill="#0B0C0E" stroke="#BFC5CC" strokeOpacity="0.35" strokeWidth="3" />
        <path d={CAR} fill={`url(#${body})`} />
        <path d="M600 506C680 450 770 428 850 432C910 436 960 468 1000 500Z" fill="#15171A" opacity="0.65" />
      </g>

      <g data-depth="0.5">
        <ellipse cx="800" cy="704" rx="620" ry="34" fill={`url(#${glow})`} />
        <g clipPath={`url(#${clip})`}>
          {/* ANIMATION: [data-sweep] translates x -800→1600 on the case cover scrub. */}
          <rect data-sweep x="640" y="-200" width="260" height="1400" fill={`url(#${sweep})`} transform="rotate(-20 770 500)" />
        </g>
      </g>

      <GrainRect id={grain} opacity={0.1} />
    </svg>
  );
}
