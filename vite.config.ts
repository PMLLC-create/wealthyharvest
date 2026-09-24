import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "node:path";

// NOTE ON PORTABILITY (see README "Portability"): nothing in this file is
// GitHub Pages-specific. `base` defaults to "/" for a custom domain
// (wealthyharvest.com serves from the root). If this were ever deployed
// under a repo subpath instead of a custom domain, only `base` would
// need to change.

export default defineConfig({
  base: "/",
  plugins: [
    // Resources articles are authored as local .mdx files (see
    // src/lib/content.ts). remark-frontmatter + remark-mdx-frontmatter
    // let each file start with a YAML frontmatter block (title,
    // description, category, publishedAt) exposed as a named
    // `frontmatter` export alongside the compiled MDX component.
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react({ include: /\.(jsx|js|tsx|ts|mdx)$/ }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  ssgOptions: {
    // Our entry is main.tsx, not the vite-react-ssg default main.ts.
    entry: "src/main.tsx",
    script: "async",
    dirStyle: "nested",
    // NOTE: 'formatting: prettify' is documented to cause hydration
    // failures — deliberately left at the 'none' default. Dynamic route
    // enumeration is NOT configured here: each dynamic route
    // (products/:handle, collections/:handle, resources/:slug) declares
    // its own `getStaticPaths` in src/router.tsx, which is the
    // officially documented mechanism — vite-react-ssg's default
    // `includedRoutes` already combines those with the static routes
    // automatically, so no custom override is needed.
    //
    // Sitemap generation deliberately does NOT happen here via
    // `onFinished`: vite.config.ts is loaded by a separate Node/esbuild
    // step that does not apply this file's own `resolve.alias`, so
    // dynamically importing aliased app modules (like buildRoutes.ts,
    // which imports "@/shopify/...") from inside this config throws
    // ERR_MODULE_NOT_FOUND. See scripts/generate-sitemap.ts, run as its
    // own process (via the "build" script below) instead, which runs in
    // the app's real module context where aliases resolve correctly.
  },
  build: {
    outDir: "dist",
  },
});
