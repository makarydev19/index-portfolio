import type { SiteContent } from "@/content/types";
import { Rule } from "@/components/ui/Rule";

/** Experience rows. ANIMATION hooks: li[data-hl-row] (rule then cells [data-row-cell]). */
export function Experience({ items }: { items: SiteContent["about"]["experience"] }) {
  return (
    <section className="wrap-site" aria-labelledby="exp-title">
      <h2 id="exp-title" className="mono text-muted" data-anim="fade-up">
        Experience
      </h2>
      <ol className="mt-8 md:mt-12">
        {items.map((e) => (
          <li key={e.years} data-hl-row>
            <Rule />
            <div className="grid-site !px-0 gap-y-2 py-6 md:items-baseline md:py-8">
              <span className="mono col-span-full text-muted md:col-span-2 lg:col-span-2" data-row-cell>
                {e.years}
              </span>
              <h3 className="text-h3 col-span-full md:col-span-3 lg:col-span-5 lg:col-start-3" data-row-cell>
                {e.role}
              </h3>
              <p className="col-span-full md:col-span-2 lg:col-span-3 lg:col-start-8" data-row-cell>
                {e.company}
                <span className="mono text-muted md:hidden"> · {e.location}</span>
              </p>
              <span className="mono hidden text-right text-muted md:col-span-1 md:block lg:col-span-2 lg:col-start-11" data-row-cell>
                {e.location}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <Rule />
    </section>
  );
}
