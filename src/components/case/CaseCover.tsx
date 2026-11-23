import type { Project } from "@/content/types";
import { Media } from "@/components/media/Media";

/**
 * Full-bleed cover (16:9 desktop / 4:5 mobile).
 * ANIMATION hooks: [data-case-cover] frame with [data-anim="clip-reveal"] (inset 14% 10% → 0),
 * [data-anim-inner] (scale 1.15→1), inner SVG [data-depth] layers, VANTA [data-sweep],
 * NOCTURNE [data-bar][data-order].
 */
export function CaseCover({ project: p }: { project: Project }) {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden md:aspect-video"
      style={{ backgroundColor: p.palette.bg }}
      data-case-cover
      data-art={p.cover.kind === "svg" ? p.cover.art : undefined}
      data-anim="clip-reveal"
    >
      <div className="absolute inset-0" data-anim-inner>
        <Media media={p.cover} priority sizes="100vw" />
      </div>
    </div>
  );
}
