import type { Project } from "@/content/types";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Media } from "@/components/media/Media";
import { Rule } from "@/components/ui/Rule";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/**
 * Full-width next-case link (60vh). The curtain uses the next project's palette.
 * ANIMATION hooks: [data-next-peek] (clip inset(0 0 0 100%)→0 on hover, scrub yPercent 20→-20),
 * [data-next-peek-inner] (scale 1.2→1).
 */
export function NextProject({ project: p }: { project: Project }) {
  return (
    <section aria-label="Next case study" className="wrap-site pb-section">
      <Rule />
      <TransitionLink
        href={`/work/${p.slug}`}
        label={p.title}
        index={p.index}
        colors={{ bg: p.palette.bg, fg: p.palette.fg, accent: p.palette.accent }}
        className="next-project group grid-site !px-0 relative min-h-[60vh] content-between gap-y-10 py-8"
      >
        <span className="mono col-span-full inline-flex items-center gap-2 self-start lg:col-span-8">
          Next case ({p.index}) <ArrowIcon direction="e" size={11} />
        </span>
        <span
          className="relative col-span-full aspect-[16/10] overflow-hidden row-start-3 lg:col-span-4 lg:col-start-9 lg:row-start-1"
          style={{ backgroundColor: p.palette.bg }}
          data-next-peek
        >
          <span className="absolute inset-0 block" data-next-peek-inner>
            <Media media={p.cover} sizes="(min-width: 1024px) 30vw, 100vw" />
          </span>
        </span>
        <span className="col-span-full row-start-2">
          <span className="next-project__title text-mega text-mega-fit display-features block">{p.title}</span>
        </span>
      </TransitionLink>
    </section>
  );
}
