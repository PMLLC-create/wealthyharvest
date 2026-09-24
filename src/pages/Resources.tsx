import { useLoaderData, Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import type { ArticleSummary } from "@/lib/content";
import { EmptyState } from "@/components/ui/States";

export default function Resources() {
  const articles = useLoaderData() as ArticleSummary[];

  return (
    <div className="page-container">
      <Seo
        title="Resources"
        description="Articles and educational resources from Wealthy Harvest on wellness, provision, preparedness, and purpose."
        path="/resources"
      />

      <section className="page-intro">
        <h1>Resources</h1>
        <p>
          Articles and educational content on wellness, provision,
          preparedness, and purpose.
        </p>
      </section>

      <section className="section">
        {articles.length === 0 && <EmptyState title="Articles are coming soon." />}
        {articles.length > 0 && (
          <ul className="article-grid">
            {articles.map((article) => (
              <li key={article.slug} className="article-card">
                <Link to={`/resources/${article.slug}`}>
                  <span className="article-card__category">{article.category}</span>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
