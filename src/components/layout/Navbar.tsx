"use client";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
const logo = "/assets/Logo.png";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
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
          <Image src={logo} alt="VYOMA Logo" className="h-6 md:h-8 w-auto object-contain dark:invert" width={120} height={32} />
          <span className="hidden xl:inline-block text-[11px] uppercase tracking-widest font-mono text-neutral-500 dark:text-neutral-400">
            Design &middot; Engineering &middot; Intelligence
          </span>
        </NextLink>

        <div className="flex-1 hidden lg:flex justify-center">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Services" onClick={() => nav("/services")}>
              <div className="grid grid-cols-2 gap-10 p-4 text-sm w-[36rem]">
                <div className="flex flex-col space-y-4">
                  <h4 className="font-bold text-black dark:text-white">Design & Development</h4>
                  <HoveredLink href="/services/ui-ux-product-design">UI/UX & Product Design</HoveredLink>
                  <HoveredLink href="/services/web-development">Web Development</HoveredLink>
                  <HoveredLink href="/services/mobile-app-development">Mobile Apps</HoveredLink>
                  <HoveredLink href="/services/saas-development">SaaS Development</HoveredLink>
                </div>
                <div className="flex flex-col space-y-4">
                  <h4 className="font-bold text-black dark:text-white">Intelligence & Infra</h4>
                  <HoveredLink href="/services/ai-genai">AI & GenAI</HoveredLink>
                  <HoveredLink href="/services/chatbots-conversational-ai">Chatbots</HoveredLink>
                  <HoveredLink href="/services/backend-cloud">Backend & Cloud</HoveredLink>
                  <HoveredLink href="/services/automation-integrations">Automation</HoveredLink>
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Solutions" onClick={() => nav("/solutions")}>
              <div className="flex flex-col space-y-4 text-sm p-2 w-[16rem]">
                <HoveredLink href="/solutions/startup-solutions">For Startups</HoveredLink>
                <HoveredLink href="/solutions/mvp-development">MVP Development</HoveredLink>
                <HoveredLink href="/solutions/business-automation">Business Automation</HoveredLink>
                <HoveredLink href="/solutions/ai-transformation">AI Transformation</HoveredLink>
                <HoveredLink href="/solutions/enterprise-software">Enterprise Software</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Company" onClick={() => nav("/about")}>
              <div className="flex flex-col space-y-4 text-sm p-2 w-[12rem]">
                <HoveredLink href="/about">About VYOMA</HoveredLink>
                <HoveredLink href="/team">Our Team</HoveredLink>
                <HoveredLink href="/process">Methodology</HoveredLink>
                <HoveredLink href="/engagement-models">Engagement Models</HoveredLink>
                <HoveredLink href="/insights">Insights</HoveredLink>
              </div>
            </MenuItem>

            <NextLink href="/work" className="text-black dark:text-white text-sm font-medium hover:opacity-80 transition-opacity ml-4 self-center">
              Work
            </NextLink>
          </Menu>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <NextLink href="/contact" className="hidden md:flex bg-black dark:bg-white dark:text-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Contact Us
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
          <div className="flex flex-col space-y-4">
            {[["Services","/services"],["Solutions","/solutions"],["Work","/work"],["About","/about"],["Insights","/insights"]].map(([l,h]) => (
              <button key={h} onClick={() => nav(h)} className="text-left font-bold text-lg text-black dark:text-white">{l}</button>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button onClick={() => nav("/contact")} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-full py-3">Contact Us</button>
          </div>
        </div>
      )}
    </>
  );
}

