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
          <p className="eyebrow hero-eyebrow">VYOMA / Design. Build. Intelligence.</p>
          <div className="hero-headline text-left relative">
            <span className="block mb-2 text-gradient">We build</span>
            <div className="relative inline-block w-full h-[1.2em]">
              <FlipWords 
                words={["AI systems.", "SaaS platforms.", "digital products.", "modern software."]} 
                className="text-[var(--accent)] block -ml-2"
              />
            </div>
          </div>
          <p className="hero-body">VYOMA is a technology agency helping startups and businesses transform ideas into scalable digital products through design, engineering and AI.</p>
          <div className="hero-actions">
            <Btn to="/contact" variant="primary">Start a Project</Btn>
            <Btn to="/work"    variant="outline">Explore Our Work</Btn>
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
    { no: "02", title: "Engineering",  icon: "⬡", desc: "Web, mobile, backend, cloud, APIs, SaaS, and custom software built for long-term use.", items: ["Web Apps", "Mobile", "Backend", "Cloud & APIs", "SaaS"] },
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
          <Btn to="/work" variant="outline">View all work</Btn>
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
          
          <div className="mt-auto pt-4">
            <Btn to={`/services/${b.slug}`} variant="cta" aria-label={`Explore ${b.title} Service`}>
              Explore Service
            </Btn>
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
                <Btn to="/services" variant="outline">View all services</Btn>
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

function SolutionsPreview({ solutions = [] }) {
  return (
    <section className="section solutions-preview">
      <SectionKicker left="Solutions" right="Start with the business problem" />
      <div className="solutions-header">
        <h2>What kind of project are you working on?</h2>
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
  return (
    <section className="section featured-case">
      <SectionKicker left="Case study spotlight" right="One project, in depth" />
      <div className="featured-case-inner">
        <figure className="relative min-h-[320px] overflow-hidden rounded-xl">
          {project.image_url && <Image src={project.image_url} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
        </figure>
        <div className="featured-case-content">
          <span className="featured-cat">{Array.isArray(project.role) ? project.role.join(" · ") : (()=>{ try{ const p=JSON.parse(project.role); return Array.isArray(p)?p.join(" · "):project.role; }catch{return project.role;} })()}</span>
          <h2>{project.title}</h2>
          <p>{project.overview}</p>
          <div className="featured-stack">
            {(project.tags || []).map(s => <span key={s}>{s}</span>)}
          </div>
          <Btn to={`/work/${project.slug}`} variant="primary">View Case Study</Btn>
        </div>
      </div>
    </section>
  );
}

function InsightsPreview({ posts = [] }) {
  const recentPosts = posts.slice(0, 3);
  return (
    <section className="section home-insights">
      <SectionKicker left="Insights" right="Thinking from the work" />
      <div className="insights-title-row">
        <h2>Notes on product, engineering, and AI.</h2>
        <Btn to="/insights" variant="outline">All insights</Btn>
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

