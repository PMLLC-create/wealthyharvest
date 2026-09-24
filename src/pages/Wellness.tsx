import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { useCollection } from "@/hooks/useCollection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/States";
import { EmptyState } from "@/components/ui/States";

/**
 * Expects a Shopify collection with the handle "wellness". If that
 * collection doesn't exist yet in Shopify, this shows an honest empty
 * state rather than inventing products — see architecture rule on
 * product data.
 */
export default function Wellness() {
  const { data: collection, isLoading } = useCollection("wellness");

  return (
    <div className="page-container">
      <Seo
        title="Wellness"
        description="Wealthy Harvest wellness products for everyday, sustainable living."
        path="/wellness"
      />

      <section className="page-intro">
        <h1>Wellness</h1>
        <p className="content-placeholder">
          [Wellness section introduction placeholder.] These statements have
          not been evaluated by the Food and Drug Administration. Products
          are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </section>

      <section className="section">
        {isLoading && <ProductGridSkeleton />}
        {!isLoading && collection && (
          <ProductGrid products={collection.products.nodes} />
        )}
        {!isLoading && !collection && (
          <EmptyState
            title="Wellness products are coming soon."
            description={
              <>
                Create a Shopify collection with the handle{" "}
                <code>wellness</code> to populate this page, or{" "}
                <Link to="/shop">browse all products</Link>.
              </>
            }
          />
        )}
      </section>
    </div>
  );
}
