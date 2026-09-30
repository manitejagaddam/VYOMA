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
  metadataBase: new URL("https://vyomatechnologies.com"),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vyomatechnologies.com",
    siteName: "VYOMA Technologies",
    title: "VYOMA — Custom Software, AI & Product Design Agency",
    description:
      "Technology agency for startups — design, engineering, and AI in one connected team. We build scalable web apps, mobile products, and intelligent systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VYOMA Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VYOMA — Custom Software, AI & Product Design Agency",
    description: "Technology agency for startups — design, engineering, and AI in one connected team.",
    images: ["/og-image.png"],
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
  "@type": "ProfessionalService",
  name: "VYOMA Technologies",
  url: "https://vyomatechnologies.com",
  email: "hello@vyoma.studio",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${dmMono.variable}`} suppressHydrationWarning>
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
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
