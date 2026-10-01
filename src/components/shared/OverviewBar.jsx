"use client";
/** components/shared/OverviewBar.jsx
 *  Homepage stat + pillar overview strip — sits directly below the hero.
 */
export function OverviewBar() {
  const stats = [
    { value: "9+",  label: "Services",        sub: "Design · Engineering · AI" },
    { value: "5+",  label: "Solutions",        sub: "Startups → Enterprise" },
    { value: "8",   label: "Stage process",    sub: "Discover → Scale" },
    { value: "50+", label: "Technologies",     sub: "Chosen for the problem" },
  ];

  const pillars = [
    { icon: "◈", title: "Design",        desc: "UI/UX · Product Design · Design Systems · Prototyping" },
    { icon: "⬡", title: "Engineering",   desc: "Web · Mobile · Backend · APIs · SaaS · Enterprise" },
    { icon: "◎", title: "Intelligence",  desc: "AI · GenAI · RAG · Agents · Chatbots · Automation" },
  ];

  return (
    <section className="overview-bar">
      {/* Stats strip */}
      <div className="overview-stats">
        {stats.map(s => (
          <div key={s.label} className="overview-stat">
            <span className="overview-stat-value">{s.value}</span>
            <div className="overview-stat-right">
              <span className="overview-stat-label">{s.label}</span>
              <span className="overview-stat-sub">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pillar pills */}
      <div className="overview-pillars">
        {pillars.map(p => (
          <div key={p.title} className="overview-pillar">
            <span className="overview-pillar-icon">{p.icon}</span>
            <div>
              <span className="overview-pillar-title">{p.title}</span>
              <span className="overview-pillar-desc">{p.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

