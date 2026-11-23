import { site } from "./site";
import type { Project } from "./types";

export function getProject(slug: string): Project | undefined {
  return site.projects.find((p) => p.slug === slug);
}

/** Next project in index order; 04 wraps to 01. */
export function getNextProject(slug: string): Project {
  const i = site.projects.findIndex((p) => p.slug === slug);
  return site.projects[(i + 1) % site.projects.length];
}

export const caseTargets = [
  { value: 95, decimals: 0, prefix: "≥", label: "Lighthouse perf (target)" },
  { value: 0, decimals: 2, label: "CLS (target)" },
  { value: 60, decimals: 0, label: "FPS animation budget" },
];
