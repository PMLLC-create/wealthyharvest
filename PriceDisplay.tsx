import type { Money } from "@/shopify/types";

function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

export function PriceDisplay({
  price,
  compareAtPrice,
}: {
  price: Money;
  compareAtPrice?: Money | null;
}) {
  const onSale =
    compareAtPrice && Number(compareAtPrice.amount) > Number(price.amount);

  return (
    <span className="price-display">
      <span className={onSale ? "price price--sale" : "price"}>
        {formatMoney(price)}
      </span>
      {onSale && (
        <span className="price price--compare" aria-label="Original price">
          {formatMoney(compareAtPrice!)}
        </span>
      )}
    </span>
  );
}
