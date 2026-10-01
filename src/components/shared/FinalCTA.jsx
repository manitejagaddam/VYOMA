"use client";
import { Spotlight } from "../ui/spotlight";
import { Btn } from "./Btn";

/**
 * FinalCTA — accepts optional `serviceSlug` to pass context to the contact form.
 * When provided, the contact link becomes /contact?service=<slug>
 */
export function FinalCTA({ go, serviceSlug }) {
  const contactHref = serviceSlug ? `/contact?service=${serviceSlug}` : "/contact";

  return (
    <section className="section final-cta overflow-hidden relative">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="final-cta-inner relative z-10">
        <p className="eyebrow">Ready to build?</p>
        <h2>Start your project with VYOMA.</h2>
        <p>Tell us what you&apos;re building. We&apos;ll bring the right people, process, and technology to make it real.</p>
        <div className="final-cta-actions">
          <Btn to={contactHref} go={go} variant="cta">Start a Project</Btn>
          <Btn to={contactHref} go={go} variant="outline-light">Book a Discovery Call</Btn>
        </div>
      </div>
    </section>
  );
}
