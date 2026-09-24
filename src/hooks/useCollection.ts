import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/shopify/storefront";
import type { Collection } from "@/shopify/types";

export function useCollection(handle: string, initialData?: Collection) {
  return useQuery({
    queryKey: ["collection", handle],
    queryFn: async (): Promise<Collection> => {
      const collection = await getCollection(handle);
      if (!collection) throw new Error(`Collection not found: ${handle}`);
      return collection;
    },
    initialData,
    staleTime: 5_000,
  });
}
