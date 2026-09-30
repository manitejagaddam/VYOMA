/**
 * components/layout/Header.jsx
 *
 * Improvements over V1:
 *  • Megamenu — clicking "Services" or "Solutions" opens a full-width panel
 *    with a CATEGORY SIDEBAR on the left and ITEMS on the right.
 *    Hovering a category highlights its items in the right pane.
 *  • Hierarchy — each category acts like a side-nav item.
 *  • Dark / Light mode toggle button in the nav bar.
 *  • Refined visual weight and spacing.
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "../shared/Link";
const logo = "/assets/Logo.png";

/* ── Menu definitions ──────────────────────────────────────────── */
export const SERVICES_MENU = [
  {
    id: "design",
    label: "Design",
    icon: "◈",
    desc: "UI/UX, product design, prototyping",
    items: [
      ["UI/UX Design",        "/services/ui-ux-product-design",   "Research → flows → interface systems"],
      ["Product Design",      "/services/ui-ux-product-design",   "Strategy, wireframes, and design systems"],
    ],
  },
  {
    id: "development",
    label: "Development",
    icon: "⬡",
    desc: "Web, mobile, custom software, SaaS",
    items: [
      ["Web Development",     "/services/web-development",         "Apps, platforms, portals, CMS"],
      ["Mobile Apps",         "/services/mobile-app-development",  "iOS, Android, cross-platform"],
      ["Custom Software",     "/services/custom-software",         "CRM, ERP, internal tools"],
      ["SaaS Development",    "/services/saas-development",        "Multi-tenant products with billing"],
    ],
  },
  {
    id: "ai",
    label: "AI & GenAI",
    icon: "◎",
    desc: "LLMs, RAG, agents, chatbots",
    items: [
      ["AI & Generative AI",  "/services/ai-genai",                "LLMs, RAG, multi-agent systems"],
      ["Chatbots & Conv. AI", "/services/chatbots-conversational-ai", "Customer, sales, knowledge assistants"],
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: "⊞",
    desc: "Backend, cloud, APIs, automation",
    items: [
      ["Backend & Cloud",     "/services/backend-cloud",           "APIs, microservices, infra, CI/CD"],
      ["Automation & APIs",   "/services/automation-integrations", "Integrations, workflows, pipelines"],
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "◉",
    desc: "Digital marketing & growth",
    items: [
      ["Digital Marketing",   "/services/digital-marketing",       "SEO, content, growth, and analytics"],
    ],
  },
];

export const SOLUTIONS_MENU = [
  {
    id: "startups",
    label: "Startups",
    icon: "◇",
    desc: "From idea to funded product",
    items: [
      ["MVP Development",     "/solutions/mvp-development",        "First usable version, fast"],
      ["Startup Solutions",   "/solutions/startup-solutions",      "Full product partnership"],
    ],
  },
  {
    id: "businesses",
    label: "Businesses",
    icon: "▣",
    desc: "Automate and integrate operations",
    items: [
      ["Business Automation", "/solutions/business-automation",    "Remove manual work, connect systems"],
    ],
  },
  {
    id: "ai-transform",
    label: "AI Transformation",
    icon: "◎",
    desc: "Add intelligence that creates value",
    items: [
      ["AI Transformation",   "/solutions/ai-transformation",      "AI where it changes the outcome"],
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: "⊡",
    desc: "Custom platforms and integrations",
    items: [
      ["Enterprise Software", "/solutions/enterprise-software",    "Tailored systems, integrations, control"],
    ],
  },
];

/* ── Megamenu component ─────────────────────────────────────────── */
export function Megamenu({ menu, go, onClose, id, isDock }) {
  const [activeId, setActiveId] = useState(menu[0].id);
  const activeGroup = menu.find(g => g.id === activeId) || menu[0];

  return (
    <div className={`megamenu ${isDock ? "megamenu-dock" : ""}`} role="dialog" aria-label={`${id} menu`}>
      {/* Left sidebar — categories */}
      <div className="mega-sidebar">
        <span className="mega-sidebar-label">Browse by category</span>
        {menu.map(group => (
          <button
            key={group.id}
            className={`mega-cat${group.id === activeId ? " mega-cat-active" : ""}`}
            onMouseEnter={() => setActiveId(group.id)}
            onClick={() => setActiveId(group.id)}
          >
            <span className="mega-cat-icon">{group.icon}</span>
            <span className="mega-cat-body">
              <span className="mega-cat-label">{group.label}</span>
              <span className="mega-cat-desc">{group.desc}</span>
            </span>
            <span className="mega-cat-arrow">›</span>
          </button>
        ))}
      </div>

      {/* Right pane — items for active category */}
      <div className="mega-items">
        <span className="mega-items-label">{activeGroup.label}</span>
        {activeGroup.items.map(([label, href, sub]) => (
          <Link
            key={href + label}
            to={href}
            go={go}
            className="mega-item"
            onClick={onClose}
          >
            <span className="mega-item-title">{label}</span>
            {sub && <span className="mega-item-sub">{sub}</span>}
          </Link>
        ))}
        <Link
          to={`/${id === "services" ? "services" : "solutions"}`}
          go={go}
          className="mega-view-all"
          onClick={onClose}
        >
          View all {id === "services" ? "services" : "solutions"} →
        </Link>
      </div>
    </div>
  );
}

/* ── Theme Toggle ─────────────────────────────────────────────── */
function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
}

/* ── Main Header ─────────────────────────────────────────────── */
export function Header({ go, path, theme, onToggleTheme }) {
  const [serviceOpen,  setServiceOpen]  = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [mobileSub,    setMobileSub]    = useState(null); // null | "services" | "solutions"
  const navRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setServiceOpen(false);
    setSolutionOpen(false);
    setMobileOpen(false);
    setMobileSub(null);
  }, [path]);

  // Close on outside click
  useEffect(() => {
    function handle(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setServiceOpen(false);
        setSolutionOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const openServices  = () => { setServiceOpen(!serviceOpen);  setSolutionOpen(false); };
  const openSolutions = () => { setSolutionOpen(!solutionOpen); setServiceOpen(false); };
  const nav = (to) => { go(to); setMobileOpen(false); setMobileSub(null); };

  const isActive = (prefix) => path === prefix || path.startsWith(prefix + "/");

  return (
    <header className="topbar">
      <Link to="/" go={go} className="brand">
        <img src={logo} alt="VYOMA" style={{ height: "48px", width: "auto" }} />
        <span className="brand-tag">Design. Build. Intelligence.</span>
      </Link>

      {/* Desktop nav */}
      <nav className="desktop-nav" aria-label="Primary" ref={navRef}>
        {/* Services trigger */}
        <div className="nav-item">
          <button
            className={`nav-btn${isActive("/services") ? " active" : ""}${serviceOpen ? " nav-btn-open" : ""}`}
            onClick={openServices}
            aria-expanded={serviceOpen}
          >
            Services
            <span className={`nav-caret${serviceOpen ? " nav-caret-up" : ""}`} />
          </button>
          {serviceOpen && (
            <Megamenu
              id="services"
              menu={SERVICES_MENU}
              go={go}
              onClose={() => setServiceOpen(false)}
            />
          )}
        </div>

        {/* Solutions trigger */}
        <div className="nav-item">
          <button
            className={`nav-btn${isActive("/solutions") ? " active" : ""}${solutionOpen ? " nav-btn-open" : ""}`}
            onClick={openSolutions}
            aria-expanded={solutionOpen}
          >
            Solutions
            <span className={`nav-caret${solutionOpen ? " nav-caret-up" : ""}`} />
          </button>
          {solutionOpen && (
            <Megamenu
              id="solutions"
              menu={SOLUTIONS_MENU}
              go={go}
              onClose={() => setSolutionOpen(false)}
            />
          )}
        </div>

        <Link to="/work"    go={go} className={`nav-link${isActive("/work") ? " active" : ""}`}>Work</Link>
        <Link to="/about"   go={go} className={`nav-link${path === "/about" ? " active" : ""}`}>About</Link>
        <Link to="/insights" go={go} className={`nav-link${path === "/insights" ? " active" : ""}`}>Insights</Link>
        <Link to="/process" go={go} className={`nav-link${path === "/process" ? " active" : ""}`}>Process</Link>
      </nav>

      {/* Right controls */}
      <div className="header-right">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Link to="/contact" go={go} className="header-cta">Start a Project</Link>
      </div>

      {/* Mobile controls (only visible on mobile via CSS) */}
      <div className="mobile-controls">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          className={`mobile-toggle${mobileOpen ? " mobile-toggle-open" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => { setMobileOpen(!mobileOpen); setMobileSub(null); }}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {mobileSub === null ? (
            <>
              <button className="mobile-link" onClick={() => setMobileSub("services")}>
                Services <span className="mobile-link-arrow">›</span>
              </button>
              <button className="mobile-link" onClick={() => setMobileSub("solutions")}>
                Solutions <span className="mobile-link-arrow">›</span>
              </button>
              {[["Work", "/work"], ["About", "/about"], ["Team", "/team"], ["Process", "/process"], ["Insights", "/insights"], ["FAQ", "/faq"]].map(([label, href]) => (
                <button key={href} className="mobile-link" onClick={() => nav(href)}>{label}</button>
              ))}
              <div className="mobile-footer">
                <button className="mobile-cta" onClick={() => nav("/contact")}>Start a Project →</button>
              </div>
            </>
          ) : (
            <>
              <button className="mobile-back" onClick={() => setMobileSub(null)}>
                ← Back
              </button>
              <span className="mobile-sub-title">
                {mobileSub === "services" ? "Services" : "Solutions"}
              </span>
              {(mobileSub === "services" ? SERVICES_MENU : SOLUTIONS_MENU).map(group => (
                <div key={group.id} className="mobile-group">
                  <span className="mobile-group-label">{group.icon} {group.label}</span>
                  {group.items.map(([label, href]) => (
                    <button key={href + label} className="mobile-sub-link" onClick={() => nav(href)}>
                      {label}
                    </button>
                  ))}
                </div>
              ))}
            </>
          )}
        </nav>
      )}
    </header>
  );
}

