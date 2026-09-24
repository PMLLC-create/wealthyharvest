import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BrandMark } from "@/components/ui/BrandMark";
import { useCartId } from "@/context/CartContext";
import { useCart } from "@/hooks/useCart";

const NAV_ITEMS: { to: string; label: string }[] = [
  { to: "/shop", label: "Shop" },
  { to: "/wellness", label: "Wellness" },
  { to: "/preparedness", label: "Preparedness" },
  { to: "/digital-resources", label: "Digital Resources" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { openDrawer } = useCartId();
  const { cart } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" onClick={() => setIsMobileOpen(false)}>
          <BrandMark className="brand__mark" />
          <span className="brand__text">Wealthy Harvest</span>
        </Link>

        <nav
          className={`site-nav ${isMobileOpen ? "site-nav--open" : ""}`}
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="cart-trigger"
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={openDrawer}
          >
            Cart
            {itemCount > 0 && <span className="cart-trigger__count">{itemCount}</span>}
          </button>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={isMobileOpen}
            aria-controls="site-nav"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
