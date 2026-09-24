import {
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_FRAGMENT,
  COLLECTION_CARD_FRAGMENT,
  IMAGE_FRAGMENT,
  CART_FRAGMENT,
} from "./fragments";

export const GET_PRODUCTS = /* GraphQL */ `
  query GetProducts($first: Int = 24, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        ...ProductCardFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTIONS = /* GraphQL */ `
  query GetCollections($first: Int = 20, $after: String) {
    collections(first: $first, after: $after) {
      nodes {
        ...CollectionCardFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${COLLECTION_CARD_FRAGMENT}
`;

export const GET_COLLECTION_BY_HANDLE = /* GraphQL */ `
  query GetCollectionByHandle($handle: String!, $first: Int = 24, $after: String) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      updatedAt
      image {
        ...ImageFragment
      }
      seo {
        title
        description
      }
      products(first: $first, after: $after) {
        nodes {
          ...ProductCardFragment
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

/**
 * Lightweight, build-time-only queries. Used exclusively by
 * src/lib/buildRoutes.ts to enumerate handles for prerendering — never
 * imported by runtime UI code, so keep these minimal (handle + updatedAt
 * only) to keep the prerender step fast.
 */
export const GET_ALL_PRODUCT_HANDLES = /* GraphQL */ `
  query GetAllProductHandles($first: Int = 250, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        handle
        updatedAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_COLLECTION_HANDLES = /* GraphQL */ `
  query GetAllCollectionHandles($first: Int = 250, $after: String) {
    collections(first: $first, after: $after) {
      nodes {
        handle
        updatedAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_CART = /* GraphQL */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;
