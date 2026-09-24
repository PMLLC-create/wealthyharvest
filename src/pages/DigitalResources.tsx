import { Seo } from "@/components/seo/Seo";
import { EmptyState } from "@/components/ui/States";

/**
 * The architecture supports future digital products (PDFs, guides,
 * workbooks, courses, downloads) but none exist yet — per instructions,
 * this shows an honest empty state rather than inventing products.
 * Once digital products exist in Shopify (as regular products, or via
 * a dedicated "digital-resources" collection), wire this page the same
 * way as Wellness.tsx/Preparedness.tsx.
 */
export default function DigitalResources() {
  return (
    <div className="page-container">
      <Seo
        title="Digital Resources"
        description="Guides, workbooks, and educational resources from Wealthy Harvest."
        path="/digital-resources"
      />

      <section className="page-intro">
        <h1>Digital Resources</h1>
        <p className="content-placeholder">
          [Digital Resources introduction placeholder.]
        </p>
      </section>

      <section className="section">
        <EmptyState
          title="Digital resources are coming soon."
          description="PDFs, guides, workbooks, and courses will appear here once they're added to Shopify."
        />
      </section>
    </div>
  );
}
