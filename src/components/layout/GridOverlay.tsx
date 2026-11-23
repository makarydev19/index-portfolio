"use client";

import { useEffect, useState } from "react";

/** Dev-only 12-col overlay, toggled with the G key. */
export function GridOverlay() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) setOn((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!on) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[500]">
      <div className="grid-site h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`h-full bg-signal/[0.06] ${i >= 4 ? "hidden md:block" : ""} ${i >= 8 ? "md:hidden lg:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
