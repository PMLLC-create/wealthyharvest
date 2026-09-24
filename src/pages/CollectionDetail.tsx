import { useLoaderData } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import {
  StructuredData,
  breadcrumbSchema,
} from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useCollection } from "@/hooks/useCollection";
import { absoluteUrl } from "@/lib/seoDefaults";
import type { Collection } from "@/shopify/types";

export default function CollectionDetail() {
  const loaderCollection = useLoaderData() as Collection;
  const { data } = useCollection(loaderCollection.handle, loaderCollection);
  const collection = data ?? loaderCollection;

  const url = absoluteUrl(`/collections/${collection.handle}`);

  return (
    <>
      <Seo
        title={collection.seo.title || collection.title}
        description={collection.seo.description || collection.description}
        path={`/collections/${collection.handle}`}
        image={collection.image?.url}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Shop", url: absoluteUrl("/shop") },
          { name: collection.title, url },
        ])}
      />

      <div className="page-container">
        <Breadcrumbs
          items={[{ label: "Shop", to: "/shop" }, { label: collection.title }]}
        />

        <section className="page-intro">
          <h1>{collection.title}</h1>
          {collection.descriptionHtml && (
            <div
              dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
            />
          )}
        </section>

        <section className="section">
          <ProductGrid products={collection.products.nodes} />
        </section>
      </div>
    </>
  );
}
