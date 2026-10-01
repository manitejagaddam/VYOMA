"use client";
/** pages/Technologies.jsx */
import { PageHero } from "@/components/shared/PageHero";
import { Btn } from "@/components/shared/Btn";
import { TECHNOLOGIES } from "@/lib/fallback";
const engineeringSystem = "/assets/vyoma-engineering.webp";

export function Technologies({}) {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Technology is supporting evidence."
        copy="VYOMA chooses tools in service of the product, business problem, and result — never as the lead story."
        image={engineeringSystem}
        imageAlt="Engineering infrastructure visual"
      />
      <section className="section tech-page">
        <div className="tech-page-grid">
          {Object.entries(TECHNOLOGIES).map(([cat, items]) => (
            <article key={cat} className="tech-page-card">
              <h2>{cat}</h2>
              <div className="tech-page-items">
                {items.map(t => <span key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section centered-cta">
        <h2>What matters most is the system we can build with the right tools.</h2>
        <Btn to="/contact" variant="primary">Discuss Your Product</Btn>
      </section>
    </>
  );
}

