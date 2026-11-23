import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Footer } from "./Footer";

/** <main id="main"> + shared footer. Every page renders inside this. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer
        name={site.name}
        email={site.email}
        socials={site.socials}
        availability={site.availability}
        location={site.location}
      />
    </>
  );
}
