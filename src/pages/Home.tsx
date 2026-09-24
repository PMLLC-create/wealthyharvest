import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/States";
import { useProducts } from "@/hooks/useProducts";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

const SHOP_CATEGORIES = [
  { to: "/wellness", label: "Wellness", description: "Everyday wellness essentials." },
  {
    to: "/preparedness",
    label: "Preparedness",
    description: "Practical provision and preparedness resources.",
  },
  {
    to: "/digital-resources",
    label: "Digital Resources",
    description: "Guides, workbooks, and educational resources.",
  },
];

export default function Home() {
  const { data, isLoading, isError } = useProducts({ first: 8 });

  return (
    <>
      <Seo
        title="Wealthy Harvest™ | Building Abundant Lives"
        description="Wealthy Harvest helps people build abundant, prepared, purposeful lives through wellness, provision, and preparedness resources."
        path="/"
      />

      {/* 1. Hero */}
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Wealthy Harvest&trade;</p>
          <h1>Building Abundant Lives</h1>
          <p className="hero__lede">
            Wealthy Harvest helps people build abundant, prepared, purposeful
            lives &mdash; through wellness, provision, and preparedness.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn--primary">
              Shop Wealthy Harvest
            </Link>
            <Link to="/about" className="btn btn--secondary">
              Our Story
            </Link>
          </div>
          <p className="hero__tagline">
            Wellness &bull; Provision &bull; Preparedness &bull; Purpose
          </p>
        </div>
        <div className="hero__media placeholder-block" aria-hidden="true">
          <span>[ Editorial photography placeholder ]</span>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="section section--narrow">
        <h2>What is Wealthy Harvest?</h2>
        <p>
          Wealthy Harvest is a Kingdom-based brand focused on helping people
          build abundant, prepared, purposeful lives &mdash; through practical
          wellness products, provision, and preparedness resources.{" "}
          <span className="content-placeholder">
            [Founder introduction copy placeholder &mdash; not yet supplied.]
          </span>
        </p>
      </section>

      {/* 3. Featured products (dynamic from Shopify) */}
      <section className="section">
        <div className="section__head">
          <h2>Featured Products</h2>
          <Link to="/shop">Shop all &rarr;</Link>
        </div>
        {isLoading && <ProductGridSkeleton />}
        {isError && (
          <p className="content-placeholder">
            Products couldn&rsquo;t be loaded. Check your Shopify configuration
            in <code>.env.local</code>.
          </p>
        )}
        {data && <ProductGrid products={data.nodes} />}
      </section>

      {/* 4. Shop categories */}
      <section className="section section--beige">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {SHOP_CATEGORIES.map((cat) => (
            <Link key={cat.to} to={cat.to} className="category-card">
              <h3>{cat.label}</h3>
              <p>{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5–7. Wellness / Preparedness / Digital Resources highlight */}
      <section className="section section--narrow">
        <h2>Wellness, Preparedness &amp; Digital Resources</h2>
        <p className="content-placeholder">
          [Section copy placeholder &mdash; introduce Wellness, Preparedness,
          and Digital Resources here once messaging is finalized.]
        </p>
      </section>

      {/* 8. Purpose / mission */}
      <section className="section section--green">
        <h2>Our Purpose</h2>
        <p className="content-placeholder">
          [Mission statement placeholder &mdash; not yet supplied.]
        </p>
      </section>

      {/* 9. Founder section */}
      <section className="section section--narrow founder-section">
        <div className="placeholder-block founder-section__photo" aria-hidden="true">
          <span>[ Founder photo placeholder ]</span>
        </div>
        <div>
          <h2>From Our Founder</h2>
          <p className="content-placeholder">
            [Founder biography for Quintina Simpson Njoku &mdash; not yet
            supplied. No biographical details have been invented.]
          </p>
        </div>
      </section>

      {/* 10. Educational resources */}
      <section className="section">
        <div className="section__head">
          <h2>From the Resource Library</h2>
          <Link to="/resources">View all &rarr;</Link>
        </div>
        <p className="content-placeholder">
          [Recent articles will surface here as they&rsquo;re published — see
          the Resources page.]
        </p>
      </section>

      {/* 11. Newsletter */}
      <section className="section section--beige section--narrow">
        <h2>Stay Connected</h2>
        <p>Get new resources, products, and updates from Wealthy Harvest.</p>
        <NewsletterSignup />
      </section>

      {/* 12. Final CTA */}
      <section className="section section--cta">
        <h2>Start Building an Abundant Life</h2>
        <Link to="/shop" className="btn btn--primary">
          Shop Wealthy Harvest
        </Link>
      </section>
    </>
  );
}
