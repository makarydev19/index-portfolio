import { Tag } from "@/components/ui/Tag";

/** Stack pills. ANIMATION hooks: li[data-pill] (y 12→0, stagger 0.04). */
export function StackList({ items }: { items: string[] }) {
  return (
    <section className="wrap-site" aria-labelledby="stack-title">
      <div className="grid-site !px-0 gap-y-6">
        <h2 id="stack-title" className="mono col-span-full text-muted md:col-span-2 lg:col-span-3" data-anim="fade-up">
          Stack
        </h2>
        <ul className="col-span-full flex flex-wrap gap-2 md:col-span-6 md:col-start-3 lg:col-span-8 lg:col-start-5">
          {items.map((s) => (
            <li key={s} data-pill>
              <Tag className="normal-case tracking-[0.02em]">{s}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
