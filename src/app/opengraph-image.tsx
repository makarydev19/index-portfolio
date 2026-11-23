import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Front-end developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2F1ED",
          color: "#0D0D0D",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, fontFamily: "monospace" }}>
          <span>FRONT-END DEVELOPER — INDEX</span>
          <span style={{ width: 28, height: 28, background: "#FF3B14", display: "flex" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 2, background: "#0D0D0D", width: "100%", display: "flex", marginBottom: 24 }} />
          <span style={{ fontSize: 190, fontWeight: 600, letterSpacing: -10, lineHeight: 0.9 }}>{site.name}</span>
        </div>
      </div>
    ),
    size,
  );
}
