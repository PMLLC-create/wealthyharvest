import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/States";
import type { ProductCard as ProductCardType } from "@/shopify/types";

export function ProductGrid({ products }: { products: ProductCardType[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products here yet."
        description="Products added in Shopify will appear here automatically."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
