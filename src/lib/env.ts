import { z } from "zod";

/**
 * All three of these are read at BUILD TIME (by the Node process running
 * `vite-react-ssg build`, for prerendering) and again bundled into the
 * CLIENT JS (for post-hydration refetching). Both uses are intentional —
 * see README "Environment variables". None of these values are secret:
 * the Storefront API access token is a public, domain-scoped token
 * designed to be shipped in browser code. Never add an Admin API token
 * here or anywhere else in `src/`.
 */
const envSchema = z.object({
  VITE_SHOPIFY_STORE_DOMAIN: z
    .string()
    .min(1, "VITE_SHOPIFY_STORE_DOMAIN is required (e.g. your-store.myshopify.com)"),
  VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN: z
    .string()
    .min(1, "VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN is required"),
  VITE_SHOPIFY_API_VERSION: z
    .string()
    .min(1, "VITE_SHOPIFY_API_VERSION is required (e.g. 2026-07)"),
});

function readEnv() {
  // Under Vite (the app itself, in the browser or during vite-react-ssg's
  // SSR build), `import.meta.env` is always populated. Under plain Node
  // — specifically scripts/generate-sitemap.ts, run via bare `tsx` after
  // the build rather than through Vite's own pipeline — `import.meta.env`
  // doesn't exist at all, so fall back to `process.env`, which is what
  // both GitHub Actions secrets and a locally-exported .env.local end up
  // populating either way.
  const viteEnv: Record<string, string | undefined> =
    (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
  const processEnv: Record<string, string | undefined> =
    typeof process !== "undefined" ? process.env : {};

  const raw = {
    VITE_SHOPIFY_STORE_DOMAIN:
      viteEnv.VITE_SHOPIFY_STORE_DOMAIN ?? processEnv.VITE_SHOPIFY_STORE_DOMAIN,
    VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      viteEnv.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
      processEnv.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    VITE_SHOPIFY_API_VERSION:
      viteEnv.VITE_SHOPIFY_API_VERSION ?? processEnv.VITE_SHOPIFY_API_VERSION,
  };

  const result = envSchema.safeParse(raw);

  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join("\n");
    // Fail loudly and early (at build time or on first client render)
    // rather than surfacing confusing downstream Shopify API errors.
    throw new Error(
      `Invalid or missing Shopify environment configuration:\n${message}\n\n` +
        `Copy .env.example to .env.local and fill in real values, or set ` +
        `these as GitHub Actions secrets for CI builds.`
    );
  }

  return result.data;
}

export const env = readEnv();

export const SITE_URL = "https://wealthyharvest.com";
