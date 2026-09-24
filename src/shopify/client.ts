import { env } from "@/lib/env";

/**
 * Single fetch wrapper for the Shopify Storefront GraphQL API. Every query
 * and mutation in this project goes through this function — components
 * and hooks never call `fetch` against Shopify directly (see architecture
 * note in README "Shopify GraphQL architecture").
 *
 * Uses only the public Storefront Access Token. This function is safe to
 * call from both the build-time Node process (prerendering) and the
 * browser, since that token is designed for exactly this dual use.
 */

const ENDPOINT = `https://${env.VITE_SHOPIFY_STORE_DOMAIN}/api/${env.VITE_SHOPIFY_API_VERSION}/graphql.json`;

export class ShopifyApiError extends Error {
  constructor(
    message: string,
    public readonly errors?: unknown
  ) {
    super(message);
    this.name = "ShopifyApiError";
  }
}

export async function shopifyFetch<TData>(
  query: string,
  variables?: Record<string, unknown>
): Promise<TData> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new ShopifyApiError(
      `Shopify Storefront API request failed with status ${response.status}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    throw new ShopifyApiError("Shopify Storefront API returned errors", json.errors);
  }

  return json.data as TData;
}
