import { useId } from "react";
import { GrainFilter, GrainRect, svgCommon, type CoverProps } from "./shared";

const crimp = (() => {
  const pts: string[] = ["-182,-226", "-182,-262"];
  const teeth = 14;
  const w = 364 / teeth;
  for (let i = 0; i < teeth; i++) {
    const x0 = -182 + i * w;
    pts.push(`${(x0 + w / 2).toFixed(1)},-282`, `${(x0 + w).toFixed(1)},-262`);
  }
  pts.push("182,-226");
  return pts.join(" ");
})();

/** 02 Kōdo Coffee — a cream bag with orange steam on espresso brown. */
export function KodoCover({ title, className }: CoverProps) {
  const uid = useId().replace(/:/g, "");
  const grain = `kodo-grain-${uid}`;

  return (
    <svg {...svgCommon} aria-label={title} className={className} data-art="kodo">
      <defs>
        <GrainFilter id={grain} />
      </defs>

      <rect width="1600" height="1000" fill="#2A1A12" />

      <g data-depth="0.1" fill="none" stroke="#5A3A28" strokeWidth="2">
        {[120, 220, 320, 420, 520].map((r) => (
          <circle key={r} cx="1000" cy="520" r={r} />
        ))}
      </g>

      <g data-depth="0.25">
        <g transform="translate(1000 540) rotate(-8)">
          <path
            d="M-180 -238Q-180 -262 -156 -262H156Q180 -262 180 -238L210 268Q210 280 198 280H-198Q-210 280 -210 268Z"
            fill="#F3E6D0"
          />
          <polygon points={crimp} fill="#E3D2B6" />
          <line x1="-186" y1="-218" x2="186" y2="-218" stroke="#2A1A12" strokeOpacity="0.25" strokeWidth="3" />
          <circle cx="0" cy="20" r="54" fill="#FF5A1F" />
          <circle cx="0" cy="20" r="30" fill="none" stroke="#2A1A12" strokeWidth="6" />
          <rect x="-90" y="130" width="180" height="10" fill="#2A1A12" opacity="0.18" />
          <rect x="-60" y="156" width="120" height="10" fill="#2A1A12" opacity="0.12" />
        </g>
      </g>

      <g data-depth="0.5">
        <g fill="none" stroke="#FF5A1F" strokeWidth="10" strokeLinecap="round">
          <path d="M900 236C860 190 950 150 905 100S920 30 905 0" />
          <path d="M1000 220C960 170 1050 130 1005 80S1020 10 1005 -20" />
          <path d="M1100 206C1060 160 1150 120 1105 70S1120 0 1105 -30" />
        </g>
        <path
          d="M80 900C300 820 420 960 600 820S780 700 820 640"
          fill="none"
          stroke="#F3E6D0"
          strokeWidth="4"
          strokeDasharray="2 14"
          strokeLinecap="round"
        />
        <g fill="#FF5A1F">
          <circle cx="80" cy="900" r="10" />
          <circle cx="355" cy="882" r="10" />
          <circle cx="600" cy="820" r="10" />
        </g>
      </g>

      <GrainRect id={grain} opacity={0.12} />
    </svg>
  );
}
