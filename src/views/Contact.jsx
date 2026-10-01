"use client";
/** pages/Contact.jsx — Sends inquiry to Supabase `leads` table.
 *  Supports ?service= query param for dynamic pre-fill from service/solution pages.
 */
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

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

const WHATSAPP_NUMBER = "919494785078";

function buildWhatsAppUrl(service = null, name = "") {
  let msg = "";
  if (service && SERVICE_CONTEXT[service]) {
    const ctx = SERVICE_CONTEXT[service];
    msg = `Hi VYOMA 👋 I'm interested in your ${ctx.label} services. I'd love to discuss a project — could we connect?`;
  } else {
    msg = "Hi VYOMA 👋 I'd like to discuss a project. Could we connect?";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function Contact() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams?.get("service") || null;
  const ctx = serviceSlug ? SERVICE_CONTEXT[serviceSlug] : null;

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Controlled value for the `need` select — pre-selected from context
  const [needValue, setNeedValue] = useState(ctx?.need || "");
  const [descValue, setDescValue] = useState(ctx?.description || "");

  // Keep in sync if URL param changes
  useEffect(() => {
    if (ctx) {
      setNeedValue(ctx.need);
      setDescValue(ctx.description);
    } else {
      setNeedValue("");
      setDescValue("");
    }
  }, [serviceSlug]); // eslint-disable-line react-hooks/exhaustive-deps

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
      if (supabase) {
        const { error: dbErr } = await supabase.from("leads").insert([lead]);
        if (dbErr) throw dbErr;
      }
      setSent(true);
    } catch (err) {
      console.error("[VYOMA] Lead submission error:", err.message);
      setError("Something went wrong submitting your inquiry. Please email us directly at support@vyoma.world");
    } finally {
      setSubmitting(false);
    }
  }

  const waUrl = buildWhatsAppUrl(serviceSlug);

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
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="contact-name">Your name<input id="contact-name" name="name" required placeholder="Name" /></label>
              <label htmlFor="contact-email">Work email<input id="contact-email" name="email" required type="email" placeholder="you@company.com" /></label>
            </div>
            <label>Company<input name="company" placeholder="Company or organization" /></label>

            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
              <label>Leave this empty<input type="text" name="website_url" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <label>What do you need?
              <select
                name="need"
                required
                value={needValue}
                onChange={e => setNeedValue(e.target.value)}
              >
                <option value="" disabled>Select a focus</option>
                {["Website or web application","Mobile application","AI or GenAI solution","Chatbot or conversational AI","SaaS or custom software","UI/UX and product design","Automation or integrations","Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </label>

            <div className="form-row">
              <label>Project stage
                <select name="stage" required defaultValue="">
                  <option value="" disabled>Select a stage</option>
                  {["Idea","Planning","Prototype","Existing product","Redesign","Scaling"].map(o => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label>Timeline
                <select name="timeline" required defaultValue="">
                  <option value="" disabled>Select a timeline</option>
                  {["ASAP","1–3 months","3–6 months","Flexible"].map(o => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>

            <label>Budget range
              <select name="budget" defaultValue="">
                <option value="" disabled>Choose a range</option>
                {["Exploring options","Focused project","Product engagement","Ongoing partnership"].map(o => <option key={o}>{o}</option>)}
              </select>
            </label>

            <div className="mb-4">
              <label className="mb-2 block">Project description</label>
              <PlaceholdersAndVanishInput
                key={serviceSlug}
                name="description"
                initialValue={descValue}
                placeholders={ctx?.placeholders || DEFAULT_PLACEHOLDERS}
              />
            </div>

            {error && <p style={{ color: "var(--accent-warm)", fontSize: 13 }}>Something went wrong. Please try again.</p>}

            <div className="form-footer">
              <span>NDAs available on request. Replies within one business day.</span>
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Sending…" : "Submit Project Inquiry →"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
