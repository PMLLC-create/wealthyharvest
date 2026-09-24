import { useState } from "react";
import { Seo } from "@/components/seo/Seo";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-container page-container--narrow">
      <Seo
        title="Contact"
        description="Get in touch with Wealthy Harvest."
        path="/contact"
      />

      <h1>Contact</h1>
      <p>
        Questions about an order, a product, or Wealthy Harvest generally?
        Send a message below.
      </p>

      {/* PLACEHOLDER: not wired to a real inbox yet — see README. */}
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" required rows={6} />
        </div>
        <button type="submit" className="btn btn--primary">
          Send Message
        </button>
        {submitted && (
          <p role="status" className="content-placeholder">
            Thanks — this form isn&rsquo;t connected to a live inbox yet.
          </p>
        )}
      </form>
    </div>
  );
}
