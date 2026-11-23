import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Pill tag: 1px ink border, mono 12px. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "mono-s inline-flex h-9 items-center whitespace-nowrap rounded-pill border border-current px-4",
        className,
      )}
    >
      {children}
    </span>
  );
}
