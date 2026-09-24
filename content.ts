import type { ComponentType } from "react";

/**
 * Content provider abstraction for Resources/Journal articles.
 *
 * WHY THIS FILE EXISTS: per the approved architecture, local MDX must not
 * become the permanent content-management solution. Every other part of
 * the app (pages, routing, SEO) talks only to the three functions below —
 * never directly to `import.meta.glob` or the filesystem. Swapping to a
 * real CMS later (Sanity, Contentful, Shopify metaobjects, etc.) means
 * rewriting the body of this one file to call that CMS's API instead —
 * nothing in src/pages or src/router.tsx needs to change, because they
 * only depend on the ArticleSummary/Article shapes below, not on where
 * the content came from.
 */

export interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string; // ISO date, e.g. "2026-09-01"
  coverImage?: string;
}

export interface Article extends ArticleSummary {
  /** The compiled MDX body, rendered directly as a component: <Content /> */
  Content: ComponentType;
}

// --- Local MDX implementation (current) ---
//
// Articles live as .mdx files in src/content/resources/, each starting
// with a YAML frontmatter block. New files are picked up automatically
// via import.meta.glob — no manual registration list to maintain.

interface MdxModule {
  default: ComponentType;
  frontmatter: Omit<ArticleSummary, "slug">;
}

const modules = import.meta.glob<MdxModule>("/src/content/resources/*.mdx", {
  eager: true,
});

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.mdx$/, "");
}

function loadAll(): Article[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      slug: slugFromPath(path),
      ...mod.frontmatter,
      Content: mod.default,
    }))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
  return loadAll().map(({ Content: _Content, ...summary }) => summary);
}

export async function getArticle(slug: string): Promise<Article | null> {
  return loadAll().find((a) => a.slug === slug) ?? null;
}

/** Build-time only — used by src/lib/buildRoutes.ts for prerendering. */
export async function getAllArticleSlugs(): Promise<string[]> {
  return loadAll().map((a) => a.slug);
}
