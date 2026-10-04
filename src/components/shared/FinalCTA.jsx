"use client";
import { Spotlight } from "../ui/spotlight";
import { Link } from "./Link";

/**
 * FinalCTA — accepts optional `serviceSlug` to pass context to the contact form.
 * When provided, the contact link becomes /contact?service=<slug>
 */
export function FinalCTA({ serviceSlug }) {
  const contactHref = serviceSlug ? `/contact?service=${serviceSlug}` : "/contact";

  return (
    <section className="section final-cta overflow-hidden relative">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="final-cta-inner relative z-10">
        <p className="eyebrow">Ready to build?</p>
        <h2>Start your project with VYOMA.</h2>
        <p>Tell us what you&apos;re building. We&apos;ll bring the right people, process, and technology to make it real.</p>
        <div className="final-cta-actions flex flex-wrap items-center justify-center gap-6 mt-10 mb-8">
          <Link to={contactHref} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#1a1a1a] bg-gradient-to-br from-[#caac4b] via-[#E6D59A] to-[#C0C0C0] hover:brightness-110 rounded-full transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#caac4b] focus-visible:ring-offset-2 focus-visible:ring-offset-black" aria-label="Book a Discovery Call with VYOMA">Book a Discovery Call</Link>
        </div>
      </div>
    </section>
  );
}
