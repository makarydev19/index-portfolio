import type { SiteContent } from "@/content/types";
import { Rule } from "@/components/ui/Rule";

/**
 * Sticky split (desktop). Static: all items full opacity, counter shows the total.
 * ANIMATION hooks: [data-principles-counter] > [data-principles-current] (y-roll on change),
 * li[data-principle="i"] (active 1 / others 0.3; ScrollTrigger start "top 60%").
 */
export function Principles({ items }: { items: SiteContent["about"]["principles"] }) {
  const total = String(items.length).padStart(2, "0");
  return (
    <section className="wrap-site" aria-labelledby="principles-title">
      <div className="grid-site !px-0 gap-y-10">
        <div className="col-span-full lg:col-span-5">
          <div className="lg:sticky lg:top-[120px]">
            <h2 id="principles-title" className="text-display-l display-features" data-anim="split-lines">
              How I work
            </h2>
            <p className="mono mt-6 text-muted" data-principles-counter aria-hidden="true">
              <span className="inline-block overflow-hidden align-top">
                <span className="inline-block" data-principles-current>
                  {total}
                </span>
              </span>{" "}
              / {total}
            </p>
          </div>
        </div>
        <ol className="col-span-full flex flex-col gap-16 lg:col-span-6 lg:col-start-7 lg:gap-0">
          {items.map((p, i) => (
            <li key={p.title} data-principle={i} className="lg:min-h-[60vh]">
              <Rule />
              <p className="mono mt-4 text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-h2 display-features mt-6">{p.title}</h3>
              <p className="text-body-l measure mt-4 text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
