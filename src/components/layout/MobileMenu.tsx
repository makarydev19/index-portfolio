"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import { ease } from "@/animations/easings";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import type { NavItem } from "@/content/types";
import { site } from "@/content/site";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Clock } from "./Clock";
import { ExternalLink } from "./ExternalLink";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Bezier = [number, number, number, number];
const IN_OUT = ease.inOutQuart.bezier as unknown as Bezier;
const OUT_EXPO = ease.outExpo.bezier as unknown as Bezier;

const panelMotion: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: IN_OUT } },
  exit: { clipPath: "inset(100% 0% 0% 0%)", transition: { duration: 0.6, ease: IN_OUT } },
};
const panelReduced: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/**
 * Full-screen ink menu (mobile/tablet). Focus trap, Esc closes, <main> + footer are inert while open.
 * Motion (DESIGN.md §5.9, Framer AnimatePresence): panel clip-path wipe in/out, links rise in
 * masks (stagger 0.06), bottom block fades, Close label rolls in. Reduced motion: 0.2s fade only.
 */
export function MobileMenu({ open, onClose, nav }: { open: boolean; onClose: () => void; nav: NavItem[] }) {
  const reduced = useReducedMotionPref();
  return (
    <AnimatePresence>
      {open ? <MenuPanel key="menu" onClose={onClose} nav={nav} reduced={reduced} /> : null}
    </AnimatePresence>
  );
}

function MenuPanel({ onClose, nav, reduced }: { onClose: () => void; nav: NavItem[]; reduced: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  // In-page target (e.g. #contact) to scroll to once the panel has exited and scroll is unlocked.
  // Lenis ignores scrollTo while stopped, and <html> is overflow:hidden while the menu is open.
  const pendingScroll = useRef<HTMLElement | null>(null);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  useEffect(() => {
    lock("menu");
    const panel = panelRef.current;
    const main = document.getElementById("main");
    const footer = document.getElementById("contact");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.documentElement.style.overflow = prevOverflow;
      unlock("menu");
      const target = pendingScroll.current;
      pendingScroll.current = null;
      if (target) requestAnimationFrame(() => scrollTo(target));
    };
  }, [onClose, lock, unlock, scrollTo]);

  const links: { label: string; href: string }[] = [{ label: "Index", href: "/" }, ...nav];

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-menu-panel
      data-lenis-prevent
      className="on-ink fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink text-paper"
      variants={reduced ? panelReduced : panelMotion}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <div className="grid-site h-(--header-h) shrink-0 items-center">
        <div className="col-span-3">
          <TransitionLink href="/" label="Index" onClick={onClose} className="inline-flex min-h-11 items-center gap-2">
            <span className="text-[17px] font-semibold tracking-[-0.02em]">{site.name}</span>
            <span className="mono-s" aria-hidden="true">
              ©2026
            </span>
          </TransitionLink>
        </div>
        <div className="col-span-1 col-start-4 justify-self-end md:col-start-8">
          <button
            type="button"
            onClick={onClose}
            className="mono inline-flex min-h-11 min-w-11 items-center justify-end"
          >
            <span className="relative block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "100%" }}
                animate={{ y: "0%", transition: { duration: 0.4, ease: OUT_EXPO, delay: 0.2 } }}
              >
                Close
              </motion.span>
            </span>
          </button>
        </div>
      </div>

      <nav aria-label="Menu" className="wrap-site flex-1 pt-10">
        <ol>
          {links.map((item, i) => {
            const index = String(i + 1).padStart(2, "0");
            const content = (
              <>
                <span className="mono w-8 shrink-0 self-start pt-2 text-muted-dark">{index}</span>
                <span className="block overflow-hidden pb-[0.08em]" data-menu-mask>
                  <motion.span
                    className="text-display-xl block"
                    data-menu-link
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: "0%", transition: { duration: 0.7, ease: OUT_EXPO, delay: 0.25 + i * 0.06 } }}
                  >
                    {item.label}
                  </motion.span>
                </span>
              </>
            );
            const cls = "menu-link -mx-2 flex items-start gap-4 px-2 py-2";
            return (
              <li key={item.href} className="border-t border-paper/20 last:border-b">
                {item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    className={cls}
                    onClick={(e) => {
                      const el = document.getElementById(item.href.slice(1));
                      if (el) {
                        e.preventDefault();
                        pendingScroll.current = el;
                      }
                      onClose();
                    }}
                  >
                    {content}
                  </a>
                ) : (
                  <TransitionLink href={item.href} label={item.label} index={index} onClick={onClose} className={cls}>
                    {content}
                  </TransitionLink>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <motion.div
        className="wrap-site flex flex-col gap-4 pb-8 pt-12"
        data-menu-bottom
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
      >
        <Clock timeZone={site.location.timeZone} city={site.location.city} className="text-muted-dark" />
        <a href={`mailto:${site.email}`} className="link-u self-start text-h3">
          {site.email}
        </a>
        <ul className="flex flex-wrap gap-x-6">
          {site.socials.map((s) => (
            <li key={s.label}>
              <ExternalLink href={s.href} className="mono inline-flex min-h-11 items-center">
                <span className="link-h">{s.label}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
