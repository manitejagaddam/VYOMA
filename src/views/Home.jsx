"use client";
/** pages/Home.jsx */
import { useState } from "react";
import Image from "next/image";

import { SectionKicker } from "@/components/shared/SectionKicker";
import { Btn } from "@/components/shared/Btn";
import { Link } from "@/components/shared/Link";
import { OverviewBar } from "@/components/shared/OverviewBar";
import { STAGES, TECHNOLOGIES } from "@/lib/fallback";
const heroImg = "/assets/feature-ai.webp";

/* ── Sub-sections ─────────────────────────────────────────────── */
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Timeline } from "@/components/ui/timeline";
import { FlipWords } from "@/components/ui/flip-words";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Spotlight } from "@/components/ui/spotlight";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

function UniformCTAPair() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Link 
        to="/contact" 
        className="inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-bold text-black bg-[var(--accent)] hover:brightness-110 rounded-full transition-all shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Contact VYOMA to start a project"
      >
        Book a Discovery Call
      </Link>
      <Btn to="/work" variant="outline" aria-label="Explore Our Work">
        Explore Our Work
      </Btn>
    </div>
  );
}

function HeroSection({}) {
  const [activeStage, setActiveStage] = useState(0);
  return (
    <section className="hero overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      {/* Background image layer */}
      <div className="hero-background">
        <Image
          src={heroImg}
          alt="VYOMA design engineering and intelligence system"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="eyebrow hero-eyebrow">VYOMA / Custom Software Development Agency</h1>
          <div className="hero-headline text-left relative">
            <span className="block mb-2 text-gradient">We build</span>
            <div className="relative inline-block w-full h-[1.2em]">
              <FlipWords 
                words={["custom software.", "AI systems.", "SaaS platforms.", "digital products."]} 
                className="text-[var(--accent)] block -ml-2"
              />
            </div>
          </div>
          <p className="hero-body">
            VYOMA is a technology agency helping startups and businesses transform ideas into scalable digital products through design, engineering and AI.{" "}
            <Link to="/services/custom-software-development" className="text-[var(--accent)] hover:underline">
              Explore our custom software development services
            </Link> for CRM, ERP, and internal tools.
          </p>
          <div className="hero-actions flex flex-col gap-3 mt-8">
            <UniformCTAPair />
            <span className="text-sm font-mono text-[var(--accent)] opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span> Book a 20-minute Discovery Call</span>
          </div>
          <div className="hero-pillars">
            <span>Design</span><span className="pillar-dot">·</span>
            <span>Engineering</span><span className="pillar-dot">·</span>
            <span>
              <EncryptedText 
                text="Intelligence" 
                encryptedClassName="text-neutral-500 font-mono tracking-widest text-xs" 
                revealedClassName="text-[var(--accent)] font-bold tracking-normal"
                revealDelayMs={75}
              />
            </span>
          </div>
        </div>
      </div>
      {/* Stage bar */}
      <div className="hero-stage-bar">
        <div className="stage-tabs-wrapper">
          {STAGES.map(([number, title], i) => (
            <button
              key={number}
              className={`stage-tab${i === activeStage ? " active" : ""}`}
              onClick={() => setActiveStage(i)}
            >
              <span className="stage-num">{number}</span>
              <span className="stage-label">{title}</span>
            </button>
          ))}
        </div>
        <div className="stage-detail-panel">
          <span className="stage-detail-num">{STAGES[activeStage][0]}</span>
          <span className="stage-detail-text">{STAGES[activeStage][2]}</span>
        </div>
      </div>
    </section>
  );
}

function CapabilitySnapshot() {
  const pillars = [
    { no: "01", title: "Design",       icon: "◈", desc: "UI/UX, product strategy, design systems, and prototypes that clarify what a product should become.", items: ["UI/UX", "Product Design", "Design Systems", "Prototyping"] },
    { no: "02", title: "Engineering",  icon: "⬡", desc: "Our custom software development covers CRM systems, ERP platforms, internal tools, and business platforms to streamline operations and scale growth.", items: ["Web Apps", "Mobile", "Backend", "Cloud & APIs", "SaaS"] },
    { no: "03", title: "Intelligence", icon: "◎", desc: "AI, GenAI, RAG, agents, chatbots, automation, and data-driven systems with a real job to do.", items: ["Generative AI", "AI Agents", "RAG", "Chatbots", "Automation"] },
  ];
  return (
    <section className="section capability-snapshot">
      <SectionKicker left="What VYOMA can build" right="One agency, one integrated product path" />
      <div className="capability-grid">
        {pillars.map((p) => (
          <article key={p.no} className="capability-card">
            <div className="cap-header">
              <span className="cap-icon">{p.icon}</span>
              <span className="cap-no">{p.no}</span>
            </div>
            <h2 className="cap-title">{p.title}</h2>
            <p className="cap-desc">{p.desc}</p>
            <ul className="cap-items">{p.items.map(i => <li key={i}>{i}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function SelectedWork({ projects = [] }) {

  const selected = projects.slice(0, 4);

  const carouselItems = selected.map((p, index) => {
    const displayImg = p.image_url || p._localImage || "/assets/placeholder.jpg";
    let roles = [];
    try {
      const parsed = typeof p.role === "string" ? JSON.parse(p.role) : p.role;
      roles = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      roles = [p.role];
    }
    roles = roles.filter(Boolean);

    return (
      <div className="w-[90vw] sm:w-[22rem] md:w-96 lg:w-[28rem] flex-shrink-0 h-[42rem] md:h-[44rem]" key={p.slug}>
        <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 dark:bg-[#0a0b0f] p-8 w-full h-full flex flex-col justify-between group/card transition-all hover:border-white/20">
          <Spotlight className="-top-40 left-0 md:-top-20 md:-left-20 transition-opacity duration-500 opacity-50 group-hover/card:opacity-100" fill="white" />
          
          <div className="relative z-10 flex flex-col h-full overflow-hidden">
            <div className="w-full mb-4 shrink-0">
              {displayImg ? (
                <div className="relative h-40 w-full rounded-xl shadow-lg overflow-hidden mb-4">
                  <Image src={displayImg} alt={p.title} fill sizes="(max-width: 768px) 320px, 384px" priority={index < 2} className="object-cover" />
                </div>
              ) : (
                <div className="h-40 w-full bg-neutral-200 dark:bg-neutral-800/50 rounded-xl mb-4"></div>
              )}
            </div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 tracking-wide uppercase font-display mb-6 shrink-0">
              {p.title}
            </h3>
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-2 text-xs font-mono flex-grow overflow-y-auto min-h-0 pr-2 custom-scrollbar pt-2 border-t border-white/5">
              {(p.client || p.category) && (
                <div>
                  <span className="text-[var(--accent)] font-bold block mb-1 opacity-80 text-[10px] uppercase tracking-wider">Client</span>
                  <span className="text-neutral-600 dark:text-neutral-300 line-clamp-2">{p.client || p.category}</span>
                </div>
              )}
              {roles.length > 0 && (
                <div>
                  <span className="text-[var(--accent)] font-bold block mb-1 opacity-80 text-[10px] uppercase tracking-wider">Role</span>
                  <ul className="text-neutral-600 dark:text-neutral-300 space-y-1">
                    {roles.slice(0, 2).map((r, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-1.5 opacity-50">•</span>
                        <span className="leading-tight">
                          {r}
                          {i === 1 && roles.length > 2 && (
                            <span className="ml-1.5 text-[var(--accent)] font-medium opacity-90 whitespace-nowrap">
                              +{roles.length - 2}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.timeline && (
                <div>
                  <span className="text-[var(--accent)] font-bold block mb-1 opacity-80 text-[10px] uppercase tracking-wider">Timeline</span>
                  <span className="text-neutral-600 dark:text-neutral-300">{p.timeline}</span>
                </div>
              )}
              {p.year && (
                <div>
                  <span className="text-[var(--accent)] font-bold block mb-1 opacity-80 text-[10px] uppercase tracking-wider">Year</span>
                  <span className="text-neutral-600 dark:text-neutral-300">{p.year}</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              <Btn to={`/work/${p.slug}`} variant="cta" aria-label={`Read Case Study for ${p.title}`}>
                Read Case Study
              </Btn>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className="section selected-work has-bg-grid overflow-hidden">
      <div className="work-header max-w-7xl mx-auto px-4 w-full">
        <SectionKicker left="Selected work" right="Built for real problems. Designed for real users." />
        <div className="work-title-row">
          <h2 className="text-xl md:text-5xl font-bold font-sans">Evidence before promises.</h2>
          <UniformCTAPair />
        </div>
      </div>
      <div className="w-full h-full pb-10">
        <Carousel items={carouselItems} />
      </div>
    </section>
  );
}

function WhatWeBuild({ services = [] }) {
  const sortedServices = [...services].sort((a, b) => a.no - b.no);

  const serviceBenefits = {
    "ui-ux-product-design": "See how we design for scale.",
    "web-development": "See how we engineer for performance.",
    "mobile-app-development": "See how we build native experiences.",
    "ai-genai": "See how we build autonomous agents.",
    "chatbots-conversational-ai": "See how we automate conversations.",
    "custom-software": "See how we architect custom platforms.",
    "saas-development": "See how we scale multi-tenant SaaS.",
    "automation-integrations": "See how we eliminate manual work.",
    "backend-cloud": "See how we build robust infrastructure.",
    "digital-marketing": "See how we amplify digital products.",
  };

  const carouselItems = sortedServices.map(b => (
    <div className="w-[90vw] sm:w-[22rem] md:w-96 lg:w-[28rem] flex-shrink-0 h-[40rem]" key={b.slug}>
      <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 dark:bg-[#0a0b0f] p-8 w-full h-full flex flex-col justify-between group/card transition-all hover:border-white/20">
        <Spotlight className="-top-40 left-0 md:-top-20 md:-left-20 transition-opacity duration-500 opacity-50 group-hover/card:opacity-100" fill="white" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-full mb-6">
            {b.image_url ? (
              <div className="relative h-48 w-full rounded-xl shadow-lg overflow-hidden mb-6">
                <Image src={b.image_url} alt={b.title} fill sizes="(max-width: 768px) 320px, 384px" priority={b.no === 1 || b.no === 2} className="object-cover" />
              </div>
            ) : (
              <div className="h-48 w-full bg-neutral-200 dark:bg-neutral-800/50 rounded-xl mb-6"></div>
            )}
          </div>
          <p className="eyebrow mt-2 mb-2">0{b.no}</p>
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 tracking-wide uppercase font-display mb-4">
            {b.title}
          </h3>
          <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-400 space-y-2">
            {(b.deliverables || []).slice(0, 5).map(i => (
              <span key={i} className="block mb-2">
                {i}
              </span>
            ))}
          </p>
          
          <div className="mt-auto pt-4 flex flex-col items-start gap-2">
            <Btn to={`/services/${b.slug}`} variant="cta" aria-label={`Explore ${b.title}`}>
              Explore {b.title}
            </Btn>
            <span className="text-xs text-[var(--accent)] font-mono opacity-90 block mt-1">
              {serviceBenefits[b.slug] || "Explore our tailored solutions."}
            </span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="section what-we-build has-bg-dot overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <SectionKicker 
          left="Capabilities" 
          right={
            <div className="flex items-center gap-6">
              <span className="hidden md:inline">What VYOMA builds across every engagement</span>
              <div className="font-sans normal-case tracking-normal">
                <UniformCTAPair />
              </div>
            </div>
          } 
        />
      </div>
      <div className="w-full h-full pb-10 mt-8">
        <Carousel items={carouselItems} />
      </div>
    </section>
  );
}

function WhyVYOMA({}) {
  const reasons = [
    ["Cross-disciplinary expertise",  "Designers, developers, AI engineers and software specialists working together from day one."],
    ["Engineering-first approach",    "Architecture, security, maintainability and scalability are considered from the beginning — not patched on later."],
    ["AI where it creates value",     "We don't add AI just because AI is fashionable. We add it when it meaningfully changes the outcome."],
    ["Built for long-term use",       "Products should be maintainable, extensible and understandable well after launch."],
    ["Custom solutions",              "We don't force every business into the same template. The system fits the problem."],
    ["One connected product path",    "Strategy → Design → Engineering → AI → Deployment. No hand-off gaps."],
  ];
  return (
    <section className="section why-vyoma">
      <div className="why-left">
        <p className="eyebrow">Why VYOMA</p>
        <h2>One team across the whole product lifecycle.</h2>
        <Btn to="/about" variant="outline">About VYOMA</Btn>
      </div>
      <div className="why-right">
        <p>Strategy, design, engineering, AI, and deployment stay connected from the start. We build custom systems around the problem — not a predetermined template.</p>
        <ul className="why-list">
          {reasons.map(([title, desc]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EnterpriseSoftwareCapabilities() {
  const capabilities = [
    { title: "Security & Compliance", desc: "SOC 2 Type II compliant architectures, zero-trust security models, and enterprise-grade encryption at rest and in transit." },
    { title: "Platform Modernization", desc: "Refactoring legacy monoliths into scalable microservices and serverless architectures without operational downtime." },
    { title: "Data Architecture", desc: "High-throughput data pipelines, event-driven integrations, and scalable data warehouses built for enterprise AI and analytics." },
    { title: "Governance & Control", desc: "Granular Role-Based Access Control (RBAC), comprehensive audit logging, and strict data residency and privacy adherence." }
  ];

  return (
    <section className="section enterprise-capabilities has-bg-dot overflow-hidden" style={{ padding: "100px 6%" }}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <SectionKicker left="Enterprise" right="Scalable, secure, and compliant" />
        <div className="mb-12 mt-8">
          <h2 className="text-3xl md:text-5xl font-bold font-sans mb-4">Enterprise-Grade Custom Software</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg mt-4">
            We build platforms that scale securely. From complex data architectures to platform modernization, our enterprise software capabilities ensure your business can grow without technical ceilings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <div key={i} className="p-8 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm group hover:border-[var(--accent)]/50 transition-colors">
              <h3 className="text-xl font-bold mb-3 dark:text-white">{cap.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{cap.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 border border-[var(--accent)]/30 rounded-xl bg-[var(--accent)]/5 relative overflow-hidden">
          <Spotlight className="-top-40 left-0 opacity-50" fill="white" />
          <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-[var(--accent)] relative z-10">Exemplar Case Snippet</h3>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed relative z-10">
            <strong>Global FinTech Platform:</strong> Delivered a multi-tenant SaaS application handling $50M+ in daily transaction flows. The architecture utilized scalable microservices and robust data partitioning, ensuring 99.99% uptime while maintaining strict financial compliance and granular audit logging across 200+ enterprise organizations.
          </p>
        </div>
      </div>
    </section>
  );
}

function CustomSoftwareDetails() {
  return (
    <section className="section custom-software-details has-bg-grid overflow-hidden" style={{ padding: "100px 6%" }}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <SectionKicker left="Deep Dive" right="Custom Software Strategy" />
        <div className="mb-12 mt-8">
          <h2 className="text-3xl md:text-5xl font-bold font-sans mb-4">The anatomy of custom software.</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg mt-4">
            Building custom software isn&apos;t just about writing code. It&apos;s about measurable outcomes, understanding timelines, managing risks, and making the right architectural trade-offs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Outcomes, Timelines, Risks */}
          <div className="space-y-8">
            <div className="p-6 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm group hover:border-black/20 dark:hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold mb-3 dark:text-white flex items-center gap-3"><span className="text-xl">📈</span> Measurable Outcomes</h3>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2 marker:text-[var(--accent)]">
                <li><strong>Efficiency:</strong> Up to 40% reduction in manual operational overhead.</li>
                <li><strong>Integration:</strong> Zero data silos across core business units.</li>
                <li><strong>ROI:</strong> Custom IP that becomes a valuated company asset.</li>
              </ul>
            </div>
            
            <div className="p-6 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm group hover:border-black/20 dark:hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold mb-3 dark:text-white flex items-center gap-3"><span className="text-xl">⏱️</span> Typical Timelines</h3>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2 marker:text-[var(--accent)]">
                <li><strong>Discovery & Architecture:</strong> 2-4 weeks</li>
                <li><strong>Core MVP Build:</strong> 8-12 weeks</li>
                <li><strong>Full Enterprise Rollout:</strong> 4-6 months</li>
              </ul>
            </div>

            <div className="p-6 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm group hover:border-black/20 dark:hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold mb-3 dark:text-white flex items-center gap-3"><span className="text-xl">⚠️</span> Risk Considerations</h3>
              <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2 marker:text-[var(--accent)]">
                <li><strong>Scope Creep:</strong> Mitigated by strict phase-gating and MVP-first methodology.</li>
                <li><strong>Technical Debt:</strong> Managed through continuous refactoring and CI/CD pipelines.</li>
                <li><strong>Adoption:</strong> Solved via human-in-the-loop design and change management.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Comparison & Playbooks */}
          <div className="space-y-8">
            <div className="p-8 border border-[var(--accent)]/30 rounded-xl bg-[var(--accent)]/5 relative overflow-hidden">
              <Spotlight className="-top-40 left-0 opacity-30" fill="white" />
              <h3 className="text-xl font-bold mb-6 dark:text-white relative z-10">Build vs. Buy vs. Hybrid</h3>
              <div className="relative z-10 space-y-5">
                <div>
                  <strong className="block text-[var(--accent)] mb-1">1. Buy (Off-the-shelf)</strong>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Fastest to deploy, but forces you to change your business processes to fit the software. High recurring per-seat licensing costs at scale.</p>
                </div>
                <div>
                  <strong className="block text-[var(--accent)] mb-1">2. Build (Custom)</strong>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Fits your exact logic perfectly and builds company equity. Higher upfront investment, but zero arbitrary licensing fees.</p>
                </div>
                <div>
                  <strong className="block text-[var(--accent)] mb-1">3. Hybrid (VYOMA approach)</strong>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">We orchestrate managed services (Auth, DBs, AI models) with custom business logic. You get custom software without reinventing the wheel.</p>
                </div>
              </div>
            </div>

            <div className="p-8 border border-black/10 dark:border-white/10 rounded-xl bg-[#0a0b0f] text-white flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 font-display tracking-wide">Technical Playbooks</h3>
                <p className="text-neutral-400 text-sm">
                  Download our architectural standards, security checklists, and AI integration playbooks used across our enterprise deployments.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-mono text-left w-full group">
                  <span className="truncate mr-4 text-neutral-300 group-hover:text-white transition-colors">Custom_Software_Architecture_Guide.pdf</span>
                  <span className="text-[var(--accent)] font-bold">↓</span>
                </button>
                <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-mono text-left w-full group">
                  <span className="truncate mr-4 text-neutral-300 group-hover:text-white transition-colors">Enterprise_Security_Checklist.pdf</span>
                  <span className="text-[var(--accent)] font-bold">↓</span>
                </button>
                <button className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-mono text-left w-full group">
                  <span className="truncate mr-4 text-neutral-300 group-hover:text-white transition-colors">Build_vs_Buy_Analysis_Matrix.xlsx</span>
                  <span className="text-[var(--accent)] font-bold">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center flex flex-col items-center justify-center border-t border-black/10 dark:border-white/10 pt-16">
          <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-[#1a1a1a] bg-gradient-to-br from-[#caac4b] via-[#E6D59A] to-[#C0C0C0] hover:brightness-110 rounded-full transition-all shadow-[0_4px_30px_rgba(212,175,55,0.4)] hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#caac4b] focus-visible:ring-offset-2 focus-visible:ring-offset-black" aria-label="Book a Discovery Call with VYOMA">Book a Discovery Call</Link>
        </div>
      </div>
    </section>
  );
}

function SolutionsPreview({ solutions = [] }) {
  return (
    <section className="section solutions-preview">
      <SectionKicker left="Solutions" right="Start with the business problem" />
      <div className="solutions-header">
        <h2>Custom Software Development Solutions</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {solutions.map(sol => (
            <CardContainer className="inter-var w-full" key={sol.slug}>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col justify-between">
                <div>
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-800 dark:text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {sol.title}
                  </CardItem>
                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
                    {sol.ideal_for}
                  </CardItem>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <CardItem translateZ={20} className="w-full">
                    <Link to={`/solutions/${sol.slug}`} className="sol-link inline-block hover:scale-105 transition-transform">
                      Explore solution →
                    </Link>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
    </section>
  );
}

function ProcessPreview({}) {
  return (
    <section className="section home-process has-bg-dot">
      <SectionKicker left="How we work" right="A repeatable process, an adaptable approach" />
      <div className="process-title-row">
        <h2>From first question to working product.</h2>
        <Btn to="/process" variant="outline">Full process</Btn>
      </div>
      <div className="process-track-wrapper mt-12">
        <Timeline 
          data={STAGES.map(([no, title, desc]) => ({
            title: `${no} ${title}`,
            content: (
              <div className="text-neutral-500 dark:text-neutral-300 text-sm md:text-base mb-8">
                <p>{desc}</p>
              </div>
            )
          }))}
        />
      </div>
    </section>
  );
}

function TechPreview({}) {
  const techQuotes = {
    // Frontend
    "React": "Component-driven architecture for highly interactive, state-heavy user interfaces.",
    "Next.js": "Server-side rendering and static generation for peak SEO and instant load times.",
    "Vue": "Approachable, versatile, and performant frontend frameworks for seamless adoption.",
    "TypeScript": "End-to-end type safety that catches bugs before they ever reach production.",
    "Tailwind CSS": "Utility-first styling that enables rapid, consistent, and beautiful UI design.",
    "Framer Motion": "Physics-based animations that breathe life into static web experiences.",
    // Backend
    "Node.js": "Event-driven, non-blocking I/O for building incredibly fast and scalable network apps.",
    "Python": "Versatile and powerful, bridging the gap between heavy data science and robust APIs.",
    "FastAPI": "High-performance Python frameworks built on modern standards for rapid backend delivery.",
    "Java": "Enterprise-grade reliability and security for mission-critical, large-scale systems.",
    ".NET": "Mature, highly optimized ecosystems for enterprise applications and microservices.",
    "GraphQL": "Declarative data fetching that gives frontends exactly what they need, nothing more.",
    // Mobile
    "Flutter": "Beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
    "React Native": "True native capabilities with the agility and ecosystem of React development.",
    "Native Android": "Uncompromised performance and deep system integration for the Android ecosystem.",
    "Native iOS": "Pixel-perfect, fluid experiences built in Swift for the Apple ecosystem.",
    // AI
    "OpenAI": "State-of-the-art language models powering complex reasoning and natural language tasks.",
    "Gemini": "Multimodal intelligence capable of natively processing text, images, and video.",
    "Claude": "Advanced conversational AI with an exceptionally large context window and nuanced logic.",
    "LangChain": "Orchestration frameworks that chain LLMs together with external tools and memory.",
    "LangGraph": "Cyclical graph architectures for building highly autonomous, stateful AI agents.",
    "Hugging Face": "Open-source model deployments for specialized, privacy-focused machine learning.",
    "PyTorch": "Dynamic neural networks and deep learning research pushed into production environments.",
    "TensorFlow": "Industry-standard, end-to-end platforms for robust machine learning infrastructure.",
    // Databases
    "PostgreSQL": "The world's most advanced open-source relational database for complex queries.",
    "MongoDB": "Flexible, document-based schemas for rapid iteration and unstructured data.",
    "Redis": "In-memory data structures for sub-millisecond caching and real-time processing.",
    "MySQL": "Battle-tested relational databases powering some of the world's largest web apps.",
    "Supabase": "Open-source Firebase alternatives providing instant Postgres APIs and real-time sockets.",
    "Pinecone": "Purpose-built vector databases essential for fast similarity search and RAG pipelines.",
    // Infrastructure
    "Docker": "Containerization that guarantees software runs exactly the same everywhere.",
    "AWS": "The gold standard of cloud computing, offering infinite scalability and global reach.",
    "Azure": "Enterprise cloud ecosystems with seamless Microsoft integration and high-grade security.",
    "GCP": "Google's infrastructure, providing unmatched networking and data analytics capabilities.",
    "Kubernetes": "Automated deployment, scaling, and management of complex containerized applications.",
    "CI/CD": "Continuous integration and delivery pipelines that automate testing and zero-downtime shipping."
  };

  const techItems = Object.entries(TECHNOLOGIES).flatMap(([cat, items]) => 
    items.map(tech => ({ 
      quote: techQuotes[tech] || `Engineered with precision using ${tech}. We select our tools based on the business problem.`, 
      name: tech, 
      title: cat 
    }))
  );

  return (
    <section className="section home-tech has-bg-grid overflow-hidden">
      <SectionKicker left="Technology" right="Chosen for the problem, not the portfolio" />
      <div className="tech-title-row max-w-7xl mx-auto w-full px-4">
        <h2>A curated technology ecosystem.</h2>
        <Btn to="/technologies" variant="outline">Full stack</Btn>
      </div>
      <div className="h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden mt-8 w-full">
        <InfiniteMovingCards
          items={techItems}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}

function TeamPreview({ team = [] }) {
  return (
    <section className="section home-team">
      <SectionKicker left="The team" right="Different expertise. One team." />
      <div className="team-title-row">
        <h2>Real people building real products.</h2>
        <Btn to="/team" variant="outline">Meet the team</Btn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {team.map(member => (
            <CardContainer className="inter-var w-full" key={member.id}>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col justify-start">
                <CardItem translateZ="50" className="mb-4">
                  {member.image_url ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                      <Image src={member.image_url} alt={member.name} fill sizes="44px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="team-mini-avatar">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </CardItem>
                <div className="team-mini-info">
                  <CardItem as="strong" translateZ="60" className="block text-lg mb-1 dark:text-white">
                    {member.name}
                  </CardItem>
                  <CardItem as="span" translateZ="40" className="block text-sm text-[var(--text-dim)] font-mono mb-2">
                    {member.role}
                  </CardItem>
                  <CardItem as="p" translateZ="30" className="text-xs text-[var(--accent)] font-mono leading-relaxed">
                    {member.specialization}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
    </section>
  );
}

function FeaturedCaseStudy({ projects = [] }) {
  const project = projects[0];
  if (!project) return null;
  
  const isDeepDive = !!project.metrics;

  return (
    <section className="section featured-case has-bg-dot overflow-hidden" style={{ padding: "100px 6%" }}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <SectionKicker left="Case study spotlight" right="One project, in depth" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 block">{project.category}</span>
            <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6">{project.title}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 leading-relaxed">
              {project.summary}
            </p>
            
            {isDeepDive && (
              <div className="space-y-6 mb-8">
                <div>
                  <strong className="block text-neutral-800 dark:text-white mb-2 font-display">The Problem</strong>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.problem}</p>
                </div>
                <div>
                  <strong className="block text-neutral-800 dark:text-white mb-2 font-display">Our Approach</strong>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.approach}</p>
                </div>
                <div>
                  <strong className="block text-neutral-800 dark:text-white mb-2 font-display">Technology Decisions</strong>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{project.technology_decisions}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {(project.stack || project.tags || []).map(s => <span key={s} className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-xs font-mono text-neutral-700 dark:text-neutral-300">{s}</span>)}
            </div>

            <div className="flex items-center gap-6">
              <Btn to={`/work/${project.slug}`} variant="primary">Read Full Case Study</Btn>
              {isDeepDive && project.downloadable_pdf && (
                <a href="#" className="flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:text-black dark:hover:text-white transition-colors group">
                  <span>Download PDF</span>
                  <span className="group-hover:translate-y-1 transition-transform">↓</span>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            <figure className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/10 shadow-2xl">
              {(project.image_url || project._localImage) && <Image src={project.image_url || project._localImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
            </figure>

            {isDeepDive && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-6 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl backdrop-blur-sm">
                  <span className="block text-[var(--accent)] text-xs font-mono uppercase tracking-wider mb-2">Time to Value</span>
                  <p className="text-neutral-800 dark:text-white text-sm font-medium">{project.metrics.time_to_value}</p>
                </div>
                <div className="p-6 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl backdrop-blur-sm">
                  <span className="block text-[var(--accent)] text-xs font-mono uppercase tracking-wider mb-2">Performance</span>
                  <p className="text-neutral-800 dark:text-white text-sm font-medium">{project.metrics.performance_improvements}</p>
                </div>
                <div className="p-6 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl backdrop-blur-sm">
                  <span className="block text-[var(--accent)] text-xs font-mono uppercase tracking-wider mb-2">Return on Investment</span>
                  <p className="text-neutral-800 dark:text-white text-sm font-medium">{project.metrics.return_on_investment}</p>
                </div>
              </div>
            )}
            
            {isDeepDive && (
              <div className="p-6 bg-[var(--accent)]/10 dark:bg-[#0a0b0f] border border-[var(--accent)]/30 rounded-xl mt-2 relative overflow-hidden">
                <Spotlight className="-top-40 left-0 opacity-20" fill="white" />
                <span className="block text-[var(--accent)] text-xs font-mono uppercase tracking-wider mb-2 relative z-10">Lessons Learned</span>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm italic relative z-10">&quot;{project.lessons_learned}&quot;</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}

function InsightsPreview({ posts = [] }) {
  const recentPosts = posts.slice(0, 3);
  return (
    <section className="section home-insights">
      <SectionKicker left="Insights & Guides" right="Thinking from the work" />
      <div className="insights-title-row">
        <h2>Guides, tutorials, and notes on engineering.</h2>
        <Btn to="/insights" variant="outline">View Content Hub</Btn>
      </div>
      <div className="insights-grid">
        {recentPosts.map(post => (
            <article key={post.slug} className="insight-card">
              <span className="insight-tag">{post.tag}</span>
              <h3>{post.title}</h3>
              <p>{post.dek}</p>
              <Link to={`/insights/${post.slug}`} className="insight-link">Read →</Link>
            </article>
          ))}
        </div>
    </section>
  );
}

function HomeFAQ({ faqs = [] }) {
  const [open, setOpen] = useState(null);
  const selectedFaqs = faqs.slice(0, 5);
  return (
    <section className="section home-faq" style={{ padding: "120px 6%" }}>
      <div className="faq-two-col">
        <div className="faq-left">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vw, 84px)", fontWeight: "bold", margin: 0, lineHeight: 0.95, letterSpacing: "-2px" }}>
            Frequently asked<br />questions
          </h2>
        </div>
        <div className="faq-right">
          <div className="faq-list">
            {selectedFaqs.map((item, i) => (
              <article key={item.id ?? i} className={`faq-item${open === i ? " open" : ""}`}>
                <button onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-toggle">{open === i ? "−" : "+"}</span>
                  <span className="faq-question-text">{item.question}</span>
                </button>
                {open === i && <p>{item.answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
/* ── Main Export ─────────────────────────────────────────────── */
export function Home({ projects, services, solutions, team, posts, faqs }) {
  return (
    <>
      <HeroSection />
      <OverviewBar />
      <CapabilitySnapshot />
      <WhatWeBuild services={services} />
      <SelectedWork projects={projects} />
      <WhyVYOMA />
      <EnterpriseSoftwareCapabilities />
      <CustomSoftwareDetails />
      <SolutionsPreview solutions={solutions} />
      <ProcessPreview />
      <TechPreview />
      <TeamPreview team={team} />
      <FeaturedCaseStudy projects={projects} />
      <InsightsPreview posts={posts} />
      <HomeFAQ faqs={faqs} />
      <FinalCTA />
    </>
  );
}

