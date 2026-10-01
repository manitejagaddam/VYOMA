"use client";
/** pages/Services.jsx
 * Services list: each row is a full-bleed 50/50 split —
 *   left = number + title + intro + deliverable chips + CTA
 *   right = image bleeding edge-to-edge, no box
 * Service Detail: uses PageHero for the 50/50 top, then detail content below.
 */
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { Btn } from "@/components/shared/Btn";
import { Link } from "@/components/shared/Link";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { NotFound } from "./NotFound";
const workAutomation = "/assets/work-automation.webp";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";


export function Services({ initialServices = [] }) {
  const services = initialServices;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A useful idea needs a way through."
        copy="VYOMA covers the full product lifecycle — design, web, mobile, AI, SaaS, custom software, automation, and backend engineering."
        image={workAutomation}
        imageAlt="Modular workflow artifact"
      />
      <section className="services-split-list">
        {services.map((svc, i) => {
          const img = svc.image_url;
          const isEven = i % 2 === 0;
          return (
            <article key={svc.slug} className={`svc-split-row${isEven ? "" : " svc-split-row--reverse"}`}>
              {/* Text half */}
              <div className="svc-split-copy relative overflow-hidden">
                <BackgroundRippleEffect />
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="svc-split-meta">
                    <span className="svc-split-no">{svc.no}</span>
                  </div>
                  <h2 className="svc-split-title">
                    <PointerHighlight><span>{svc.title}</span></PointerHighlight>
                  </h2>
                  <p className="svc-split-intro">{svc.intro}</p>
                  {svc.deliverables && svc.deliverables.length > 0 && (
                    <div className="svc-split-tags">
                      {svc.deliverables.slice(0, 6).map(d => (
                        <span key={d} className="svc-split-tag">{d}</span>
                      ))}
                    </div>
                  )}
                  <Link to={`/services/${svc.slug}`} className="svc-split-cta">
                    Explore service →
                  </Link>
                </div>
              </div>

              {/* Image half — no box, no border, image fills the column */}
              <div className="svc-split-img relative min-h-[300px] overflow-hidden">
                {img && <Image src={img} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
              </div>
            </article>
          );
        })}
      </section>

      <section className="section centered-cta">
        <h2>Not sure which service fits your project?</h2>
        <p>Start with a discovery call. We&apos;ll help you figure out the right scope and approach.</p>
        <Btn to="/contact" variant="primary">Book a Discovery Call</Btn>
      </section>
    </>
  );
}

export function ServiceDetail({ service }) {
  if (!service) return <NotFound />;
  const img = service.image_url;
  return (
    <>
      <PageHero
        eyebrow={`Service / ${service.no}`}
        title={service.title}
        copy={service.intro}
        image={img}
        imageAlt={`${service.title} visual`}
      />

      <section className="section svc-detail-body">
        <div className="svc-two-col">
          <div>
            <p className="eyebrow">Problems we solve</p>
            <ul className="svc-problems">
              {(service.problems || []).map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">What we deliver</p>
            <ul className="svc-deliverables-list">
              {(service.deliverables || []).map((d, i) => (
                <li key={d}><span>{String(i + 1).padStart(2, "0")}</span>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {service.approach && (
        <section className="section svc-approach">
          <p className="eyebrow">Our approach</p>
          <div className="approach-track">
            {service.approach.split(" → ").map((step, i, arr) => (
              <span key={step}>
                <strong>{step}</strong>
                {i < arr.length - 1 && <span className="approach-arrow"> → </span>}
              </span>
            ))}
          </div>
        </section>
      )}

      <FinalCTA serviceSlug={service.slug} />
    </>
  );
}

