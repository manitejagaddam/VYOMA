"use client";
/** pages/Solutions.jsx
 * Solutions list: each row is a 50/50 split —
 *   left = image bleeding edge-to-edge (alternates side by side)
 *   right = category, title, description, steps, CTA
 */
import { PageHero } from "@/components/shared/PageHero";
import { Btn } from "@/components/shared/Btn";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useSupabaseQuery } from "@/hooks/useData";
import { NotFound } from "./NotFound";
const agencySystem = "/assets/vyoma-agency-system.png";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FinalCTA } from "@/components/shared/FinalCTA";

export function Solutions({}) {
  const { data: solutions, loading } = useSupabaseQuery(
    "solutions",
    { order: { column: "id" } }
  );

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Start with the problem. Build the right system."
        copy="VYOMA organizes its work around the outcomes businesses and founders are trying to achieve — not a list of frameworks."
        image={agencySystem}
        imageAlt="Connected technology system"
      />
      <section className="solutions-split-list">
        {loading ? <LoadingSpinner label="Loading solutions…" /> : solutions.map((sol, i) => {
          const img = sol.image_url;
          const isEven = i % 2 === 0;
          return (
            <article key={sol.slug} className={`sol-split-row${isEven ? "" : " sol-split-row--reverse"}`}>
              <div className="sol-split-img">
                {img && <img src={img} alt={sol.title} loading="lazy" />}
              </div>
              <div className="sol-split-copy relative overflow-hidden">
                <BackgroundRippleEffect />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="sol-split-header">
                    <span className="sol-split-no">{sol.no || `0${i+1}`}</span>
                  </div>
                  <h2 className="sol-split-title">
                    <PointerHighlight><span>{sol.title}</span></PointerHighlight>
                  </h2>
                  <p className="sol-split-audience">{sol.ideal_for}</p>
                  <p className="sol-split-desc">{sol.intro}</p>
                  {sol.features && sol.features.length > 0 && (
                    <ol className="sol-split-steps">
                      {sol.features.map((s, j) => (
                        <li key={s}>
                          <span className="sol-step-n">{String(j + 1).padStart(2, "0")}</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  <Btn to={`/solutions/${sol.slug}`} variant="outline">Explore solution</Btn>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <FinalCTA />
    </>
  );
}

export function SolutionDetail({ solution }) {
  if (!solution) return <NotFound />;
  const img = solution.image_url;
  return (
    <>
      <PageHero
        eyebrow={`Solution`}
        title={solution.title}
        copy={solution.ideal_for}
        image={img}
        imageAlt="Solution visual"
      />
      <section className="section sol-detail-body">
        <div className="svc-two-col">
          <div>
            <p className="eyebrow">What this solution covers</p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 20 }}>
              {solution.intro}
            </p>
          </div>
          <div>
            <p className="eyebrow">Engagement steps</p>
            <ul className="svc-deliverables-list">
              {(solution.features || []).map((s, i) => (
                <li key={s}><span>{String(i + 1).padStart(2, "0")}</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

