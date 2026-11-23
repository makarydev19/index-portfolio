import type { Project } from "@/content/types";
import { Rule } from "@/components/ui/Rule";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ExternalLink } from "@/components/layout/ExternalLink";

/**
 * Case hero (DESIGN.md §3.4 / §5.11).
 * ANIMATION hooks: mono row [data-anim="fade-up"], [data-anim="rule"], h1 [data-anim="split-chars"],
 * meta cells [data-case-meta] (own rule + fade-up, data-intro-delay 0.4).
 */
export function CaseHero({ project: p }: { project: Project }) {
  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "Role", value: "Concept, design & front-end" },
    { label: "Timeline", value: p.timeline },
    { label: "Stack", value: p.stack.join(", ") },
    {
      label: "Links",
      value: (
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          {p.liveUrl ? (
            <ExternalLink href={p.liveUrl} className="inline-flex items-center gap-1">
              <span className="link-u">Live site</span> <ArrowIcon direction="ne" size={10} />
            </ExternalLink>
          ) : null}
          {p.sourceUrl ? (
            <ExternalLink href={p.sourceUrl} className="inline-flex items-center gap-1">
              <span className="link-u">Source</span> <ArrowIcon direction="ne" size={10} />
            </ExternalLink>
          ) : null}
        </span>
      ),
    },
  ];

  return (
    <section aria-labelledby="case-title" className="pb-16 pt-30 md:pt-40 lg:pb-24" data-intro>
      <div className="wrap-site">
        <div className="grid-site !px-0 gap-y-1">
          <p className="mono col-span-2 md:col-span-3 lg:col-span-4" data-anim="fade-up">
            ({p.index}) Case study
          </p>
          <p className="mono col-span-2 text-right md:col-span-3 md:text-left lg:col-span-4" data-anim="fade-up">
            {p.category}
          </p>
          <p className="mono hidden text-right md:col-span-2 md:block lg:col-span-4" data-anim="fade-up">
            {p.year}
          </p>
        </div>
        <Rule className="mt-3" />
        <h1
          id="case-title"
          tabIndex={-1}
          className="text-mega text-mega-fit display-features mt-12 outline-none md:mt-20"
          data-anim="split-chars"
          data-stagger="0.03"
        >
          {p.title}
        </h1>

        <dl className="grid-site !px-0 mt-14 gap-y-8 md:mt-20">
          {meta.map((m) => (
            <div key={m.label} className="col-span-2 md:col-span-4 lg:col-span-3" data-case-meta data-intro-delay="0.4">
              <Rule />
              <dt className="mono mt-3 text-muted" data-anim="fade-up">
                {m.label}
              </dt>
              <dd className="mt-2 pr-4" data-anim="fade-up">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
