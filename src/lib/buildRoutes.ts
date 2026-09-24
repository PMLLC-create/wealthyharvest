/**
 * Runs in the Node build process, imported by each dynamic route's
 * `getStaticPaths` in src/router.tsx — this is what tells vite-react-ssg
 * which concrete product/collection/article pages to prerender. Never
 * imported by client-rendered UI code, and NOT imported by
 * scripts/generate-sitemap.ts (that script deliberately scans the actual
 * `dist/` build output instead of re-fetching, to avoid drift — see its
 * own comment for why).
 *
 * If a Shopify request fails during build (e.g. bad credentials in CI),
 * this throws — deliberately. A silently-empty product catalog would
 * "succeed" but ship a shop with no product pages, which is worse than a
 * loud, early build failure.
 */
import { getAllProductHandles, getAllCollectionHandles } from "@/shopify/storefront";
import { getAllArticleSlugs } from "@/lib/content";

export async function getProductStaticPaths(): Promise<string[]> {
  const handles = await getAllProductHandles();
  return handles.map((handle) => `products/${handle}`);
}

export async function getCollectionStaticPaths(): Promise<string[]> {
  const handles = await getAllCollectionHandles();
  return handles.map((handle) => `collections/${handle}`);
}

export async function getArticleStaticPaths(): Promise<string[]> {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => `resources/${slug}`);
}
