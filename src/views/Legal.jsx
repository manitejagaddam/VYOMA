"use client";
/** pages/Legal.jsx */
export function Legal({ title, dek, children }) {
  return (
    <article className="article-page legal-page">
      <header>
        <p className="eyebrow">VYOMA Technologies</p>
        <h1>{title}</h1>
        {dek && <p className="article-dek">{dek}</p>}
      </header>
      <div className="article-body">
        {children}
      </div>
    </article>
  );
}

