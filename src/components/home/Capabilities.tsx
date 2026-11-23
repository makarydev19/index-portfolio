import { Fragment } from "react";
import type { SiteContent } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";

/**
 * Capabilities (DESIGN.md §3.2 / §5.7).
 * ANIMATION hooks: [data-cap-col] columns (own [data-anim="rule"] + [data-anim="fade-up"] children),
 * [data-toolbelt] > span[data-word] (scrubbed opacity 0.3→1).
 */
export function Capabilities({ items, toolbelt }: { items: SiteContent["capabilities"]; toolbelt: string[] }) {
  return (
    <section aria-labelledby="cap-title" className="py-section">
      <div className="wrap-site">
        <SectionLabel index="04" title="Capabilities" meta="What I do" id="cap-title" />

        <div className="grid-site !px-0 mt-12 gap-y-14 lg:mt-20">
          {items.map((c, i) => (
            <article key={c.title} className="col-span-full lg:col-span-4" data-cap-col>
              <Rule />
              <p className="mono mt-4 text-muted" data-anim="fade-up">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-h3 mt-6 md:mt-10" data-anim="fade-up">
                {c.title}
              </h3>
              <p className="measure mt-4 text-muted lg:pr-6" data-anim="fade-up">
                {c.body}
              </p>
              <ul className="mt-8" data-anim="fade-up">
                {c.list.map((l) => (
                  <li key={l} className="mono border-t border-rule py-3 last:border-b">
                    {l}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p
          className="text-display-l display-features mt-24 text-muted lg:mt-32 lg:text-center"
          data-toolbelt
          data-anim="split-words"
        >
          {toolbelt.map((w, i) => (
            <Fragment key={w}>
              <span className="toolbelt-word whitespace-nowrap" data-word>
                {w}
              </span>
              {i < toolbelt.length - 1 ? <span aria-hidden="true"> / </span> : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
