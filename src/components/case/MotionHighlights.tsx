import type { MotionHighlight } from "@/content/types";
import { Rule } from "@/components/ui/Rule";
import { Tag } from "@/components/ui/Tag";

/**
 * Numbered highlight rows. ANIMATION hooks: li[data-hl-row] with own rule, cells [data-row-cell].
 */
export function MotionHighlights({ items }: { items: MotionHighlight[] }) {
  return (
    <section className="wrap-site" aria-labelledby="hl-title">
      <h2 id="hl-title" className="mono text-muted" data-anim="fade-up">
        (Motion) highlights
      </h2>
      <ol className="mt-8 md:mt-12">
        {items.map((h, i) => (
          <li key={h.title} data-hl-row>
            <Rule />
            <div className="grid-site !px-0 gap-y-3 py-6 md:py-8 lg:items-baseline">
              <span className="mono col-span-1 text-muted" data-row-cell>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 col-span-3 md:col-span-3 lg:col-span-5 lg:col-start-2" data-row-cell>
                {h.title}
              </h3>
              <p className="col-span-full text-muted md:col-span-4 lg:col-span-4 lg:col-start-7" data-row-cell>
                {h.body}
              </p>
              <span className="col-span-full lg:col-span-2 lg:col-start-11 lg:justify-self-end" data-row-cell>
                <Tag>{h.tag}</Tag>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <Rule />
    </section>
  );
}
