import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageShell } from "@/components/layout/PageShell";
import { Rule } from "@/components/ui/Rule";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ExternalLink } from "@/components/layout/ExternalLink";

export const metadata: Metadata = {
  title: "Work",
  description: "Four concept sites, each designed, built and animated end-to-end.",
};

export default function WorkPage() {
  const count = String(site.projects.length).padStart(2, "0");
  const github = site.socials.find((s) => s.label === "GitHub")?.href ?? "#";

  return (
    <PageShell>
      <section aria-labelledby="work-page-title" className="pt-30 md:pt-40" data-intro>
        <div className="wrap-site">
          <div className="grid-site !px-0 gap-y-1">
            <p className="mono col-span-2 md:col-span-2 lg:col-span-4" data-anim="fade-up">
              (02) Work
            </p>
            <p className="mono col-span-2 text-right md:col-span-4 md:text-left lg:col-span-4" data-anim="fade-up">
              Concept &amp; client-style projects
            </p>
            <p className="mono hidden text-right md:col-span-2 md:block lg:col-span-4" data-anim="fade-up">
              2026
            </p>
          </div>
          <Rule className="mt-3" />

          <h1 id="work-page-title" tabIndex={-1} className="mt-12 inline-flex items-start outline-none md:mt-20">
            <span className="text-mega display-features" data-anim="split-chars" data-stagger="0.04">
              Work
            </span>
            <span className="mono ml-2 mt-[0.4em] md:ml-3" data-work-count>
              ({count})
            </span>
          </h1>

          <div className="grid-site !px-0 mt-8 md:mt-12">
            <SplitHeading
              as="p"
              split="lines"
              className="text-body-l col-span-full md:col-span-6"
              text="Each project is a complete site — designed, built and animated end-to-end — to stress-test a different motion language on the same stack."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <section aria-label="Projects" className="wrap-site pb-section pt-16 md:pt-24">
        <WorkGrid projects={site.projects} />
        <div className="mt-24 flex justify-center md:mt-40">
          <ExternalLink href={github} className="mono inline-flex min-h-11 items-center gap-2">
            <span className="link-h">More experiments on GitHub</span>
            <ArrowIcon direction="ne" size={11} />
          </ExternalLink>
        </div>
      </section>
    </PageShell>
  );
}
