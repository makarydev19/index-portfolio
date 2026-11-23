export type Palette = { bg: string; fg: string; accent: string; extra: string };

export type MediaSource =
  | { kind: "svg"; art: "lumen" | "kodo" | "nocturne" | "vanta" | "portrait"; alt: string }
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster?: string; alt: string };

export type MotionHighlight = { title: string; body: string; tag: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  timeline: string;
  techLine: string;
  summary: string;
  intro: string;
  challenge: string;
  approach: string;
  highlights: MotionHighlight[];
  stack: string[];
  fonts: string;
  palette: Palette;
  cover: MediaSource;
  /** Live URL of the deployed project. "#" until it is deployed. */
  liveUrl: string;
  /** Source repository URL (optional; omit to hide the "Source" link). */
  sourceUrl?: string;
};

export type Social = { label: string; href: string };

export type NavItem = { label: string; href: string; count?: number };

export type SiteContent = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  statement: string;
  location: { city: string; country: string; timeZone: string };
  availability: string;
  email: string;
  socials: Social[];
  nav: NavItem[];
  hero: { meta: string[] };
  about: {
    headline: string;
    /** Words wrapped in *asterisks* render as <em>. */
    statement: string;
    highlights: string[];
    bio: string[];
    experience: { years: string; role: string; company: string; location: string }[];
    principles: { title: string; body: string }[];
    toolbox: { category: string; items: string[] }[];
    portrait: MediaSource;
  };
  capabilities: { title: string; body: string; list: string[] }[];
  toolbelt: string[];
  projects: Project[];
  seo: { title: string; description: string; url: string };
};
