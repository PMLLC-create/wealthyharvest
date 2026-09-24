import { Link } from "react-router-dom";
import type { CollectionCard as CollectionCardType } from "@/shopify/types";

export function CollectionCard({ collection }: { collection: CollectionCardType }) {
  return (
    <Link to={`/collections/${collection.handle}`} className="collection-card">
      <div className="collection-card__media">
        {collection.image ? (
          <img
            src={collection.image.url}
            alt={collection.image.altText ?? collection.title}
            loading="lazy"
          />
        ) : (
          <div className="collection-card__media-placeholder" />
        )}
      </div>
      <h3 className="collection-card__title">{collection.title}</h3>
      {collection.description && (
        <p className="collection-card__description">{collection.description}</p>
      )}
    </Link>
  );
}
