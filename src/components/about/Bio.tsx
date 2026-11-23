import { CaseSection } from "@/components/case/CaseSection";

/** Bio: label cols 1–3, paragraphs cols 5–10. ANIMATION: p[data-anim="split-lines"]. */
export function Bio({ paragraphs }: { paragraphs: string[] }) {
  return (
    <CaseSection label="Bio">
      <div className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-body-l measure" data-anim="split-lines">
            {p}
          </p>
        ))}
      </div>
    </CaseSection>
  );
}
