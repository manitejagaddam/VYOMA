"use client";
/** pages/Engagements.jsx */
import { PageHero } from "@/components/shared/PageHero";
import { Btn } from "@/components/shared/Btn";
const engineeringSystem = "/assets/vyoma-engineering.webp";

const MODELS = [
  { no: "01", title: "Fixed Project",             desc: "For clearly defined projects with a meaningful, bounded outcome. Scope, timeline, and cost agreed before work begins.", best: "Well-defined websites, apps, integrations, specific features." },
  { no: "02", title: "MVP Engagement",            desc: "For startup teams moving from an idea to a useful first product. Flexible scope as discovery informs what the first version should actually be.", best: "Early-stage founders, first products, pre-seed validation." },
  { no: "03", title: "Dedicated Development Team",desc: "For companies that need ongoing product and engineering capacity embedded as a reliable, skilled extension of their own team.", best: "Scale-ups, product companies with continuous development needs." },
  { no: "04", title: "Long-Term Product Partnership",desc: "For continuous development, improvement, and technical evolution of an established product.", best: "Established products needing ongoing design, engineering, and AI work." },
  { no: "05", title: "Maintenance & Support",     desc: "For existing products that need reliable care, upgrades, dependency management, and better systems over time.", best: "Live products needing stability, performance, and incremental improvement." },
];

export function Engagements({}) {
  return (
    <>
      <PageHero
        eyebrow="Engagement Models"
        title="Choose the way you need to build."
        copy="The right engagement model follows the amount of clarity, momentum, and ongoing ownership your product needs."
        image={engineeringSystem}
        imageAlt="Software system visual"
      />
      <section className="section engagement-page">
        {MODELS.map(m => (
          <article key={m.no} className="engagement-card">
            <span className="eng-no">{m.no}</span>
            <div className="eng-content">
              <h2>{m.title}</h2>
              <p>{m.desc}</p>
              <p className="eng-best"><strong>Best for:</strong> {m.best}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="section centered-cta">
        <h2>Start with the shape of the problem. We&apos;ll find the right way to work together.</h2>
        <Btn to="/contact" variant="primary">Start a Project</Btn>
      </section>
    </>
  );
}

