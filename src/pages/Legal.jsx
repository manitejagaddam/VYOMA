"use client";
/** pages/Legal.jsx */
export function Legal({ title, body }) {
  return (
    <article className="article-page legal-page">
      <header>
        <p className="eyebrow">VYOMA Technologies</p>
        <h1>{title}</h1>
        <p className="article-dek">{body}</p>
      </header>
      <div className="article-body">
        <h2>Plain language first.</h2>
        <p>This page is a clear placeholder for the policy that will be published with real contact details, data tooling, and project terms. It does not collect data beyond the local inquiry demonstration.</p>
        <h2>Before launch</h2>
        <p>Replace this content with your actual privacy policy or service terms, based on the tools and jurisdiction that apply to your business.</p>
      </div>
    </article>
  );
}

