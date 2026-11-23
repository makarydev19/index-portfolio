import type { Palette } from "@/content/types";

function luminance(hex: string) {
  const v = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Four full-width swatches; hex label picks ink or paper by relative luminance (threshold 0.4).
 * ANIMATION hooks: [data-swatch] (scaleY 0→1 from bottom), [data-swatch-label] (fade after).
 */
export function PaletteStrip({ palette, fonts }: { palette: Palette; fonts: string }) {
  const swatches = [
    { name: "Background", hex: palette.bg },
    { name: "Foreground", hex: palette.fg },
    { name: "Accent", hex: palette.accent },
    { name: "Extra", hex: palette.extra },
  ];
  return (
    <section aria-labelledby="palette-title">
      <div className="wrap-site flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h2 id="palette-title" className="mono text-muted" data-anim="fade-up">
          Palette &amp; type
        </h2>
        <p className="mono" data-anim="fade-up">
          Type — {fonts}
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-2 md:grid-cols-4">
        {swatches.map((s) => (
          <li
            key={s.name}
            data-swatch
            className="relative h-[120px] origin-bottom md:h-[240px]"
            style={{ backgroundColor: s.hex }}
          >
            <span
              data-swatch-label
              className="mono absolute bottom-3 left-4 md:bottom-4"
              style={{ color: luminance(s.hex) > 0.4 ? "#0D0D0D" : "#F2F1ED" }}
            >
              <span className="sr-only">{s.name}: </span>
              {s.hex}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
