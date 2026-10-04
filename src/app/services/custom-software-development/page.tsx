import type { Metadata } from "next";
import { SectionKicker } from "@/components/shared/SectionKicker";
import { Btn } from "@/components/shared/Btn";
import { Spotlight } from "@/components/ui/spotlight";

export const metadata: Metadata = {
  title: "Custom Software Development Services",
  description: "Enterprise-grade custom software development, architecture, security, and scalability for ambitious businesses.",
  alternates: {
    canonical: "https://vyoma.world/services/custom-software-development",
  },
};

export default function CustomSoftwareServicePage() {
  const faqs = [
    { q: "Do we really need custom software, or can we just buy an off-the-shelf SaaS?", a: "Off-the-shelf software is great for standardized processes (like HR or generic accounting). But if the software is core to your competitive advantage, revenue generation, or unique operational workflows, buying SaaS will force your business logic to bend to the tool. Custom software ensures the system fits the problem exactly." },
    { q: "How do you ensure the system scales with our growth?", a: "We architect for scalability from Day 1 using microservices, event-driven architectures, and scalable cloud databases (like PostgreSQL on AWS/GCP). We also implement robust CI/CD pipelines so scaling infrastructure is automated, not manual." },
    { q: "What happens if we need to integrate with legacy systems?", a: "Integration is a core part of our offering. We build secure API layers, data pipelines, and middleware that allow modern custom software to communicate seamlessly with legacy mainframes, CRMs, or ERPs without risking data corruption." },
    { q: "Who owns the intellectual property (IP) after the project is done?", a: "You do. Unlike SaaS where you rent access, custom software development results in proprietary IP that your company owns entirely. This becomes a valuated asset on your balance sheet." }
  ];

  return (
    <div className="w-full bg-black min-h-screen text-white pt-32 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden mb-32 px-6">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-50" fill="white" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionKicker left="Service Overview" right="Custom Software Development" />
          <h1 className="text-5xl md:text-7xl font-bold font-sans mt-8 mb-6 leading-tight">
            Software built for <br/><span className="text-[var(--accent)]">your exact reality.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mb-10 leading-relaxed">
            We architect and build enterprise-grade custom software, internal tools, and complex platforms. No templates. No forcing your business logic into a rigid SaaS product. Just scalable, secure, and performant systems built around the way you actually operate.
          </p>
          <Btn to="/contact" variant="cta">Book a Discovery Call</Btn>
        </div>
      </section>

      {/* Problem Framing */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">The problem with &quot;Off-The-Shelf&quot;</h2>
            <p className="text-neutral-400 mb-4">When a business relies on standard SaaS for core operations, they inevitably hit a ceiling. Workarounds emerge. Spreadsheets multiply. Teams spend more time managing the software than doing the work.</p>
            <p className="text-neutral-400">Custom software eliminates this friction. It is the practice of framing the exact business problem first, and building a tailored technical architecture that solves it permanently.</p>
          </div>
          <div className="p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-[var(--accent)]">The VYOMA Approach</h3>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li className="flex gap-3"><span className="text-[var(--accent)]">✓</span> <strong>Discovery:</strong> Deep mapping of your operational logic.</li>
              <li className="flex gap-3"><span className="text-[var(--accent)]">✓</span> <strong>Architecture:</strong> Designing for long-term scale and security.</li>
              <li className="flex gap-3"><span className="text-[var(--accent)]">✓</span> <strong>Iterative Build:</strong> Releasing core value fast, then expanding.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Pillars: Architecture, Security, Data, Maintenance */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="text-4xl font-bold mb-12 text-center">Enterprise-Grade Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-white/10 bg-black rounded-xl hover:border-[var(--accent)]/50 transition-colors">
            <div className="text-3xl mb-4">🏗️</div>
            <h3 className="font-bold text-lg mb-2">Architecture Options</h3>
            <p className="text-sm text-neutral-400">We implement microservices, event-driven architectures, and serverless backends based on your throughput and latency requirements.</p>
          </div>
          <div className="p-6 border border-white/10 bg-black rounded-xl hover:border-[var(--accent)]/50 transition-colors">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="font-bold text-lg mb-2">Security & Compliance</h3>
            <p className="text-sm text-neutral-400">Zero-trust models, SOC 2 Type II readiness, encryption at rest/transit, and granular Role-Based Access Control (RBAC).</p>
          </div>
          <div className="p-6 border border-white/10 bg-black rounded-xl hover:border-[var(--accent)]/50 transition-colors">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="font-bold text-lg mb-2">Integrations & Data</h3>
            <p className="text-sm text-neutral-400">High-throughput data pipelines, robust API layers, and seamless integrations with legacy ERPs or CRMs.</p>
          </div>
          <div className="p-6 border border-white/10 bg-black rounded-xl hover:border-[var(--accent)]/50 transition-colors">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="font-bold text-lg mb-2">Maintenance Plans</h3>
            <p className="text-sm text-neutral-400">Dedicated SLA-backed support, CI/CD pipeline management, proactive monitoring, and continuous iteration post-launch.</p>
          </div>
        </div>
      </section>

      {/* Expert Insights (Long Form) */}
      <section className="bg-white/5 border-y border-white/10 py-24 mb-32">
        <div className="max-w-4xl mx-auto px-6">
          <SectionKicker left="Expert Insights" right="From our Engineering Lead" />
          <h2 className="text-3xl font-bold mt-8 mb-6">Why scalability fails (and how we prevent it)</h2>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
            <p>Most custom software doesn&apos;t fail because it couldn&apos;t be built; it fails because it couldn&apos;t adapt. When an architecture is tightly coupled, adding a simple feature can break three unrelated systems.</p>
            <p>At VYOMA, we prevent technical ceilings by utilizing <strong>Domain-Driven Design (DDD)</strong> and <strong>CQRS</strong> (Command Query Responsibility Segregation) for complex systems. This ensures that read operations (which are highly frequent) scale independently from write operations.</p>
            <p>Furthermore, when integrating AI, we don&apos;t just bolt on an API call. We build robust <strong>Retrieval-Augmented Generation (RAG)</strong> pipelines backed by highly available vector databases, ensuring the AI operates exclusively on your secure, proprietary data context.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 border border-white/10 bg-black rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-[var(--accent)]">{faq.q}</h3>
              <p className="text-neutral-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center pb-12">
        <Btn to="/contact" variant="cta">Book a Discovery Call</Btn>
      </div>
    </div>
  );
}
