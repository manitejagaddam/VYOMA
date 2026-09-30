/** components/layout/Footer.jsx */
import { Link } from "../shared/Link";
import { FloatingContactDock } from "../shared/FloatingContactDock";
const logo = "/assets/Logo.png";

export function Footer({ go }) {
  return (
    <footer className="site-footer has-bg-grid">
      <div className="footer-brand">
        <img src={logo} alt="VYOMA" className="dark:invert" style={{ height: "72px", width: "auto", marginBottom: "8px" }} />
        <p>Designing and building digital products, software and intelligent systems.</p>
        <FloatingContactDock />
      </div>

      <div className="footer-col">
        <span>Services</span>
        {[["UI/UX Design",      "/services/ui-ux-product-design"],
          ["Web Development",   "/services/web-development"],
          ["Mobile Apps",       "/services/mobile-app-development"],
          ["AI & GenAI",        "/services/ai-genai"],
          ["Chatbots",          "/services/chatbots-conversational-ai"],
          ["Custom Software",   "/services/custom-software"],
          ["SaaS",              "/services/saas-development"],
          ["Automation",        "/services/automation-integrations"],
          ["Digital Marketing", "/services/digital-marketing"],
        ].map(([label, href]) => <Link key={href} to={href} go={go}>{label}</Link>)}
      </div>

      <div className="footer-col">
        <span>Solutions</span>
        {[["MVP Development",     "/solutions/mvp-development"],
          ["Startups",            "/solutions/startup-solutions"],
          ["Business Automation", "/solutions/business-automation"],
          ["AI Transformation",   "/solutions/ai-transformation"],
          ["Enterprise",          "/solutions/enterprise-software"],
        ].map(([label, href]) => <Link key={href} to={href} go={go}>{label}</Link>)}
      </div>

      <div className="footer-col">
        <span>Company</span>
        {[["About",       "/about"],
          ["Team",        "/team"],
          ["Work",        "/work"],
          ["Process",     "/process"],
          ["Technology",  "/technologies"],
          ["Engagements", "/engagement-models"],
          ["Insights",    "/insights"],
          ["FAQ",         "/faq"],
          ["Contact",     "/contact"],
        ].map(([label, href]) => <Link key={href} to={href} go={go}>{label}</Link>)}
      </div>

      <div className="footer-col">
        <span>Legal</span>
        <Link to="/privacy" go={go}>Privacy Policy</Link>
        <Link to="/terms"   go={go}>Terms</Link>
        <div className="footer-bottom-info">
          <p>© 2025 VYOMA Technologies</p>
          <p>hello@vyoma.studio</p>
        </div>
      </div>
    </footer>
  );
}

