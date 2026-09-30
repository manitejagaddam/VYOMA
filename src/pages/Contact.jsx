"use client";
/** pages/Contact.jsx — Sends inquiry to Supabase `leads` table. */
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.target);
    const honeypot = fd.get("website_url"); // bot trap — must be empty
    if (honeypot) {
      // Silently ignore bot submissions
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
      setError("Something went wrong submitting your inquiry. Please email us directly at hello@vyoma.studio");
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
          <div className="contact-left">
            <p className="eyebrow">Start a project</p>
            <h1>What are you ready to build?</h1>
            <p className="mb-8">Tell VYOMA where you are, what needs to move, and what a better product, system, or intelligent workflow would make possible.</p>
            
            <div className="contact-info-list">
              {[
                ["Email",         <a href="mailto:hello@vyoma.studio" key="e">hello@vyoma.studio</a>],
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

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="contact-name">Your name<input id="contact-name" name="name" required placeholder="Name" /></label>
              <label htmlFor="contact-email">Work email<input id="contact-email" name="email" required type="email" placeholder="you@company.com" /></label>
            </div>
            <label>Company<input name="company" placeholder="Company or organization" /></label>

            {/* Honeypot — invisible to humans, bots fill it and get silently rejected */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
              <label>Leave this empty<input type="text" name="website_url" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <label>What do you need?
              <select name="need" required defaultValue="">
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
                name="description"
                placeholders={[
                  "How can AI improve our customer support?",
                  "We need a SaaS platform built from scratch.",
                  "Can you audit our current cloud architecture?",
                  "What's the cost to develop an MVP in 8 weeks?",
                  "How do we transition to a multi-agent AI system?",
                ]}
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

