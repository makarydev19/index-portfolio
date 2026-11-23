"use client";

import { useCallback, useState, type FocusEvent } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import type { Project } from "@/content/types";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Media } from "@/components/media/Media";
import { Rule } from "@/components/ui/Rule";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HoverPreview, type PreviewAnchor } from "./HoverPreview";

const INTRO =
  "Four concept sites, each built end-to-end to explore a different motion system — from editorial calm to festival noise.";

/**
 * Home work index (DESIGN.md §3.2 / §5.5). Owns the active row for the hover preview.
 * ANIMATION hooks: .work-list gets `is-active` via [data-active] when a row is active,
 * li[data-row-index] with its own [data-anim="rule"], cells [data-row-cell],
 * mobile covers [data-anim="clip-reveal"] > [data-anim-inner].
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<PreviewAnchor>("cursor");

  const reduced = useReducedMotionPref();

  /** Anchored preview position: right edge of the title column (+24px), row centre. */
  const rowAnchor = useCallback((link: HTMLElement) => {
    const title = link.querySelector<HTMLElement>("[data-row-title]")?.parentElement;
    const row = link.getBoundingClientRect();
    const right = title ? title.getBoundingClientRect().right : row.left + row.width * 0.58;
    return new DOMRect(right + 24, row.top + row.height / 2, 0, 0);
  }, []);

  const onFocusRow = useCallback(
    (e: FocusEvent<HTMLAnchorElement>, i: number) => {
      if (!e.currentTarget.matches(":focus-visible")) return;
      setAnchor(rowAnchor(e.currentTarget));
      setActiveIndex(i);
    },
    [rowAnchor],
  );

  const count = String(projects.length).padStart(2, "0");

  return (
    <section id="work" aria-labelledby="work-title" className="pt-section">
      <div className="wrap-site">
        <SectionLabel index="02" title="Selected work" meta={`(${count}) Projects — 2026`} id="work-title" />
        <div className="grid-site !px-0 mt-4 md:mt-6">
          <SplitHeading
            as="p"
            split="lines"
            text={INTRO}
            className="text-body-l col-span-full text-muted md:col-span-6 lg:col-span-6"
          />
        </div>

        <ol
          className={`work-list mt-12 lg:mt-20 ${activeIndex !== null ? "is-active" : ""}`}
          data-active={activeIndex ?? undefined}
          onPointerLeave={() => setActiveIndex(null)}
        >
          {projects.map((p, i) => (
            <li key={p.slug} className="work-row" data-row-index={i}>
              <Rule />
              <TransitionLink
                href={`/work/${p.slug}`}
                label={p.title}
                index={p.index}
                colors={{ bg: p.palette.bg, fg: p.palette.fg, accent: p.palette.accent }}
                aria-label={`${p.index} ${p.title}, ${p.category}, ${p.year}`}
                className="work-row__link grid-site !px-0 gap-y-3 pb-12 pt-4 lg:h-[120px] lg:items-center lg:gap-y-0 lg:py-0"
                onPointerEnter={(e) => {
                  // Reduced motion: the preview sits static at the anchored position.
                  setAnchor(reduced ? rowAnchor(e.currentTarget) : "cursor");
                  setActiveIndex(i);
                }}
                onFocus={(e) => onFocusRow(e, i)}
                onBlur={() => setActiveIndex(null)}
              >
                <span aria-hidden="true" className="work-row__wipe hidden lg:block" />

                {/* Mobile inline cover */}
                <div
                  className="relative col-span-full row-start-1 aspect-[16/10] overflow-hidden bg-paper-2 lg:hidden"
                  data-anim="clip-reveal"
                >
                  <div className="absolute inset-0" data-anim-inner>
                    <Media media={p.cover} sizes="(min-width: 768px) 90vw, 100vw" />
                  </div>
                </div>

                <span
                  className="work-row__num mono col-span-2 row-start-2 lg:col-span-1 lg:row-start-1"
                  data-row-cell
                >
                  {p.index}
                </span>

                <span
                  className="col-span-full row-start-3 lg:col-span-6 lg:col-start-2 lg:row-start-1"
                  data-row-cell
                >
                  <span className="work-row__title text-display-l display-features" data-row-title>
                    {p.title}
                  </span>
                </span>

                <span className="mono-s col-span-full row-start-4 text-muted lg:hidden" data-row-cell>
                  {p.category} · {p.techLine}
                </span>

                <span className="mono hidden lg:col-span-2 lg:col-start-8 lg:row-start-1 lg:block" data-row-cell>
                  {p.category}
                </span>
                <span
                  className="mono hidden text-muted lg:col-span-2 lg:col-start-10 lg:row-start-1 lg:block"
                  data-row-cell
                >
                  {p.techLine}
                </span>

                <span
                  className="mono col-span-2 col-start-3 row-start-2 inline-flex items-center justify-end gap-1.5 md:col-start-7 lg:col-span-1 lg:col-start-12 lg:row-start-1"
                  data-row-cell
                >
                  {p.year}
                  <ArrowIcon direction="ne" size={11} className="arrow-rot" />
                </span>
              </TransitionLink>
              {i === projects.length - 1 ? <Rule /> : null}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex justify-end">
          <TransitionLink href="/work" label="Work" className="mono inline-flex min-h-11 items-center gap-2">
            <span className="link-h">All work ({count})</span>
            <ArrowIcon direction="e" size={11} />
          </TransitionLink>
        </div>
      </div>

      <HoverPreview projects={projects} activeIndex={activeIndex} anchor={anchor} />
    </section>
  );
}
