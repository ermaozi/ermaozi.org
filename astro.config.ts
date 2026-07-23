import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

const BLOG_DIRECTORY = fileURLToPath(
  new URL("./src/data/blog/", import.meta.url),
);

const getBlogFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(directory, entry.name);

    if (entry.isDirectory()) return getBlogFiles(entryPath);
    return [".md", ".mdx"].includes(extname(entry.name)) ? [entryPath] : [];
  });

const getFrontmatterDate = (
  content: string,
  field: "pubDatetime" | "modDatetime",
) => {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const rawValue = frontmatter
    ?.match(new RegExp(`^${field}:\\s*(.+?)\\s*$`, "m"))?.[1]
    .trim()
    .replace(/^(['"])(.*)\1$/, "$2");

  if (!rawValue) return undefined;

  const timestamp = Date.parse(rawValue);
  return Number.isNaN(timestamp)
    ? undefined
    : new Date(timestamp).toISOString();
};

const postLastmodByPath = new Map<string, string>();

for (const filePath of getBlogFiles(BLOG_DIRECTORY)) {
  const content = readFileSync(filePath, "utf8");
  const lastmod =
    getFrontmatterDate(content, "modDatetime") ??
    getFrontmatterDate(content, "pubDatetime");

  if (!lastmod) continue;

  const postPath = `/posts/${relative(BLOG_DIRECTORY, filePath)
    .replace(/\.(md|mdx)$/, "")
    .split(sep)
    .join("/")}/`.toLocaleLowerCase("en-US");

  postLastmodByPath.set(postPath, lastmod);
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: (page) => SITE.showArchives || !page.endsWith("/archives"),
      serialize(item) {
        const pathname = decodeURIComponent(
          new URL(item.url).pathname,
        ).toLocaleLowerCase("en-US");
        const lastmod = postLastmodByPath.get(pathname);

        return lastmod ? { ...item, lastmod } : item;
      },
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
});
