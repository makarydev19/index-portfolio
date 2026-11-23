import { site } from "@/content/site";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/home/Hero";
import { WorkIndex } from "@/components/home/WorkIndex";
import { AboutStatement } from "@/components/home/AboutStatement";
import { Capabilities } from "@/components/home/Capabilities";

export default function HomePage() {
  return (
    <PageShell>
      <Hero
        name={site.name}
        role={site.role}
        statement={site.statement}
        meta={site.hero.meta}
        location={site.location.city}
        projectCount={site.projects.length}
      />
      <WorkIndex projects={site.projects} />
      <AboutStatement statement={site.about.statement} highlights={site.about.highlights} />
      <Capabilities items={site.capabilities} toolbelt={site.toolbelt} />
    </PageShell>
  );
}
