import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageShell } from "@/components/layout/PageShell";
import { AboutHero } from "@/components/about/AboutHero";
import { Bio } from "@/components/about/Bio";
import { Experience } from "@/components/about/Experience";
import { Principles } from "@/components/about/Principles";
import { StackGrid } from "@/components/about/StackGrid";

export const metadata: Metadata = {
  title: "About",
  description: site.about.headline,
};

export default function AboutPage() {
  const { about } = site;
  return (
    <PageShell>
      <AboutHero
        headline={about.headline}
        portrait={about.portrait}
        role={site.role}
        location={`${site.location.city}, ${site.location.country}`}
      />
      <div className="flex flex-col gap-24 pb-section md:gap-40">
        <Bio paragraphs={about.bio} />
        <Experience items={about.experience} />
        <Principles items={about.principles} />
        <StackGrid groups={about.toolbox} />
      </div>
    </PageShell>
  );
}
