import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_ORIGIN, BASE_SEGMENT } from "./deploy-path.mjs";

export default defineConfig({
  site: SITE_ORIGIN,
  base: `/${BASE_SEGMENT}`,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
