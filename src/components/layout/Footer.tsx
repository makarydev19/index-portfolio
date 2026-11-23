import type { SiteContent, Social } from "@/content/types";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Clock } from "./Clock";
import { BackToTop } from "./BackToTop";
import { ExternalLink } from "./ExternalLink";

/**
 * Shared footer / contact (DESIGN.md §3.1).
 * ANIMATION hooks: [data-footer-inner] (yPercent -30→0 reveal-from-under),
 * h2 [data-anim="split-chars"] ("Let's talk"), [data-magnetic] button,
 * [data-anim="fade-up"] bottom rows, [data-status-dot] pulse ring.
 */
export function Footer({
  name,
  email,
  socials,
  availability,
  location,
}: {
  name: string;
  email: string;
  socials: Social[];
  availability: string;
  location: SiteContent["location"];
}) {
  return (
    <footer id="contact" className="on-ink overflow-hidden bg-ink pb-6 pt-section text-paper" aria-labelledby="contact-title">
      <div data-footer-inner>
        {/* Row 1 — mono label row */}
        <div className="grid-site gap-y-2">
          <p className="mono col-span-full lg:col-span-3" data-anim="fade-up">
            (05) Contact
          </p>
          <p
            className="mono col-span-full flex items-center gap-2 lg:col-span-4 lg:col-start-9 lg:justify-end"
            data-anim="fade-up"
          >
            <span className="relative inline-flex size-2" data-status-dot aria-hidden="true">
              <span className="absolute inset-0 rounded-pill bg-signal" data-status-dot-ring />
              <span className="relative size-2 rounded-pill bg-signal" />
            </span>
            {availability}
          </p>
        </div>

        {/* Row 2 — Let's talk + magnetic button */}
        <div className="wrap-site mt-10 lg:mt-12">
          <div className="relative">
            <h2 id="contact-title" className="text-mega display-features whitespace-nowrap" data-anim="split-chars" aria-label="Let’s talk">
              <span className="block lg:inline">Let’s</span> <span className="block lg:inline">talk</span>
            </h2>
            <div className="mt-6 flex justify-end lg:absolute lg:right-0 lg:top-[72%] lg:mt-0 lg:-translate-y-1/2">
              <MagneticButton href={`mailto:${email}`} size="lg">
                Start a project <ArrowIcon direction="ne" size={11} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Row 3 — email / socials / local time / back to top */}
        <div className="wrap-site mt-16 lg:mt-24">
          <div className="grid-site !px-0 gap-y-8 border-t border-paper/20 pt-8">
            <div className="col-span-full lg:col-span-6" data-anim="fade-up">
              <a href={`mailto:${email}`} className="link-u text-[28px] font-medium leading-none tracking-[-0.03em] md:text-h2 xl:text-display-l">
                {email}
              </a>
            </div>
            <ul className="col-span-full flex flex-col md:col-span-3 lg:col-span-2 lg:col-start-7" data-anim="fade-up">
              {socials.map((s) => (
                <li key={s.label}>
                  <ExternalLink href={s.href} className="mono inline-flex min-h-8 items-center gap-1.5">
                    <span className="link-h">{s.label}</span>
                    <ArrowIcon direction="ne" size={9} />
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <div className="col-span-full flex flex-col gap-2 md:col-span-3 lg:col-span-2 lg:col-start-9" data-anim="fade-up">
              <span className="mono text-muted-dark">Local time</span>
              <Clock timeZone={location.timeZone} city={location.city} />
            </div>
            <div className="col-span-full md:col-span-2 md:justify-self-end lg:col-span-2 lg:col-start-11" data-anim="fade-up">
              <BackToTop className="mono inline-flex min-h-11 items-start gap-1.5 lg:min-h-0" />
            </div>
          </div>
        </div>

        {/* Row 4 */}
        <div className="wrap-site mt-16 flex flex-col gap-2 md:flex-row md:justify-between lg:mt-24" data-anim="fade-up">
          <p className="mono-s text-muted-dark">© 2026 {name}. Designed &amp; built in Next.js.</p>
          <p className="mono-s text-muted-dark">Index v1.0</p>
        </div>
      </div>
    </footer>
  );
}
