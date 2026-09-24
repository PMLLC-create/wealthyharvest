import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const CART_ID_STORAGE_KEY = "wealthy-harvest:cart-id";

interface CartIdContextValue {
  cartId: string | null;
  setCartId: (id: string | null) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartIdContext = createContext<CartIdContextValue | null>(null);

/**
 * Holds only the cart ID (persisted to localStorage) and drawer
 * open/closed UI state. The actual cart CONTENTS live in React Query
 * (see useCart.ts) — this context's job is just remembering which cart
 * belongs to this browser across visits, and is never touched during
 * prerendering (guarded by the `typeof window` check below).
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartIdState] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(CART_ID_STORAGE_KEY);
    if (stored) setCartIdState(stored);
  }, []);

  function setCartId(id: string | null) {
    setCartIdState(id);
    if (typeof window === "undefined") return;
    if (id) window.localStorage.setItem(CART_ID_STORAGE_KEY, id);
    else window.localStorage.removeItem(CART_ID_STORAGE_KEY);
  }

  return (
    <CartIdContext.Provider
      value={{
        cartId,
        setCartId,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </CartIdContext.Provider>
  );
}

export function useCartId() {
  const ctx = useContext(CartIdContext);
  if (!ctx) throw new Error("useCartId must be used within a CartProvider");
  return ctx;
}
