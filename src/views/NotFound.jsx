"use client";
/** pages/NotFound.jsx */
import { Link } from "@/components/shared/Link";

export function NotFound({}) {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>That page moved.</h1>
      <p>The route does not exist. Let&apos;s get you back on track.</p>
      <Link to="/" className="text-link">← Back to home</Link>
    </section>
  );
}

