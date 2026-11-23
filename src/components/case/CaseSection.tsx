import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mono label at cols 1–3, content at cols 5–10 (DESIGN.md §3.4). */
export function CaseSection({
  label,
  children,
  wide = false,
  className,
}: {
  label: string;
  children: ReactNode;
  /** Overview uses cols 5–11. */
  wide?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("wrap-site", className)} aria-label={label} data-case-section>
      <div className="grid-site !px-0 gap-y-4">
        <h2 className="mono col-span-full text-muted md:col-span-2 lg:col-span-3" data-anim="fade-up">
          {label}
        </h2>
        <div
          className={cn(
            "col-span-full md:col-span-6 md:col-start-3",
            wide ? "lg:col-span-7 lg:col-start-5" : "lg:col-span-6 lg:col-start-5",
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
