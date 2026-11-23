import type { Project } from "@/content/types";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Media } from "@/components/media/Media";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/cn";

/**
 * Work card (DESIGN.md §3.3 / §5.10).
 * ANIMATION hooks: [data-work-card] (+ data-parallax), cover [data-anim="clip-reveal"] >
 * [data-anim-inner] (scale 1.3→1), meta/title/summary [data-anim="fade-up"].
 */
export function WorkCard({ project: p, offset = false }: { project: Project; offset?: boolean }) {
  return (
    <TransitionLink
      href={`/work/${p.slug}`}
      label={p.title}
      index={p.index}
      colors={{ bg: p.palette.bg, fg: p.palette.fg, accent: p.palette.accent }}
      className={cn("work-card group block", offset && "md:mt-40")}
      data-work-card
      data-parallax={offset ? "10,-10" : "0,-4"}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden bg-paper-2 md:aspect-[4/5]"
        data-anim="clip-reveal"
      >
        <div className="absolute inset-0" data-anim-inner>
          <div className="work-card__media absolute inset-0">
            <Media media={p.cover} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
        <span
          aria-hidden="true"
          className="work-card__bar absolute inset-x-0 bottom-0 h-1"
          style={{ backgroundColor: p.palette.accent }}
        />
      </div>
      <div className="mono mt-4 flex items-center justify-between gap-4" data-anim="fade-up">
        <span>{p.index}</span>
        <span className="text-muted">{p.category}</span>
        <span className="inline-flex items-center gap-1.5">
          {p.year}
          <ArrowIcon direction="ne" size={11} className="arrow-rot" />
        </span>
      </div>
      <h2 className="text-h2 display-features mt-4" data-anim="fade-up">
        <span className="work-card__title">{p.title}</span>
      </h2>
      <p className="mt-2 text-muted" data-anim="fade-up">
        {p.summary}
      </p>
    </TransitionLink>
  );
}
