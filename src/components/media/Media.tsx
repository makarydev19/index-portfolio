import Image from "next/image";
import { cn } from "@/lib/cn";
import type { MediaSource } from "@/content/types";
import { LumenCover } from "./covers/LumenCover";
import { KodoCover } from "./covers/KodoCover";
import { NocturneCover } from "./covers/NocturneCover";
import { VantaCover } from "./covers/VantaCover";
import { Portrait } from "./Portrait";
import { MediaVideo } from "./MediaVideo";

const ART = {
  lumen: LumenCover,
  kodo: KodoCover,
  nocturne: NocturneCover,
  vanta: VantaCover,
  portrait: Portrait,
} as const;

/**
 * The one swappable media slot. Always fills its parent (absolute inset 0, cover);
 * the parent owns the aspect ratio, so swapping art for an image causes no layout shift.
 */
export function Media({
  media,
  sizes = "100vw",
  priority = false,
  className,
}: {
  media: MediaSource;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const fill = cn("absolute inset-0 h-full w-full object-cover", className);

  if (media.kind === "svg") {
    const Art = ART[media.art];
    return <Art title={media.alt} className={fill} />;
  }

  if (media.kind === "image") {
    return <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className={fill} />;
  }

  return <MediaVideo src={media.src} poster={media.poster} alt={media.alt} className={fill} />;
}
