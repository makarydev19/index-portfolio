import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Split-ready text. Renders plain text (fully visible without JS) and marks the
 * element with data-anim="split-{chars|lines|words}" for the ANIMATION agent's
 * SplitText pass. `aria-label` keeps the full string for assistive tech once split.
 */
export function SplitHeading({
  as: Tag = "h2",
  text,
  split,
  className,
  id,
  children,
  delay,
  stagger,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  text: string;
  split: "chars" | "lines" | "words";
  className?: string;
  id?: string;
  /** Optional custom markup (e.g. responsive line breaks). Defaults to `text`. */
  children?: ReactNode;
  delay?: number;
  /** Optional per-element stagger override for the split reveal (seconds). */
  stagger?: number;
}) {
  return (
    <Tag
      id={id}
      className={cn(className)}
      data-anim={`split-${split}`}
      data-intro-delay={delay}
      data-stagger={stagger}
      aria-label={children ? text : undefined}
      tabIndex={Tag === "h1" ? -1 : undefined}
    >
      {children ?? text}
    </Tag>
  );
}
