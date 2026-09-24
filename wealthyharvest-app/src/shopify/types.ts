// Shapes are intentionally narrow — only the fields this app actually
// queries (matching fragments.ts) — rather than a full Storefront API
// schema mirror. Extend alongside fragments.ts as new fields are needed.

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductCard {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  availableForSale: boolean;
}

export interface Product extends ProductCard {
  descriptionHtml: string;
  images: { nodes: ShopifyImage[] };
  options: ProductOption[];
  variants: { nodes: ProductVariant[] };
  seo: { title: string | null; description: string | null };
  updatedAt: string;
}

export interface CollectionCard {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
}

export interface Collection extends CollectionCard {
  descriptionHtml: string;
  seo: { title: string | null; description: string | null };
  products: { nodes: ProductCard[] };
  updatedAt: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface Connection<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

// --- Cart ---

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: { handle: string; title: string };
  };
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { nodes: CartLine[] };
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
}

export interface UserError {
  field: string[] | null;
  message: string;
}
