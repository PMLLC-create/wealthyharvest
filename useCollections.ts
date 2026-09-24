import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/shopify/storefront";

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
}
