"use client";
import Image from "next/image";
/** pages/About.jsx */
import { PageHero } from "@/components/shared/PageHero";
import { SectionKicker } from "@/components/shared/SectionKicker";
import { Btn } from "@/components/shared/Btn";
import { TECHNOLOGIES } from "@/lib/fallback";
const agencySystem = "/assets/vyoma-agency-system.webp";
const productDesign = "/assets/vyoma-product-design.webp";
const engineeringSystem = "/assets/vyoma-engineering.webp";
const intelligenceSystem = "/assets/vyoma-intelligence.webp";
import StickyScrollRevealDemo from "@/components/sticky-scroll-reveal-demo.tsx";

const BELIEFS = [
  "Business outcomes matter more than technology choices.",
  "Design and engineering are not separate phases — they're the same work.",
  "AI creates leverage when it's applied to the right problem.",
  "Products should be maintainable by the people who inherit them.",
  "Honest estimates build better client relationships than optimistic ones.",
  "The best agency work leaves a team more capable, not more dependent.",
];

const PILLARS = [
  { title: "Design",       desc: "UI/UX, product strategy, design systems, prototyping, UX research, and product design.", img: productDesign },
  { title: "Engineering",  desc: "Web, mobile, backend, cloud, APIs, SaaS, enterprise software, and custom platforms.", img: engineeringSystem },
  { title: "Intelligence", desc: "AI, GenAI, RAG, agents, chatbots, automation, and data-driven systems.", img: intelligenceSystem },
];

export function About({}) {
  return (
    <>
      <PageHero
        eyebrow="About VYOMA"
        title="A technology agency built around serious product work."
        copy="We combine design, engineering, and intelligence to help startups and businesses move from idea to scalable digital product."
        image={agencySystem}
        imageAlt="VYOMA agency system"
      />

      <section className="section about-body">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">One multidisciplinary team.<br />One connected product path.</h2>
          <p className="text-neutral-500 dark:text-neutral-300 md:text-lg mb-4">VYOMA exists to make ambitious digital work more coherent. Product decisions, design, technology, AI, and deployment should support the same outcome — and the people responsible for each should talk to each other from the beginning.</p>
        </div>
      </section>

      <section className="section px-0 md:px-6 py-0">
        <StickyScrollRevealDemo />
      </section>

      <section className="section about-pillars">
        <SectionKicker left="What we build" right="VYOMA's three core disciplines" />
        <div className="about-pillars-grid">
          {PILLARS.map(p => (
            <article key={p.title} className="about-pillar-card">
              <figure className="relative"><Image src={p.img} alt={`VYOMA ${p.title} — ${p.desc}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" /></figure>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-tech-marquee">
        <p className="eyebrow" style={{ textAlign: "center", marginBottom: "60px", fontSize: "14px", letterSpacing: "4px" }}>TECHNICAL EXPERTISE</p>
        
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {Object.values(TECHNOLOGIES).flat().map((t, idx) => <span key={idx} className="tech-badge">{t}</span>)}
            {Object.values(TECHNOLOGIES).flat().map((t, idx) => <span key={idx + "dup"} className="tech-badge">{t}</span>)}
          </div>
        </div>
        
        <div className="marquee-wrapper" style={{ marginTop: "20px" }}>
          <div className="marquee-content reverse">
            {Object.values(TECHNOLOGIES).flat().reverse().map((t, idx) => <span key={idx} className="tech-badge">{t}</span>)}
            {Object.values(TECHNOLOGIES).flat().reverse().map((t, idx) => <span key={idx + "dup"} className="tech-badge">{t}</span>)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
          <Btn to="/team" variant="super">
            Meet the disciplines behind VYOMA
          </Btn>
        </div>
      </section>

      <section className="section centered-cta">
        <h2>Ready to build something real?</h2>
        <Btn to="/contact" variant="primary">Start a Project</Btn>
      </section>
    </>
  );
}

