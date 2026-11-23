import type { SiteContent } from "./types";

/**
 * The single content file. Edit name, links, copy and projects here only.
 * To swap generated cover art for a real screenshot, change a project's `cover` to
 * { kind: "image", src: "/covers/lumen.jpg", alt: "…", width: 1600, height: 1000 }.
 */
/* ──────────────────────────────────────────────────────────────────────────
 * PLACEHOLDERS — replace these before you deploy.
 * Everything marked `// PLACEHOLDER` below is fictional or a dummy value.
 * ────────────────────────────────────────────────────────────────────────── */
const NAME = "Your Name"; // PLACEHOLDER: your full name (used in the hero, header, footer, bio and SEO)
const INITIALS = "YN"; // PLACEHOLDER: shown on the generated portrait placeholder alt text
const EMAIL = "hello@yourname.dev"; // PLACEHOLDER: contact email (footer, menu, CTA)
const SITE_URL = "https://yourname.dev"; // PLACEHOLDER: production URL (metadataBase, Open Graph)

export const site = {
  name: NAME,
  initials: INITIALS,
  role: "Front-end Developer",
  tagline: "Next.js · TypeScript · Motion",
  statement: "I build motion-led websites that load fast, read clearly and move with intent.",
  // PLACEHOLDER: city / country / IANA time zone drive the live clock
  location: { city: "Lisbon", country: "PT", timeZone: "Europe/Lisbon" },
  availability: "Available for freelance — Q1 2027",
  email: EMAIL,
  // PLACEHOLDER: your real profiles (remove any you don't use)
  socials: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yourname" },
    { label: "Read.cv", href: "https://read.cv/yourname" },
    { label: "X", href: "https://x.com/yourname" },
  ],
  nav: [
    { label: "Work", href: "/work", count: 4 },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#contact" },
  ],
  // The 4th meta item is the availability status (dot + signal-text); its first word stays on mobile.
  hero: { meta: ["(01) Index", "Front-end developer", "Next.js · TypeScript · Motion", "Available Q1 2027"] },
  about: {
    headline: "Front-end developer. Motion nerd. Performance pedant.",
    statement:
      `I'm ${NAME} — a front-end developer who treats motion as information, performance as a design decision, and TypeScript as the contract between them. I turn ambitious design into interfaces that feel *inevitable*: fast, accessible, and precise to the last frame.`,
    highlights: ["motion", "performance", "TypeScript"],
    bio: [
      `I'm ${NAME}, a front-end developer with six years of experience building websites and products for studios, startups and brands. I specialise in Next.js, TypeScript and interaction design — the layer where design intent either survives contact with the browser or quietly dies.`,
      "I work best embedded with designers: prototyping motion early, sweating the details of easing and timing, and shipping code that the next developer will thank me for. Outside of client work I build concept sites — like the four on this index — to push what the stack can do.",
    ],
    experience: [
      { years: "2024 — Now", role: "Independent front-end developer", company: "Freelance", location: "Remote" },
      { years: "2021 — 2024", role: "Senior front-end developer", company: "Studio Halvorsen", location: "Lisbon" },
      { years: "2019 — 2021", role: "Front-end developer", company: "Parallel Field", location: "Porto" },
    ],
    principles: [
      {
        title: "Motion with a reason",
        body: "Every animation answers a question: where did this come from, what changed, where can I go next. If it doesn't, it goes.",
      },
      {
        title: "Performance is design",
        body: "I set budgets before the first component. Transform and opacity only, lazy everything, zero layout shift.",
      },
      {
        title: "Accessible by default",
        body: "Semantic HTML, visible focus, full keyboard paths and a real reduced-motion experience — not a disabled one.",
      },
      {
        title: "Typed, tested, handed over",
        body: "Strict TypeScript, small components and content in one file, so the site outlives the launch week.",
      },
    ],
    toolbox: [
      { category: "Language", items: ["TypeScript", "JavaScript", "HTML", "CSS"] },
      { category: "Framework", items: ["Next.js", "React", "Astro"] },
      { category: "Motion", items: ["GSAP", "Framer Motion", "Lenis", "Rive"] },
      { category: "Tooling", items: ["Tailwind CSS", "Vite", "Playwright", "Figma"] },
    ],
    portrait: {
      kind: "svg",
      art: "portrait",
      alt: `Placeholder portrait: halftone monogram ${INITIALS}. Replace with a photo.`, // PLACEHOLDER
    },
  },
  capabilities: [
    {
      title: "Build",
      body: "Production Next.js apps with strict TypeScript, server components and a component system that scales past the launch.",
      list: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Testing & CI"],
    },
    {
      title: "Motion",
      body: "Scroll-driven storytelling, page transitions and micro-interactions that run at 60fps and respect reduced-motion.",
      list: ["GSAP & ScrollTrigger", "Framer Motion", "Lenis", "SVG animation"],
    },
    {
      title: "Craft",
      body: "Performance budgets, semantic HTML and accessibility audits, treated as features, not tickets.",
      list: ["Core Web Vitals", "WCAG 2.2 AA", "Design systems", "Figma handoff"],
    },
  ],
  toolbelt: ["Next.js", "TypeScript", "React", "GSAP", "Framer Motion", "Lenis", "Tailwind", "Vercel"],
  projects: [
    {
      slug: "lumen-atelier",
      index: "01",
      title: "Lumen Atelier",
      category: "Architecture studio",
      year: "2026",
      timeline: "3 weeks · 2026",
      techLine: "GSAP · ScrollTrigger · SplitText",
      palette: { bg: "#EFE9E1", fg: "#2B2A28", accent: "#C2603E", extra: "#D9CFC1" },
      cover: {
        kind: "svg",
        art: "lumen",
        alt: "Abstract cover for Lumen Atelier: charcoal arched windows framing a terracotta sun on warm off-white.",
      },
      liveUrl: "#", // PLACEHOLDER: live URL — fill in after this project is deployed
      sourceUrl: "#", // PLACEHOLDER: repository URL (or remove the field to hide "Source")
      summary: "An editorial site for an interiors studio, paced like a printed monograph.",
      intro:
        "Lumen Atelier is a fictional architecture and interiors studio whose work is about light, proportion and restraint. The site had to feel like turning the pages of a monograph — calm, warm and unhurried — while still showing off a dense project archive.",
      challenge:
        "Luxury studios live on imagery, but heavy image galleries kill performance and feel generic. The brief was to create a sense of space and slowness without making the site feel sluggish, and to let the type carry as much atmosphere as the photography.",
      approach:
        "I paired a high-contrast serif with a neutral grotesk on a warm off-white, and let terracotta mark only what matters. Every image enters through a growing clip-path \"window\", echoing the studio's architectural framing. The project archive runs on a pinned horizontal track, so the vertical page stays short and the gallery feels like walking through a corridor.",
      highlights: [
        {
          title: "Preloader → curtain",
          body: "A 0–100 counter hands off to a split curtain that reveals the hero in one continuous gesture.",
          tag: "GSAP timeline",
        },
        {
          title: "Window reveals",
          body: "Images grow from a narrow inset clip-path to full frame as they scroll into view, with inner parallax for depth.",
          tag: "ScrollTrigger",
        },
        {
          title: "Scrubbed philosophy",
          body: "The studio's statement lights up word by word, tied to scroll position.",
          tag: "SplitText",
        },
        {
          title: "Horizontal gallery",
          body: "A pinned track translates projects sideways, with a magnetic cursor that turns into \"View\".",
          tag: "Pin + scrub",
        },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "ScrollTrigger", "SplitText", "Lenis"],
      fonts: "Serif display + grotesk body",
    },
    {
      slug: "kodo-coffee",
      index: "02",
      title: "Kōdo Coffee",
      category: "Coffee e-commerce",
      year: "2026",
      timeline: "3 weeks · 2026",
      techLine: "GSAP · Framer Motion · SVG",
      palette: { bg: "#2A1A12", fg: "#F3E6D0", accent: "#FF5A1F", extra: "#5A3A28" },
      cover: {
        kind: "svg",
        art: "kodo",
        alt: "Abstract cover for Kōdo Coffee: a cream coffee bag with orange steam on espresso brown.",
      },
      liveUrl: "#", // PLACEHOLDER: live URL — fill in after this project is deployed
      sourceUrl: "#", // PLACEHOLDER: repository URL (or remove the field to hide "Source")
      summary: "A playful product story for a specialty roaster, from farm to cart.",
      intro:
        "Kōdo is a fictional specialty coffee roaster. The goal was a landing page that sells a bag of beans the way a good barista does — with origin stories, flavour and a little theatre — and then gets out of the way at checkout.",
      challenge:
        "Product storytelling pages often bury the buy button under scroll theatrics. Kōdo needed narrative chapters for three origins and a real shopping flow — roast selection, product grid, cart — without the two fighting each other.",
      approach:
        "A single SVG coffee bag acts as the protagonist: it rotates and rescales between pinned origin chapters while a route path draws across an origin map. Commerce moments switch to Framer Motion springs — chips, add-to-cart and a sliding cart drawer — so interactions feel tactile and instant.",
      highlights: [
        {
          title: "Pinned origin chapters",
          body: "The bag morphs position, scale and rotation across Ethiopia, Colombia and Sumatra.",
          tag: "ScrollTrigger",
        },
        {
          title: "Route drawing",
          body: "An SVG path draws the bean's journey across the map, synced to scroll.",
          tag: "SVG stroke",
        },
        {
          title: "Floating flavour notes",
          body: "Note chips drift with physics and react to the cursor.",
          tag: "Framer Motion",
        },
        {
          title: "Cart micro-interactions",
          body: "Spring-loaded add-to-cart and a drawer with staggered line items.",
          tag: "Springs",
        },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "ScrollTrigger", "Framer Motion", "Lenis"],
      fonts: "Chunky display + rounded sans",
    },
    {
      slug: "nocturne",
      index: "03",
      title: "NOCTURNE",
      category: "Music festival",
      year: "2026",
      timeline: "2 weeks · 2026",
      techLine: "Framer Motion · GSAP · Canvas-free SVG",
      palette: { bg: "#07070A", fg: "#C6FF2E", accent: "#6B2BFF", extra: "#1A1A22" },
      cover: {
        kind: "svg",
        art: "nocturne",
        alt: "Abstract cover for NOCTURNE: acid-lime equaliser bars glitching over an ultraviolet glow.",
      },
      liveUrl: "#", // PLACEHOLDER: live URL — fill in after this project is deployed
      sourceUrl: "#", // PLACEHOLDER: repository URL (or remove the field to hide "Source")
      summary: "A loud, kinetic site for a night-time electronic music festival.",
      intro:
        "NOCTURNE is a fictional three-night electronic festival. The site needed to feel like the first ten seconds of a set — loud, fast, slightly dangerous — while still selling tickets and answering practical questions.",
      challenge:
        "Festival sites must hype and inform at the same time. The risk was motion so aggressive it hurts readability and accessibility, especially for a lineup that people actually need to scan.",
      approach:
        "Motion is tied to the user's energy: marquees skew with scroll velocity, the hero text scrambles in like a signal locking on, and hovering an artist spawns a generative poster that follows the cursor. Underneath, the lineup is a plain, semantic list, and every effect has a calm reduced-motion state.",
      highlights: [
        {
          title: "Scramble hero",
          body: "Headline glyphs resolve from noise into the festival name, then a live countdown takes over.",
          tag: "Text scramble",
        },
        {
          title: "Velocity marquees",
          body: "Infinite marquees speed up and skew based on scroll velocity.",
          tag: "ScrollTrigger",
        },
        {
          title: "Cursor posters",
          body: "Each artist row spawns a unique generative SVG poster that trails the pointer.",
          tag: "Framer Motion",
        },
        {
          title: "Route transitions",
          body: "Lineup and tickets pages swap with AnimatePresence wipes.",
          tag: "AnimatePresence",
        },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "ScrollTrigger", "Lenis"],
      fonts: "Condensed display + mono",
    },
    {
      slug: "vanta",
      index: "04",
      title: "VANTA",
      category: "Hypercar launch",
      year: "2026",
      timeline: "3 weeks · 2026",
      techLine: "GSAP · ScrollTrigger · Layout animations",
      // fg is the silver label colour (DESIGN.md §7: use silver for the curtain label).
      palette: { bg: "#15171A", fg: "#BFC5CC", accent: "#3DE7FF", extra: "#2A2E33" },
      cover: {
        kind: "svg",
        art: "vanta",
        alt: "Abstract cover for VANTA: a silver hypercar silhouette crossed by a cyan light sweep on graphite.",
      },
      liveUrl: "#", // PLACEHOLDER: live URL — fill in after this project is deployed
      sourceUrl: "#", // PLACEHOLDER: repository URL (or remove the field to hide "Source")
      summary: "A cinematic launch for an electric hypercar concept, engineered in SVG.",
      intro:
        "VANTA is a fictional electric hypercar concept. Without photography or 3D files, the challenge was to make a car launch feel cinematic using only vector shapes, light and timing.",
      challenge:
        "Automotive launches usually lean on video and WebGL. Here every visual had to be built from SVG and CSS, stay crisp at any size, and still deliver the slow, expensive reveal a hypercar deserves.",
      approach:
        "I treated the page like a film: a scroll-scrubbed light sweep reveals the car silhouette, spec numbers count up as they enter, and HUD lines draw in around the interior. The configurator uses Framer Motion layout animations so colour swatches and the car body transition as one system.",
      highlights: [
        {
          title: "Light-sweep reveal",
          body: "A gradient sweep scrubs across the silhouette to unveil the car.",
          tag: "Scrub",
        },
        {
          title: "Counting specs",
          body: "0–100 km/h, range and power count up with tabular numerals.",
          tag: "GSAP",
        },
        {
          title: "HUD draw-in",
          body: "Interface lines and labels draw around the cabin as you scroll.",
          tag: "SVG stroke",
        },
        {
          title: "Configurator",
          body: "Swatches and body colour animate with shared layout transitions.",
          tag: "Layout animation",
        },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "ScrollTrigger", "Framer Motion", "Lenis"],
      fonts: "Wide tech sans + mono labels",
    },
  ],
  seo: {
    title: `${NAME} — Front-end Developer`,
    description: `${NAME} is a front-end developer building motion-led websites with Next.js, TypeScript and GSAP.`,
    url: SITE_URL,
  },
} satisfies SiteContent;
