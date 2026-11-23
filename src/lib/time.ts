/** Formats HH:MM:SS for a time zone (24h). */
export function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

/** "GMT+0", "GMT+1", "GMT-3:30" for a time zone at a given instant. */
export function offsetLabel(date: Date, timeZone: string): string {
  const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  if (!part || part === "GMT") return "GMT+0";
  return part;
}

/** ISO-ish string for <time dateTime>. */
export function isoTime(date: Date): string {
  return date.toISOString();
}
