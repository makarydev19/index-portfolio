"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { formatTime, offsetLabel } from "@/lib/time";

/**
 * Live local time, e.g. "LISBON 14:32:07 GMT+0". SSR placeholder is --:--:--.
 * ANIMATION hook: colons are [data-clock-colon] (blink: opacity 1↔0.3, 1s steps).
 */
export function Clock({
  timeZone,
  city,
  showOffset = true,
  showCity = true,
  className,
}: {
  timeZone: string;
  city: string;
  showOffset?: boolean;
  showCity?: boolean;
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    const tick = () => setNow(new Date());
    tick();
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 1000);
    }, 1000 - (Date.now() % 1000));
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const time = now ? formatTime(now, timeZone) : "--:--:--";
  const [h, m, s] = time.split(":");

  return (
    <span className={cn("mono inline-flex gap-[0.6em] whitespace-nowrap", className)} data-clock>
      {showCity ? <span aria-hidden="true">{city}</span> : null}
      <time dateTime={now?.toISOString()} aria-live="off" suppressHydrationWarning>
        <span className="sr-only">Local time in {city}: </span>
        <span suppressHydrationWarning>{h}</span>
        <span aria-hidden="true" data-clock-colon>
          :
        </span>
        <span suppressHydrationWarning>{m}</span>
        <span aria-hidden="true" data-clock-colon>
          :
        </span>
        <span suppressHydrationWarning>{s}</span>
      </time>
      {showOffset ? (
        <span suppressHydrationWarning>{now ? offsetLabel(now, timeZone) : "GMT"}</span>
      ) : null}
    </span>
  );
}
