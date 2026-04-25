import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "github-dark-default" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Wotfard",
        cssVariable: "--font-wotfard",
        fallbacks: ["sans-serif"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/wotfard-regular-webfont.woff2"],
            },
          ],
        },
      },
      {
        name: "Sriracha",
        cssVariable: "--font-sriracha",
        fallbacks: ["cursive"],
        provider: fontProviders.google(),
      },
      {
        name: "Cartograph CF",
        cssVariable: "--font-cartograph",
        fallbacks: ["monospace"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/cartograph-cf-regular-webfont.woff2"],
            },
          ],
        },
      },
      {
        name: "Cascadia Code",
        cssVariable: "--font-cascadia-code",
        fallbacks: ["monospace"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/cascadia-code.woff2"],
            },
          ],
        },
      },
    ],
  },
});
