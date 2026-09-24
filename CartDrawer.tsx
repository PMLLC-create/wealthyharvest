import { useCartId } from "@/context/CartContext";
import { useCart } from "@/hooks/useCart";
import { CartLineItem } from "./CartLineItem";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { EmptyState } from "@/components/ui/States";

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer } = useCartId();
  const { cart, isLoading } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={closeDrawer}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-label="Shopping cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>
          <button
            type="button"
            aria-label="Close cart"
            className="cart-drawer__close"
            onClick={closeDrawer}
          >
            &times;
          </button>
        </div>

        <div className="cart-drawer__body">
          {isLoading && <p>Loading cart&hellip;</p>}

          {!isLoading && (!cart || cart.lines.nodes.length === 0) && (
            <EmptyState title="Your cart is empty." />
          )}

          {!isLoading && cart && cart.lines.nodes.length > 0 && (
            <ul className="cart-drawer__lines">
              {cart.lines.nodes.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>
          )}
        </div>

        {cart && cart.lines.nodes.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <PriceDisplay price={cart.cost.subtotalAmount} />
            </div>
            <p className="cart-drawer__note">
              Shipping, taxes, and discounts are calculated at checkout.
            </p>
            <a href={cart.checkoutUrl} className="btn btn--primary btn--block">
              Checkout with Shopify
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
