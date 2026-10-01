/**
 * fallback.js — Static fallback data used when Supabase is unavailable.
 * Mirror the exact shapes that Supabase tables return so page components
 * stay identical whether data comes from the DB or here.
 */

const heroIntelligence = "/assets/hero-intelligence.webp";
const workResearch = "/assets/work-research.webp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const workAutomation = "/assets/work-automation.webp";
const agencySystem = "/assets/vyoma-agency-system.webp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const productDesign = "/assets/vyoma-product-design.webp";
const engineeringSystem = "/assets/vyoma-engineering.webp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const intelligenceSystem = "/assets/vyoma-intelligence.webp";
const featurePipeline = "/assets/feature-pipeline.webp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const featureMobile = "/assets/feature-mobile.webp";
const featureAi = "/assets/feature-ai.webp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const featureCloud = "/assets/feature-cloud.webp";
const featureAutomation = "/assets/feature-automation.webp";
const featureMobileUi = "/assets/feature-mobile-ui.webp";
const featureCloudArch = "/assets/feature-cloud-arch.webp";
const featureAnalytics = "/assets/feature-analytics.webp";
const featureProductDesign = "/assets/feature-product-design.webp";
const featureGlobal = "/assets/feature-global.webp";
const featureAiPipeline = "/assets/feature-ai-pipeline.webp";

/* ── Projects ───────────────────────────────────── */
export const FALLBACK_PROJECTS = [
  {
    id: 1, slug: "codetitan", no: "01",
    title: "CodeTitan",
    label: "AI-powered development platform",
    category: "AI · GenAI · SaaS · Full Stack",
    industry: "Developer Tools",
    image_url: null, _localImage: featureAi,
    summary: "An AI-powered multi-agent software development platform that orchestrates autonomous coding, review, and deployment workflows.",
    problem: "Development teams were bottlenecked by manual code review, repetitive scaffolding, and fragmented toolchains across large projects.",
    goal: "Build a production-grade multi-agent system where specialized AI agents collaborate to write, review, test, and ship code with a human in the loop.",
    outcome: "A focused AI development workspace with source-aware agents, pipeline observability, and an interface built around confidence in automated decisions.",
    stack: ["Next.js", "Python", "LangGraph", "OpenAI", "PostgreSQL", "Docker"],
    results: ["60% reduction in code review time", "3× faster boilerplate generation", "500+ early access developers"],
    published: true, featured: true, order_index: 1,
  },
  {
    id: 2, slug: "knowledge-in-motion", no: "02",
    title: "Knowledge in Motion",
    label: "AI research platform",
    category: "AI · RAG · Web App",
    industry: "Research & Knowledge",
    image_url: null, _localImage: workResearch,
    summary: "A retrieval-first workspace that turns dense internal knowledge into answers people can check and act on.",
    problem: "Research teams were spending too long locating the right fragment of evidence across disconnected reports.",
    goal: "Create a focused research workflow with source-aware AI assistance and an interface built around confidence, not novelty.",
    outcome: "A focused research workflow with source-aware AI assistance and an interface built around confidence, not novelty.",
    stack: ["Next.js", "Python", "RAG", "Postgres", "Redis"],
    results: ["40% faster research cycles", "90% source attribution accuracy", "Deployed across 3 enterprise teams"],
    published: true, featured: true, order_index: 2,
  },
  {
    id: 3, slug: "studio-automate", no: "03",
    title: "Studio Automate",
    label: "Workflow automation system",
    category: "Automation · SaaS · APIs",
    industry: "Creative Operations",
    image_url: null, _localImage: featureAutomation,
    summary: "A dependable automation layer for the hand-offs, approvals, and small decisions that quietly slow delivery down.",
    problem: "A creative operations team needed one system that could connect their tools without adding another place to work.",
    goal: "Compose an observable workflow that makes the next action clear and keeps people in control.",
    outcome: "A composed, observable workflow that makes the next action clear and keeps people in control.",
    stack: ["React", "Node.js", "APIs", "Workers", "MongoDB"],
    results: ["35% faster project handoffs", "12 tools integrated", "4× reduction in manual status updates"],
    published: true, featured: false, order_index: 3,
  },
  {
    id: 4, slug: "civic-signals", no: "04",
    title: "Civic Signals",
    label: "Public insight tool",
    category: "AI · Data · Web App",
    industry: "Public Sector",
    image_url: null, _localImage: featureAnalytics,
    summary: "An applied AI concept for turning public information into understandable local signals.",
    problem: "Useful data existed, but it was too fragmented and technical for the people who needed to make sense of it.",
    goal: "Build a clear path from raw information to a useful narrative, designed with human review in the loop.",
    outcome: "A clear path from raw information to a useful narrative, designed with human review in the loop.",
    stack: ["TypeScript", "LLMs", "Data APIs", "Cloud", "Python"],
    results: ["Real-time signals from 50+ public data streams", "Human-in-loop review interface", "Deployed across 2 municipalities"],
    published: true, featured: false, order_index: 4,
  },
  {
    id: 5, slug: "synapse-saas", no: "05",
    title: "Synapse",
    label: "B2B SaaS platform",
    category: "SaaS · Backend · Mobile",
    industry: "FinTech",
    image_url: null, _localImage: featureCloudArch,
    summary: "A multi-tenant SaaS platform for financial workflow orchestration with role-based controls and real-time analytics.",
    problem: "Financial teams were managing approval workflows across spreadsheets, email threads, and disconnected legacy tools.",
    goal: "Build a secure, scalable SaaS platform with multi-tenancy, granular permissions, and real-time dashboards.",
    outcome: "A production-ready SaaS with enterprise auth, Stripe billing integration, and a configurable workflow engine.",
    stack: ["React", "FastAPI", "PostgreSQL", "AWS", "Stripe", "Redis"],
    results: ["200+ organizations onboarded", "99.7% uptime SLA", "SOC 2 Type II compliant architecture"],
    published: true, featured: false, order_index: 5,
  },
  {
    id: 6, slug: "atlas-mobile", no: "06",
    title: "Atlas Mobile",
    label: "Cross-platform field app",
    category: "Mobile · Backend · Offline",
    industry: "Logistics",
    image_url: null, _localImage: featureMobileUi,
    summary: "A cross-platform mobile application for field operations with offline-first data sync and real-time GPS tracking.",
    problem: "Field teams were losing hours daily to manual data entry, poor connectivity, and no real-time visibility for coordinators.",
    goal: "Deliver a reliable field app that works fully offline and syncs intelligently when connectivity returns.",
    outcome: "A production mobile app with conflict-free offline sync, live tracking dashboard, and integrated photo capture.",
    stack: ["Flutter", "Node.js", "SQLite", "PostgreSQL", "MapBox"],
    results: ["45% faster job completion times", "100% offline functionality", "Rolled out to 800+ field agents"],
    published: true, featured: false, order_index: 6,
  },
];

/* ── Services ───────────────────────────────────── */
export const FALLBACK_SERVICES = [
  { id: 1, slug: "ui-ux-product-design", no: "01", title: "UI/UX & Product Design", intro: "User-centered product direction, interfaces, and systems that make complex software feel clear.", deliverables: ["UX research", "Information architecture", "User flows", "Wireframes", "UI design", "Prototyping", "Design systems", "Product redesign"], image_url: null, _localImage: featureProductDesign, problems: ["Users abandon products they can't understand", "Misaligned design decisions compound technical debt", "Poor UX erodes trust before the product proves its value"], approach: "Research → Architecture → Flows → Prototype → UI System → Handoff" },
  { id: 2, slug: "web-development", no: "02", title: "Web Development", intro: "High-performance websites, web applications, SaaS products, and portals built for real use.", deliverables: ["Corporate websites", "Web applications", "SaaS platforms", "Dashboards", "Portals", "CMS platforms", "E-commerce", "Custom platforms"], image_url: null, _localImage: engineeringSystem, problems: ["Generic templates can't support custom business logic", "Poor web performance directly reduces conversion", "Unmaintainable codebases slow every future decision"], approach: "Architecture → Frontend → Backend → Integrations → Performance → Deployment" },
  { id: 3, slug: "mobile-app-development", no: "03", title: "Mobile App Development", intro: "iOS, Android, and cross-platform applications shaped around the moments that happen on mobile.", deliverables: ["Cross-platform apps", "Consumer apps", "Business apps", "Mobile SaaS", "Offline-first apps", "Native Android", "Native iOS"], image_url: null, _localImage: featureMobileUi, problems: ["Mobile UX patterns differ fundamentally from web", "Platform-specific edge cases derail projects late", "Offline and sync reliability is underestimated consistently"], approach: "UX Research → Mobile Architecture → Native/Cross-platform → APIs → Testing → Deployment" },
  { id: 4, slug: "ai-genai", no: "04", title: "AI & Generative AI", intro: "Applied intelligence for products and operations: copilots, retrieval, agents, workflows, and automation.", deliverables: ["LLM applications", "RAG systems", "AI agents", "Multi-agent systems", "AI copilots", "AI workflows", "Computer vision", "Recommendation systems"], image_url: null, _localImage: featureAiPipeline, problems: ["AI added superficially creates noise, not value", "Prompt engineering without evaluation is guesswork", "GenAI without guardrails creates trust and safety issues"], approach: "Problem scoping → Data assessment → Model selection → RAG / Agents → Evaluation → Deployment" },
  { id: 5, slug: "chatbots-conversational-ai", no: "05", title: "Chatbots & Conversational AI", intro: "Customer, sales, and knowledge assistants designed around the actual conversation they need to improve.", deliverables: ["Website chatbots", "WhatsApp bots", "Customer support AI", "Sales assistants", "Knowledge assistants", "Internal bots", "Voice interfaces"], image_url: null, _localImage: heroIntelligence, problems: ["FAQ bots frustrate users when they can't escalate properly", "Disconnected bot systems miss the broader support context", "No clear handoff between AI and human agents"], approach: "Conversation design → Intent mapping → LLM integration → Testing → Analytics → Continuous improvement" },
  { id: 6, slug: "custom-software", no: "06", title: "Custom Software Development", intro: "Purpose-built internal tools, platforms, CRM, ERP, and workflow systems that match how your business operates.", deliverables: ["CRM systems", "ERP platforms", "Internal tools", "Business platforms", "Workflow software", "Enterprise applications", "Reporting systems"], image_url: null, _localImage: featureGlobal, problems: ["Off-the-shelf software forces business logic to bend to the tool", "Integration costs for SaaS stacks grow as the business scales", "Custom processes deserve custom systems"], approach: "Requirements → Architecture → Iterative development → Integration → Training → Ongoing support" },
  { id: 7, slug: "saas-development", no: "07", title: "SaaS Development", intro: "Multi-tenant products with secure foundations, clear administration, and room to scale.", deliverables: ["SaaS architecture", "Multi-tenancy", "Authentication & RBAC", "Subscription billing", "Admin platforms", "Analytics", "Scalable APIs"], image_url: null, _localImage: featureCloudArch, problems: ["Multi-tenancy decisions made late create costly migrations", "Security architecture can't be bolted on after launch", "SaaS metrics require the right instrumentation from day one"], approach: "Product scope → SaaS architecture → Auth & billing → Core features → Instrumentation → Launch" },
  { id: 8, slug: "automation-integrations", no: "08", title: "Automation & Integrations", intro: "Connected systems that remove repeated work while keeping business logic and oversight intact.", deliverables: ["API integrations", "Payment gateways", "Third-party platform connectors", "Workflow automation", "Business process automation", "Notifications", "Data pipelines"], image_url: null, _localImage: featurePipeline, problems: ["Manual repetitive work scales with headcount, not efficiency", "Integration failures silently corrupt data across systems", "Automation without observability creates invisible risk"], approach: "Process audit → Integration design → Build → Testing → Monitoring → Iteration" },
  { id: 9, slug: "backend-cloud", no: "09", title: "Backend, Cloud & Infrastructure", intro: "Reliable APIs, cloud foundations, deployment, observability, and the engineering beneath a good experience.", deliverables: ["API development", "Microservices", "Database design", "Cloud architecture", "Docker & containers", "CI/CD pipelines", "Authentication", "Monitoring"], image_url: null, _localImage: featureCloudArch, problems: ["Unscalable backends become the bottleneck as products grow", "Cloud costs spiral without architectural intentionality", "Deployment without CI/CD accumulates operational risk"], approach: "Architecture design → API layer → Database → Cloud provisioning → CI/CD → Observability" },
  { id: 10, slug: "digital-marketing", no: "10", title: "Digital Marketing", intro: "Data-driven marketing strategies that amplify your digital products and accelerate growth.", deliverables: ["SEO Optimization", "Content Marketing", "Performance Ads", "Growth Hacking", "Social Media Strategy", "Conversion Rate Optimization"], image_url: null, _localImage: featureAnalytics, problems: ["Great products fail without an audience", "Acquisition costs spiral without targeted campaigns", "Traffic without conversion tracking masks true ROI"], approach: "Audit & Strategy → Content & SEO → Campaign Setup → Launch → Analyze → Optimize" },
];

/* ── Solutions ──────────────────────────────────── */
export const FALLBACK_SOLUTIONS = [
  { id: 1, slug: "mvp-development", title: "MVP Development", audience: "For founders turning a credible idea into a testable product.", description: "We help founders move from idea to a real, validated product that users can actually use — without over-engineering the first version.", steps: ["Discovery & scoping", "Product design & flows", "MVP architecture", "Core feature development", "Launch & analytics", "Iteration planning"], image_url: null, _localImage: featureProductDesign, category: "STARTUPS" },
  { id: 2, slug: "startup-solutions", title: "Startup Solutions", audience: "For teams defining, building, launching, and iterating their product.", description: "Full product partnership for early-stage teams — from product strategy through engineering, AI integration, and growth.", steps: ["Product strategy", "UI/UX & design system", "Full-stack development", "AI integration", "Infrastructure", "Post-launch support"], image_url: null, _localImage: agencySystem, category: "STARTUPS" },
  { id: 3, slug: "business-automation", title: "Business Automation", audience: "For businesses ready to remove repetitive work and connect operations.", description: "We identify the workflows, approvals, and data hand-offs that slow your team down — and replace them with dependable, observable automation.", steps: ["Process audit", "Automation design", "Integration architecture", "Build & test", "Rollout", "Monitoring & improvement"], image_url: null, _localImage: featureAutomation, category: "BUSINESSES" },
  { id: 4, slug: "ai-transformation", title: "AI Transformation", audience: "For organizations adding useful intelligence to an existing product or workflow.", description: "We integrate AI where it creates real leverage — not everywhere. RAG, agents, copilots, and workflows that make your product meaningfully smarter.", steps: ["AI readiness assessment", "Use case prioritization", "Model & architecture selection", "Integration & evaluation", "Deployment", "Monitoring & improvement"], image_url: null, _localImage: featureAiPipeline, category: "AI" },
  { id: 5, slug: "enterprise-software", title: "Enterprise Software", audience: "For teams that need tailored systems, integrations, data, and control.", description: "Custom enterprise platforms, internal tools, CRM, ERP, and integrations — built to match how your organization actually operates.", steps: ["Requirements & stakeholder alignment", "System architecture", "Phased development", "Legacy integration", "Security & compliance", "Training & handover"], image_url: null, _localImage: featureGlobal, category: "ENTERPRISE" },
];

/* ── Team ───────────────────────────────────────── */
export const FALLBACK_TEAM = [
  { id: 1, name: "Maniteja", role: "Founder & Technical Lead", specialization: "AI · GenAI · Software Architecture · Product Engineering", bio: "Leads product vision, system architecture, and AI strategy across all client engagements.", group: "Leadership", avatar_url: null, linkedin_url: null, github_url: null, order_index: 1 },
  { id: 2, name: "UI/UX Designer", role: "Product Design Lead", specialization: "UX Research · Interface Design · Design Systems", bio: "Responsible for research, product flows, and interface systems that make complex software feel simple.", group: "Design", avatar_url: null, linkedin_url: null, github_url: null, order_index: 2 },
  { id: 3, name: "Frontend Engineer", role: "Frontend Developer", specialization: "React · Next.js · TypeScript · Performance", bio: "Builds fast, accessible, and polished web interfaces with a strong eye for detail.", group: "Engineering", avatar_url: null, linkedin_url: null, github_url: null, order_index: 3 },
  { id: 4, name: "Backend Engineer", role: "Backend Developer", specialization: "APIs · Databases · Cloud · Systems", bio: "Architects and implements the reliable backend systems that power VYOMA's client products.", group: "Engineering", avatar_url: null, linkedin_url: null, github_url: null, order_index: 4 },
  { id: 5, name: "Mobile Developer", role: "Mobile Engineer", specialization: "Flutter · React Native · iOS · Android", bio: "Delivers cross-platform and native mobile apps for consumer and enterprise use cases.", group: "Engineering", avatar_url: null, linkedin_url: null, github_url: null, order_index: 5 },
  { id: 6, name: "AI Engineer", role: "AI & GenAI Engineer", specialization: "LLMs · RAG · Agents · LangChain · LangGraph", bio: "Designs and implements production AI systems, retrieval pipelines, and multi-agent architectures.", group: "AI & ML", avatar_url: null, linkedin_url: null, github_url: null, order_index: 6 },
  { id: 7, name: "ML Engineer", role: "Machine Learning Engineer", specialization: "PyTorch · TensorFlow · MLOps · Data Pipelines", bio: "Builds and trains ML models and manages the data and evaluation infrastructure around them.", group: "AI & ML", avatar_url: null, linkedin_url: null, github_url: null, order_index: 7 },
  { id: 8, name: "QA Engineer", role: "Quality & Delivery", specialization: "Automated Testing · QA · Documentation · Handover", bio: "Ensures every release meets VYOMA's standards for reliability, security, and usability.", group: "Quality & Delivery", avatar_url: null, linkedin_url: null, github_url: null, order_index: 8 },
];

/* ── Insights / Posts ───────────────────────────── */
export const FALLBACK_POSTS = [
  { id: 1, slug: "building-production-rag", tag: "Applied AI", title: "Building production RAG systems that actually work", excerpt: "Retrieval-Augmented Generation sounds straightforward until you face real documents, inconsistent data, and latency requirements that matter.", published_at: "2025-09-01", published: true },
  { id: 2, slug: "mvp-decisions", tag: "Product", title: "The decisions that make an MVP useful before it's impressive", excerpt: "A first release earns its keep by reducing uncertainty. Here is how to choose what stays in the frame.", published_at: "2025-08-15", published: true },
  { id: 3, slug: "system-not-feature", tag: "Engineering", title: "Build the system, not just the feature", excerpt: "The delivery work after launch is where interface decisions become either leverage or ongoing drag.", published_at: "2025-07-28", published: true },
  { id: 4, slug: "ai-agents-architecture", tag: "AI Architecture", title: "AI agent architectures for real products", excerpt: "What does an actual multi-agent system look like when it needs to be reliable, observable, and maintainable?", published_at: "2025-07-10", published: true },
  { id: 5, slug: "saas-architecture-mistakes", tag: "SaaS", title: "The five SaaS architecture mistakes that cost the most to fix", excerpt: "Multi-tenancy, auth, and billing decisions made early define the product's future cost — not just its current state.", published_at: "2025-06-20", published: true },
  { id: 6, slug: "design-systems-scale", tag: "Design", title: "Why design systems pay off at scale", excerpt: "The upfront investment in a proper design system returns significant velocity as products grow in complexity.", published_at: "2025-06-01", published: true },
];

/* ── FAQ ────────────────────────────────────────── */
export const FALLBACK_FAQS = [
  { id: 1, question: "What does VYOMA build?", answer: "VYOMA designs and builds web applications, mobile apps, AI systems, SaaS products, chatbots, custom enterprise software, and automation systems. We cover the entire product lifecycle from UI/UX through engineering and deployment.", category: "General", order_index: 1 },
  { id: 2, question: "Do you work with startups?", answer: "Yes. A significant part of our work is with early-stage founders and startup teams building their first or second product. We can help with MVP scoping, product design, and full-stack development.", category: "General", order_index: 2 },
  { id: 3, question: "Can you integrate AI into an existing product?", answer: "Yes. We assess where AI creates real leverage in your product or workflow — and implement it with the right architecture for reliability, evaluation, and long-term maintenance.", category: "Technical", order_index: 3 },
  { id: 4, question: "How does the process work?", answer: "We start with a discovery session to understand the business, users, and constraints. Then we define scope and roadmap, design the product, architect the system, build iteratively, test thoroughly, and deploy with monitoring in place.", category: "Project", order_index: 4 },
  { id: 5, question: "How long does a project take?", answer: "This depends on scope. A well-defined MVP can take 8–16 weeks. A larger SaaS product or AI system may take 3–6 months for the first version. We'll give you a realistic estimate after the discovery session.", category: "Project", order_index: 5 },
  { id: 6, question: "Who will work on my project?", answer: "You work with an actual VYOMA team matched to your project's needs — not a rotating bench of outsourced contractors. The same people who start the project finish it.", category: "Project", order_index: 6 },
  { id: 7, question: "How is project pricing determined?", answer: "Pricing is based on scope, complexity, and team size required. We work on fixed-scope projects, time-and-materials engagements, and dedicated team models depending on what fits your situation.", category: "Commercial", order_index: 7 },
  { id: 8, question: "Do you sign NDAs?", answer: "Yes, we sign NDAs as a standard part of any engagement before discussing project details.", category: "Commercial", order_index: 8 },
  { id: 9, question: "Do you offer ongoing support?", answer: "Yes. VYOMA offers maintenance, support, and continuous development partnerships after initial project launch.", category: "Commercial", order_index: 9 },
  { id: 10, question: "Can you build custom APIs and integrations?", answer: "Yes. Backend APIs, third-party integrations, payment gateways, and custom automation are core parts of our engineering practice.", category: "Technical", order_index: 10 },
];

/* ── Static constants (don't need DB) ──────────── */
export const STAGES = [
  ["01", "Discover", "Understand the business, users, constraints, and objectives before writing a single line of code."],
  ["02", "Define", "Turn requirements into a focused scope, roadmap, and success criteria that the whole team agrees on."],
  ["03", "Design", "Create user flows, interfaces, and prototypes that make the product understandable before it exists."],
  ["04", "Architect", "Choose the technology, infrastructure, and system boundaries deliberately — not by default."],
  ["05", "Build", "Develop frontend, backend, mobile, and AI capabilities with care for maintainability and scale."],
  ["06", "Test", "Validate quality, security, performance, and the actual user experience — not just the happy path."],
  ["07", "Deploy", "Ship to production with monitoring, documentation, and clear ownership from day one."],
  ["08", "Scale", "Improve the product as the team, users, and ambition grow."],
];

export const TECHNOLOGIES = {
  Frontend:       ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend:        ["Node.js", "Python", "FastAPI", "Java", ".NET", "GraphQL"],
  Mobile:         ["Flutter", "React Native", "Native Android", "Native iOS"],
  AI:             ["OpenAI", "Gemini", "Claude", "LangChain", "LangGraph", "Hugging Face", "PyTorch", "TensorFlow"],
  Databases:      ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase", "Pinecone"],
  Infrastructure: ["Docker", "AWS", "Azure", "GCP", "Kubernetes", "CI/CD"],
};


