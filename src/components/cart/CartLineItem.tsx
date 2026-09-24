import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import type { CartLine } from "@/shopify/types";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateItem, removeItem } = useCart();

  return (
    <li className="cart-line">
      {line.merchandise.image && (
        <img
          className="cart-line__image"
          src={line.merchandise.image.url}
          alt={line.merchandise.image.altText ?? line.merchandise.product.title}
        />
      )}
      <div className="cart-line__details">
        <Link to={`/products/${line.merchandise.product.handle}`}>
          {line.merchandise.product.title}
        </Link>
        {line.merchandise.title !== "Default Title" && (
          <p className="cart-line__variant">{line.merchandise.title}</p>
        )}
        <PriceDisplay price={line.merchandise.price} />
        <div className="cart-line__controls">
          <QuantitySelector
            quantity={line.quantity}
            onChange={(next) => updateItem({ id: line.id, quantity: next })}
            max={line.merchandise.quantityAvailable ?? undefined}
          />
          <button
            type="button"
            className="cart-line__remove"
            onClick={() => removeItem(line.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
