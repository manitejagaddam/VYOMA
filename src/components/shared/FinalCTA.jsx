"use client";
import { Spotlight } from "../ui/spotlight";
import { Btn } from "./Btn";

export function FinalCTA({ go }) {
  return (
    <section className="section final-cta overflow-hidden relative">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="final-cta-inner relative z-10">
        <p className="eyebrow">Ready to build?</p>
        <h2>Start your project with VYOMA.</h2>
        <p>Tell us what you're building. We'll bring the right people, process, and technology to make it real.</p>
        <div className="final-cta-actions">
          <Btn to="/contact" go={go} variant="cta">Start a Project</Btn>
          <Btn to="/contact" go={go} variant="outline-light">Book a Discovery Call</Btn>
        </div>
      </div>
    </section>
  );
}

