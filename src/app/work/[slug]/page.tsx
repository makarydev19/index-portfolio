import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { caseTargets, getNextProject, getProject } from "@/content/helpers";
import { PageShell } from "@/components/layout/PageShell";
import { CaseHero } from "@/components/case/CaseHero";
import { CaseCover } from "@/components/case/CaseCover";
import { CaseSection } from "@/components/case/CaseSection";
import { MotionHighlights } from "@/components/case/MotionHighlights";
import { PaletteStrip } from "@/components/case/PaletteStrip";
import { StackList } from "@/components/case/StackList";
import { TargetStats } from "@/components/case/TargetStats";
import { NextProject } from "@/components/case/NextProject";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <PageShell>
      <article data-case={project.slug}>
        <CaseHero project={project} />
        <CaseCover project={project} />

        <div className="flex flex-col gap-24 py-section md:gap-32">
          <CaseSection label="Overview" wide>
            <p className="text-lead display-features" data-anim="split-lines">
              {project.intro}
            </p>
          </CaseSection>
          <CaseSection label="Challenge">
            <p className="text-body-l measure" data-anim="split-lines">
              {project.challenge}
            </p>
          </CaseSection>
          <CaseSection label="Approach">
            <p className="text-body-l measure" data-anim="split-lines">
              {project.approach}
            </p>
          </CaseSection>
          <MotionHighlights items={project.highlights} />
          <PaletteStrip palette={project.palette} fonts={project.fonts} />
          <StackList items={project.stack} />
          <TargetStats items={caseTargets} />
        </div>

        <NextProject project={next} />
      </article>
    </PageShell>
  );
}
