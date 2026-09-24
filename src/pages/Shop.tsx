import { Seo } from "@/components/seo/Seo";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/States";
import { useProducts } from "@/hooks/useProducts";
import { useCollections } from "@/hooks/useCollections";
import { Link } from "react-router-dom";

export default function Shop() {
  const { data, isLoading, isError } = useProducts({ first: 48 });
  const { data: collections } = useCollections();

  return (
    <>
      <Seo
        title="Shop"
        description="Browse all Wealthy Harvest products — wellness, preparedness, and digital resources."
        path="/shop"
      />

      <section className="page-intro">
        <h1>Shop</h1>
        <p>Products are pulled directly from our Shopify catalog.</p>
      </section>

      {collections && collections.nodes.length > 0 && (
        <section className="section section--tight">
          <div className="filter-tabs">
            {collections.nodes.map((c) => (
              <Link key={c.id} to={`/collections/${c.handle}`}>
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        {isLoading && <ProductGridSkeleton count={12} />}
        {isError && (
          <p className="content-placeholder">
            Products couldn&rsquo;t be loaded. Check your Shopify configuration.
          </p>
        )}
        {data && <ProductGrid products={data.nodes} />}
      </section>
    </>
  );
}
