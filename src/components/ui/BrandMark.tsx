/**
 * A restrained, vector brand mark — not a trace of any external artwork.
 * Placeholder for the founder's official logo (see README "Brand
 * assets"); swap the <svg> below for a real logo file once supplied,
 * without needing to touch anything that renders <BrandMark />.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Wealthy Harvest"
    >
      <path
        d="M24 40V21"
        stroke="var(--color-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M24 24c0-8-6-13-15-13 0 8 6 13 15 13Z"
        stroke="var(--color-green-800)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 20c0-7 6-11 14-11 0 7-6 11-14 11Z"
        stroke="var(--color-green-800)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
