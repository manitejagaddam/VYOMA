"use client";
/** pages/CaseStudy.jsx — Uses exact DB column names */
import Image from "next/image";
import { SectionKicker } from "@/components/shared/SectionKicker";
import { Btn } from "@/components/shared/Btn";
import { NotFound } from "./NotFound";

/** Converts the markdown stored in DB to safe HTML for display */
function mdToHtml(md) {
  if (!md) return "";
  return md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .split(/\n{2,}/)
    .map(block => {
      const lines = block.split("\n");
      if (lines.every(l => l.match(/^- /)))
        return "<ul>" + lines.map(l => `<li>${l.slice(2)}</li>`).join("") + "</ul>";
      if (lines.every(l => l.match(/^\d+\. /)))
        return "<ol>" + lines.map(l => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("") + "</ol>";
      if (block.startsWith("<h")) return block;
      return block ? `<p>${block}</p>` : "";
    }).join("");
}

function RichBlock({ text }) {
  return <div className="case-rich" dangerouslySetInnerHTML={{ __html: mdToHtml(text) }} />;
}
export function CaseStudy({ project }) {
  if (!project) return <NotFound />;

  const heroImage = project.banner_url || project.image_url;
  const stack = project.tags || []; // DB stores stack as `tags`

  return (
    <>
      {/* Hero */}
      <section className="case-hero">
        <div className="case-hero-content">
          <p className="eyebrow">Case study</p>
          <h1>{project.title}</h1>
          <p className="case-hero-sub">{project.overview}</p>
          <div className="case-hero-meta">
            <div><span>Client</span><strong>{project.client}</strong></div>
            <div><span>Role</span><strong>{(()=>{ try{ const p=typeof project.role==="string"?JSON.parse(project.role):project.role; return Array.isArray(p)?p.join(" · "):project.role; }catch{return project.role;} })()}</strong></div>
            <div><span>Timeline</span><strong>{project.timeline}</strong></div>
            <div><span>Year</span><strong>{project.year}</strong></div>
          </div>
          {project.live_url && (
            <div style={{ marginTop: "32px" }}>
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", color: "var(--accent-2)", borderColor: "var(--accent-2)" }}
              >
                View Live Project ↗
              </a>
            </div>
          )}
        </div>
        {heroImage && (
          <figure className="relative w-full min-h-[280px] md:min-h-[420px] rounded-xl overflow-hidden">
            <Image src={heroImage} alt={project.title} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </figure>
        )}
      </section>

      {/* Body */}
      <section className="section case-body">
        <div className="case-columns">
          <div className="case-left">
            {[["The Overview", project.overview], ["The Challenge", project.challenge], ["The Solution", project.solution], ["The Impact", project.impact]].map(
              ([label, text]) => text && (
                <div key={label} className="case-block">
                  <span>{label}</span>
                  <RichBlock text={text} />
                </div>
              )
            )}
          </div>
          <div className="case-right">
            {stack.length > 0 && (
              <div className="case-block">
                <span>Technology Stack</span>
                <div className="stack-tags">
                  {stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery_urls?.length > 0 && (
        <section className="section case-gallery">
          <SectionKicker left="Gallery" right="Visuals" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginTop: "40px" }}>
            {project.gallery_urls.map((url, i) => (
              <figure key={i} className="relative min-h-[240px] rounded-xl overflow-hidden" style={{ margin: 0, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <Image src={url} alt={`${project.title} screenshot ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Journey */}
      <section className="section case-process">
        <SectionKicker left="Development journey" right="How it was built" />
        <div className="case-journey">
          {["Discover", "Define", "Design", "Build", "Test", "Deploy"].map((s, i, arr) => (
            <span key={s}>
              {s}
              {i < arr.length - 1 && <span className="journey-dot"> → </span>}
            </span>
          ))}
        </div>
        <p className="case-journey-note">
          Every project at VYOMA follows a deliberate path from discovery through deployment,
          with documentation and ownership at every step.
        </p>
      </section>

      {/* CTA */}
      <section className="section case-cta">
        <h2>Need something similar?</h2>
        <p>Tell VYOMA about your project. We&apos;ll respond with the right questions, not a sales script.</p>
        <Btn to="/contact" variant="primary">Talk to VYOMA</Btn>
      </section>
    </>
  );
}


