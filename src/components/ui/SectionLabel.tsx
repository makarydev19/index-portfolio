import { cn } from "@/lib/cn";
import { Rule } from "./Rule";

/**
 * Mono label row with a hairline above: (02) / SELECTED WORK / meta.
 * ANIMATION: [data-section-meta] is the node to rewrite for live progress (e.g. "03 — 42%").
 */
export function SectionLabel({
  index,
  title,
  meta,
  id,
  tone = "ink",
  className,
}: {
  index: string;
  title: string;
  meta?: string;
  /** Optional id so a <section aria-labelledby> can point at the title. */
  id?: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div className={cn("relative", className)} data-section-label>
      <Rule tone={tone} />
      <div className="grid-site !px-0 pt-3">
        <span className="mono col-span-1 lg:col-span-1" data-anim="fade-up">
          ({index})
        </span>
        <h2
          id={id}
          className="mono col-span-3 md:col-span-4 lg:col-span-5 lg:col-start-2"
          data-anim="fade-up"
        >
          {title}
        </h2>
        {meta ? (
          <span
            className={cn(
              "mono col-span-3 col-start-2 mt-1 md:col-span-3 md:col-start-auto md:mt-0 md:text-right lg:col-span-6",
              tone === "ink" ? "text-muted" : "text-muted-dark",
            )}
            data-anim="fade-up"
            data-section-meta
          >
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
