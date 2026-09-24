import type { ReactNode } from "react";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card product-card--skeleton">
          <div className="skeleton skeleton--image" />
          <div className="skeleton skeleton--line" style={{ width: "70%" }} />
          <div className="skeleton skeleton--line" style={{ width: "40%" }} />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__description">{description}</p>}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="empty-state empty-state--error" role="alert">
      <p className="empty-state__title">Something didn&rsquo;t load correctly.</p>
      <p className="empty-state__description">
        {message ?? "Please try refreshing the page."}
      </p>
    </div>
  );
}
