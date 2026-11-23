import { Rule } from "@/components/ui/Rule";

type Stat = { value: number; decimals: number; prefix?: string; label: string };

/**
 * Three target stats. Final values render statically.
 * ANIMATION hooks: [data-count][data-decimals] on the number node (count 0→value), [data-stat-label].
 */
export function TargetStats({ items }: { items: Stat[] }) {
  return (
    <section className="wrap-site" aria-labelledby="targets-title">
      <h2 id="targets-title" className="mono text-muted" data-anim="fade-up">
        Targets
      </h2>
      <dl className="grid-site !px-0 mt-8 gap-y-10">
        {items.map((s) => (
          <div key={s.label} className="col-span-full flex flex-col-reverse md:col-span-4 lg:col-span-4">
            <dt className="mono mt-4" data-stat-label>
              {s.label}
            </dt>
            <dd className="text-display-xl display-features tabular-nums">
              <Rule className="mb-6" />
              {s.prefix ? <span>{s.prefix}</span> : null}
              <span data-count={s.value} data-decimals={s.decimals}>
                {s.value.toFixed(s.decimals)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mono-s mt-10 text-muted">Targets set at the start of the build.</p>
    </section>
  );
}
