import { Head } from "vite-react-ssg";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/seoDefaults";

export interface SeoProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
}

/**
 * Every page in src/pages renders this once, with route-specific values.
 * `<Head>` is vite-react-ssg's own document-head component (a thin
 * wrapper around React Helmet, built specifically to work with its SSG
 * pipeline) — nested/later-rendered `<Head>` usages override earlier
 * ones for singular tags like <title>, which is exactly how this
 * component's page-level values end up overriding App.tsx's site-wide
 * defaults. Because the whole app is prerendered, these tags land in the
 * actual static HTML file for each route, not just a client-mutated
 * <head> that crawlers might miss.
 */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: SeoProps) {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type === "product" ? "product" : "website"} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
