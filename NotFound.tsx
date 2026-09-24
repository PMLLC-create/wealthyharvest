import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";

export default function NotFound() {
  return (
    <div className="page-container page-container--narrow">
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
        noindex
      />
      <h1>Page Not Found</h1>
      <p>The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.</p>
      <Link to="/" className="btn btn--primary">
        Return Home
      </Link>
    </div>
  );
}
