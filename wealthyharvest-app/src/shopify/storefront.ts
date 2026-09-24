import { shopifyFetch } from "./client";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  GET_ALL_PRODUCT_HANDLES,
  GET_ALL_COLLECTION_HANDLES,
  GET_CART,
} from "./queries";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
} from "./mutations";
import type {
  Cart,
  Collection,
  CollectionCard,
  Connection,
  Product,
  ProductCard,
  UserError,
} from "./types";

// --- Reads ---

export async function getProducts(options?: {
  first?: number;
  after?: string;
}): Promise<Connection<ProductCard>> {
  const data = await shopifyFetch<{ products: Connection<ProductCard> }>(
    GET_PRODUCTS,
    { first: options?.first ?? 24, after: options?.after }
  );
  return data.products;
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: Product | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
  return data.product;
}

export async function getCollections(options?: {
  first?: number;
  after?: string;
}): Promise<Connection<CollectionCard>> {
  const data = await shopifyFetch<{ collections: Connection<CollectionCard> }>(
    GET_COLLECTIONS,
    { first: options?.first ?? 20, after: options?.after }
  );
  return data.collections;
}

export async function getCollection(
  handle: string,
  options?: { first?: number; after?: string }
): Promise<Collection | null> {
  const data = await shopifyFetch<{ collection: Collection | null }>(
    GET_COLLECTION_BY_HANDLE,
    { handle, first: options?.first ?? 24, after: options?.after }
  );
  return data.collection;
}

/**
 * Build-time only: walks every product handle via pagination. Used by
 * src/lib/buildRoutes.ts to generate one prerendered route per product.
 * Not used by any runtime UI component.
 */
export async function getAllProductHandles(): Promise<string[]> {
  const handles: string[] = [];
  let after: string | undefined;

  for (;;) {
    const data = await shopifyFetch<{
      products: Connection<{ handle: string; updatedAt: string }>;
    }>(GET_ALL_PRODUCT_HANDLES, { first: 250, after });

    handles.push(...data.products.nodes.map((n) => n.handle));

    if (!data.products.pageInfo.hasNextPage) break;
    after = data.products.pageInfo.endCursor ?? undefined;
  }

  return handles;
}

/** Build-time only — see getAllProductHandles. */
export async function getAllCollectionHandles(): Promise<string[]> {
  const handles: string[] = [];
  let after: string | undefined;

  for (;;) {
    const data = await shopifyFetch<{
      collections: Connection<{ handle: string; updatedAt: string }>;
    }>(GET_ALL_COLLECTION_HANDLES, { first: 250, after });

    handles.push(...data.collections.nodes.map((n) => n.handle));

    if (!data.collections.pageInfo.hasNextPage) break;
    after = data.collections.pageInfo.endCursor ?? undefined;
  }

  return handles;
}

// --- Cart ---

interface CartPayload {
  cart: Cart | null;
  userErrors: UserError[];
}

function assertNoUserErrors(userErrors: UserError[]) {
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join("; "));
  }
}

export async function createCart(lines?: {
  merchandiseId: string;
  quantity: number;
}[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: CartPayload }>(CART_CREATE, {
    lines,
  });
  assertNoUserErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new Error("Shopify did not return a cart");
  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>(GET_CART, { cartId });
  return data.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: CartPayload }>(
    CART_LINES_ADD,
    { cartId, lines }
  );
  assertNoUserErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) throw new Error("Shopify did not return a cart");
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartPayload }>(
    CART_LINES_UPDATE,
    { cartId, lines }
  );
  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart)
    throw new Error("Shopify did not return a cart");
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: CartPayload }>(
    CART_LINES_REMOVE,
    { cartId, lineIds }
  );
  assertNoUserErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart)
    throw new Error("Shopify did not return a cart");
  return data.cartLinesRemove.cart;
}
