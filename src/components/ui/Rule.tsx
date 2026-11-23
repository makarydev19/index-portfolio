import { cn } from "@/lib/cn";

/** 1px hairline. ANIMATION: [data-anim="rule"] draws scaleX 0→1 from the left. */
export function Rule({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <div
      aria-hidden="true"
      data-anim="rule"
      className={cn("h-px w-full origin-left", tone === "ink" ? "bg-rule" : "bg-paper/20", className)}
    />
  );
}
