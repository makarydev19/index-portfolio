export type CurtainColors = { bg: string; fg: string; accent: string };
export type TransitionPhase = "idle" | "covering" | "covered";
export type TransitionTarget = { href: string; label: string; index?: string; colors: CurtainColors };

export const DEFAULT_CURTAIN: CurtainColors = { bg: "#0D0D0D", fg: "#F2F1ED", accent: "#FF3B14" };
