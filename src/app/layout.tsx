// src/app/layout.tsx — Root layout for VYOMA Next.js app
import type { Metadata } from "next";
import { Inter, Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionScroller } from "@/components/shared/SectionScroller";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/shared/CookieConsent";

// Next.js font subsetting - auto preloads and eliminates render-blocking
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyoma.world"),
  title: {
    default: "VYOMA — Custom Software, AI & Product Design Agency",
    template: "%s — VYOMA",
  },
  description:
    "VYOMA is a technology agency that designs and builds scalable web apps, mobile products, and AI systems for ambitious startups and businesses. Design, engineering, and intelligence — one connected team.",
  keywords: [
    "software agency",
    "AI development",
    "web development",
    "mobile app development",
    "product design",
    "SaaS development",
    "custom software",
  ],
  authors: [{ name: "VYOMA Technologies" }],
  creator: "VYOMA Technologies",
  alternates: {
    canonical: "https://vyoma.world",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vyoma.world",
    siteName: "VYOMA",
    title: "VYOMA — Custom Software, AI & Product Design Agency",
    description:
      "Technology agency for startups — design, engineering, and AI in one connected team. We build scalable web apps, mobile products, and intelligent systems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VYOMA Technologies — Custom Software, AI & Product Design Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VYOMA — Custom Software, AI & Product Design Agency",
    description: "Technology agency for startups — design, engineering, and AI in one connected team.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vyoma.world/#organization",
      name: "VYOMA",
      url: "https://vyoma.world",
      email: "support@vyoma.world",
      logo: {
        "@type": "ImageObject",
        url: "https://vyoma.world/assets/Logo.webp",
      },
      description: "Custom software, product design, and AI engineering agency for startups and businesses.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://vyoma.world/#website",
      url: "https://vyoma.world",
      name: "VYOMA",
      publisher: { "@id": "https://vyoma.world/#organization" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://vyoma.world/#service",
      name: "VYOMA",
      url: "https://vyoma.world",
      email: "support@vyoma.world",
      description: "Custom software, product design, and AI engineering agency for startups and businesses.",
      areaServed: "Worldwide",
      serviceType: [
        "Web Development",
        "Mobile App Development",
        "AI Engineering",
        "Product Design",
        "SaaS Development",
        "Cloud Infrastructure",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${dmMono.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[99999] focus:px-6 focus:py-3 focus:bg-[#D4AF37] focus:text-black focus:font-bold focus:text-sm focus:no-underline focus:rounded-br-lg"
          >
            Skip to main content
          </a>
          <div className="site-wrapper">
            <CustomCursor />
            <Navbar />
            <main id="main-content">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
            <SectionScroller />
            <CookieConsent />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
