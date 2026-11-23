import { Fragment } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type Token = { word: string; em: boolean; highlight: boolean };

function tokenize(statement: string, highlights: string[]): Token[] {
  const hl = highlights.map((h) => h.toLowerCase());
  return statement.split(/\s+/).map((raw) => {
    const em = /\*[^*]+\*/.test(raw);
    const word = raw.replace(/\*/g, "");
    const bare = word.replace(/[^\p{L}\p{N}'-]/gu, "").toLowerCase();
    return { word, em, highlight: hl.includes(bare) };
  });
}

/**
 * Sticky scrub-highlight statement (DESIGN.md §3.2 / §5.6). Words are split server-side.
 * Static: words fully ink, highlights in signal (large text ≥24px passes 3:1).
 * ANIMATION hooks: section [data-about-statement] (250vh/200vh trigger), [data-sticky] frame,
 * p[data-anim="scrub-words"] > span[data-word] (+ [data-highlight]), [data-section-meta]
 * for "03 — 42%", [data-about-cta] (fade in after 85%). Under reduced motion, add
 * `h-auto` / drop the sticky (the ANIMATION agent toggles [data-reduced]).
 */
export function AboutStatement({ statement, highlights }: { statement: string; highlights: string[] }) {
  const tokens = tokenize(statement, highlights);

  return (
    <section
      aria-labelledby="about-title"
      data-about-statement
      className="relative h-[200vh] motion-reduce:h-auto lg:h-[250vh]"
    >
      <div
        className="wrap-site sticky top-0 flex min-h-svh flex-col justify-center py-20 motion-reduce:static"
        data-sticky
      >
        <SectionLabel index="03" title="About" meta="Est. 2019" id="about-title" />
        <p
          className="display-features mt-6 text-[32px] font-medium leading-[1.08] tracking-[-0.03em] md:mt-10 md:text-display-l lg:w-11/12"
          data-anim="scrub-words"
        >
          {tokens.map((t, i) => {
            const content = t.em ? <em className="italic">{t.word}</em> : t.word;
            return (
              <Fragment key={i}>
                <span
                  data-word
                  data-highlight={t.highlight ? "" : undefined}
                  className={t.highlight ? "text-signal" : undefined}
                >
                  {content}
                </span>
                {i < tokens.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </p>
        <div className="mt-10" data-about-cta>
          <TransitionLink
            href="/about"
            label="About"
            className="pill-outline mono inline-flex h-12 items-center gap-2 rounded-pill border border-ink px-6"
          >
            More about me <ArrowIcon direction="e" size={11} />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
