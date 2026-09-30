"use client";
/** pages/Insights.jsx */
import { PageHero } from "@/components/shared/PageHero";
import { Link } from "@/components/shared/Link";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useSupabaseQuery } from "@/hooks/useData";
import { NotFound } from "./NotFound";

export function Insights(props) {
  const { data: posts, loading } = useSupabaseQuery(
    "posts",
    { filter: { published: true }, order: { column: "published_at", ascending: false } }
  );

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the work."
        copy="Practical thinking about product strategy, applied AI, and the systems beneath an experience that feels simple."
        image={workResearch}
        imageAlt="Research landscape"
      />
      <section className="section insights-page">
        {loading ? <LoadingSpinner label="Loading insights…" /> : posts.map((post, i) => (
          <article key={post.slug} className="insight-row">
            <span className="insight-no">0{i + 1}</span>
            <span className="insight-tag-label">{post.tag}</span>
            <div className="insight-row-content">
              <h2>{post.title}</h2>
              <p>{post.dek}</p>
            </div>
            <Link to={`/insights/${post.slug}`} className="text-link">Read →</Link>
          </article>
        ))}
      </section>
    </>
  );
}

export function InsightPost({ post }) {
  if (!post) return <NotFound />;
  return (
    <article className="article-page">
      <header>
        <p className="eyebrow">{post.tag}</p>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.dek}</p>
      </header>
      <div className="article-body">
        {/* Full body content comes from Supabase `body_html` or `body_md` in V2 */}
        <p>When a new technology arrives, the temptation is to begin with the tool. In practice, stronger work begins somewhere smaller and more precise: with the moment a person has to make a decision, understand a thing, or move work forward.</p>
        <h2>Start with the friction.</h2>
        <p>Look for the repeated action that carries more effort than it should. Then map the inputs, the reliability required, the person who owns the outcome, and the feedback that would make the system improve.</p>
        <blockquote>Useful systems make good judgment easier. They do not obscure it.</blockquote>
        <p>The result is usually a more focused product. It has fewer decorative features, clearer evaluation criteria, and a much better chance of being adopted when it is real.</p>
        <Link to="/contact" className="text-link">Talk through your situation →</Link>
      </div>
    </article>
  );
}

