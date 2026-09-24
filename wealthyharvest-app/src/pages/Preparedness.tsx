import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { useCollection } from "@/hooks/useCollection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton, EmptyState } from "@/components/ui/States";

export default function Preparedness() {
  const { data: collection, isLoading } = useCollection("preparedness");

  return (
    <div className="page-container">
      <Seo
        title="Preparedness"
        description="Practical provision and preparedness resources from Wealthy Harvest."
        path="/preparedness"
      />

      <section className="page-intro">
        <h1>Preparedness</h1>
        <p className="content-placeholder">
          [Preparedness section introduction placeholder &mdash; practical
          preparation, provision, resources, and planning.]
        </p>
      </section>

      <section className="section">
        {isLoading && <ProductGridSkeleton />}
        {!isLoading && collection && (
          <ProductGrid products={collection.products.nodes} />
        )}
        {!isLoading && !collection && (
          <EmptyState
            title="Preparedness products are coming soon."
            description={
              <>
                Create a Shopify collection with the handle{" "}
                <code>preparedness</code> to populate this page, or{" "}
                <Link to="/shop">browse all products</Link>.
              </>
            }
          />
        )}
      </section>
    </div>
  );
}
