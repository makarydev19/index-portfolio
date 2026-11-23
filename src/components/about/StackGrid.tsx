import type { SiteContent } from "@/content/types";
import { Rule } from "@/components/ui/Rule";

/** Toolbox grid: 4 cols desktop / 2 cols mobile. ANIMATION hooks: li[data-tool] (rule + name). */
export function StackGrid({ groups }: { groups: SiteContent["about"]["toolbox"] }) {
  const tools = groups.flatMap((g) => g.items.map((name) => ({ name, category: g.category })));
  return (
    <section className="wrap-site" aria-labelledby="toolbox-title">
      <h2 id="toolbox-title" className="mono text-muted" data-anim="fade-up">
        Toolbox
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-(--gutter) md:mt-12 md:grid-cols-4">
        {tools.map((t) => (
          <li key={t.name} data-tool className="pb-8">
            <Rule />
            <p className="mono-s mt-3 text-muted">{t.category}</p>
            <h3 className="text-h3 mt-2">{t.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
