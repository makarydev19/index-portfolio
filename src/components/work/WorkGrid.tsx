import type { Project } from "@/content/types";
import { WorkCard } from "./WorkCard";

/** 2-col staggered grid (even cards offset 160px on desktop); 1 col on mobile. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid-site !px-0 gap-y-16 md:gap-y-24">
      {projects.map((p, i) => (
        <li key={p.slug} className="col-span-full md:col-span-4 lg:col-span-6">
          <WorkCard project={p} offset={i % 2 === 1} />
        </li>
      ))}
    </ul>
  );
}
