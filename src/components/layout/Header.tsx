"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/types";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useOptionalTransition } from "@/components/transition/TransitionProvider";
import { useHeaderHide } from "@/animations/useHeaderHide";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Clock } from "./Clock";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  if (href.startsWith("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLabel(item: NavItem) {
  return item.count ? `${item.label} (${String(item.count).padStart(2, "0")})` : item.label;
}

/**
 * Fixed header, paper text with mix-blend-mode: difference (reads ink on paper, paper on ink).
 * The red "active" squares live in a second, non-blended layer ([data-header-signal]) so they
 * stay signal red — difference blending would turn them cyan. Both layers carry
 * [data-header-layer]; the ANIMATION agent should hide/show both together (yPercent 0↔-100).
 */
export function Header({ nav, name }: { nav: NavItem[]; name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollTo } = useSmoothScroll();
  const transition = useOptionalTransition();
  useHeaderHide(open || (transition ? transition.phase !== "idle" : false), pathname);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  // Close the menu on route change. Adjusting state during render is the React-recommended
  // pattern for "reset on prop change" (avoids a setState-in-effect cascade).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const onContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById("contact");
    if (!el) return;
    e.preventDefault();
    scrollTo(el);
  };

  const renderNav = (signalLayer: boolean) => (
    <ul className="flex items-center justify-end gap-6">
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        const inner = (
          <>
            <span
              aria-hidden="true"
              className={cn("size-1.5 shrink-0", active ? (signalLayer ? "bg-signal" : "") : "hidden")}
            />
            <span className={cn(signalLayer ? "invisible" : "link-h")}>{navLabel(item)}</span>
          </>
        );
        const cls = "mono inline-flex min-h-11 items-center gap-2";
        if (signalLayer) {
          return (
            <li key={item.href}>
              <span className={cls}>{inner}</span>
            </li>
          );
        }
        return (
          <li key={item.href}>
            {item.href.startsWith("#") ? (
              <a href={item.href} className={cls} onClick={onContact}>
                {inner}
              </a>
            ) : (
              <TransitionLink
                href={item.href}
                label={item.label}
                className={cls}
                aria-current={active ? "page" : undefined}
              >
                {inner}
              </TransitionLink>
            )}
          </li>
        );
      })}
    </ul>
  );

  const shell = "fixed inset-x-0 top-0 z-50 h-(--header-h)";

  return (
    <>
      <header data-header data-header-layer className={cn(shell, "text-paper mix-blend-difference")}>
        <div className="grid-site h-full items-center">
          <div className="col-span-3 lg:col-span-3">
            <TransitionLink
              href="/"
              label="Index"
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap"
            >
              <span className="text-[17px] font-semibold tracking-[-0.02em]">{name}</span>
              <span className="mono-s" aria-hidden="true">
                ©2026
              </span>
            </TransitionLink>
          </div>

          <div className="hidden lg:col-span-3 lg:col-start-5 lg:block">
            <Clock timeZone={site.location.timeZone} city={site.location.city} />
          </div>

          <nav aria-label="Primary" className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            {renderNav(false)}
          </nav>

          <div className="col-span-1 col-start-4 justify-self-end md:col-start-8 lg:hidden">
            <button
              ref={toggleRef}
              type="button"
              className="mono inline-flex min-h-11 min-w-11 items-center justify-end"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="relative block overflow-hidden" data-menu-toggle-label>
                <motion.span
                  className="block"
                  initial={false}
                  animate={{ y: open ? "-100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Menu
                </motion.span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden="true"
        data-header-signal
        data-header-layer
        className={cn(shell, "pointer-events-none hidden lg:block")}
      >
        <div className="grid-site h-full items-center">
          <div className="lg:col-span-4 lg:col-start-9">{renderNav(true)}</div>
        </div>
      </div>

      <MobileMenu open={open} onClose={close} nav={nav} />
    </>
  );
}
