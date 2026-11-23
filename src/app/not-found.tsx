import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <PageShell>
      <section aria-labelledby="nf-title" className="wrap-site flex min-h-svh flex-col justify-center py-32" data-intro>
        <h1 id="nf-title" tabIndex={-1} className="text-mega display-features outline-none" data-anim="split-chars">
          404
        </h1>
        <p className="mono mt-8">This entry is not in the index.</p>
        <TransitionLink href="/" label="Index" className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-h3">
          <span className="link-u">Back to index</span>
          <ArrowIcon direction="e" size={16} />
        </TransitionLink>
      </section>
    </PageShell>
  );
}
