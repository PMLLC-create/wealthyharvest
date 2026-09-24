import { Link } from "react-router-dom";
import { BrandMark } from "@/components/ui/BrandMark";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="brand">
            <BrandMark className="brand__mark" />
            <span className="brand__text">Wealthy Harvest</span>
          </Link>
          <p className="site-footer__tagline">
            Wellness &bull; Provision &bull; Preparedness &bull; Purpose
          </p>
          <NewsletterSignup />
        </div>

        <nav className="site-footer__col" aria-label="Shop">
          <h2>Shop</h2>
          <Link to="/shop">All Products</Link>
          <Link to="/wellness">Wellness</Link>
          <Link to="/preparedness">Preparedness</Link>
          <Link to="/digital-resources">Digital Resources</Link>
        </nav>

        <nav className="site-footer__col" aria-label="Company">
          <h2>Company</h2>
          <Link to="/about">About</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>Wealthy Harvest&trade; &mdash; Building Abundant Lives</span>
        <span>&copy; {new Date().getFullYear()} Wealthy Harvest. All rights reserved.</span>
      </div>
    </footer>
  );
}
