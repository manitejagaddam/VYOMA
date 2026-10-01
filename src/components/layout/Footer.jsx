"use client";
/** components/layout/Footer.jsx */
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FloatingContactDock } from "../shared/FloatingContactDock";
const logo = "/assets/Logo.webp";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="site-footer has-bg-grid">
      <div className="footer-brand">
        <Image
          src={logo}
          alt="VYOMA logo"
          className="dark:invert"
          style={{ height: "72px", width: "auto", marginBottom: "8px" }}
          width={72}
          height={72}
        />
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
        ].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </div>

      <div className="footer-col">
        <span>Solutions</span>
        {[["MVP Development",     "/solutions/mvp-development"],
          ["Startups",            "/solutions/startup-solutions"],
          ["Business Automation", "/solutions/business-automation"],
          ["AI Transformation",   "/solutions/ai-transformation"],
          ["Enterprise",          "/solutions/enterprise-software"],
        ].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
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
        ].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </div>

      <div className="footer-col">
        <span>Legal</span>
        <Link href="/terms">Terms of Service</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <div className="footer-bottom-info">
          <p>© {new Date().getFullYear()} VYOMA Technologies</p>
          <a href="mailto:vyoma1107@gmail.com" className="hover:underline">vyoma1107@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
