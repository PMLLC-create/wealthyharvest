import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/shopify/storefront";
import type { Product } from "@/shopify/types";

export function useProduct(handle: string, initialData?: Product) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async (): Promise<Product> => {
      const product = await getProduct(handle);
      if (!product) throw new Error(`Product not found: ${handle}`);
      return product;
    },
    initialData,
    // The prerendered page already embedded this product via the route
    // loader (see router.tsx), so treat that snapshot as fresh for a few
    // seconds before silently revalidating in the background.
    staleTime: 5_000,
  });
}
