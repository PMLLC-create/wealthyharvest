import { useState } from "react";

/**
 * PLACEHOLDER: not wired to a real email provider yet. Submitting shows a
 * local confirmation message only. Replace handleSubmit with a real
 * integration (Klaviyo, Mailchimp, Shopify's own customer/email
 * marketing consent API, etc.) when one is chosen.
 */
export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <form
      className="newsletter-signup"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("submitted");
      }}
    >
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
      />
      <button type="submit">Subscribe</button>
      {status === "submitted" && (
        <p className="newsletter-signup__note" role="status">
          Thanks — this form isn&rsquo;t connected to a live email list yet.
        </p>
      )}
    </form>
  );
}
