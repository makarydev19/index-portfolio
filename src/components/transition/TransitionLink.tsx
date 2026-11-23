"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useOptionalTransition } from "./TransitionProvider";
import type { CurtainColors } from "./types";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  /** Curtain label: "Index", "Work", "About" or the project title. */
  label?: string;
  /** Curtain index line, e.g. "02". */
  index?: string;
  colors?: CurtainColors;
  children: ReactNode;
};

/**
 * Internal link that routes through the TransitionProvider (curtain) on a plain
 * left click to a different pathname. Works as a normal <a href> without JS.
 */
export function TransitionLink({ href, label, index, colors, onClick, children, ...rest }: Props) {
  const ctx = useOptionalTransition();
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || !ctx) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === pathname) return;
    e.preventDefault();
    ctx.navigate(url.pathname + url.search + url.hash, label, colors, index);
  }

  return (
    <Link href={href} onClick={handleClick} data-curtain-label={label} {...rest}>
      {children}
    </Link>
  );
}
