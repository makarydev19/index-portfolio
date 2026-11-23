import type { MediaSource } from "@/content/types";
import { Rule } from "@/components/ui/Rule";
import { Media } from "@/components/media/Media";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { PortraitTilt } from "./PortraitTilt";

/**
 * About hero. ANIMATION hooks: h1 [data-anim="split-lines"], portrait [data-portrait]
 * with [data-anim="clip-reveal"] > [data-anim-inner] (scale 1.2→1), [data-portrait-tilt]
 * (pointer tilt ±6°), SVG [data-dots] (scrub y 0→-40).
 */
export function AboutHero({
  headline,
  portrait,
  role,
  location,
}: {
  headline: string;
  portrait: MediaSource;
  role: string;
  location: string;
}) {
  return (
    <section aria-labelledby="about-hero-title" className="pb-section pt-30 md:pt-40" data-intro>
      <div className="wrap-site">
        <div className="grid-site !px-0 gap-y-1">
          <p className="mono col-span-2 md:col-span-3 lg:col-span-4" data-anim="fade-up">
            (03) About
          </p>
          <p className="mono col-span-2 text-right md:col-span-3 md:text-left lg:col-span-4" data-anim="fade-up">
            {role}
          </p>
          <p className="mono hidden text-right md:col-span-2 md:block lg:col-span-4" data-anim="fade-up">
            {location}
          </p>
        </div>
        <Rule className="mt-3" />

        <div className="grid-site !px-0 mt-10 gap-y-10 md:mt-16">
          <figure className="col-span-full md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:row-start-1" data-portrait>
            <PortraitTilt className="mx-auto max-w-[calc(70svh*0.8)] md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2" data-anim="clip-reveal">
                <div className="absolute inset-0" data-anim-inner>
                  <Media media={portrait} priority sizes="(min-width: 1024px) 30vw, 100vw" />
                </div>
              </div>
            </PortraitTilt>
            <figcaption className="mono-s mt-3 text-muted">Fig. 01 — Portrait (replace me)</figcaption>
          </figure>
          <SplitHeading
            as="h1"
            id="about-hero-title"
            split="lines"
            stagger={0.1}
            delay={0}
            text={headline}
            className="text-display-xl display-features col-span-full outline-none lg:col-span-8 lg:row-start-1"
          />
        </div>
      </div>
    </section>
  );
}
