/**
 * Run after `vite-react-ssg build` (see package.json "build" script), as
 * its own plain-Node process via `tsx`.
 *
 * Deliberately does NOT re-derive the route list by re-calling Shopify or
 * re-reading local content (that would be a second, independent fetch
 * that could drift from whatever the actual SSG build saw — e.g. a
 * product added between the two calls). Instead this scans `dist/` for
 * the `index.html` files vite-react-ssg already generated, which is the
 * one definitive source of truth for "what got built." It also can't hit
 * the `import.meta.glob` / `import.meta.env`-under-plain-Node problems
 * that a re-fetch approach ran into, since it does no Vite-specific work
 * at all beyond reading SITE_URL.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { SITE_URL } from "../src/lib/env";

const DIST_DIR = path.resolve(process.cwd(), "dist");

// Routes that exist but are intentionally marked noindex in their own
// <Seo> usage (see src/pages/CartPage.tsx, SearchPage.tsx) — no stable
// content worth listing in a sitemap.
const EXCLUDED_ROUTES = new Set(["/cart", "/search"]);

async function findHtmlRoutes(dir: string, base = ""): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "assets") continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      routes.push(...(await findHtmlRoutes(fullPath, `${base}/${entry.name}`)));
    } else if (entry.name === "index.html") {
      routes.push(base === "" ? "/" : base);
    }
  }

  return routes;
}

async function main() {
  const allRoutes = await findHtmlRoutes(DIST_DIR);
  const routes = allRoutes.filter((r) => !EXCLUDED_ROUTES.has(r)).sort();

  const urls = routes.map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await writeFile(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
  // eslint-disable-next-line no-console
  console.log(`[sitemap] wrote ${routes.length} URLs to dist/sitemap.xml`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to generate sitemap.xml:", err);
  process.exit(1);
});
