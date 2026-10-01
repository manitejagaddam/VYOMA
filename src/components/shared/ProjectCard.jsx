"use client";
/** components/shared/ProjectCard.jsx */
import Image from "next/image";
import { Link } from "./Link";

export function ProjectCard({ project, go }) {
  const img = project?.image_url;
  return (
    <article className="project-card">
      <Link to={`/work/${project.slug}`} go={go} className="project-card-img">
        {img ? (
          <Image
            src={img}
            alt={project.title || "Project image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dim)", fontSize: "13px" }}>No image</div>
        )}
        <div className="project-card-overlay">
          <span>View Case Study →</span>
        </div>
      </Link>
      <div className="project-card-body">
        <div className="project-card-meta">
          {(()=>{ let roles=[]; try{ const p=typeof project.role==="string"?JSON.parse(project.role):project.role; roles=Array.isArray(p)?p:[p]; }catch{ roles=[project.role]; } return roles.filter(Boolean).map(r=><span key={r} className="project-cat">{r}</span>); })()}
          <span className="project-year">{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.overview}</p>
        <Link to={`/work/${project.slug}`} go={go} className="text-link">
          View case study →
        </Link>
      </div>
    </article>
  );
}
