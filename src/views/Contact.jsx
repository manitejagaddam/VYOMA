"use client";
/** pages/Contact.jsx — Sends inquiry to Supabase `leads` table.
 *  Supports ?service= query param for dynamic pre-fill from service/solution pages.
 */
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContactForm } from "@/app/actions";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
// Maps URL ?service= slug → { label, need, description, placeholders }
const SERVICE_CONTEXT = {
  "web-development": {
    label: "Web Development",
    need: "Website or web application",
    description: "I'm interested in building a web application.",
    placeholders: [
      "We need a performant SaaS web app with a clean dashboard.",
      "Our existing site needs a full redesign and rebuild.",
      "Can you build a scalable multi-tenant web platform for us?",
      "We need a customer portal integrated with our backend APIs.",
    ],
  },
  "mobile-development": {
    label: "Mobile App Development",
    need: "Mobile application",
    description: "I'm interested in developing a mobile application.",
    placeholders: [
      "We need a React Native app for iOS and Android.",
      "Build us a mobile companion for our existing web platform.",
      "How quickly can you ship an MVP mobile app for our startup?",
      "We need push notifications and offline sync in our mobile app.",
    ],
  },
  "ai-development": {
    label: "AI & GenAI Solutions",
    need: "AI or GenAI solution",
    description: "I'm interested in AI and Generative AI integration.",
    placeholders: [
      "How can AI improve our customer support workflow?",
      "We want to build a generative AI feature inside our product.",
      "Can you set up a RAG pipeline on our internal documents?",
      "We need a custom LLM fine-tuned for our industry data.",
    ],
  },
  "chatbot-ai": {
    label: "Chatbot & Conversational AI",
    need: "Chatbot or conversational AI",
    description: "I'm interested in a chatbot or conversational AI solution.",
    placeholders: [
      "We need an intelligent chatbot for customer support automation.",
      "Build us a WhatsApp bot for lead qualification.",
      "Can you integrate an AI assistant into our existing CRM?",
      "We want a voice-enabled conversational agent for our call center.",
    ],
  },
  "saas-software": {
    label: "SaaS & Custom Software",
    need: "SaaS or custom software",
    description: "I'm interested in a custom SaaS or software solution.",
    placeholders: [
      "We need a SaaS platform built from scratch.",
      "Help us build a B2B tool with billing, teams, and role management.",
      "We have a legacy system that needs a modern rewrite.",
      "Can you build a custom internal operations platform for our team?",
    ],
  },
  "ui-ux-design": {
    label: "UI/UX & Product Design",
    need: "UI/UX and product design",
    description: "I'm interested in UI/UX design and product strategy.",
    placeholders: [
      "Our product needs a full UX audit and redesign.",
      "We need a design system built from the ground up.",
      "Help us design the MVP for our new SaaS product.",
      "Our current UI is hurting conversion — we need a redesign.",
    ],
  },
  "automation": {
    label: "Automation & Integrations",
    need: "Automation or integrations",
    description: "I'm interested in workflow automation and system integrations.",
    placeholders: [
      "We need to automate our lead-to-CRM pipeline.",
      "Help us connect our tools: Zapier, Slack, Notion, and our database.",
      "We want to eliminate manual data entry across our SaaS tools.",
      "Can you build automated reporting for our operations team?",
    ],
  },
  // Solutions slugs
  "intelligence-layer": {
    label: "Intelligence Layer",
    need: "AI or GenAI solution",
    description: "I'm interested in the Intelligence Layer solution.",
    placeholders: [
      "We want to embed AI intelligence directly into our product.",
      "Help us build predictive analytics and recommendations into our platform.",
      "We need an AI layer that learns from our user behavior data.",
    ],
  },
  "product-transformation": {
    label: "Product Transformation",
    need: "SaaS or custom software",
    description: "I'm interested in product transformation and modernisation.",
    placeholders: [
      "Our legacy product needs a full modern transformation.",
      "Help us rebuild our platform for scale and performance.",
      "We need to move from a monolith to a modern architecture.",
    ],
  },
};

// Default placeholders for generic contact
const DEFAULT_PLACEHOLDERS = [
  "How can AI improve our customer support?",
  "We need a SaaS platform built from scratch.",
  "Can you audit our current cloud architecture?",
  "What's the cost to develop an MVP in 8 weeks?",
  "How do we transition to a multi-agent AI system?",
];



export function Contact() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams?.get("service") || null;
  const ctx = serviceSlug ? SERVICE_CONTEXT[serviceSlug] : null;

  const [selectedNeed, setSelectedNeed] = useState(ctx?.need || "");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const matchedCtx = Object.values(SERVICE_CONTEXT).find(c => c.need === selectedNeed) || ctx;
  const currentPlaceholders = matchedCtx?.placeholders || DEFAULT_PLACEHOLDERS;
  const currentDescription = matchedCtx?.description || "";



  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.target);
    const honeypot = fd.get("website_url");
    if (honeypot) {
      setSubmitting(false);
      setSent(true);
      return;
    }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lead = {
      name:        fd.get("name"),
      email:       fd.get("email"),
      company:     fd.get("company") || null,
      need:        fd.get("need"),
      stage:       fd.get("stage"),
      timeline:    fd.get("timeline"),
      budget:      fd.get("budget") || null,
      description: fd.get("description"),
      source:      serviceSlug || null,
      created_at:  new Date().toISOString(),
    };

    try {
      await submitContactForm(fd, window.turnstileToken || null);
      setSent(true);
    } catch (err) {
      console.error("[VYOMA] Lead submission error:", err.message);
      setError(err.message || "Something went wrong submitting your inquiry. Please email us directly at support@vyoma.world");
    } finally {
      setSubmitting(false);
    }
  }



  return (
    <section className="contact-page">
      {sent ? (
        <div className="contact-success">
          <span className="eyebrow">Project inquiry received</span>
          <h1>Thank you. VYOMA will respond with thoughtful questions, not a sales script.</h1>
          <p>We typically respond within one business day.</p>
          <button className="text-link" onClick={() => setSent(false)}>Send another inquiry →</button>
        </div>
      ) : (
        <>
          {/* ─── LEFT PANEL ─────────────────────────────── */}
          <div className="contact-left">
            {ctx ? (
              <>
                <p className="eyebrow">You came from {ctx.label}</p>
                <h1>Let&apos;s talk {ctx.label}.</h1>
                <p className="mb-8">
                  The form on the right is already tuned for your interest. Fill in a few details and VYOMA will come back with the right questions — not a generic sales reply.
                </p>
              </>
            ) : (
              <>
                <p className="eyebrow">Start a project</p>
                <h1>What are you ready to build?</h1>
                <p className="mb-8">Tell VYOMA where you are, what needs to move, and what a better product, system, or intelligent workflow would make possible.</p>
              </>
            )}

            <div className="contact-info-list">
              {[
                ["Email",         <a href="mailto:support@vyoma.world" key="e">support@vyoma.world</a>],
                ["Discovery call",<strong key="d">Available — just reach out</strong>],
                ["Location",      <strong key="l">Working globally</strong>],
                ["Response time", <strong key="r">Within one business day</strong>],
              ].map(([label, val]) => (
                <div key={label} className="contact-info-item">
                  <span>{label}</span>
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* ─── FORM ───────────────────────────────────── */}
          <form key={serviceSlug || "form"} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="contact-name">Your name<input id="contact-name" name="name" required placeholder="Name" suppressHydrationWarning /></label>
              <label htmlFor="contact-email">Work email<input id="contact-email" name="email" required type="email" placeholder="you@company.com" suppressHydrationWarning /></label>
            </div>
            <label>Company<input name="company" placeholder="Company or organization" suppressHydrationWarning /></label>

            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
              <label>Leave this empty<input type="text" name="website_url" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <label>What do you need?
              <CustomSelect
                name="need"
                required
                value={selectedNeed}
                onChange={setSelectedNeed}
                placeholder="Select a focus"
                options={["Website or web application","Mobile application","AI or GenAI solution","Chatbot or conversational AI","SaaS or custom software","UI/UX and product design","Automation or integrations","Other"]}
              />
            </label>

            <div className="form-row">
              <label>Project stage
                <CustomSelect
                  name="stage"
                  required
                  value={selectedStage}
                  onChange={setSelectedStage}
                  placeholder="Select a stage"
                  options={["Idea","Planning","Prototype","Existing product","Redesign","Scaling"]}
                />
              </label>
              <label>Timeline
                <CustomSelect
                  name="timeline"
                  required
                  value={selectedTimeline}
                  onChange={setSelectedTimeline}
                  placeholder="Select a timeline"
                  options={["ASAP","1–3 months","3–6 months","Flexible"]}
                />
              </label>
            </div>

            <label>Budget range
              <CustomSelect
                name="budget"
                value={selectedBudget}
                onChange={setSelectedBudget}
                placeholder="Choose a range"
                options={["Exploring options","Focused project","Product engagement","Ongoing partnership"]}
              />
            </label>

            <label>Project description
              <AnimatedTextarea
                key={serviceSlug || selectedNeed}
                name="description"
                initialValue={currentDescription}
                placeholders={currentPlaceholders}
              />
            </label>

            {error && <p style={{ color: "var(--accent-warm)", fontSize: 13 }}>{error}</p>}

            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
              <div className="mb-4">
                <Turnstile 
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} 
                  onSuccess={(token) => {
                    // Quick way to pass token without needing state which would trigger re-renders
                    window.turnstileToken = token;
                  }}
                />
              </div>
            )}

            <div className="form-footer">
              <span>NDAs available on request. Replies within one business day.</span>
              <button type="submit" className="submit-btn" disabled={submitting} suppressHydrationWarning>
                {submitting ? "Sending…" : "Submit Project Inquiry →"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}

function AnimatedTextarea({ placeholders, initialValue, name }) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders]);

  return (
    <textarea
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholders[index]}
      rows={4}
      style={{ transition: "placeholder 0.3s ease" }}
    />
  );
}

function CustomSelect({ name, value, onChange, options, placeholder, required }) {
  const [open, setOpen] = useState(false);
  
  const displayValue = value || placeholder;
  // Exclude the selected value from the dropdown list, matching the CSS behavior
  const filteredOptions = options.filter(opt => opt !== displayValue);

  return (
    <div 
      className={`relative w-full mt-3 ${open ? 'z-[100]' : 'z-10'}`} 
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ color: "var(--text)", fontFamily: "var(--font-sans)", cursor: "pointer" }}
    >
      <input type="hidden" name={name} value={value} required={required} />
      
      {/* Selected Box */}
      <div
        className="relative z-50 flex items-center justify-between transition-colors duration-300"
        style={{
          backgroundColor: "var(--dropdown-bg)",
          padding: "10px 12px",
          marginBottom: "3px",
          borderRadius: "5px",
          fontSize: "15px",
          fontWeight: 400,
          textTransform: "none",
          letterSpacing: "normal"
        }}
        onClick={() => setOpen(!open)}
      >
        <span>{displayValue}</span>
        
        {/* Arrow SVG from the provided snippet */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 512 512" 
          className="transition-transform duration-300"
          style={{
            height: "12px",
            width: "25px",
            fill: "var(--text)",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)"
          }}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      {/* Options Dropdown */}
      <div className="absolute left-0 right-0 z-40 overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundColor: "var(--dropdown-bg)",
                padding: "5px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div className="max-h-[250px] overflow-y-auto custom-scrollbar flex flex-col">
                {filteredOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(opt);
                      setOpen(false);
                    }}
                    className="transition-colors duration-300"
                    style={{
                      padding: "8px 10px",
                      borderRadius: "5px",
                      fontSize: "15px",
                      fontWeight: 400,
                      backgroundColor: "transparent",
                      textTransform: "none",
                      letterSpacing: "normal"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--dropdown-hover)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
