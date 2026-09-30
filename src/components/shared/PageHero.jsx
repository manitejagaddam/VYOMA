"use client";
/** components/shared/PageHero.jsx
 * Clean 50/50 split hero — text left, image right, no box around image.
 * The right half is the image, bleeding to the edges of its column.
 */
import { Spotlight } from "../ui/spotlight";

export function PageHero({ eyebrow, title, copy, actions, image, imageAlt = "VYOMA visual", children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <div className="relative z-10">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="text-gradient inline-block pb-2">{title}</h1>
          {copy && <p className="page-hero-sub">{copy}</p>}
          {actions}
          {children}
        </div>
      </div>
      <figure className="page-hero-fig">
        {image && <img src={image} alt={imageAlt} loading="eager" fetchPriority="high" decoding="async" />}
      </figure>
    </section>
  );
}

