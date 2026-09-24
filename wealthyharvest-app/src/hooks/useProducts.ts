import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/shopify/storefront";

export function useProducts(options?: { first?: number }) {
  return useQuery({
    queryKey: ["products", options?.first ?? 24],
    queryFn: () => getProducts({ first: options?.first }),
  });
}
