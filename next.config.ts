import type { NextConfig } from "next";

// Note: `cacheComponents` (on by default in the scaffold) is intentionally disabled.
// It keeps previously visited routes mounted inside React <Activity>, which would
// duplicate #main / #contact in the DOM and leave GSAP ScrollTriggers alive on
// hidden pages. Every route here is fully static via generateStaticParams anyway.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
