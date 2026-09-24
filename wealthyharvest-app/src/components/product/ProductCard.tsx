import { Link } from "react-router-dom";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import type { ProductCard as ProductCardType } from "@/shopify/types";

export function ProductCard({ product }: { product: ProductCardType }) {
  return (
    <Link to={`/products/${product.handle}`} className="product-card">
      <div className="product-card__media">
        {product.featuredImage ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            width={product.featuredImage.width ?? undefined}
            height={product.featuredImage.height ?? undefined}
            loading="lazy"
          />
        ) : (
          <div className="product-card__media-placeholder">Image coming soon</div>
        )}
      </div>
      <h3 className="product-card__title">{product.title}</h3>
      <PriceDisplay price={product.priceRange.minVariantPrice} />
      {!product.availableForSale && (
        <span className="product-card__badge">Sold out</span>
      )}
    </Link>
  );
}
