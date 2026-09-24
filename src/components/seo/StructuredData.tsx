import { Head } from "vite-react-ssg";

/**
 * Generic JSON-LD injector. Pages build the schema.org object with the
 * helpers below (organizationSchema, productSchema, etc.) and pass it
 * here — kept separate from Seo.tsx so a page can render zero, one, or
 * multiple structured-data blocks (e.g. Product + BreadcrumbList).
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

export function organizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wealthy Harvest",
    url: siteUrl,
    slogan: "Building Abundant Lives",
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image?: string;
  url: string;
  price?: string;
  currency?: string;
  availability?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.currency ?? "USD",
        availability: product.availability
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: product.url,
      },
    }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    url: article.url,
    image: article.image,
  };
}
