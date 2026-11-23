"use client";

import { gsap } from "@/lib/gsap";
import { $, onceInView, type Kit } from "./kit";

/**
 * Target stats (DESIGN.md §5.11): numbers count 0 → value with tabular nums, labels fade.
 * The final values are server-rendered, so no-JS and reduced motion show them as-is.
 */
export function setupCountUp(scope: HTMLElement, kit: Kit) {
  const nodes = $(scope, "[data-count]");
  if (!nodes.length) return;
  const group = nodes[0].closest("section") ?? nodes[0];
  const labels = $(group, "[data-stat-label]");
  const finals = nodes.map((n) => n.textContent ?? "");

  const render = (n: HTMLElement, v: number) => {
    n.textContent = v.toFixed(parseInt(n.dataset.decimals ?? "0", 10));
  };

  nodes.forEach((n) => render(n, parseFloat(n.dataset.count ?? "0") === 0 ? 0.99 : 0));
  gsap.set(labels, { opacity: 0 });

  onceInView(
    kit,
    group,
    () => {
      nodes.forEach((n) => {
        const target = parseFloat(n.dataset.count ?? "0");
        const decimals = parseInt(n.dataset.decimals ?? "0", 10);
        const proxy = { v: target === 0 ? 0.99 : 0 };
        // CLS (0.00) counts down from 0.99 so the stat still visibly "settles".
        gsap.to(proxy, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: decimals ? 1 / 10 ** decimals : 1 },
          onUpdate: () => render(n, proxy.v),
        });
      });
      gsap.to(labels, { opacity: 1, duration: 0.8, stagger: 0.08, delay: 0.3 });
    },
    "top 80%",
  );

  kit.onDispose(() => nodes.forEach((n, i) => (n.textContent = finals[i])));
}
