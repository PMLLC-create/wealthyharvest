import type { Product, ProductVariant } from "@/shopify/types";

interface VariantSelectorProps {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionName: string, value: string) => void;
}

/**
 * Renders one control per product option (e.g. Size, Scent). Selecting a
 * value doesn't look up the matching variant itself — ProductDetail.tsx
 * derives the active ProductVariant from `selectedOptions` and passes
 * availability back down, since a given combination might not exist or
 * might be sold out.
 */
export function VariantSelector({
  product,
  selectedOptions,
  onChange,
}: VariantSelectorProps) {
  // Single-variant products with no real options (Shopify still reports
  // one synthetic "Title" option) don't need a selector UI at all.
  const hasRealOptions =
    product.options.length > 1 || product.options[0]?.name !== "Title";

  if (!hasRealOptions) return null;

  return (
    <div className="variant-selector">
      {product.options.map((option) => (
        <fieldset key={option.name} className="variant-selector__option">
          <legend>{option.name}</legend>
          <div className="variant-selector__values">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  className={`variant-pill ${isSelected ? "is-selected" : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => onChange(option.name, value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export function findMatchingVariant(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>
): ProductVariant | undefined {
  return variants.find((variant) =>
    variant.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
  );
}
