"use client";
/** components/shared/ProjectCard.jsx */
import { Link } from "./Link";

export function ProjectCard({ project, go }) {
  const img = project?.image_url;
  return (
    <article className="project-card">
      <Link to={`/work/${project.slug}`} go={go} className="project-card-img">
        {img
          ? <img src={img} alt={project.title} loading="lazy" />
          : <div style={{ width: "100%", height: "100%", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dim)", fontSize: "13px" }}>No image</div>
        }
        <div className="project-card-overlay">
          <span>View Case Study →</span>
        </div>
      </Link>
      <div className="project-card-body">
        <div className="project-card-meta">
          <span className="project-cat">{project.role}</span>
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

