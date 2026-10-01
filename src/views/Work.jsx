"use client";
/** pages/Work.jsx */
import { useState } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const FILTERS = ["ALL", "WEB", "MOBILE", "AI", "SAAS", "SOFTWARE", "DESIGN"];

export function Work({ initialProjects = [] }) {
  const [filter, setFilter] = useState("ALL");
  const projects = initialProjects;

  const filtered = filter === "ALL"
    ? projects
    : projects.filter(p => p.role?.toUpperCase().includes(filter) || p.tags?.some(t => t.toUpperCase().includes(filter)));

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="The work is the proof."
        copy="A growing archive of product thinking, interface decisions, system design, and applied AI — built for real problems, designed for real users."
      />
      <section className="section work-index">
        <div className="work-filter-bar">
          {FILTERS.map(c => (
            <button
              key={c}
              className={`filter-btn${filter === c ? " active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "80px 0" }}>No projects found.</p>
        ) : (
          <div className="project-grid-full">
            {filtered.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        )}
      </section>
    </>
  );
}

