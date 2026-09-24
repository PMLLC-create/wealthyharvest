export function QuantitySelector({
  quantity,
  onChange,
  max,
}: {
  quantity: number;
  onChange: (next: number) => void;
  max?: number | null;
}) {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
      >
        &minus;
      </button>
      <output aria-live="polite">{quantity}</output>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(max ? Math.min(max, quantity + 1) : quantity + 1)}
        disabled={max != null && quantity >= max}
      >
        +
      </button>
    </div>
  );
}
