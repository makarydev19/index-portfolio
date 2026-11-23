import { cn } from "@/lib/cn";

type Direction = "ne" | "e" | "s" | "n";

const rotation: Record<Direction, number> = { ne: 0, e: 45, s: 135, n: -45 };

/** Custom 1.5px-stroke arrow. Base glyph is ↗ ; other directions rotate it. Decorative. */
export function ArrowIcon({
  direction = "ne",
  size = 12,
  className,
}: {
  direction?: Direction;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center align-[-0.1em]", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
        style={{ transform: `rotate(${rotation[direction]}deg)` }}
      >
        <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" />
      </svg>
    </span>
  );
}
