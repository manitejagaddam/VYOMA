"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { Link } from "./shared/Link";
import { cn } from "@/lib/utils";
const logo = "/assets/Logo.png";

function ThemeToggle({ theme, onToggle }: { theme: string, onToggle: () => void }) {
  return (
    <button
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-black dark:text-white"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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

// Since we are not using the default NavbarDemo wrapper anymore, 
// we will just export the Navbar directly, but keep the name.
export function Navbar({ className, go, theme, toggleTheme }: { className?: string, go: any, theme: string, toggleTheme: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const nav = (to: string) => {
    go(to);
    setMobileOpen(false);
  };

  return (
    <>
    <div
      className={cn("fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 flex items-center justify-between px-4 md:px-6 py-2 rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input backdrop-blur-md", className)}
    >
      <Link to="/" go={go} className="flex items-center gap-3">
        <img src={logo} alt="VYOMA Logo" className="h-6 md:h-8 w-auto object-contain dark:invert" />
        <span className="hidden xl:inline-block text-[11px] uppercase tracking-widest font-mono text-neutral-500 dark:text-neutral-400">
          Design &middot; Engineering &middot; Intelligence
        </span>
      </Link>
      
      <div className="flex-1 hidden lg:flex justify-center">
        <Menu setActive={setActive}>
          
          <MenuItem setActive={setActive} active={active} item="Services" onClick={() => nav("/services")}>
            <div className="grid grid-cols-2 gap-10 p-4 text-sm w-[36rem]">
              <div className="flex flex-col space-y-4">
                <h4 className="font-bold text-black dark:text-white">Design & Development</h4>
                <Link to="/services/ui-ux-product-design" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">UI/UX & Product Design</Link>
                <Link to="/services/web-development" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Web Development</Link>
                <Link to="/services/mobile-app-development" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Mobile Apps</Link>
                <Link to="/services/saas-development" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">SaaS Development</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="font-bold text-black dark:text-white">Intelligence & Infra</h4>
                <Link to="/services/ai-genai" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">AI & GenAI</Link>
                <Link to="/services/chatbots-conversational-ai" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Chatbots</Link>
                <Link to="/services/backend-cloud" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Backend & Cloud</Link>
                <Link to="/services/automation-integrations" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Automation</Link>
              </div>
            </div>
          </MenuItem>
          
          <MenuItem setActive={setActive} active={active} item="Solutions" onClick={() => nav("/solutions")}>
            <div className="flex flex-col space-y-4 text-sm p-2 w-[16rem]">
              <Link to="/solutions/startup-solutions" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">For Startups</Link>
              <Link to="/solutions/mvp-development" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">MVP Development</Link>
              <Link to="/solutions/business-automation" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Business Automation</Link>
              <Link to="/solutions/ai-transformation" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">AI Transformation</Link>
              <Link to="/solutions/enterprise-software" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Enterprise Software</Link>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Company" onClick={() => nav("/about")}>
            <div className="flex flex-col space-y-4 text-sm p-2 w-[12rem]">
              <Link to="/about" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">About VYOMA</Link>
              <Link to="/team" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Our Team</Link>
              <Link to="/process" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Methodology</Link>
              <Link to="/engagement-models" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Engagement Models</Link>
              <Link to="/insights" go={go} className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Insights</Link>
            </div>
          </MenuItem>
          
          <Link to="/work" go={go} className="text-black dark:text-white text-sm font-medium hover:opacity-80 transition-opacity ml-4 self-center">
            Work
          </Link>

        </Menu>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <Link to="/contact" go={go} className="hidden md:flex bg-black dark:bg-white dark:text-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
          Contact Us
        </Link>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="lg:hidden p-2 text-black dark:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {mobileOpen && (
      <div className="lg:hidden fixed inset-x-4 top-20 z-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <button onClick={() => nav("/services")} className="text-left font-bold text-lg text-black dark:text-white">Services</button>
          <button onClick={() => nav("/solutions")} className="text-left font-bold text-lg text-black dark:text-white">Solutions</button>
          <button onClick={() => nav("/work")} className="text-left font-bold text-lg text-black dark:text-white">Work</button>
          <button onClick={() => nav("/about")} className="text-left font-bold text-lg text-black dark:text-white">About</button>
          <button onClick={() => nav("/insights")} className="text-left font-bold text-lg text-black dark:text-white">Insights</button>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button onClick={() => nav("/contact")} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-full py-3">
            Contact Us
          </button>
        </div>
      </div>
    )}
    </>
  );
}
