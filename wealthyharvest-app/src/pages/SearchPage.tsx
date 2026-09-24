import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/States";

/**
 * Client-side filter over the loaded product set. Shopify's Storefront
 * API does support a dedicated `search` query for larger catalogs — this
 * keeps things simple while the catalog is small, and can be swapped for
 * a real `predictiveSearch`/`search` query later without changing the
 * route or this component's shape.
 */
export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const { data, isLoading } = useProducts({ first: 100 });

  const results =
    data?.nodes.filter((p) =>
      p.title.toLowerCase().includes(query.trim().toLowerCase())
    ) ?? [];

  return (
    <div className="page-container">
      <Seo title="Search" path="/search" noindex />

      <h1>Search</h1>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setParams(query ? { q: query } : {});
        }}
        className="search-form"
      >
        <label htmlFor="search-input" className="visually-hidden">
          Search products
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products&hellip;"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <ProductGridSkeleton count={6} />}
      {!isLoading && query && <ProductGrid products={results} />}
      {!isLoading && !query && (
        <p className="content-placeholder">Enter a search term above.</p>
      )}
    </div>
  );
}
