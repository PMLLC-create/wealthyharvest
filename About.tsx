import { Seo } from "@/components/seo/Seo";

export default function About() {
  return (
    <div className="page-container">
      <Seo
        title="About"
        description="The story behind Wealthy Harvest and founder Quintina Simpson Njoku."
        path="/about"
      />

      <section className="page-intro">
        <h1>Our Story</h1>
        <p>Building Abundant Lives</p>
      </section>

      <section className="section section--narrow">
        <h2>What is Wealthy Harvest?</h2>
        <p className="content-placeholder">
          [Brand story placeholder &mdash; not yet supplied.]
        </p>
      </section>

      <section className="section section--narrow founder-section">
        <div className="placeholder-block founder-section__photo" aria-hidden="true">
          <span>[ Founder photo placeholder ]</span>
        </div>
        <div>
          <h2>Quintina Simpson Njoku</h2>
          <p className="content-placeholder">
            [Founder biography placeholder &mdash; no biographical details
            have been invented. Real founder copy will replace this section
            once supplied.]
          </p>
        </div>
      </section>

      <section className="section section--narrow">
        <h2>Our Principles</h2>
        <ul className="principle-list">
          <li>
            <h3>Wellness</h3>
            <p className="content-placeholder">[Placeholder]</p>
          </li>
          <li>
            <h3>Provision</h3>
            <p className="content-placeholder">[Placeholder]</p>
          </li>
          <li>
            <h3>Preparedness</h3>
            <p className="content-placeholder">[Placeholder]</p>
          </li>
          <li>
            <h3>Purpose</h3>
            <p className="content-placeholder">[Placeholder]</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
