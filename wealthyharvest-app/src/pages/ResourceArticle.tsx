import { useLoaderData } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { StructuredData, articleSchema } from "@/components/seo/StructuredData";
import { absoluteUrl } from "@/lib/seoDefaults";
import type { Article } from "@/lib/content";

export default function ResourceArticle() {
  const article = useLoaderData() as Article;
  const { Content } = article;

  return (
    <div className="page-container page-container--article">
      <Seo
        title={article.title}
        description={article.description}
        path={`/resources/${article.slug}`}
        image={article.coverImage}
        type="article"
      />
      <StructuredData
        data={articleSchema({
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
          url: absoluteUrl(`/resources/${article.slug}`),
          image: article.coverImage,
        })}
      />

      <article className="article">
        <p className="article__category">{article.category}</p>
        <h1>{article.title}</h1>
        <time dateTime={article.publishedAt} className="article__date">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="article__body">
          <Content />
        </div>
      </article>
    </div>
  );
}
