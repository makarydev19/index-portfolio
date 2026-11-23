import { Rule } from "@/components/ui/Rule";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SplitHeading } from "@/components/ui/SplitHeading";

/**
 * Home hero (DESIGN.md §3.2 / §5.4).
 * ANIMATION hooks: [data-hero] (scroll trigger), [data-hero-meta] + [data-anim="fade-up"] items,
 * [data-anim="rule"], [data-hero-name][data-anim="split-chars"], [data-hero-statement][data-anim="split-lines"],
 * [data-hero-stack] items, [data-status-dot], [data-scroll-cue] (6px bob loop).
 */
export function Hero({
  name,
  role,
  statement,
  meta,
  location,
  projectCount,
}: {
  name: string;
  role: string;
  statement: string;
  /** [index label, role, tagline, availability status] */
  meta: string[];
  location: string;
  projectCount: number;
}) {
  const [indexLabel, roleLabel, tagline, status = ""] = meta;
  const [statusFirst, ...statusRest] = status.split(" ");
  const words = name.split(" ");

  return (
    <section
      aria-labelledby="hero-title"
      data-hero
      data-intro
      className="relative flex min-h-[max(100svh,640px)] flex-col pb-10 pt-[calc(var(--header-h)+8px)]"
    >
      {/* Row A — meta */}
      <div className="wrap-site" data-hero-meta>
        <div className="grid-site !px-0 gap-y-1">
          <p className="mono col-span-2 md:col-span-2 lg:col-span-3" data-anim="fade-up">
            {indexLabel}
          </p>
          <p className="mono order-3 col-span-full md:order-none md:col-span-2 lg:col-span-3" data-anim="fade-up">
            {roleLabel}
          </p>
          <p className="mono hidden md:col-span-2 md:block lg:col-span-3" data-anim="fade-up">
            {tagline}
          </p>
          <p
            className="mono order-2 col-span-2 flex items-center justify-end gap-2 text-signal-text md:order-none md:col-span-2 lg:col-span-3"
            data-anim="fade-up"
          >
            <span className="relative inline-flex size-2" data-status-dot aria-hidden="true">
              <span className="absolute inset-0 rounded-pill bg-signal" data-status-dot-ring />
              <span className="relative size-2 rounded-pill bg-signal" />
            </span>
            <span>
              {statusFirst}
              <span className="hidden md:inline"> {statusRest.join(" ")}</span>
            </span>
          </p>
        </div>
      </div>
      <div className="wrap-site mt-3">
        <Rule />
      </div>

      <div className="wrap-site flex flex-1 flex-col">
        {/* Row B — the name */}
        <h1 id="hero-title" tabIndex={-1} className="mt-[16svh] outline-none md:my-auto md:py-12">
          <span className="text-mega display-features block whitespace-nowrap" data-anim="split-chars" data-hero-name>
            {words.map((w, i) => (
              <span key={i}>
                <span className="block md:inline">{w}</span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
          <span className="sr-only"> — {role}</span>
        </h1>

        {/* Row C — statement + mono stack */}
        <div className="grid-site !px-0 mt-8 gap-y-8 md:mt-0 md:items-end">
          <SplitHeading
            as="p"
            split="lines"
            text={statement}
            className="text-display-l display-features col-span-full md:col-span-6 lg:col-span-8"
            delay={0.45}
          />
          <ul
            className="mono col-span-full flex flex-col md:col-span-2 md:items-end md:text-right lg:col-span-4"
            data-hero-stack
          >
            <li className="hidden md:block" data-anim="fade-up">
              Based in {location} — working worldwide
            </li>
            <li className="hidden md:block" data-anim="fade-up">
              {projectCount} case studies below
            </li>
            <li data-anim="fade-up">
              <a href="#work" className="inline-flex min-h-11 items-center gap-2 md:min-h-0">
                <span className="link-h">Scroll</span>
                <span className="inline-flex" data-scroll-cue>
                  <ArrowIcon direction="s" size={11} />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
