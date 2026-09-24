import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCartLines,
} from "@/shopify/storefront";
import { useCartId } from "@/context/CartContext";
import type { Cart } from "@/shopify/types";

const CART_QUERY_KEY = ["cart"];

/**
 * Single hook for all cart reads/writes. Handles the "expired or missing
 * cart id" case transparently: if the stored cart id no longer resolves
 * to a real Shopify cart, a fresh one is created and the stale id is
 * replaced rather than surfacing an error to the UI.
 */
export function useCart() {
  const { cartId, setCartId, openDrawer } = useCartId();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: [...CART_QUERY_KEY, cartId],
    queryFn: async (): Promise<Cart | null> => {
      if (!cartId) return null;
      const cart = await getCart(cartId);
      if (!cart) {
        // Stored id is stale (expired/deleted cart) — clear it so the
        // next add-to-cart lazily creates a fresh one.
        setCartId(null);
        return null;
      }
      return cart;
    },
    enabled: cartId !== null,
  });

  function updateCache(cart: Cart) {
    queryClient.setQueryData([...CART_QUERY_KEY, cart.id], cart);
  }

  const addMutation = useMutation({
    mutationFn: async (line: { merchandiseId: string; quantity: number }) => {
      if (!cartId) {
        const cart = await createCart([line]);
        setCartId(cart.id);
        return cart;
      }
      return addToCart(cartId, [line]);
    },
    onSuccess: (cart) => {
      updateCache(cart);
      openDrawer();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (line: { id: string; quantity: number }) => {
      if (!cartId) throw new Error("No active cart");
      return updateCartLines(cartId, [line]);
    },
    onSuccess: updateCache,
  });

  const removeMutation = useMutation({
    mutationFn: (lineId: string) => {
      if (!cartId) throw new Error("No active cart");
      return removeFromCart(cartId, [lineId]);
    },
    onSuccess: updateCache,
  });

  return {
    cart: cartQuery.data ?? null,
    isLoading: cartQuery.isLoading,
    addItem: addMutation.mutate,
    isAdding: addMutation.isPending,
    updateItem: updateMutation.mutate,
    removeItem: removeMutation.mutate,
  };
}
