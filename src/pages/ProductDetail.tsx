import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import {
  StructuredData,
  productSchema,
  breadcrumbSchema,
} from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import {
  VariantSelector,
  findMatchingVariant,
} from "@/components/product/VariantSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { useProduct } from "@/hooks/useProduct";
import { absoluteUrl } from "@/lib/seoDefaults";
import type { Product } from "@/shopify/types";

export default function ProductDetail() {
  const loaderProduct = useLoaderData() as Product;
  // Seeded with the SSG-loaded product, then silently kept fresh on the
  // client (see useProduct.ts) — the loader data is what makes the
  // *prerendered* HTML file contain real content, not a spinner. The
  // `?? loaderProduct` fallback covers the brief instant before
  // TanStack Query's initialData is applied on the very first render.
  const { data } = useProduct(loaderProduct.handle, loaderProduct);
  const product = data ?? loaderProduct;

  const defaultOptions = useMemo(() => {
    const initial: Record<string, string> = {};
    for (const option of product.options) {
      initial[option.name] = option.values[0];
    }
    return initial;
  }, [product]);

  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string>>(defaultOptions);
  const [quantity, setQuantity] = useState(1);

  const activeVariant =
    findMatchingVariant(product.variants.nodes, selectedOptions) ??
    product.variants.nodes[0];

  const url = absoluteUrl(`/products/${product.handle}`);

  return (
    <>
      <Seo
        title={product.seo.title || product.title}
        description={product.seo.description || product.description}
        path={`/products/${product.handle}`}
        image={product.featuredImage?.url}
        type="product"
      />
      <StructuredData
        data={productSchema({
          name: product.title,
          description: product.description,
          image: product.featuredImage?.url,
          url,
          price: activeVariant?.price.amount,
          currency: activeVariant?.price.currencyCode,
          availability: activeVariant?.availableForSale,
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Shop", url: absoluteUrl("/shop") },
          { name: product.title, url },
        ])}
      />

      <div className="page-container">
        <Breadcrumbs
          items={[{ label: "Shop", to: "/shop" }, { label: product.title }]}
        />

        <div className="product-detail">
          <div className="product-detail__gallery">
            {product.images.nodes.length > 0 ? (
              product.images.nodes.map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt={image.altText ?? product.title}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))
            ) : (
              <div className="placeholder-block">
                <span>[ Product image placeholder ]</span>
              </div>
            )}
          </div>

          <div className="product-detail__info">
            <h1>{product.title}</h1>
            <PriceDisplay
              price={activeVariant?.price ?? product.priceRange.minVariantPrice}
              compareAtPrice={activeVariant?.compareAtPrice}
            />

            <div
              className="product-detail__description"
              // Product descriptions come from Shopify's own rich-text
              // editor output — merchant-controlled content, not
              // user-submitted, so rendering the HTML Shopify returns is
              // the standard, expected approach for storefronts.
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <VariantSelector
              product={product}
              selectedOptions={selectedOptions}
              onChange={(name, value) =>
                setSelectedOptions((prev) => ({ ...prev, [name]: value }))
              }
            />

            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              max={activeVariant?.quantityAvailable ?? undefined}
            />

            <AddToCartButton
              variantId={activeVariant?.id}
              quantity={quantity}
              availableForSale={activeVariant?.availableForSale ?? false}
            />

            <p className="wellness-disclaimer">
              *These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose,
              treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
