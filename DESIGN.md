# 05 — INDEX · Design Spec

The developer's own portfolio hub. It is minimal Swiss: monochrome, one signal red, large grotesk type and mono details.
This file is the single source of truth for the CODE and ANIMATION agents. Every decision below is final. Where a value is given, use that value.

---

## 1. Concept, audience, tone

**Concept.** *"An index, not a showreel."* The site is set out like a Swiss reference catalogue: numbered entries, hairline rules, mono metadata and one oversized grotesk name. The motion is exact and mechanical. Text rises out of masks, curtains drop with a weighted ease, and a cover image trails the cursor across the list like a loupe. The restraint is the point. The four case studies (01–04) carry all the colour, and the site around them stays paper, ink and one red signal.

**Mood words:** precise, editorial, quiet confidence, engineered, warm paper (not clinical white).

**Audience.**
- *Recruiters / hiring managers* (scan for 30–60 s): they need the name, the role, the stack, availability and contact within the first viewport and the footer.
- *Creative studios / agencies* (judge craft): they will hover, scroll, resize and toggle reduced motion. Motion quality, performance and the case-study depth sell the work.

**Tone of voice.** First person, short declarative sentences, concrete nouns. No buzzwords ("passionate", "ninja", "pixel-perfect"), no exclamation marks. Talk about outcomes and technique ("scrubbed", "pinned", "60fps"). Mono labels are UPPERCASE. Headings are sentence case. American English.

---

## 2. Design tokens

Define all tokens as CSS custom properties in `src/app/globals.css` inside Tailwind v4 `@theme` so they generate utilities (`bg-paper`, `text-ink`, `font-display`, `ease-out-expo`, etc.).

### 2.1 Colour (60 / 30 / 10)

| Token | Hex | Role | Share |
|---|---|---|---|
| `--color-paper` | `#F2F1ED` | Page background, the curtain label on ink | **60%** |
| `--color-paper-2` | `#E4E2DC` | Hover row fill, card back, skeleton behind covers | (within 60) |
| `--color-ink` | `#0D0D0D` | Primary text, rules, curtain, footer and menu background | **30%** |
| `--color-ink-2` | `#161616` | Raised surfaces on ink (menu link hover band) | (within 30) |
| `--color-muted` | `#5E5D59` | Secondary text and mono meta on paper | (within 30) |
| `--color-muted-dark` | `#8C8A85` | Secondary text on ink | (within 30) |
| `--color-signal` | `#FF3B14` | Signal red: status dot, active number, magnetic button, focus ring, key highlight words, preloader bar | **10%** |
| `--color-signal-text` | `#C4240A` | Red when used as **small text on paper** (links in body copy, "Available" label) | — |
| `--color-rule` | `#0D0D0D` at 100% (1px) | Hairlines. Never use grey rules. Swiss rigour means a black 1px line. | — |

The red is a signal and never a fill colour. The only large red surfaces are the magnetic button (220px circle) and the preloader progress bar. Never put red on a background larger than that.

**Case study palettes.** These appear only inside covers, palette strips and the case-study curtain.

| Project | bg | fg | accent | extra |
|---|---|---|---|---|
| 01 Lumen Atelier | `#EFE9E1` | `#2B2A28` | `#C2603E` (terracotta) | `#D9CFC1` (sand) |
| 02 Kōdo Coffee | `#2A1A12` | `#F3E6D0` | `#FF5A1F` (electric orange) | `#5A3A28` (roast) |
| 03 NOCTURNE | `#07070A` | `#C6FF2E` (acid lime) | `#6B2BFF` (ultraviolet) | `#1A1A22` |
| 04 VANTA | `#15171A` | `#BFC5CC` (silver) | `#3DE7FF` (cold cyan) | `#2A2E33` (graphite light) |

### 2.2 Typography

Load with `next/font/google` in `src/app/layout.tsx`, exposed as CSS variables:

```ts
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
const display = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
```

- **Inter Tight** handles display and body. Use 500 for display, 400 for body and 600 only for the wordmark.
- **JetBrains Mono** handles labels, numbers, meta, the clock and the preloader counter. Use 400 for most mono text and 500 for the counter. Always set `font-variant-numeric: tabular-nums` on mono numbers.

**Fluid type scale.** Values are checked at 390 / 1440 widths.

| Token | clamp() | ≈390 | ≈1440 | Weight | Line-height | Tracking | Font |
|---|---|---|---|---|---|---|---|
| `--text-mega` | `clamp(4.5rem, 1rem + 15vw, 17rem)` | 74px | 232px | 500 | 0.82 | -0.055em | display |
| `--text-display-xl` | `clamp(3rem, 1.2rem + 7vw, 8.5rem)` | 48px | 120px | 500 | 0.9 | -0.045em | display |
| `--text-display-l` | `clamp(2.25rem, 1.1rem + 3.6vw, 4.75rem)` | 36px | 69px | 500 | 1.0 | -0.035em | display |
| `--text-h2` | `clamp(1.75rem, 1.2rem + 1.8vw, 3rem)` | 28px | 45px | 500 | 1.05 | -0.025em | display |
| `--text-h3` | `clamp(1.25rem, 1.05rem + 0.6vw, 1.75rem)` | 20px | 25px | 500 | 1.2 | -0.015em | display |
| `--text-body-l` | `clamp(1.125rem, 1rem + 0.35vw, 1.375rem)` | 18px | 21px | 400 | 1.45 | -0.01em | display |
| `--text-body` | `clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)` | 16px | 17px | 400 | 1.55 | 0 | display |
| `--text-mono` | `0.8125rem` | 13px | 13px | 400 | 1.4 | 0.06em, UPPERCASE | mono |
| `--text-mono-s` | `0.75rem` | 12px | 12px | 400 | 1.4 | 0.08em, UPPERCASE | mono |

Rules: body copy max width is `60ch`. Never set display sizes in mono. Set `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs. Use `font-feature-settings: "ss01", "cv11"` on Inter Tight display for single-storey a and straight-sided digits.

### 2.3 Spacing (4px base)

`--space-1: 4px` · `2: 8px` · `3: 12px` · `4: 16px` · `5: 20px` · `6: 24px` · `8: 32px` · `10: 40px` · `12: 48px` · `16: 64px` · `24: 96px` · `32: 128px` · `48: 192px`

- Section vertical padding: `--section-y: clamp(96px, 6rem + 6vw, 192px)`.
- Gap between mono label row and heading: 24px (mobile 16px).
- Row height of the work index: 120px desktop / auto mobile, with padding 20px.

### 2.4 Grid

| Breakpoint | Width range | Columns | Gutter | Side margin | Max content width |
|---|---|---|---|---|---|
| `base` (mobile) | 0–767 | 4 | 16px | 16px | 100% |
| `md` (tablet) | 768–1023 | 8 | 20px | 32px | 100% |
| `lg` | 1024–1439 | 12 | 24px | 40px | 100% |
| `xl` | ≥1440 | 12 | 24px | 48px | 1680px (centred, then margins grow) |

Implement as a `.grid-site` utility: `display:grid; grid-template-columns: repeat(var(--cols), minmax(0,1fr)); column-gap: var(--gutter); padding-inline: var(--margin); max-width: calc(1680px + 2*var(--margin)); margin-inline:auto`. The mega name and the footer "Let's talk" break out to full viewport width minus margins.

A dev-only grid overlay toggles with the `G` key, rendering 12 red 6%-opacity columns. It is only included when `process.env.NODE_ENV === "development"`.

### 2.5 Radii, borders, elevation

- `--radius-none: 0` is the default for everything: cards, covers, inputs, menu.
- `--radius-pill: 999px` is for tags/chips, the follower label pill and the magnetic button (a circle).
- Borders are a 1px ink hairline. No shadows anywhere. Depth comes from overlap, scale and the curtain.
- A grain overlay sits fixed over the whole page: an SVG `feTurbulence` noise at 5% opacity with `mix-blend-mode: multiply` and `pointer-events:none`. It is static (it does not animate).

### 2.6 Motion tokens

| Token | CSS cubic-bezier | GSAP equivalent | Use |
|---|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | `"expo.out"` | Reveals, text rising, hover moves |
| `--ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | `"power4.inOut"` | Curtains, menu panel, preloader exit |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | `"power3.out"` | Small UI (underline, opacity), magnetic follow |
| `--ease-in-quart` | `cubic-bezier(0.5, 0, 0.75, 0)` | `"power3.in"` | Exits of small elements |
| (spring) | — | `"elastic.out(1, 0.4)"` | Magnetic button release only |

| Duration token | ms | Use |
|---|---|---|
| `--dur-xs` | 150 | Colour/opacity on hover, focus |
| `--dur-s` | 300 | Row dimming, underline, icon rotate |
| `--dur-m` | 600 | Hover shifts, follower clip wipe, small reveals |
| `--dur-l` | 900 | Line reveals, curtain movement (700–800 actual) |
| `--dur-xl` | 1200 | Hero char reveal, cover clip reveals |

Stagger tokens: `chars: 0.03s`, `words: 0.04s`, `lines: 0.08s`, `items: 0.08s`.
Export identical values from `src/animations/easings.ts` as both CSS strings and GSAP names so the two never drift.

---

## 3. Sitemap, global chrome, page layouts and copy

```
/                     Home (Index)
/work                 Work overview (grid of 4)
/work/lumen-atelier   Case 01
/work/kodo-coffee     Case 02
/work/nocturne        Case 03
/work/vanta           Case 04
/about                About
(404)                 not-found
```

Metadata: title template `"%s — Your Name"`, default title `"Your Name — Front-end Developer"`, description `"Your Name is a front-end developer building motion-led websites with Next.js, TypeScript and GSAP."` The case pages use `generateMetadata` from content. `generateStaticParams` covers all 4 slugs, so every route is static.

### 3.1 Global chrome

#### Header (`<Header>`)
- Position is `fixed`, top 0, full width, height 72px desktop / 60px mobile, `z-50`. Text colour is `paper` with `mix-blend-mode: difference`, so it reads as ink on paper and paper on ink sections. The header has no background.
- **Desktop (1440):** use the 12-col grid.
  - cols 1–3: wordmark `Your Name` (Inter Tight 600, 17px, -0.02em) followed by a mono `©2026`. It links to `/`.
  - cols 5–7: `<Clock>` showing `LISBON 14:32:07 GMT+0`. Mono 13px, with the colons blinking (opacity 1↔0.3, 1s steps).
  - cols 9–12, right aligned: nav `Work (04)` · `About` · `Contact`. Mono 13px, with a 24px gap. The active route gets a 6px red square before its label. `Contact` scrolls to `#contact` (Lenis) on the current page.
- **Mobile (390):** wordmark left and a `Menu` text button right (mono 13px, min 44×44 hit area). The clock is hidden here and shown in the menu and footer.
- The header hides on scroll down (yPercent 0→-100) and shows on scroll up (see Motion §5.9).

#### Mobile menu (`<MobileMenu>`)
- Full-screen `ink` panel, `role="dialog" aria-modal="true"`. It has a focus trap, and Esc closes it.
- Top row: wordmark and `Close`. Links in `display-xl` paper, each preceded by a mono index `01` `02` `03`: `Index`, `Work`, `About`, `Contact`.
- Bottom block: clock, email, then socials as a mono list.

#### Footer / contact (`<Footer id="contact">`), shared by all pages
- Background is `ink` and text is `paper`. Padding-top is `--section-y` and padding-bottom is 24px.
- **Desktop:**
  - Row 1 (mono label row): `(05) CONTACT` at cols 1–3 and `AVAILABLE FOR FREELANCE — Q1 2027`, with a pulsing red dot, at cols 9–12.
  - Row 2: giant `Let's talk` in `--text-mega`, spanning full width and left aligned. The **MagneticButton** (220px red circle, label `Start a project ↗`, ink text) overlaps the right end of the word, vertically centred on the baseline of "talk", at cols 10–12.
  - Row 3, 96px below with a top hairline in paper at 20% opacity:
    - cols 1–4: email `hello@yourname.dev` in display-l with an animated underline.
    - cols 6–7: mono list `GITHUB`, `LINKEDIN`, `READ.CV`, `X`.
    - cols 9–10: `LOCAL TIME` + clock.
    - cols 11–12: `BACK TO TOP ↑`.
  - Row 4: mono-s `© 2026 YOUR NAME. DESIGNED & BUILT IN NEXT.JS.` on the left and `INDEX V1.0` on the right.
- **Mobile:** `Let's talk` wraps to 2 lines (`Let's` / `talk`). The magnetic button is 160px and sits right aligned below the word. The email moves to display-l at 28px. The other rows stack in a single column with a 32px gap. Magnetism is disabled on touch, so the button behaves as a normal tap target.

#### Section label pattern (`<SectionLabel index="02" title="Selected work" meta="2025—2026" />`)
A mono row with a 1px ink rule above it, laid out as `(02)` / `SELECTED WORK` / meta right aligned. It is used at the top of every section. That gives the site its "index" rhythm.

#### Skip link
`Skip to content` sits first in the DOM. It is visible on focus at top left as a paper chip with a red focus ring.

---

### 3.2 Home `/`

#### Section 01 — Hero (`<Hero>`) — height `100svh`, min 640px
**Desktop 1440:**
- Top offset is 72px (the header). Row A is a mono meta row at cols 1–12, divided into 4 groups of 3 cols:
  - `(01) INDEX`
  - `FRONT-END DEVELOPER`
  - `NEXT.JS · TYPESCRIPT · MOTION`
  - `● AVAILABLE Q1 2027`, with the dot in `signal` and the text in `signal-text`. Right aligned.
- A 1px rule spans full width under row A (`data-anim="rule"`).
- Row B, the centre of the viewport: **`Your Name`** in `--text-mega` across full width, on a single line at 1440. Left aligned on margin, with `data-anim="split-chars"`.
- Row C, pinned near the bottom (bottom: 40px):
  - cols 1–6: statement in `--text-display-l`, max 2–3 lines:
    > **I build motion-led websites that load fast, read clearly and move with intent.**
  - cols 9–12: mono stack of 3 lines, right aligned:
    ```
    BASED IN LISBON — WORKING WORLDWIDE
    4 CASE STUDIES BELOW
    SCROLL ↓
    ```
  - `SCROLL ↓` has a looping 6px down bob (see motion).

**Mobile 390:**
- Meta row collapses to 2 lines: `(01) INDEX` left with `● AVAILABLE` right, then `FRONT-END DEVELOPER` on the line below.
- `Your Name` wraps to 2 lines (`Your` / `Name`) at ~74px, sitting about 30% down the viewport.
- The statement goes in display-l (36px) below the name with 32px top spacing. The mono stack goes below it with only the `SCROLL ↓` line, left aligned.

Visuals: no image. Type and rules only. The grain overlay is visible on paper.

#### Section 02 — Selected work (`<WorkIndex>` + `<HoverPreview>`)
- `SectionLabel index="02" title="SELECTED WORK" meta="(04) PROJECTS — 2026"`.
- Intro line at cols 1–6, body-l, muted:
  > Four concept sites, each built end-to-end to explore a different motion system — from editorial calm to festival noise.
- **The index table** is a `<ol>` of 4 rows. Each row is a full-width link (`TransitionLink` to `/work/[slug]`) with a 1px ink rule on top. The last row also gets a bottom rule.

  **Desktop row layout (12 cols, row height 120px, content vertically centred):**
  | cols | content | style |
  |---|---|---|
  | 1 | `01` | mono 13px, muted; turns `signal` on hover/focus |
  | 2–7 | `Lumen Atelier` | `--text-display-l` (69px) |
  | 8–9 | `Architecture studio` | mono 13px |
  | 10–11 | `GSAP · Lenis · SplitText` | mono 13px, muted |
  | 12 | `2026 ↗` | mono 13px, right aligned; the arrow rotates on hover |

  Row data (from content):
  | # | Title | Category | Tech line | Year |
  |---|---|---|---|---|
  | 01 | Lumen Atelier | Architecture studio | GSAP · ScrollTrigger · SplitText | 2026 |
  | 02 | Kōdo Coffee | Coffee e-commerce | GSAP · Framer Motion · SVG | 2026 |
  | 03 | NOCTURNE | Music festival | Framer Motion · GSAP · Canvas-free SVG | 2026 |
  | 04 | VANTA | Hypercar launch | GSAP · ScrollTrigger · Layout animations | 2026 |

- **HoverPreview** (desktop, pointer:fine only): a fixed 16:10 frame, width `clamp(280px, 26vw, 420px)`. It follows the cursor, offset so the frame's top-left sits 24px right of and 24px below the pointer. It holds all 4 covers stacked. A label pill hangs off the bottom-left corner: `VIEW CASE →`, ink bg, paper mono 12px, pill radius.
- Below the list, a right-aligned link: `All work (04) →` linking to `/work`.

**Mobile 390:** each row becomes a stacked card:
- the cover inline at full width, 16:10;
- below it, `01` and `2026` mono on one line (space-between);
- the title in display-l (36px);
- the category · tech in mono-s muted.

Use 48px between rows and a 1px rule above each card. There is no hover preview on mobile.

#### Section 03 — About statement (`<AboutStatement>`), the sticky scrub highlight
- The section height is `250vh` desktop / `200vh` mobile. The inner `.sticky` container is `top: 0; height: 100svh`, with content vertically centred.
- `SectionLabel index="03" title="ABOUT" meta="EST. 2019"` sits at the top of the sticky frame.
- The statement is at cols 1–11, `--text-display-l` desktop (69px) / 32px mobile, with each word wrapped in a span (`data-anim="scrub-words"`):
  > I'm Your Name — a front-end developer who treats **motion** as information, **performance** as a design decision, and **TypeScript** as the contract between them. I turn ambitious design into interfaces that feel *inevitable*: fast, accessible, and precise to the last frame.

  The highlight words `motion`, `performance` and `TypeScript` end in `signal` instead of ink (`data-highlight`).
- Below the statement at cols 1–4 is a `MagneticButton`-styled *secondary* link (not magnetic, outlined pill 1px ink, 48px tall): `More about me →` linking to `/about`.

#### Section 04 — Capabilities (`<Capabilities>`)
- `SectionLabel index="04" title="CAPABILITIES" meta="WHAT I DO"`.
- **Desktop:** 3 columns of 4 grid cols each. Each column has a mono index, an h3 title, a body paragraph (muted, 3 lines max) and a mono list with hairline separators.

  | Column | Title | Body | List |
  |---|---|---|---|
  | 01 | Build | Production Next.js apps with strict TypeScript, server components and a component system that scales past the launch. | Next.js App Router · TypeScript · Tailwind CSS · Testing & CI |
  | 02 | Motion | Scroll-driven storytelling, page transitions and micro-interactions that run at 60fps and respect reduced-motion. | GSAP & ScrollTrigger · Framer Motion · Lenis · SVG animation |
  | 03 | Craft | Performance budgets, semantic HTML and accessibility audits, treated as features, not tickets. | Core Web Vitals · WCAG 2.2 AA · Design systems · Figma handoff |

- Then a full-width "toolbelt" line in display-l, centred, muted with ink on hover per word:
  > Next.js / TypeScript / React / GSAP / Framer Motion / Lenis / Tailwind / Vercel
- **Mobile:** columns stack, each with a top rule. The toolbelt wraps naturally and is left aligned.

#### Section 05 — Footer / contact (shared, see 3.1)

---

### 3.3 Work `/work`

- **Hero** (height auto, padding-top 160px desktop / 120px mobile):
  - Mono row: `(02) WORK` · `CONCEPT & CLIENT-STYLE PROJECTS` · `2026`.
  - H1 `Work` in `--text-mega`, with a superscript-style mono `(04)` set top-right of the word at 13px.
  - A body-l intro at cols 1–6:
    > Each project is a complete site — designed, built and animated end-to-end — to stress-test a different motion language on the same stack.
- **Grid** (`<WorkGrid>`): 2 columns desktop (each 6 cols), with a 24px column gap and a 96px row gap. Even cards (02, 04) are offset down by 160px for a staggered Swiss layout. On mobile it is 1 column with a 64px row gap and no offset.
- **WorkCard:**
  - The cover is 4:5 desktop / 16:10 mobile. It is overflow hidden with a paper-2 placeholder bg.
  - Below it, a meta row: `01` · `Architecture studio` · `2026 ↗` in mono, space-between.
  - The title in h2 (45px).
  - A one-line summary in body, muted (the `summary` field).
- Below the grid, a centred mono link: `MORE EXPERIMENTS ON GITHUB ↗`.

### 3.4 Case study `/work/[slug]`

Use the same template for all 4. Order of sections:

1. **CaseHero:** mono row `(0n) CASE STUDY` · `{category}` · `{year}`. Title in `--text-mega` (NOCTURNE/VANTA stay uppercase, because the content stores the exact casing). Below the title is a 4-col meta grid (desktop at cols 1–3, 4–6, 7–9, 10–12; mobile 2×2). Each cell has a mono label and body value:
   - `ROLE` → `Concept, design & front-end`
   - `TIMELINE` → `{timeline}`
   - `STACK` → `{stack.join(", ")}`
   - `LINKS` → `Live site ↗` / `Source ↗` (underlined links)
2. **CaseCover:** the cover goes full-bleed (100vw, minus 0 margins), 16:9 desktop / 4:5 mobile, with internal layers carrying `data-depth`.
3. **Overview:** two columns. At cols 1–3 a mono label `OVERVIEW`. At cols 5–11 the `intro` paragraph at `--text-lead: clamp(1.75rem, 1.1rem + 2.4vw, 3.25rem)` (28px → 52px), weight 500, line-height 1.15, tracking -0.02em.
4. **Challenge / Approach:** two `CaseSection` blocks. Each puts a mono label at cols 1–3 and the body-l paragraph(s) at cols 5–10.
5. **Motion highlights** (`<MotionHighlights>`): label `(MOTION) HIGHLIGHTS`. A numbered list of 4 rows, separated by hairlines. Each row has the number `01–04` mono, a title in h3 at cols 2–6, a body description at cols 7–11 and a technique tag pill at col 12 (e.g. `SCROLLTRIGGER`).
6. **Palette & type** (`<PaletteStrip>`): 4 swatches in a row, full width, each 240px tall desktop / 120px mobile, filled with the site's palette. Each swatch shows its mono hex, bottom-left, in a contrast-safe colour. Next to it is a mono line naming that site's fonts.
7. **Stack** (`<StackList>`): pill tags (1px ink border, 36px tall, mono 12px).
8. **Targets** row: three big stats in display-xl with mono labels: `≥95` LIGHTHOUSE PERF (target), `0.00` CLS (target), `60` FPS ANIMATION BUDGET. Under the row, add a mono-s note: `TARGETS SET AT THE START OF THE BUILD.`
9. **NextProject:** a full-width link block, height 60vh. Mono `NEXT CASE (0n+1)`, the title in `--text-mega` and a small cover peeking at the right (cols 9–12, 16:10). Case 04 wraps to 01.
10. Footer.

#### Case study copy (final)

**01 — Lumen Atelier** · slug `lumen-atelier` · category `Architecture studio` · timeline `3 weeks · 2026`
- summary: `An editorial site for an interiors studio, paced like a printed monograph.`
- intro: `Lumen Atelier is a fictional architecture and interiors studio whose work is about light, proportion and restraint. The site had to feel like turning the pages of a monograph — calm, warm and unhurried — while still showing off a dense project archive.`
- challenge: `Luxury studios live on imagery, but heavy image galleries kill performance and feel generic. The brief was to create a sense of space and slowness without making the site feel sluggish, and to let the type carry as much atmosphere as the photography.`
- approach: `I paired a high-contrast serif with a neutral grotesk on a warm off-white, and let terracotta mark only what matters. Every image enters through a growing clip-path "window", echoing the studio's architectural framing. The project archive runs on a pinned horizontal track, so the vertical page stays short and the gallery feels like walking through a corridor.`
- motion highlights:
  1. `Preloader → curtain` — A 0–100 counter hands off to a split curtain that reveals the hero in one continuous gesture. Tag `GSAP TIMELINE`.
  2. `Window reveals` — Images grow from a narrow inset clip-path to full frame as they scroll into view, with inner parallax for depth. Tag `SCROLLTRIGGER`.
  3. `Scrubbed philosophy` — The studio's statement lights up word by word, tied to scroll position. Tag `SPLITTEXT`.
  4. `Horizontal gallery` — A pinned track translates projects sideways, with a magnetic cursor that turns into "View". Tag `PIN + SCRUB`.
- stack: `Next.js`, `TypeScript`, `Tailwind CSS`, `GSAP`, `ScrollTrigger`, `SplitText`, `Lenis`
- fonts line: `SERIF DISPLAY + GROTESK BODY`

**02 — Kōdo Coffee** · slug `kodo-coffee` · category `Coffee e-commerce` · timeline `3 weeks · 2026`
- summary: `A playful product story for a specialty roaster, from farm to cart.`
- intro: `Kōdo is a fictional specialty coffee roaster. The goal was a landing page that sells a bag of beans the way a good barista does — with origin stories, flavour and a little theatre — and then gets out of the way at checkout.`
- challenge: `Product storytelling pages often bury the buy button under scroll theatrics. Kōdo needed narrative chapters for three origins and a real shopping flow — roast selection, product grid, cart — without the two fighting each other.`
- approach: `A single SVG coffee bag acts as the protagonist: it rotates and rescales between pinned origin chapters while a route path draws across an origin map. Commerce moments switch to Framer Motion springs — chips, add-to-cart and a sliding cart drawer — so interactions feel tactile and instant.`
- motion highlights:
  1. `Pinned origin chapters` — The bag morphs position, scale and rotation across Ethiopia, Colombia and Sumatra. Tag `SCROLLTRIGGER`.
  2. `Route drawing` — An SVG path draws the bean's journey across the map, synced to scroll. Tag `SVG STROKE`.
  3. `Floating flavour notes` — Note chips drift with physics and react to the cursor. Tag `FRAMER MOTION`.
  4. `Cart micro-interactions` — Spring-loaded add-to-cart and a drawer with staggered line items. Tag `SPRINGS`.
- stack: `Next.js`, `TypeScript`, `Tailwind CSS`, `GSAP`, `ScrollTrigger`, `Framer Motion`, `Lenis`
- fonts line: `CHUNKY DISPLAY + ROUNDED SANS`

**03 — NOCTURNE** · slug `nocturne` · category `Music festival` · timeline `2 weeks · 2026`
- summary: `A loud, kinetic site for a night-time electronic music festival.`
- intro: `NOCTURNE is a fictional three-night electronic festival. The site needed to feel like the first ten seconds of a set — loud, fast, slightly dangerous — while still selling tickets and answering practical questions.`
- challenge: `Festival sites must hype and inform at the same time. The risk was motion so aggressive it hurts readability and accessibility, especially for a lineup that people actually need to scan.`
- approach: `Motion is tied to the user's energy: marquees skew with scroll velocity, the hero text scrambles in like a signal locking on, and hovering an artist spawns a generative poster that follows the cursor. Underneath, the lineup is a plain, semantic list, and every effect has a calm reduced-motion state.`
- motion highlights:
  1. `Scramble hero` — Headline glyphs resolve from noise into the festival name, then a live countdown takes over. Tag `TEXT SCRAMBLE`.
  2. `Velocity marquees` — Infinite marquees speed up and skew based on scroll velocity. Tag `SCROLLTRIGGER`.
  3. `Cursor posters` — Each artist row spawns a unique generative SVG poster that trails the pointer. Tag `FRAMER MOTION`.
  4. `Route transitions` — Lineup and tickets pages swap with AnimatePresence wipes. Tag `ANIMATEPRESENCE`.
- stack: `Next.js`, `TypeScript`, `Tailwind CSS`, `Framer Motion`, `GSAP`, `ScrollTrigger`, `Lenis`
- fonts line: `CONDENSED DISPLAY + MONO`

**04 — VANTA** · slug `vanta` · category `Hypercar launch` · timeline `3 weeks · 2026`
- summary: `A cinematic launch for an electric hypercar concept, engineered in SVG.`
- intro: `VANTA is a fictional electric hypercar concept. Without photography or 3D files, the challenge was to make a car launch feel cinematic using only vector shapes, light and timing.`
- challenge: `Automotive launches usually lean on video and WebGL. Here every visual had to be built from SVG and CSS, stay crisp at any size, and still deliver the slow, expensive reveal a hypercar deserves.`
- approach: `I treated the page like a film: a scroll-scrubbed light sweep reveals the car silhouette, spec numbers count up as they enter, and HUD lines draw in around the interior. The configurator uses Framer Motion layout animations so colour swatches and the car body transition as one system.`
- motion highlights:
  1. `Light-sweep reveal` — A gradient sweep scrubs across the silhouette to unveil the car. Tag `SCRUB`.
  2. `Counting specs` — 0–100 km/h, range and power count up with tabular numerals. Tag `GSAP`.
  3. `HUD draw-in` — Interface lines and labels draw around the cabin as you scroll. Tag `SVG STROKE`.
  4. `Configurator` — Swatches and body colour animate with shared layout transitions. Tag `LAYOUT ANIMATION`.
- stack: `Next.js`, `TypeScript`, `Tailwind CSS`, `GSAP`, `ScrollTrigger`, `Framer Motion`, `Lenis`
- fonts line: `WIDE TECH SANS + MONO LABELS`

### 3.5 About `/about`

1. **AboutHero** (padding-top 160 / 120):
   - Mono row: `(03) ABOUT` · `FRONT-END DEVELOPER` · `LISBON, PT`.
   - H1 at cols 1–8 in `--text-display-xl`:
     > Front-end developer. Motion nerd. Performance pedant.
   - At cols 9–12 the **Portrait** slot (4:5) shows the generated SVG portrait (see §4) with a mono caption `FIG. 01 — PORTRAIT (REPLACE ME)`.
   - On mobile the portrait comes first at full width with max-height 70svh, then the H1.
2. **Bio:** label `BIO` at cols 1–3. Two body-l paragraphs at cols 5–10:
   > I'm Your Name, a front-end developer with six years of experience building websites and products for studios, startups and brands. I specialise in Next.js, TypeScript and interaction design — the layer where design intent either survives contact with the browser or quietly dies.
   >
   > I work best embedded with designers: prototyping motion early, sweating the details of easing and timing, and shipping code that the next developer will thank me for. Outside of client work I build concept sites — like the four on this index — to push what the stack can do.
3. **Experience** (`<Experience>`): label `EXPERIENCE`. Rows with hairlines in 4 columns: years mono, role h3, company body, location mono, right aligned.
   | Years | Role | Company | Location |
   |---|---|---|---|
   | 2024 — Now | Independent front-end developer | Freelance | Remote |
   | 2021 — 2024 | Senior front-end developer | Studio Halvorsen | Lisbon |
   | 2019 — 2021 | Front-end developer | Parallel Field | Porto |

   On mobile each row stacks: years / role / company · location.
4. **Principles** (`<Principles>`): the sticky split.
   - **Desktop:** at cols 1–5 a sticky (top 120px) heading in display-l, `How I work`, plus a mono progress `01 / 04` that updates.
   - At cols 7–12 a list of 4 items, each `min-height: 60vh`, with a mono number, an h2 title and a body paragraph:
     1. `Motion with a reason` — Every animation answers a question: where did this come from, what changed, where can I go next. If it doesn't, it goes.
     2. `Performance is design` — I set budgets before the first component. Transform and opacity only, lazy everything, zero layout shift.
     3. `Accessible by default` — Semantic HTML, visible focus, full keyboard paths and a real reduced-motion experience — not a disabled one.
     4. `Typed, tested, handed over` — Strict TypeScript, small components and content in one file, so the site outlives the launch week.
   - **Mobile:** no sticky. The heading sits above, then the items with a 64px gap.
5. **Toolbox** (`<StackGrid>`): label `TOOLBOX`. A 4-col grid desktop / 2-col mobile of tool names in h3, each cell with a hairline top and a mono category:
   - LANGUAGE — TypeScript, JavaScript, HTML, CSS
   - FRAMEWORK — Next.js, React, Astro
   - MOTION — GSAP, Framer Motion, Lenis, Rive
   - TOOLING — Tailwind CSS, Vite, Playwright, Figma
6. Footer.

### 3.6 404
- Background is `paper`. Show `404` in `--text-mega`, a mono line `THIS ENTRY IS NOT IN THE INDEX.` and the link `Back to index →`.

---

## 4. Visual assets plan

Remote images are blocked. All visuals are local React SVG components. No raster files are required.

### 4.1 Media slot (swappable)
Every cover renders through one component, `<Media media={...} sizes priority alt />`:

```ts
type MediaSource =
  | { kind: "svg"; art: "lumen" | "kodo" | "nocturne" | "vanta" | "portrait"; alt: string }
  | { kind: "image"; src: string; alt: string; width: number; height: number }   // next/image, local /public path
  | { kind: "video"; src: string; poster?: string; alt: string };                 // muted, loop, playsInline, autoplay off under reduced motion
```

To replace generated art with a real screenshot later, the user changes `cover` in `src/content/site.ts` to `{ kind: "image", src: "/covers/lumen.jpg", ... }`, and nothing else changes. `<Media>` always fills its parent (`position:absolute; inset:0; object-fit:cover`), and the parent sets the aspect ratio, so there is no layout shift.

### 4.2 Cover art specs
All covers use `viewBox="0 0 1600 1000"` with `preserveAspectRatio="xMidYMid slice"`, so they crop cleanly to 16:10, 4:5 and 16:9. Each is built from 3 depth layers with `data-depth="0.1|0.25|0.5"` for parallax and hover drift. A shared `<Grain id>` filter (`feTurbulence baseFrequency 0.8, numOctaves 2`, opacity 0.08–0.12) sits on top. The SVGs contain no text elements except where noted (mono labels drawn as `<text>` with the system monospace fallback are fine). Each one gets `role="img"` with an `aria-label` from `alt`.

**01 Lumen Atelier**: warm, architectural, still.
- bg `#EFE9E1`.
- Layer 0.1: a large terracotta `#C2603E` circle, the "sun", r=260 at (1120, 360), with a vertical linear gradient to 70% opacity at the bottom.
- Layer 0.25: three charcoal `#2B2A28` arched windows (rects with a semicircular top) at x = 260 / 560 / 860, width 220 and height 560, with bottoms aligned at y=880. The middle arch is cut out with a mask so the sun shows through it.
- Layer 0.5: a sand `#D9CFC1` floor plane polygon across the bottom 120px, plus thin 1px charcoal 30% vertical lines every 80px over the left 40% (blueprint grid).
- Alt: `Abstract cover for Lumen Atelier: charcoal arched windows framing a terracotta sun on warm off-white.`

**02 Kōdo Coffee**: playful, warm, tactile.
- bg `#2A1A12`.
- Layer 0.1: 5 concentric roast rings, circles in `#5A3A28` with stroke 2 and radii 120→520 at (1000, 520).
- Layer 0.25: a cream `#F3E6D0` coffee bag silhouette (a rounded-top trapezoid with a crimped top band and a small orange `#FF5A1F` circle logo), 420×560, rotated -8° and centred at (1000, 540).
- Layer 0.5: 3 orange steam paths (cubic bézier S-curves, stroke 10, round caps) rising above the bag. A dotted cream route line (`stroke-dasharray 2 14`) curves from bottom-left (80, 900) to the bag, with 3 small orange origin dots on it.
- Alt: `Abstract cover for Kōdo Coffee: a cream coffee bag with orange steam on espresso brown.`

**03 NOCTURNE**: loud, nocturnal, electric.
- bg `#07070A`.
- Layer 0.1: an ultraviolet `#6B2BFF` radial gradient blob (r=600 at (1100, 400), stops 0.9 → 0 opacity) plus a `<pattern>` of 1px horizontal scanlines (`#1A1A22`, every 4px) over everything.
- Layer 0.25: an equaliser of 24 acid lime `#C6FF2E` vertical bars, each 36 wide with a 16px gap, with deterministic pseudo-random heights from a seeded array (no `Math.random` at render, to avoid hydration mismatch), bottom-aligned at y=820.
- Layer 0.5: two offset copies of the bar group (lime at 0.35 opacity shifted x+8, ultraviolet at 0.6 opacity shifted x-8) for the glitch, plus a lime 1px horizontal rule at y=840 across the full width.
- Alt: `Abstract cover for NOCTURNE: acid-lime equaliser bars glitching over an ultraviolet glow.`

**04 VANTA**: cinematic, engineered, cold.
- bg: a linear gradient from `#15171A` (top) to `#2A2E33` (bottom).
- Layer 0.1: HUD lines. 1px cyan `#3DE7FF` at 40%: a horizon line at y=700, 12 tick marks at the left and right edges, and two corner brackets. A mono `<text>` reads `V—01 / 1,020 KW` at 18px.
- Layer 0.25: a silver `#BFC5CC` hypercar silhouette path (a low wedge with a long nose, cab-rear canopy and two wheel cut-outs, about 1100 wide, centred, ground at y=700), with fill a linear gradient from `#BFC5CC` to `#2A2E33` top-to-bottom.
- Layer 0.5: the light sweep. A rotated (-20°) rect filled with a linear gradient (transparent → cyan 0.55 → white 0.8 → transparent), clipped to the car path so the light only sits on the body. A cyan 0.25 ellipse glow under the car.
- Alt: `Abstract cover for VANTA: a silver hypercar silhouette crossed by a cyan light sweep on graphite.`

**Portrait (About)**: a halftone monogram.
- bg `#E4E2DC`. A 28×35 grid of ink `#0D0D0D` dots, with radii driven by a deterministic function so they form the letters "YN" (larger dots inside letter masks, r 0–9). One dot is `#FF3B14`, as the "signal" accent at the end of the N.
- Caption via `alt`: `Placeholder portrait: halftone monogram YN. Replace with a photo.`

### 4.3 Other visual details
- **Favicon** `src/app/icon.svg`: a 32px ink square with a 10px red square at bottom-right.
- **OG image**: `src/app/opengraph-image.tsx` (`next/og`), 1200×630, paper bg, `Your Name` in large ink type, a mono `FRONT-END DEVELOPER — INDEX` line and a red square.
- **Arrow icon**: a custom 1.5px stroke SVG (`↗` and `→` variants) in `currentColor`. No icon library.

---

## 5. Motion storyboard

**Libraries & setup (`src/lib/gsap.ts`)**: `gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)` once, client-only. Use `useGSAP` from `@gsap/react` with `scope` refs for cleanup. Framer Motion is imported from `motion/react`, or `framer-motion` if that is what was installed (pick one package and use it everywhere).

**Global reduced-motion rule**: read `window.matchMedia("(prefers-reduced-motion: reduce)")` via a `useReducedMotionPref()` hook, wrapping Framer's `useReducedMotion`. GSAP code is wrapped in `gsap.matchMedia()` with `"(prefers-reduced-motion: no-preference)"` for the full version and `"(prefers-reduced-motion: reduce)"` for the fallbacks listed below. Content must never sit at opacity 0 in the reduced or no-JS state. Initial hidden states are set by JS (`gsap.set` inside the matchMedia branch) or by a `.js-anim` class on `<html>` added by an inline script. CSS hiding is never unconditional.

### 5.1 Lenis smooth scroll (`<SmoothScroll>` provider in layout)
- Config: `new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, wheelMultiplier: 1 })`.
- Sync: `lenis.on("scroll", ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
- Expose `lenis` via context for `scrollTo` (Contact link, Back to top with `{ duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) }`).
- Stop Lenis (`lenis.stop()`) while the preloader runs, the menu is open or a curtain transition is in progress.
- **Reduced motion:** do not instantiate Lenis. Native scroll is used, and `scrollTo` falls back to `window.scrollTo({ top, behavior: "auto" })`.

### 5.2 Preloader (`<Preloader>`), first visit per session only
Trigger: on first mount of the root layout when `sessionStorage["index:loaded"]` is not set. Set the flag on completion. It renders as a fixed `ink` layer, `z-[200]`.

Layout:
- A mono counter `000` → `100` at bottom-left, in `--text-display-xl` (JetBrains Mono 500, tabular).
- At top-left, the mono `YOUR NAME — INDEX`.
- At top-right, the mono `LOADING FONTS & ASSETS`.
- A 2px `signal` progress bar along the bottom edge (scaleX from 0, origin left).

GSAP timeline:
| t (s) | Target | From → To | Dur | Ease |
|---|---|---|---|---|
| 0 | labels | opacity 0→1, y 8→0 | 0.4 | power3.out |
| 0.1 | counter value (proxy `{v:0}`) | 0→100, `snap: 1`, rendered padded to 3 digits | 1.6 | `power2.inOut` |
| 0.1 | progress bar | scaleX 0→1 | 1.6 | power2.inOut |
| 1.7 | counter + labels | yPercent 0→-100 inside overflow-hidden masks, stagger 0.05 | 0.5 | power3.in |
| 1.9 | the preloader layer is split into **two halves** (top and bottom panels, each 50vh) | top: yPercent 0→-100; bottom: yPercent 0→100 | 0.9 | power4.inOut |
| 2.3 | dispatch `window` event `index:intro` (home hero intro starts) | — | — | — |

The timeline also waits for `document.fonts.ready`: the counter does not pass 90 until fonts are ready (cap at 90, then tween 90→100 in 0.3s). After it finishes, unmount the preloader and call `lenis.start()`.

- **Repeat visits** (flag set) and other entry routes: no preloader. Dispatch `index:intro` on mount after one rAF.
- **Reduced motion:** no preloader. Dispatch `index:intro` immediately.

### 5.3 Curtain page transitions (Framer Motion + AnimatePresence + `template.tsx`)

Architecture (final):
- `TransitionProvider` (in `layout.tsx`, persists across routes) holds `phase: "idle" | "covering" | "covered"`, the `target` (href, label, curtain colours) and `navigate(href, label, colors)`.
- `TransitionLink` replaces `next/link` for all internal links. On click (only a plain left click without modifiers, same origin, and a different pathname) it calls `e.preventDefault()` then `navigate(...)`.
- The `<Curtain>` element is rendered by the provider inside `<AnimatePresence>`, mounted while `phase !== "idle"`.
- `src/app/template.tsx` re-mounts on each navigation. On mount it calls `onPageMounted()`, which (when phase is `"covered"`) scrolls to top with `lenis.scrollTo(0, { immediate: true })`, calls `ScrollTrigger.refresh()` and sets phase `"idle"`. That unmounts the curtain and plays its **exit** animation, which reveals the new page.

Curtain visuals:
- A fixed full-screen panel, `z-[150]`. The bg is `ink`, or `project.palette.bg` when navigating to a case study.
- A 4px `signal` line runs along its top edge. For case studies the line uses `project.palette.accent`.
- The label sits in the centre-left in `--text-display-xl`, in `paper`, or `project.palette.fg` for case studies: `Index`, `Work`, `About`, or the project title. A mono line above it reads `(0n)`.

Motion:
| Phase | Element | initial → animate / exit | Duration | Ease |
|---|---|---|---|---|
| Cover (enter) | curtain | `y: "100%"` → `y: "0%"` | 0.7 | `[0.76, 0, 0.24, 1]` |
| Cover | label chars (split by spaces/letters into spans in the Curtain component) | `y: "110%"` → `0`, stagger 0.025, delay 0.3 | 0.6 | `[0.16, 1, 0.3, 1]` |
| Cover → | when the cover finishes (`onAnimationComplete`): set phase `"covered"`, then `router.push(href)` | — | — | — |
| Reveal (exit) | curtain | `y: "0%"` → `y: "-100%"`, delay 0.15 (min hold so the label reads) | 0.8 | `[0.76, 0, 0.24, 1]` |
| Reveal | label | `y: 0` → `y: "-60%"`, opacity 1→0 | 0.4 | `[0.5, 0, 0.75, 0]` |
| Reveal | page wrapper in `template.tsx` (`motion.div`) | `y: 80, opacity: 1` → `y: 0` (delay 0.25) | 0.9 | `[0.16, 1, 0.3, 1]` |

After the curtain exit completes, dispatch `index:intro` so the page-level intros (hero SplitText etc.) play just as the page settles.
- **Browser back/forward** (popstate, no curtain): `template.tsx` animates opacity 0→1 over 0.4s only.
- **Reduced motion:** there is no curtain. `navigate` calls `router.push` directly, and the template uses an opacity 0→1 crossfade over 0.2s. Set `aria-busy="true"` on `<main>` during transitions. Move focus to `<h1>` of the new page after navigation (`tabIndex={-1}`, preventScroll) so screen-reader users get context.

### 5.4 Home — Hero intro (GSAP SplitText), triggered on `index:intro`
| Order | Target | From → To | Dur | Ease | Stagger / delay |
|---|---|---|---|---|---|
| 1 | Top rule (`data-anim="rule"`) | scaleX 0→1, origin left | 1.2 | expo.out | delay 0 |
| 2 | Meta row items | y 14→0, opacity 0→1 | 0.8 | expo.out | stagger 0.06, delay 0.1 |
| 3 | `Your Name` | `SplitText(type:"chars", mask:"chars")`, yPercent 110→0 | 1.2 | expo.out | stagger 0.035, delay 0.15 |
| 4 | Statement | `SplitText(type:"lines", mask:"lines")`, yPercent 100→0 | 1.0 | expo.out | stagger 0.08, delay 0.45 |
| 5 | Right mono stack | opacity 0→1, y 10→0 | 0.6 | power3.out | stagger 0.06, delay 0.7 |
| 6 | Status dot | infinite pulse: scale 1→1.8 and opacity 0.6→0 on a pseudo ring | 1.6 | power2.out | repeat -1 (CSS keyframes) |
| 7 | `SCROLL ↓` arrow | y 0→6→0 loop | 1.4 | sine.inOut | repeat -1, yoyo (CSS) |

Revert SplitText on unmount and on resize (`SplitText.create(..., { autoSplit: true, onSplit })`) so lines re-flow correctly.

**Hero scroll (ScrollTrigger, scrub):** trigger is the hero, `start "top top"`, `end "bottom top"`, `scrub: true`.
- `Your Name`: yPercent 0→35.
- The statement block: yPercent 0→-20, opacity 1→0.2.
- The mono meta row: y 0→-40.
These are transforms only.

**Reduced motion:** all elements are visible immediately. There is no split, no scroll parallax and no pulse or bob.

### 5.5 Home — Work index
**Scroll reveal** (ScrollTrigger, once, `start: "top 85%"` per row):
- The row's top rule: scaleX 0→1, origin left, 1.0s expo.out.
- The row's cells: masked yPercent 100→0, 0.9s expo.out, stagger 0.05 across cells, delay 0.1 after the rule.
- Rows overlap naturally because each has its own trigger. The intro paragraph uses a lines split with yPercent 100→0, stagger 0.08.

**Row hover/focus** (CSS transitions plus a JS class `is-active` on the list):
- The active row's title moves translateX 0→24px over 0.6s `--ease-out-expo`.
- Its number turns `signal` (0.15s), and its arrow rotates 0→45° (0.3s).
- Non-active rows go opacity 1→0.3 over 0.3s `--ease-out-quart`, while the list has `:hover` or `:focus-within`.
- A row background "wipe" runs: a `paper-2` pseudo element scales Y 0→1 from the bottom (origin bottom) over 0.5s expo.out. On leave it scales back down to 0 with origin top (that reads as passing through).

**HoverPreview** (Framer Motion), shown only when `(hover: hover) and (pointer: fine)` and no reduced motion:
- Pointer tracking: `x = useMotionValue(clientX)`, `y = useMotionValue(clientY)`. Each goes through `useSpring` with `{ stiffness: 170, damping: 22, mass: 0.6 }`.
- Velocity tilt: `rotate = useSpring(useTransform(useVelocity(x), [-2000, 2000], [-8, 8], { clamp: true }), { stiffness: 120, damping: 20 })`.
- Enter (first row hovered): the follower goes scale 0.6→1 and opacity 0→1 in 0.45s `[0.16,1,0.3,1]`, via `AnimatePresence`.
- Leave the list: scale 1→0.8 and opacity 1→0 in 0.3s `[0.5,0,0.75,0]`.
- Switching rows: all 4 covers sit stacked inside. The newly active cover is brought to the top (`z-index` = activation counter) and animates `clipPath: "inset(100% 0 0 0)"` → `"inset(0% 0 0 0)"` in 0.6s expo.out. At the same time its inner art goes scale 1.25→1 over 0.8s. The previous cover stays beneath, so there is no flash.
- Inner parallax: the cover's `data-depth` layers translate by `(pointer offset from frame centre) × depth × 20px`, through the same springs.
- The label pill slides with the frame, adding a separate x lag (`useSpring`, stiffness 120).
- **Keyboard focus** (`:focus-visible` on a row): the follower appears *anchored* to the row instead of the cursor. Its x is at the right edge of the title column (col 7 end, +24px) and its y is the row's vertical centre. It uses the same cover wipe and is hidden on blur.
- The follower carries `aria-hidden="true"` and is purely decorative, because the row link already describes the destination.
- **Reduced motion:** the follower is static. It appears at the anchored position on hover with an opacity-only 0.15s fade, with no springs, tilt or wipe. Rows keep the colour change but drop the translateX.
- **Mobile:** inline covers reveal on scroll with `clip-path inset(0 0 100% 0)` → `inset(0)` in 1.0s expo.out, inner scale 1.15→1. The reduced-motion version is visible immediately.

### 5.6 Home — About statement (sticky scrub highlight)
- Words are wrapped server-side as `<span data-word>` (render-time split, which avoids layout shift). The words start at `color: var(--color-muted)` with opacity 0.25, set via a CSS custom property on the section: `--p` per word.
- ScrollTrigger: trigger is the section (250vh), `start: "top top"`, `end: "bottom bottom"`, `scrub: 0.6`. A timeline tweens each word's opacity 0.25→1 in sequence (each word duration 1, positioned `i * 0.5` in timeline units for overlap). Words marked `data-highlight` additionally tween `color` muted→`signal` in the same slot. That colour tween on 3 words is acceptable; everything else is opacity only.
- The SectionLabel's mono meta shows progress `03 — 42%`, updated in `onUpdate` and rounded.
- The `More about me →` link fades in (opacity 0→1, y 12→0, 0.6s) once progress passes 0.85, and reverses when scrolling back above that point.
- **Reduced motion:** there is no sticky (`height: auto`). The statement is fully ink, with highlight words in `signal-text` colour, and the link is visible.

### 5.7 Home — Capabilities
- The 3 columns use ScrollTrigger `start "top 80%"`, once. Each column's top rule animates scaleX 0→1 (1.0s expo.out, stagger 0.1), then its contents animate y 30→0 and opacity 0→1 (0.8s expo.out, stagger 0.06 within a column, 0.1 between columns).
- Toolbelt line: words start at opacity 0.3. As you scroll through the line (`start "top 85%"`, `end "bottom 50%"`, scrub) they go opacity 0.3→1 with a small stagger. On hover, a single word goes to `ink` over 0.15s.
- **Reduced motion:** everything is static at full opacity.

### 5.8 Footer — "Let's talk" + Magnetic button
**Reveal** (ScrollTrigger, footer `start "top 70%"`, once):
- `Let's talk` uses a chars split with mask, yPercent 110→0, 1.2s expo.out, stagger 0.03.
- The MagneticButton goes scale 0→1 and rotate -30°→0 in 1.0s expo.out, delay 0.4.
- The bottom rows go y 20→0 and opacity 0→1, stagger 0.06.

**Parallax:** as the footer enters (`start "top bottom"`, `end "top top"`, scrub), the footer's inner content goes yPercent -30→0. That is the "reveal from under" effect. The footer stays in the normal flow, with no fixed positioning.

**MagneticButton** (GSAP `quickTo`, `src/animations/useMagnetic.ts`):
- The active zone is the element's bounding box expanded by 80px on every side. It listens to `pointermove` on window only while the footer is in the viewport (an IntersectionObserver gate).
- Inside the zone:
  - the button goes `x = dx * 0.35`, `y = dy * 0.35`, where dx/dy are the pointer's distance from the button's centre;
  - the inner label goes `x = dx * 0.15`, `y = dy * 0.15` (an extra parallax layer);
  - both use `quickTo` duration 0.6, `power3.out`.
- On leaving the zone, both return to 0 over 1.0s with `elastic.out(1, 0.4)`.
- Hover fill: an `ink` disc inside the red circle, positioned at the pointer's entry point, goes scale 0→1 over 0.5s expo.out. The label colour goes ink→paper. On leave the disc goes scale 1→0 over 0.4s power3.in, towards the exit point.
- Press: the button scales 0.95 over 0.15s and springs back.
- **Touch or reduced motion:** no magnetism and no disc expansion. Hover/focus changes the background from `signal` to `ink` with paper text (a 0.15s colour change). Focus shows the standard ring.
- The button is an `<a href="mailto:...">` with visible text, so it needs no aria-label beyond that.

**Email underline:** a pseudo element line scaleX 1→0 (origin right) then 0→1 (origin left) on hover, 0.3s + 0.3s `--ease-out-quart` (the classic "pass-through" underline). This applies to all text links site-wide.

**Clock:** updates every 1s via `setInterval` aligned to the next whole second. It is formatted with `Intl.DateTimeFormat("en-GB", { timeZone, hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false })` plus a computed GMT offset label. The SSR placeholder is `--:--:--`, replaced on mount; use `suppressHydrationWarning` on the time node. Colons blink with CSS `steps(1)` at a 1s period. Under reduced motion there is no blink.

### 5.9 Header hide/show and mobile menu
- **Header:** `ScrollTrigger.create({ start: 0, end: "max", onUpdate: self => ... })`. When `self.direction === 1` and scrollY > 120, it tweens yPercent to -100 (0.5s power3.out). When the direction is -1, it tweens to 0. It is always shown while the menu is open, during transitions and when focus is inside the header. Under reduced motion it is always visible.
- **Mobile menu** (Framer Motion `AnimatePresence`):
  - Panel: `clipPath: "inset(0 0 100% 0)"` → `"inset(0 0 0% 0)"` in 0.7s `[0.76,0,0.24,1]`. On exit, `inset(0 0 0% 0)` → `inset(100% 0 0 0)` in 0.6s, with the same ease.
  - Links: `y: "110%"` → `0` in masks, 0.7s expo, stagger 0.06, delay 0.25.
  - Bottom block: opacity 0→1, delay 0.5.
  - The `Menu`↔`Close` label swaps with a y-roll: the old label goes y 0→-100% and the new one goes 100%→0, over 0.4s.
  - **Reduced motion:** opacity 0→1 over 0.2s only.

### 5.10 /work page
- **Hero:** on `index:intro`, `Work` gets a chars split with yPercent 110→0 (1.2s expo.out, stagger 0.04). The `(04)` goes opacity 0→1 with delay 0.6. The intro lines go yPercent 100→0 (stagger 0.08, delay 0.3). The mono row and rule behave as in the home hero.
- **WorkCard reveal** (ScrollTrigger per card, `start "top 85%"`, once):
  - The cover wrapper goes `clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)` in 1.2s expo.out.
  - The inner `<Media>` goes scale 1.3→1 over 1.4s expo.out.
  - The meta row, title and summary go y 24→0 and opacity 0→1 (0.8s expo.out, stagger 0.06, delay 0.3).
- **Card parallax:** offset cards (02, 04) get a scrubbed yPercent from 10 to -10 across their viewport travel (`start "top bottom"`, `end "bottom top"`). Cards 01 and 03 go 0 → -4. This makes the stagger feel alive.
- **Card hover** (CSS):
  - The inner media scales 1→1.04 over 0.9s `--ease-out-expo`.
  - The arrow rotates 0→45°.
  - The title shifts translateX 0→12px over 0.6s.
  - A thin 4px bar in the project's accent colour grows across the bottom of the cover, scaleX 0→1 (origin left) over 0.6s expo.out.
- **Reduced motion:** cards are visible, with no clip, scale or parallax. Hover keeps only the arrow and accent bar, as instant colour changes.

### 5.11 /work/[slug] case study
| Element | Trigger | Animation | Dur / ease | Reduced motion |
|---|---|---|---|---|
| Mono row + rule | `index:intro` | like the home hero | — | static |
| Title | `index:intro` | chars split with mask, yPercent 110→0, stagger 0.03 | 1.2 expo.out | static |
| Meta grid cells | `index:intro`, delay 0.4 | y 16→0, opacity 0→1, stagger 0.06; each cell's top rule scaleX 0→1 | 0.8 expo.out | static |
| CaseCover frame | scroll, `start "top 90%"`, `end "top 20%"`, scrub 0.5 | `clipPath: inset(14% 10% 14% 10%)` → `inset(0% 0% 0% 0%)` | scrub | full frame |
| CaseCover inner layers | scroll, `start "top bottom"`, `end "bottom top"`, scrub | each `[data-depth=d]`: yPercent `d*20` → `-d*20`; whole art scale 1.15→1 | scrub | static |
| VANTA cover only | same scrub | the light-sweep rect translates x -800→1600 across the car (a nod to the original site) | scrub | sweep centred, static |
| NOCTURNE cover only | on enter, once | bars scaleY 0→1 from the bottom, stagger 0.02 random order (seeded) | 0.8 expo.out | static |
| Overview paragraph | `start "top 80%"`, once | lines split, yPercent 100→0, stagger 0.08 | 1.0 expo.out | static |
| Challenge / Approach | `start "top 80%"`, once | label opacity 0→1; paragraph lines yPercent 100→0, stagger 0.06 | 0.9 expo.out | static |
| Motion highlights rows | per row, `start "top 85%"`, once | rule scaleX 0→1 (origin left), then cells y 20→0 / opacity 0→1, stagger 0.05 | 1.0 / 0.8 expo.out | static |
| Palette swatches | `start "top 80%"`, once | scaleY 0→1 (origin bottom), stagger 0.08; hex labels fade in after | 1.0 expo.out | static |
| Stack pills | `start "top 85%"`, once | y 12→0, opacity 0→1, stagger 0.04 | 0.6 power3.out | static |
| Target stats | `start "top 80%"`, once | number counts 0→value with a proxy tween (`snap` to 1 or 0.01 for CLS), tabular nums; label fades | 1.6 power2.out | final values |
| NextProject | hover / focus | title translateX 0→32px (0.6 expo); the peek cover goes clip `inset(0 0 0 100%)` → `inset(0)` (0.7 expo) and inner scale 1.2→1 | — | instant colour/underline only |
| NextProject | scroll, scrub | the peek cover's yPercent 20 → -20 | scrub | static |
| NextProject click | — | the curtain uses the next project's palette (bg/fg/accent) | §5.3 | crossfade |

### 5.12 /about
- **Hero:** the H1 gets a lines split with mask, yPercent 100→0 (1.0s expo.out, stagger 0.1) on `index:intro`. The portrait frame goes clip `inset(100% 0 0 0)` → `inset(0)` in 1.3s expo.out, delay 0.2, with the inner portrait scale 1.2→1.
- **Portrait halftone:** on scroll (scrub, from the hero top to the hero bottom) the dots' group goes y 0→-40. On pointer move over the portrait (desktop only, Framer Motion springs `{stiffness:150, damping:18}`), the portrait tilts `rotateX/rotateY` ±6° with `transformPerspective: 800`. Neither runs under reduced motion.
- **Bio paragraphs:** lines split, yPercent 100→0, stagger 0.06, `start "top 80%"`.
- **Experience rows:** same as the motion highlights rows (rule draw then cells).
- **Principles** (desktop):
  - The left heading is CSS `position: sticky`; no GSAP pin is needed.
  - Each right-hand item has a ScrollTrigger `start "top 60%"`, `end "bottom 60%"`. `onToggle` sets the active index, which updates the mono counter `0n / 04` with a y-roll: the old number goes y 0→-100%, the new one goes 100%→0 (0.4s expo.out).
  - The active item is at opacity 1 and the others at 0.3 (0.3s transition).
  - Under reduced motion, all items are at opacity 1 and the counter is static at `04`.
- **Toolbox cells:** top rules scaleX stagger 0.05, then names y 20→0, opacity 0→1.

### 5.13 Performance guardrails (for the ANIMATION agent)
- Animate only `transform`, `opacity` and `clip-path` (plus the 3 highlight-word colour tweens). Never animate width, height, top or left.
- Add `will-change: transform` only during active tweens (GSAP handles this with `force3D`). Do not set it permanently on more than the follower and the curtain.
- Call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`) and after each route mount.
- Kill all ScrollTriggers on unmount (`useGSAP` context revert). Kill SplitText instances with `revert()`.
- The HoverPreview covers are mounted once (not per hover). Use `content-visibility: auto` on offscreen sections except sticky/pinned ones.

---

## 6. Components, content and file structure

### 6.1 Component inventory

| Component | Props | Notes |
|---|---|---|
| `TransitionProvider` | `children` | phase, target, `navigate(href, label?, colors?)`, `onPageMounted()` |
| `TransitionLink` | `href: string; label?: string; colors?: CurtainColors; className?; children; ...AnchorHTMLAttributes` | Wraps `next/link` and intercepts the click |
| `Curtain` | `label: string; index?: string; colors: CurtainColors` | `type CurtainColors = { bg: string; fg: string; accent: string }` |
| `Preloader` | `onComplete: () => void` | session-gated |
| `SmoothScroll` | `children` | Lenis context: `useLenis()` |
| `Header` | `nav: NavItem[]; name: string` | uses `Clock`, `MobileMenu` |
| `MobileMenu` | `open: boolean; onClose(): void; nav: NavItem[]` | focus trap, Esc |
| `Clock` | `timeZone: string; city: string; showOffset?: boolean` | |
| `Footer` | `contact: SiteContent["contact"]; socials: Social[]; availability: string` | |
| `MagneticButton` | `href: string; children: ReactNode; size?: "lg" \| "md"; strength?: number (default 0.35)` | `data-magnetic` |
| `SectionLabel` | `index: string; title: string; meta?: string` | |
| `Rule` | `className?; tone?: "ink" \| "paper"` | `data-anim="rule"` |
| `SplitHeading` | `as: "h1" \| "h2" \| "p"; text: string; split: "chars" \| "lines" \| "words"; className?` | renders plain text and sets `data-anim="split-{type}"` |
| `ArrowIcon` | `direction: "ne" \| "e" \| "s" \| "n"; size?: number` | |
| `Tag` | `children` | pill |
| `Media` | `media: MediaSource; sizes?: string; priority?: boolean; className?` | |
| `LumenCover` / `KodoCover` / `NocturneCover` / `VantaCover` / `Portrait` | `className?; title: string` (for aria-label) | pure SVG, deterministic |
| `Grain` | none | the fixed overlay |
| `Hero` | `name: string; role: string; statement: string; meta: string[]; availability: string; location: string` | |
| `WorkIndex` | `projects: Project[]` | owns active index state |
| `HoverPreview` | `projects: Project[]; activeIndex: number \| null; anchor: "cursor" \| DOMRect` | `aria-hidden` |
| `AboutStatement` | `statement: string; highlights: string[]` | |
| `Capabilities` | `items: Capability[]; toolbelt: string[]` | |
| `WorkGrid` / `WorkCard` | `projects: Project[]` / `project: Project; offset?: boolean` | |
| `CaseHero` | `project: Project` | |
| `CaseCover` | `project: Project` | |
| `CaseSection` | `label: string; children` | |
| `MotionHighlights` | `items: MotionHighlight[]` | |
| `PaletteStrip` | `palette: Palette; fonts: string` | computes the label colour by luminance |
| `StackList` | `items: string[]` | |
| `TargetStats` | `items: { value: number; decimals: number; prefix?: string; label: string }[]` | |
| `NextProject` | `project: Project` | |
| `AboutHero`, `Bio`, `Experience`, `Principles`, `StackGrid` | typed slices of `site.about` | |

### 6.2 Single content file `src/content/site.ts`

The user edits name, links and projects **only here**. Types live in `src/content/types.ts`.

```ts
// src/content/types.ts
export type Palette = { bg: string; fg: string; accent: string; extra: string };
export type MediaSource =
  | { kind: "svg"; art: "lumen" | "kodo" | "nocturne" | "vanta" | "portrait"; alt: string }
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster?: string; alt: string };
export type MotionHighlight = { title: string; body: string; tag: string };
export type Project = {
  slug: string; index: string; title: string; category: string; year: string; timeline: string;
  techLine: string; summary: string; intro: string; challenge: string; approach: string;
  highlights: MotionHighlight[]; stack: string[]; fonts: string;
  palette: Palette; cover: MediaSource; links: { live?: string; source?: string };
};
export type Social = { label: string; href: string };
export type NavItem = { label: string; href: string; count?: number };
export type SiteContent = {
  name: string; initials: string; role: string; tagline: string; statement: string;
  location: { city: string; country: string; timeZone: string };
  availability: string; email: string; socials: Social[]; nav: NavItem[];
  hero: { meta: string[] };
  about: {
    headline: string; statement: string; highlights: string[]; bio: string[];
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
```

```ts
// src/content/site.ts (shape + head of data; CODE agent fills all copy from §3)
import type { SiteContent } from "./types";
export const site = {
  name: "Your Name",
  initials: "YN",
  role: "Front-end Developer",
  tagline: "Next.js · TypeScript · Motion",
  statement: "I build motion-led websites that load fast, read clearly and move with intent.",
  location: { city: "Lisbon", country: "PT", timeZone: "Europe/Lisbon" },
  availability: "Available for freelance — Q1 2027",
  email: "hello@yourname.dev",
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
  hero: { meta: ["(01) Index", "Front-end developer", "Next.js · TypeScript · Motion"] },
  // about, capabilities, toolbelt: copy from §3.2 / §3.5
  projects: [
    {
      slug: "lumen-atelier", index: "01", title: "Lumen Atelier", category: "Architecture studio",
      year: "2026", timeline: "3 weeks · 2026", techLine: "GSAP · ScrollTrigger · SplitText",
      palette: { bg: "#EFE9E1", fg: "#2B2A28", accent: "#C2603E", extra: "#D9CFC1" },
      cover: { kind: "svg", art: "lumen", alt: "Abstract cover for Lumen Atelier: charcoal arched windows framing a terracotta sun on warm off-white." },
      links: { live: "#", source: "#" },
      // summary, intro, challenge, approach, highlights, stack, fonts: copy from §3.4
    },
    // kodo-coffee, nocturne, vanta …
  ],
  seo: { title: "Your Name — Front-end Developer", description: "…", url: "https://yourname.dev" },
} satisfies SiteContent;
```

Helpers in the same folder: `getProject(slug)` and `getNextProject(slug)` (wraps 04 → 01).

### 6.3 File structure

```
src/
  app/
    layout.tsx              fonts, <html class>, providers (SmoothScroll, TransitionProvider), Header, Grain, Preloader, Curtain host, skip link
    template.tsx            motion.div page wrapper + onPageMounted()
    page.tsx                Home: Hero, WorkIndex, AboutStatement, Capabilities, Footer
    work/page.tsx
    work/[slug]/page.tsx    generateStaticParams + generateMetadata
    about/page.tsx
    not-found.tsx
    globals.css             @import "tailwindcss"; @theme tokens; base, utilities (.grid-site, link underline, mask helpers)
    icon.svg
    opengraph-image.tsx
  components/
    layout/      Header.tsx, MobileMenu.tsx, Footer.tsx, Clock.tsx, SkipLink.tsx, Grain.tsx
    transition/  TransitionProvider.tsx, TransitionLink.tsx, Curtain.tsx, Preloader.tsx
    providers/   SmoothScroll.tsx
    ui/          MagneticButton.tsx, SectionLabel.tsx, Rule.tsx, SplitHeading.tsx, ArrowIcon.tsx, Tag.tsx
    media/       Media.tsx, Portrait.tsx, covers/{LumenCover,KodoCover,NocturneCover,VantaCover}.tsx
    home/        Hero.tsx, WorkIndex.tsx, HoverPreview.tsx, AboutStatement.tsx, Capabilities.tsx
    work/        WorkGrid.tsx, WorkCard.tsx
    case/        CaseHero.tsx, CaseCover.tsx, CaseSection.tsx, MotionHighlights.tsx, PaletteStrip.tsx, StackList.tsx, TargetStats.tsx, NextProject.tsx
    about/       AboutHero.tsx, Bio.tsx, Experience.tsx, Principles.tsx, StackGrid.tsx
  animations/
    easings.ts         token mirror (CSS + GSAP names, durations, staggers)
    useIntro.ts        subscribes to "index:intro"
    useSplitReveal.ts  data-anim split-chars/lines/words
    useScrollReveal.ts rule / fade-up / clip-reveal
    useParallax.ts     data-depth + data-parallax
    useScrubWords.ts   About statement
    useMagnetic.ts
    useCountUp.ts
    useHeaderHide.ts
  lib/
    gsap.ts            plugin registration (client)
    useReducedMotionPref.ts
    useMediaQuery.ts
    time.ts            offset label helper
    cn.ts
  content/
    site.ts, types.ts, helpers.ts
```

### 6.4 Animation hooks contract (the CODE agent must render these; the ANIMATION agent targets them)

| Attribute | Meaning |
|---|---|
| `data-anim="rule"` | 1px rule, draws scaleX 0→1 |
| `data-anim="split-chars" \| "split-lines" \| "split-words"` | SplitText target |
| `data-anim="fade-up"` | y + opacity reveal |
| `data-anim="clip-reveal"` | wrapper with clip-path reveal; child `[data-anim-inner]` scales |
| `data-anim="scrub-words"` + `span[data-word]` + `[data-highlight]` | About statement |
| `data-depth="0.1"` etc. | parallax layer inside covers |
| `data-parallax="-10,10"` | scrubbed yPercent range from/to |
| `data-magnetic` + `[data-magnetic-inner]` | magnetic button and its label |
| `data-row-index="0..3"` | work index rows |
| `data-count="95" data-decimals="0"` | count-up stats |
| `data-intro-delay="0.3"` | optional per-element delay offset |
| `id="contact"` | footer anchor |

---

## 7. Accessibility

**Contrast (WCAG 2.2, computed):**
| Pair | Ratio | Use allowed |
|---|---|---|
| ink `#0D0D0D` on paper `#F2F1ED` | 17.2 : 1 | all text |
| muted `#5E5D59` on paper | 5.83 : 1 | body and mono meta (AA) |
| muted `#5E5D59` on paper-2 `#E4E2DC` | 5.09 : 1 | hovered row meta (AA) |
| signal-text `#C4240A` on paper | 5.16 : 1 | small red text (AA) |
| signal `#FF3B14` on paper | 3.16 : 1 | **non-text only** (dot, bar, focus ring ≥3:1) and text ≥24px |
| ink on signal `#FF3B14` | 5.45 : 1 | magnetic button label (AA) |
| paper on ink | 17.2 : 1 | footer, menu, curtain |
| muted-dark `#8C8A85` on ink | 5.64 : 1 | secondary text on ink |
| Lumen `#2B2A28` on `#EFE9E1` | 11.9 : 1 | curtain label |
| Kōdo `#F3E6D0` on `#2A1A12` | 13.6 : 1 | curtain label |
| NOCTURNE `#C6FF2E` on `#07070A` | 17.0 : 1 | curtain label |
| VANTA `#3DE7FF` / `#BFC5CC` on `#15171A` | 12.0 : 1 / >10 : 1 | curtain label (use silver fg) |

The non-active rows dimmed to opacity 0.3 are a transient hover state. The focused or hovered row itself stays at full contrast. The scrub-highlight words start at low opacity by design, but the final state is full contrast, and the reduced-motion version shows full contrast immediately. `PaletteStrip` picks ink or paper for each hex label by relative luminance (threshold 0.4) so every label passes AA.

**Focus:** `:focus-visible { outline: 2px solid var(--color-signal); outline-offset: 3px; }` on paper. On ink surfaces, the outline is `paper` 2px with offset 3px, and the red sits inside as a 2px box-shadow ring. Never use `outline: none` without a replacement. Work index rows show the focus ring inset (`outline-offset: -2px`) so it is not clipped. Focus order follows the DOM. The hover preview never takes focus.

**Semantics:**
- One `<h1>` per page: home h1 is `Your Name` (with a visually hidden suffix `— Front-end developer`); /work is `Work`; case pages use the project title; /about uses the headline.
- Use landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`. Sections use `<section aria-labelledby>`, pointing to their heading (or to a visually hidden h2 when the visible label is a mono row).
- The work index is an `<ol>` of `<li><a>`. The link's accessible name reads as `01 Lumen Atelier, Architecture studio, 2026`, assembled from the cell text. Meta cells carry no extra aria.
- SplitText output: make sure the original text stays available to assistive tech. Set `aria-label` with the full text on the split parent and `aria-hidden="true"` on the generated char/line spans (SplitText's `aria: "auto"` option does this). Use the same pattern for the scrub words (server-rendered spans plus `aria-label` on the paragraph).
- The clock is a `<time dateTime>` with `aria-live="off"`, so it is not announced every second. Add a visually hidden prefix `Local time in Lisbon:`.
- The preloader has `role="status"` and `aria-live="polite"`, and announces only "Loading" and "Loaded" (not every number). The counter is `aria-hidden`.
- The curtain is `aria-hidden="true"`. Route changes are announced by moving focus to the new `<h1>`, and Next.js's route announcer also stays active.
- External links get `target="_blank" rel="noopener noreferrer"` and a visually hidden `(opens in new tab)`. Decorative arrows are `aria-hidden`.
- Covers have meaningful `alt`/`aria-label` from content. The grain and decorative SVG layers are `aria-hidden`.
- Mobile menu: `aria-expanded` and `aria-controls` on the toggle, a focus trap, Esc to close, focus returned to the toggle on close, and `inert` on `<main>` while open.

**Interaction:** all hit targets are ≥44×44px on touch (nav links get padding). Hover-only content (the preview) is purely decorative, and every piece of information is also present in the row. No content depends on scroll-scrubbing to be readable once fully scrolled.

**Reduced motion summary:**
- no preloader, no Lenis and no curtain (crossfade 0.2s instead);
- no SplitText, parallax, magnetism, tilt, header hide, blinking colons or pulsing dot;
- sticky scrub sections become static blocks;
- content is always visible.

**No-JS:** every page renders full content with no hidden states. Links are real `<a href>` elements, so navigation works without the transition provider.

---

## 8. QA acceptance checklist (for the CODE / ANIMATION / QA agents)
- [ ] There is no horizontal overflow at 390, 768, 1024 or 1440. `Your Name` and `Let's talk` scale with clamp() and never exceed the viewport (check `overflow-x: clip` on the body as a safety net).
- [ ] CLS is 0: covers sit in aspect-ratio boxes, fonts use `display: swap` with `adjustFontFallback` (the next/font default), and split spans exist before the first paint, or the split happens before reveal while text is still visible.
- [ ] The first visit shows the preloader exactly once per session. Internal navigation always shows the curtain (with project colours on case links).
- [ ] The HoverPreview follows smoothly at 60fps on desktop and is absent on touch. Keyboard focus shows the anchored preview.
- [ ] The magnetic button works on desktop and is a plain button on touch and under reduced motion.
- [ ] Toggling OS reduced motion yields a fully static, fully readable site.
- [ ] Every name, link and project field is editable in `src/content/site.ts` alone.

---

## Implementation notes (code agent)

Static build complete: every route, section, cover and line of copy is rendered and fully visible without JS. Lint and build are clean. Only CSS hover/focus transitions exist (row hover, card hover, link underlines, magnetic-button colour swap), and their transforms drop under `prefers-reduced-motion`. **Nothing in the §5 storyboard is wired yet.**

### Animation hooks left (selector → intended animation)
| Selector | Where | Intended animation (§) |
|---|---|---|
| `[data-anim="rule"]` (`<Rule>`) | all section labels, rows, meta cells | scaleX 0→1, origin left |
| `[data-anim="fade-up"]` | mono rows, label rows, footer rows, case/about labels | y + opacity reveal |
| `[data-anim="split-chars"]` | home `[data-hero-name]` (inner span of h1), `/work` "Work", case h1, footer "Let's talk" h2, 404 | SplitText chars + mask, yPercent 110→0 |
| `[data-anim="split-lines"]` | hero statement, work intro, `/work` intro, about h1, case Overview/Challenge/Approach, bio paragraphs, "How I work" | SplitText lines + mask |
| `[data-anim="split-words"]` + `span[data-word]` | `[data-toolbelt]` (Capabilities) | scrubbed opacity 0.3→1 |
| `[data-intro-delay]` | hero statement (0.45), `/work` intro (0.3), case meta cells (0.4) | per-element delay offset |
| `[data-hero]`, `[data-hero-meta]`, `[data-hero-statement]`, `[data-hero-stack] li` | Hero | intro and scroll parallax (§5.4) |
| `[data-status-dot]` > `[data-status-dot-ring]` | hero, footer | pulse ring (CSS keyframes) |
| `[data-scroll-cue]` | hero "SCROLL ↓" | 6px bob loop |
| `[data-clock-colon]` | `<Clock>` | blink 1↔0.3, steps(1) |
| `.work-list[data-active]` / `.is-active`, `li[data-row-index]`, `[data-row-cell]`, `[data-row-title]` | `<WorkIndex>` | row reveal; the hover CSS already exists |
| `[data-preview]`, `[data-preview-cover="i"]` > `[data-preview-art]`, `[data-preview-label]` | `<HoverPreview>` | springs, velocity tilt, clip wipe, z-counter, label lag. Currently tracks the pointer directly (no smoothing) and swaps covers by opacity |
| `[data-anim="clip-reveal"]` > `[data-anim-inner]` | mobile index covers, work cards, case cover, about portrait | clip-path reveal + inner scale |
| `[data-depth="0.1|0.25|0.5"]` | every SVG cover layer, portrait dots | parallax / hover drift |
| `[data-sweep]` | VANTA cover light-sweep rect | x −800→1600 scrub |
| `[data-bars]` > `rect[data-bar][data-order]` | NOCTURNE main bars (`data-order` = seeded random index) | scaleY 0→1 from bottom |
| `[data-dots]` / `[data-portrait-tilt]` | about portrait | scrub y 0→−40, pointer tilt ±6° |
| `[data-about-statement]` > `[data-sticky]` > `p[data-anim="scrub-words"]` > `span[data-word]` (+`[data-highlight]`), `[data-about-cta]`, `[data-section-meta]` | `<AboutStatement>` | scrub highlight, live "03 — 42%", CTA fade after 85% |
| `[data-cap-col]` | Capabilities columns | rule then contents stagger |
| `[data-work-card][data-parallax="10,-10" | "0,-4"]` | `/work` cards | scrubbed yPercent |
| `[data-case-cover]`, `[data-case-meta]`, `li[data-hl-row]`, `[data-swatch]`/`[data-swatch-label]`, `li[data-pill]`, `[data-count][data-decimals]`, `[data-stat-label]` | case page | §5.11 table |
| `[data-next-peek]` > `[data-next-peek-inner]` | NextProject | hover clip, scrub yPercent 20→−20 |
| `li[data-principle="i"]`, `[data-principles-current]` | Principles | active index + y-roll counter (static shows `04 / 04`) |
| `li[data-tool]`, `li[data-hl-row]` (Experience) | about | rule then cells |
| `[data-magnetic]` > `[data-magnetic-inner]`, `[data-magnetic-fill]` | `<MagneticButton>` | quickTo magnetism, ink disc from the entry point |
| `[data-footer-inner]` | Footer | yPercent −30→0 reveal-from-under |
| `[data-header-layer]` (×2: `header[data-header]` + `[data-header-signal]`) | Header | hide/show **both** layers together (yPercent 0↔−100) |
| `[data-menu-panel]`, `[data-menu-mask]` > `[data-menu-link]`, `[data-menu-bottom]`, `[data-menu-toggle-label]` | MobileMenu | clip wipe, link rise, fade, label roll. The menu currently mounts/unmounts instantly |
| `[data-page-wrapper]` | `src/app/template.tsx` (client; calls `onPageMounted()`) | becomes a motion.div page wrapper |
| `<Curtain>` (`[data-curtain]`, `[data-curtain-mask]`, `[data-curtain-label]`, `[data-curtain-line]`) | `src/components/transition/Curtain.tsx`, not mounted | AnimatePresence curtain |
| `<Preloader>` (`[data-preloader-*]`) | `src/components/transition/Preloader.tsx`, not mounted | session-gated preloader |
| `TransitionProvider` (`phase`, `setPhase`, `target`, `navigate`, `onPageMounted`) | `navigate` currently does `router.push` directly | curtain state machine |
| `SmoothScroll` (`useLenis()` / `useSmoothScroll()` → `{ lenis, scrollTo }`) | already used by Contact links, menu Contact and Back to top | instantiate Lenis; `scrollTo` falls back to native |
| `id="main"` (`tabIndex=-1`), `id="contact"`, `id="work"`, every h1 `tabIndex=-1` | — | aria-busy and post-navigation focus |

`src/animations/easings.ts` already mirrors the motion tokens. Still to be created by the ANIMATION agent: `src/lib/gsap.ts` and the `src/animations/use*.ts` hooks.

### Deviations
- **`cacheComponents` / `partialPrefetching` are disabled** in `next.config.ts` (the Next 16.4 scaffold enables them). With them on, visited routes stay mounted in React `<Activity>`, which duplicates `#main`/`#contact` and would leave ScrollTriggers alive on hidden pages. All routes are still static (`generateStaticParams` + `dynamicParams = false`).
- **next/font variable names** are `--font-inter-tight` / `--font-jetbrains-mono`, so that the Tailwind `@theme` tokens `--font-display` / `--font-mono` can reference them without a cycle. The utilities stay `font-display` / `font-mono`.
- **Header red squares** are drawn in a second, non-blended fixed layer (`[data-header-signal]`). Under `mix-blend-difference`, signal red would render cyan on paper.
- `site.hero.meta` has a **4th item** ("Available Q1 2027") for the hero status. Its first word is the only part shown on mobile.
- **Lumen cover:** the window arch cut out to frame the sun is the **third** arch (x=860). The sun at (1120, 360) r=260 does not overlap the middle arch.
- **NOCTURNE cover:** the glitch copies (depth 0.5 group) paint *behind* the main lime bars so the lime stays dominant.
- **Column spans:** the hero statement spans cols 1–8 (not 1–6) to keep it at about 3 lines at 69px. Motion-highlight tags take cols 11–12 (body cols 7–10), because long tags don't fit col 12. The footer email takes cols 1–6 at `text-h2` below 1440 and `display-l` from 1440 up; socials sit at cols 7–8.
- **Case titles and NextProject titles** use `text-mega-fit` (`min(var(--text-mega), 17.5vw)`) so "NOCTURNE" never breaks mid-word at 390.
- **Below 1024px**, the header and work index use the mobile layouts (wordmark + Menu; stacked cards with inline covers). The hover preview only mounts at ≥1024px with `(hover:hover) and (pointer:fine)`.
- **Paragraphs** split into word spans (scrub statement, toolbelt) keep their real text, so they get no `aria-label` (ARIA prohibits naming a `p`).
- **Static states:** the AboutStatement drops its sticky / 250vh height under `motion-reduce`. The principles counter is static at `04 / 04`. The scaffold README was removed (the QA agent writes the README).

---

## Implementation notes (animation agent)

The full §5 storyboard is wired. `npm run lint` and `npm run build` are clean. A Playwright pass against the prod server (1440×900, 390×844 and `reducedMotion: "reduce"`) found no console errors, no horizontal overflow and no element left invisible. It also confirmed that the curtain runs on every internal link and that the new page lands at `scrollY 0` with focus on its `<h1>`.

### Architecture
| Concern | Where |
|---|---|
| Plugin registration (ScrollTrigger, SplitText, useGSAP), once, client-only, plus the shared `MQ` matchMedia queries | `src/lib/gsap.ts` |
| Lenis (`lerp 0.1`) on the GSAP ticker, `lenis.on("scroll", ScrollTrigger.update)`, `lagSmoothing(0)`; `scrollTo` and `lock(key)` / `unlock(key)` (preloader, menu, curtain). Not created under reduced motion | `components/providers/SmoothScroll.tsx` |
| Curtain state machine (`idle → covering → covered → idle`), `AnimatePresence` curtain, preloader host, `aria-busy`, h1 focus, `index:intro` dispatch | `components/transition/TransitionProvider.tsx`, `Curtain.tsx`, `Preloader.tsx` |
| Page wrapper keyed by **pathname** (fresh GSAP context even for `/work/a → /work/b`, where Next keeps the template mounted). Entry modes: `curtain` (y 80→0 after the reveal), `fade` (back/forward 0.4s, reduced motion 0.2s), `none` (first load) | `app/template.tsx` |
| All page-level motion in one `useGSAP` context scoped to the wrapper and split into `gsap.matchMedia()` branches. Reverting it on route change kills every ScrollTrigger and SplitText of the old page | `animations/usePageMotion.ts` |
| Shared helpers: `Kit` (deferred `ctx.add`, element claiming, dispose), `onceInView` (uses `clamp()` starts so bottom-of-page items still fire), `playSplit` | `animations/kit.ts` |
| Generic intro for `[data-intro]` sections (rule, fade-up, split chars/lines, clip, `data-intro-delay`, `data-stagger`) | `animations/useSplitReveal.ts` |
| Generic scroll reveals plus hairline rows | `animations/useScrollReveal.ts` |
| Scrubbed parallax (hero, footer reveal-from-under, work cards, case cover depth layers + VANTA sweep, next-project peek, portrait dots) | `animations/useParallax.ts` |
| About statement scrub (`03 — 42%`, CTA after 85%) and toolbelt scrub | `animations/useScrubWords.ts` |
| Target stat count-up | `animations/useCountUp.ts` |
| Work rows, capabilities, footer, work cards, case cover clip / NOCTURNE bars / palette / pills, toolbox, principles counter | `animations/sections.ts` |
| Magnetic button (`quickTo`, IntersectionObserver gate, ink disc from the entry/exit point, press spring) | `animations/useMagnetic.ts` → `ui/MagneticButton.tsx` (now a client component) |
| Header hide/show, moving both `[data-header-layer]`s together. Forced visible while the menu is open, during a transition, with focus in the header, and in the top 120px | `animations/useHeaderHide.ts` |
| Hover preview (Framer springs, velocity tilt, clip wipe with activation z-counter, depth drift, label lag, anchored on keyboard focus, portalled to `<body>`) | `components/home/HoverPreview.tsx` |
| Mobile menu (AnimatePresence clip wipe, link rise, Close/Menu roll); portrait tilt | `layout/MobileMenu.tsx`, `about/PortraitTilt.tsx` |
| Intro coordination store (late subscribers never miss it) | `animations/intro.ts` |

### Never-hidden guarantees
- An inline boot script in `layout.tsx` adds `html.js` and `html.js-anim`, plus `html.preload` on the first home visit of the session (motion allowed). CSS in `globals.css` hides **only the `[data-intro]` elements** behind `html.js-anim`, inside `@media (prefers-reduced-motion: no-preference)`. Scroll-reveal initial states are set by JS.
- Failsafes: if `window.__indexAnimReady` is still unset after 4s, both classes are dropped, and `preload` is always dropped by 9s. Any exception in a setup also drops `js-anim`.
- Reduced motion: no Lenis, preloader, curtain, split, parallax, magnetism, tilt, header hide, pulse, bob or colon blink. The template crossfades over 0.2s. Content is as server-rendered.

### Deviations / decisions
- **Chars splits stay split after their reveal**, with masks opened to `overflow: visible`. Reverting them made the mega name snap about 15px, because inline-block chars lose kerning pairs. **Lines splits revert** when they complete, so they re-flow correctly on resize. Splits happen at play time, after `document.fonts.ready`, which makes `autoSplit` unnecessary.
- Scroll-revealed splits hide with `opacity` so they stay in the accessibility tree. SplitText `aria` is `auto` on headings and `none` on paragraphs. For the hero name (a span inside the h1), the h1 gets a temporary `aria-label`.
- The `index:intro` listeners are delivered in a microtask. GSAP ≥3.12 runs timeline callbacks inside their creating context, so dispatching from the preloader timeline would otherwise nest the page context in the preloader's and kill it when the preloader unmounts.
- The preloader runs only when the entry route is `/` (per "other entry routes: no preloader"). The counter holds at 90 until `document.fonts.ready` (3s cap).
- The curtain holds for at least 1.05s from cover start so the label reads. h1 focus is applied 200ms after the reveal, because a `visibility: hidden` gated heading cannot take focus.
- Work-row cells rise inside a temporary `clip-path: inset(0)` on the row link instead of extra mask wrappers.
- The CLS stat (0.00) counts down from 0.99 so it visibly settles. NextProject's peek is clipped at rest only on fine pointers (CSS), and is visible on touch.
- The magnetic button keeps the static ink/paper swap for keyboard focus. The ink disc only replaces the swap on pointer hover.
- `content-visibility: auto` was not applied. It interferes with ScrollTrigger measurements on the sticky and scrubbed sections.
