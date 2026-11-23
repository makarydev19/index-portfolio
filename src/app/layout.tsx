import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { Header } from "@/components/layout/Header";
import { Grain } from "@/components/layout/Grain";
import { SkipLink } from "@/components/layout/SkipLink";
import { GridOverlay } from "@/components/layout/GridOverlay";

// next/font variables are named --font-inter-tight / --font-jetbrains-mono (not --font-display /
// --font-mono) so the Tailwind @theme tokens of those names can reference them without a cycle.
const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: { default: site.seo.title, template: `%s — ${site.name}` },
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2F1ED",
};

/**
 * Boot script (runs before first paint): marks JS + motion on <html> so intro elements can be
 * gated in CSS (html.js-anim), and decides the first-visit preloader (html.preload: home entry,
 * once per session, never under reduced motion). Failsafes drop both classes if the animation
 * runtime has not booted in time, so content is never left hidden.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.classList.add('js-anim');
try{if(location.pathname==='/'&&!sessionStorage.getItem('index:loaded'))d.classList.add('preload')}catch(e){}
setTimeout(function(){if(!window.__indexAnimReady)d.classList.remove('js-anim','preload')},4000);
setTimeout(function(){d.classList.remove('preload')},9000);})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} id="top" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <SkipLink />
        <SmoothScroll>
          <TransitionProvider>
            <Header nav={site.nav} name={site.name} />
            {children}
            {/* <Preloader> (first visit) and the <Curtain> host are rendered by TransitionProvider. */}
          </TransitionProvider>
        </SmoothScroll>
        <Grain />
        {process.env.NODE_ENV === "development" ? <GridOverlay /> : null}
      </body>
    </html>
  );
}
