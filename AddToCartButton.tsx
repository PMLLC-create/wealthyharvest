import { useCart } from "@/hooks/useCart";

export function AddToCartButton({
  variantId,
  quantity,
  availableForSale,
}: {
  variantId: string | undefined;
  quantity: number;
  availableForSale: boolean;
}) {
  const { addItem, isAdding } = useCart();

  const disabled = !variantId || !availableForSale || isAdding;

  return (
    <button
      type="button"
      className="btn btn--primary btn--block"
      disabled={disabled}
      onClick={() => {
        if (!variantId) return;
        addItem({ merchandiseId: variantId, quantity });
      }}
    >
      {!availableForSale
        ? "Sold Out"
        : isAdding
          ? "Adding\u2026"
          : "Add to Cart"}
    </button>
  );
}
