"use client";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
const logo = "/assets/Logo.webp";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Render a placeholder button of the same size to prevent layout shift during SSR/Hydration
  if (!mounted) {
    return <button className="p-2 w-10 h-10 rounded-full" aria-label="Toggle theme" />;
  }

  return (
    <button
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-black dark:text-white"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
}

function MobileNavGroup({ title, href, subitems, nav }: { title: string, href: string, subitems?: {label: string, href: string}[], nav: (to: string) => void }) {
  const [open, setOpen] = useState(false);
  
  if (!subitems) {
    return (
      <button onClick={() => nav(href)} className="text-left font-bold text-lg text-black dark:text-white">{title}</button>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <button onClick={() => nav(href)} className="text-left font-bold text-lg text-black dark:text-white">{title}</button>
        <button onClick={() => setOpen(!open)} className="p-2 text-black dark:text-white" aria-label={`Toggle ${title}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${open ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      {open && (
        <div className="flex flex-col space-y-4 mt-4 pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
          {subitems.map((sub, i) => (
             <button key={i} onClick={() => nav(sub.href)} className="text-left text-base text-neutral-600 dark:text-neutral-400 font-medium hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
               {sub.label}
             </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const nav = (to: string) => { router.push(to); setMobileOpen(false); };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <div className={cn("fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 flex items-center justify-between px-4 md:px-6 py-2 rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input backdrop-blur-md", className)}>
        <NextLink href="/" className="flex items-center gap-3">
          <Image src={logo} alt="VYOMA Logo" className="h-6 md:h-8 w-auto object-contain dark:invert" style={{ width: "auto" }} width={32} height={32} />
          <span className="hidden xl:inline-block text-[11px] uppercase tracking-widest font-mono text-neutral-500 dark:text-neutral-400">
            Design &middot; Engineering &middot; Intelligence
          </span>
        </NextLink>

        <div className="flex-1 hidden lg:flex justify-center">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Services" onClick={() => nav("/services")}>
              <div className="grid grid-cols-2 gap-10 p-4 text-sm w-[42rem]">
                <div className="flex flex-col space-y-4">
                  <h4 className="font-bold text-black dark:text-white mb-1 border-b border-black/10 dark:border-white/10 pb-2">Engineering & Design</h4>
                  <HoveredLink href="/services/custom-software-development">Custom Software Development</HoveredLink>
                  <HoveredLink href="/services/web-development">Web App Development</HoveredLink>
                  <HoveredLink href="/services/mobile-app-development">Mobile App Development</HoveredLink>
                  <HoveredLink href="/services/saas-development">SaaS Platform Development</HoveredLink>
                  <HoveredLink href="/services/ui-ux-product-design">UI/UX & Product Design</HoveredLink>
                </div>
                <div className="flex flex-col space-y-4">
                  <h4 className="font-bold text-black dark:text-white mb-1 border-b border-black/10 dark:border-white/10 pb-2">Intelligence & Cloud</h4>
                  <HoveredLink href="/services/ai-genai">AI & GenAI Solutions</HoveredLink>
                  <HoveredLink href="/services/chatbots-conversational-ai">Conversational AI & Chatbots</HoveredLink>
                  <HoveredLink href="/services/backend-cloud">Cloud Architecture</HoveredLink>
                  <HoveredLink href="/services/automation-integrations">Workflow Automation</HoveredLink>
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Solutions" onClick={() => nav("/solutions")}>
              <div className="flex flex-col space-y-4 text-sm p-4 w-[22rem]">
                <HoveredLink href="/solutions/mvp-development">MVP Development</HoveredLink>
                <HoveredLink href="/solutions/enterprise-software">Enterprise Software Systems</HoveredLink>
                <HoveredLink href="/solutions/ai-transformation">Enterprise AI Transformation</HoveredLink>
                <HoveredLink href="/solutions/business-automation">Business Automation</HoveredLink>
                <HoveredLink href="/solutions/startup-solutions">Scaling Startups</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Work" onClick={() => nav("/work")}>
              <div className="flex flex-col space-y-4 text-sm p-4 w-[22rem]">
                <h4 className="font-bold text-black dark:text-white mb-1 border-b border-black/10 dark:border-white/10 pb-2">Featured Case Studies</h4>
                <HoveredLink href="/work/codetitan">CodeTitan - AI Dev Platform</HoveredLink>
                <HoveredLink href="/work/knowledge-in-motion">Knowledge in Motion - RAG App</HoveredLink>
                <HoveredLink href="/work/synapse-saas">Synapse - FinTech SaaS</HoveredLink>
                <div className="pt-2 mt-2 border-t border-black/10 dark:border-white/10">
                  <HoveredLink href="/work">View All Work &rarr;</HoveredLink>
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Company" onClick={() => nav("/about")}>
              <div className="flex flex-col space-y-4 text-sm p-4 w-[16rem]">
                <HoveredLink href="/about">About VYOMA</HoveredLink>
                <HoveredLink href="/team">Our Team</HoveredLink>
                <HoveredLink href="/process">Methodology</HoveredLink>
                <HoveredLink href="/insights">Insights & Guides</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <NextLink href="/contact" className="hidden md:flex bg-gradient-to-br from-[#caac4b] via-[#E6D59A] to-[#C0C0C0] text-[#1a1a1a] px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:scale-105">
            Book a Discovery Call
          </NextLink>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-black dark:text-white" aria-label="Toggle menu">
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 flex flex-col space-y-6">
          <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto">
            <MobileNavGroup 
              title="Services" href="/services" nav={nav}
              subitems={[
                { label: "UI/UX & Product Design", href: "/services/ui-ux-product-design" },
                { label: "Web Development", href: "/services/web-development" },
                { label: "Mobile Apps", href: "/services/mobile-app-development" },
                { label: "SaaS Development", href: "/services/saas-development" },
                { label: "AI & GenAI", href: "/services/ai-genai" },
                { label: "Chatbots", href: "/services/chatbots-conversational-ai" },
                { label: "Backend & Cloud", href: "/services/backend-cloud" },
                { label: "Automation", href: "/services/automation-integrations" }
              ]} 
            />
            <MobileNavGroup 
              title="Solutions" href="/solutions" nav={nav}
              subitems={[
                { label: "For Startups", href: "/solutions/startup-solutions" },
                { label: "MVP Development", href: "/solutions/mvp-development" },
                { label: "Business Automation", href: "/solutions/business-automation" },
                { label: "AI Transformation", href: "/solutions/ai-transformation" },
                { label: "Enterprise Software", href: "/solutions/enterprise-software" }
              ]} 
            />
            <MobileNavGroup 
              title="Company" href="/about" nav={nav}
              subitems={[
                { label: "About VYOMA", href: "/about" },
                { label: "Our Team", href: "/team" },
                { label: "Methodology", href: "/process" },
                { label: "Engagement Models", href: "/engagement-models" },
                { label: "Insights", href: "/insights" }
              ]} 
            />
            <MobileNavGroup title="Work" href="/work" nav={nav} />
          </div>
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button onClick={() => nav("/contact")} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-full py-3">Contact Us</button>
          </div>
        </div>
      )}
    </>
  );
}

