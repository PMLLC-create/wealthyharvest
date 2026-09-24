import { Seo } from "@/components/seo/Seo";
import { useCart } from "@/hooks/useCart";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { EmptyState } from "@/components/ui/States";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, isLoading } = useCart();

  return (
    <div className="page-container">
      <Seo title="Your Cart" path="/cart" noindex />

      <h1>Your Cart</h1>

      {isLoading && <p>Loading cart&hellip;</p>}

      {!isLoading && (!cart || cart.lines.nodes.length === 0) && (
        <EmptyState
          title="Your cart is empty."
          description="Browse the shop to find something for your household."
        />
      )}

      {!isLoading && cart && cart.lines.nodes.length > 0 && (
        <div className="cart-page">
          <ul className="cart-page__lines">
            {cart.lines.nodes.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>

          <div className="cart-page__summary">
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
            <Link to="/shop" className="btn btn--secondary btn--block">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
