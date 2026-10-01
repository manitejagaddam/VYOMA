# VYOMA Pre-Launch Audit Report

> **Auditor**: Senior Full-Stack Engineer, Security Auditor, SEO Specialist & Product Designer
> **Date**: 2026-10-01
> **Project**: VYOMA — Custom Software / AI / Product Design Agency Website
> **Scope**: Complete pre-launch audit of all code, config, SEO, security, performance, and UX

---

## Stack Detection (Verified)

| Dimension | Value | Source |
| --- | --- | --- |
| **Next.js** | `16.3.8` | [package.json:19](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/package.json#L19) |
| **Router** | App Router (`src/app/`) | [src/app/layout.tsx](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/layout.tsx) |
| **React** | `19.2.8` | [package.json:20](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/package.json#L20) |
| **Language** | TypeScript (`.tsx` pages) + JSX (views/components) | `strict: false` in [tsconfig.json:11](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/tsconfig.json#L11) |
| **Styling** | Tailwind CSS v4 + extensive globals.css (76 KB) | [postcss.config.mjs](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/postcss.config.mjs), [globals.css](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/globals.css) |
| **UI/Animation** | Motion (Framer Motion v13 successor), Aceternity UI components, tsparticles | [package.json:18](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/package.json#L18) |
| **Data** | Supabase (anon key, client-side + server-side) | [lib/data.ts](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/lib/data.ts), [lib/supabase.ts](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/lib/supabase.ts) |
| **Fonts** | next/font/google: Inter, Syne, DM Mono | [layout.tsx:3](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/layout.tsx#L3) |
| **Hosting** | Vercel-ready (no custom config, Turbopack enabled) | [next.config.ts:8](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/next.config.ts#L8) |
| **Build result** | ✅ Successful — 41 static pages, 0 errors | `next build` output |
| **Lint result** | ❌ 38 errors, 77 warnings | `eslint src/` output |
| **npm audit** | ✅ 0 vulnerabilities | `npm audit` |

---

## Executive Summary & Scores

| Category | Score | Assessment |
| --- | :---: | --- |
| **Bugs & Build** | **62/100** | Build passes but 38 lint errors, major architectural issue (views re-fetch data client-side ignoring server-fetched props), secrets leak risk |
| **Performance** | **55/100** | Zero `next/image` usage across views (30+ raw `<img>` tags), massive CSS (76 KB), heavy client bundles with tsparticles, no loading.js/error.js, no Suspense boundaries |
| **SEO** | **74/100** | Good metadata API usage on all routes, sitemap.ts + robots.ts present, JSON-LD exists. But: duplicate static sitemap.xml/robots.txt, no canonical URLs, generic OG image, missing structured data types |
| **Security** | **42/100** | 🔴 Supabase anon key exposed via `next.config.ts env:{}` (makes them `NEXT_PUBLIC_`), no rate limiting, no CAPTCHA, no security headers, admin panel uses client-side auth only, no input validation |
| **Accessibility & UX** | **65/100** | Skip-to-content link ✓, semantic HTML mostly good, but: no focus traps on mobile menu/drawer, no `prefers-reduced-motion` respect for animations, missing ARIA on FAQs, custom cursor hides native cursor |
| **Code Quality** | **58/100** | Mixed JS/TS, `strict: false`, duplicate Supabase clients (3 files), views ignore server-fetched props, dead code, no tests, no env validation |

> **Overall: 59/100** — Good foundation and content strategy. Significant security, performance, and architecture issues must be fixed before launch.

---

## PART 1: BUG AUDIT

### Critical Bugs

| ID | File:Line | Severity | Issue | Cause |
| --- | --- | --- | --- | --- |
| **B01** | [next.config.ts:4-7](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/next.config.ts#L4-L7) | 🔴 Critical | **Supabase keys leaked to client bundle** | `env: { VYOMA_DB_URL: ..., VYOMA_DB_KEY: ... }` in next.config makes these available as `process.env.VYOMA_DB_URL` in *client* code. This is equivalent to `NEXT_PUBLIC_` — the anon key and DB URL are shipped to every browser. |
| **B02** | [views/Home.jsx:10](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Home.jsx#L10) + all views | 🔴 Critical | **Server-fetched data ignored; client re-fetches everything** | Server Components in `app/page.tsx` fetch data via `getProjects()` and pass as `initialProjects` prop, but **every view ignores these props** and calls `useSupabaseQuery()` instead, making a fresh client-side Supabase call. This means: (1) SSG/SSR data is wasted, (2) waterfall of client requests on every page load, (3) FOUC/loading spinners on all sections. |
| **B03** | [views/Admin.jsx:368](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Admin.jsx#L368) | 🔴 Critical | **Admin panel crashes if Supabase is null** | `supabase.auth.getSession()` and `supabase.auth.onAuthStateChange()` are called directly on the imported `supabase` client, which can be `null` (line 11 in supabase.ts). No null check → runtime crash. |
| **B04** | [hooks/useRoute.js:7](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/hooks/useRoute.js#L7) | 🔴 Critical | **SSR crash — direct `window` access** | `useState(window.location.pathname)` crashes during SSR because `window` is undefined. This hook is a legacy SPA artifact and should be removed (Next.js router replaces it). |

### High Bugs

| ID | File:Line | Severity | Issue |
| --- | --- | --- | --- |
| **B05** | [ThemeProvider.tsx:16](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/providers/ThemeProvider.tsx#L16) | 🟠 High | **`setState` inside `useEffect` body** (React 19 strict mode violation). ESLint error: `react-hooks/set-state-in-effect`. Causes cascading renders and hydration flash. |
| **B06** | [ui/3d-card.tsx:125](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/ui/3d-card.tsx#L125) | 🟠 High | **Variable used before declaration** — `handleAnimations()` called in `useEffect` before `const handleAnimations = ...`. Works due to TDZ hoisting behavior but ESLint correctly flags it as error. |
| **B07** | Multiple views | 🟠 High | **Unescaped `'` characters** — 6 ESLint errors for `react/no-unescaped-entities` in [CaseStudy.jsx:104](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/CaseStudy.jsx#L104), [Engagements.jsx:38](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Engagements.jsx#L38), [NotFound.jsx:10](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/NotFound.jsx#L10), [Services.jsx:76](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Services.jsx#L76), [FinalCTA.jsx:12](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/shared/FinalCTA.jsx#L12). Can cause build failures on stricter configs. |
| **B08** | [public/sitemap.xml](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/public/sitemap.xml) + [public/robots.txt](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/public/robots.txt) | 🟠 High | **Duplicate sitemap and robots files** — Both `app/sitemap.ts` and `public/sitemap.xml` exist. Both `app/robots.ts` and `public/robots.txt` exist. The static files in `public/` will **shadow** the dynamic App Router versions, making the dynamic sitemap (which includes slugs from Supabase) unreachable. |
| **B09** | [app/sitemap.xml/](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/sitemap.xml) | 🟠 High | **Empty `app/sitemap.xml/` directory** — An empty directory in the app router at this path will conflict with the sitemap.ts route. |
| **B10** | [lib/supabase.ts](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/lib/supabase.ts) + [lib/supabase.js](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/lib/supabase.js) + [lib/supabase-server.ts](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/lib/supabase-server.ts) | 🟠 High | **3 duplicate Supabase client files** — `supabase.ts`, `supabase.js`, and `supabase-server.ts` all create Supabase clients with slight variations. Causes confusion and potential import resolution issues (TS vs JS). |
| **B11** | [Btn.jsx:6](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/shared/Btn.jsx#L6) | 🟠 High | **Btn renders as `<button>` when no `go` is passed** — `Btn({ to="/contact" })` renders a `<button>` instead of a link because the condition is `if (to && go)`. Since `go` is never passed in the App Router (it was for the SPA router), **all CTA buttons are non-linking buttons**. Navigation only works because the Link component handles the `to` prop, but this fallback path means CTAs could silently fail. |

### Medium Bugs

| ID | File:Line | Severity | Issue |
| --- | --- | --- | --- |
| **B12** | All `[slug]/page.tsx` | 🟡 Medium | **`generateMetadata` returns wrong property names** — e.g., [services/[slug]/page.tsx:6](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/services/%5Bslug%5D/page.tsx#L6) returns `{ title: s.name }` but the Supabase service rows use `s.title`, not `s.name`. Same issue in work and solutions. Results in empty/undefined metadata titles on detail pages. |
| **B13** | [views/Home.jsx:434](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Home.jsx#L434) | 🟡 Medium | **Accessing `projects[0]` without checking `loading`** — `FeaturedCaseStudy` destructures `data: projects` and immediately accesses `projects[0]` without checking the loading state. If the query hasn't resolved, `projects` is `[]` and `project` is `undefined`, which is handled but causes a flash. |
| **B14** | [Footer.jsx:63](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/layout/Footer.jsx#L63) | 🟡 Medium | **Hardcoded `© 2025`** — Should be dynamic: `© ${new Date().getFullYear()}`. |
| **B15** | 77 ESLint warnings | 🟡 Medium | **Unused imports/variables** — `ProjectCard` in Home.jsx:7, `STAGES` in Services.jsx:13, `Btn` in Team.jsx:4, `cn` in CustomCursor.jsx:4, `props` in 5 views, `go` in OverviewBar.jsx:5, `isCreating` in Admin.jsx:365. |
| **B16** | [public/favicon-16x16.webp](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/public/favicon-16x16.webp) | 🟡 Medium | **Oversized favicons** — `favicon-16x16.webp` is 409 KB and `favicon-32x32.webp` is 409 KB. These should be ~1-2 KB each. They appear to be full-resolution copies of the logo. |
| **B17** | [app/icon.webp](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/icon.webp) | 🟡 Medium | **1.3 MB icon.webp** in app directory — This is used as the auto-generated favicon by Next.js. Massively oversized. |

### Low Bugs

| ID | File:Line | Severity | Issue |
| --- | --- | --- | --- |
| **B18** | 8 `@typescript-eslint/no-explicit-any` errors | 🟢 Low | Type safety gaps in sitemap.ts and slug pages |
| **B19** | [work/page.tsx:6](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/work/page.tsx#L6) | 🟢 Low | **Double-escaped apostrophe** — `VYOMA''s portfolio` should be `VYOMA's portfolio` |

---

## PART 2: RENDERING & PERFORMANCE

### Rendering Strategy Per Route

| Route | Current | Recommended | Notes |
| --- | --- | --- | --- |
| `/` | SSG (static) | ✅ SSG with ISR (revalidate: 3600) | Home page should revalidate hourly to pick up new projects |
| `/services` | SSG | ✅ SSG/ISR | Good |
| `/services/[slug]` | SSG via `generateStaticParams` | ✅ Correct | Good |
| `/work` | SSG | ✅ SSG/ISR | Good |
| `/work/[slug]` | SSG via `generateStaticParams` | ✅ Correct | Good |
| `/solutions` | SSG | ✅ SSG/ISR | Good |
| `/solutions/[slug]` | SSG via `generateStaticParams` | ✅ Correct | Good |
| `/insights` | SSG | ✅ SSG/ISR | Should revalidate for new posts |
| `/insights/[slug]` | SSG via `generateStaticParams` | ✅ Correct | Good |
| `/contact` | Static | ✅ Correct (client-side form) | Good |
| `/admin` | Static shell + client auth | ⚠️ Should add `dynamic = "force-dynamic"` | Prevent caching of auth state |
| `/about`, `/team`, `/faq`, etc. | SSG | ✅ Correct | Good |

### Critical Performance Issues

| ID | Issue | Impact | Fix |
| --- | --- | --- | --- |
| **P01** | **30+ raw `<img>` tags, zero `next/image`** | No automatic WebP/AVIF, no responsive sizing, no lazy loading with IntersectionObserver, no blur placeholders. Directly hurts LCP, bandwidth, and Lighthouse scores. | Replace all `<img>` with `next/image` `Image` component across all views |
| **P02** | **Client-side re-fetching defeats SSG** | Every view calls `useSupabaseQuery()` which fires a fresh Supabase request in the browser. The server-fetched data passed as props is completely ignored. This creates: waterfall requests, loading spinners, and wasted SSG. | Views must accept and use `initialData` props; `useSupabaseQuery` should seed from initial server data |
| **P03** | **globals.css is 76 KB** | Single massive CSS file loaded on every page. Much of it may be unused on individual routes. | Audit and split CSS, use Tailwind's built-in purging, extract page-specific styles |
| **P04** | **tsparticles bundle** | `@tsparticles/engine` + `@tsparticles/react` + `@tsparticles/slim` — these add ~100-150 KB to the client bundle. | Lazy-load with `next/dynamic` only on pages that use particles |
| **P05** | **No `loading.js` or `error.js` files** | No streaming/Suspense boundaries. All page transitions are full page loads without skeleton states. | Add `loading.tsx` to key route segments |
| **P06** | **`useImagePreloader` loads ALL images on mount** | On first visit, this hook fetches image URLs from 3 Supabase tables and pre-loads every single image. On mobile connections, this wastes bandwidth aggressively. | Remove this hook; `next/image` handles lazy loading natively |
| **P07** | **CustomCursor adds mousemove/mouseover listeners globally** | Continuous re-renders on every mouse movement. | Use `requestAnimationFrame` throttling and `will-change: transform` |
| **P08** | **No `sizes` attribute on any images** | Browsers download full-size images even on mobile | Use `sizes` with `next/image` to serve responsive images |
| **P09** | **Hero image is a raw PNG at unknown resolution** | LCP element is not optimized | Use `next/image` with `priority` flag on hero images |

### Missing Performance Features

- ❌ No `next/dynamic` lazy imports for heavy components (Carousel, Timeline, InfiniteMovingCards, 3D cards, particles)
- ❌ No `Suspense` boundaries anywhere
- ❌ No `loading.tsx` files in any route segment
- ❌ No `error.tsx` files (only a client ErrorBoundary)
- ❌ No bundle analysis configured (`@next/bundle-analyzer` not installed)
- ❌ No ISR `revalidate` on any page despite dynamic Supabase data
- ❌ No `fetchCache` or fetch caching configuration
- ❌ No CDN cache headers configured

---

## PART 3: SEO & LINK PREVIEWS

### What's Good ✅

- **Metadata API** used correctly on every route page with title templates
- **`metadataBase`** set to `https://vyomatechnologies.com` in root layout
- **Open Graph** tags with proper `type`, `locale`, `siteName`, `images`
- **Twitter Card** with `summary_large_image`
- **`app/robots.ts`** and **`app/sitemap.ts`** (dynamic, includes slug pages)
- **JSON-LD** `ProfessionalService` schema in root layout
- **Favicon** configured in metadata (though oversized)
- **`suppressHydrationWarning`** on `<html>` for theme
- **Custom 404** page via `not-found.tsx`

### Issues Found

| ID | Issue | File | Fix |
| --- | --- | --- | --- |
| **S01** | **Duplicate sitemap/robots** — Static files in `public/` shadow dynamic App Router versions | [public/sitemap.xml](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/public/sitemap.xml), [public/robots.txt](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/public/robots.txt) | **Delete** `public/sitemap.xml`, `public/robots.txt`, and `app/sitemap.xml/` directory |
| **S02** | **No canonical URLs** on any page | All route pages | Add `alternates: { canonical: url }` to each page's metadata |
| **S03** | **OG image is generic** — single `/og-image.webp` for all pages | [layout.tsx:59](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/layout.tsx#L59) | Create route-specific OG images or use `ImageResponse` for dynamic generation |
| **S04** | **Missing JSON-LD types** — Only `ProfessionalService`. Missing: `Organization`, `WebSite`, `FAQPage`, `BreadcrumbList`, `Service` | [layout.tsx:92](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/layout.tsx#L92) | Add `FAQPage` schema on `/faq`, `BreadcrumbList` on detail pages, `WebSite` with `SearchAction` |
| **S05** | **No `manifest.json`/`site.webmanifest`** | Not found | Add web manifest for PWA readiness |
| **S06** | **Multiple `<h2>` before first section** — Heading hierarchy skips levels on home page | [Home.jsx:108](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Home.jsx#L108) | Ensure single `<h1>` per page, sequential heading levels |
| **S07** | **No `alt` text on some images** — Footer logo, admin images lack alt text | [Footer.jsx:15](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/layout/Footer.jsx#L15) | Add descriptive alt text |
| **S08** | **Detail page metadata uses wrong field names** — `s.name` instead of `s.title` | [services/[slug]/page.tsx:6](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/services/%5Bslug%5D/page.tsx#L6) | Fix to use correct Supabase column names |
| **S09** | **No `lastModified` in sitemap entries** | [sitemap.ts](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/sitemap.ts) | Add `lastModified` from Supabase `updated_at` columns |

### Keyword Plan for Software/Web Agency

**Primary Keywords**: custom software development, AI development agency, web application development, mobile app development, SaaS development agency
**Secondary Keywords**: product design agency, AI integration services, MVP development, startup technology partner, custom CRM development
**Long-tail**: "hire AI development team", "build SaaS product from scratch", "custom software for startups"
**Local SEO**: Add `address`, `geo`, `telephone` to JSON-LD if you have a physical office. Add Google Business Profile. Consider location-based landing pages.

---

## PART 4: SECURITY

### Critical Security Issues

| ID | Issue | Severity | File | Details |
| --- | --- | --- | --- | --- |
| **SEC01** | **Supabase keys exposed to client** | 🔴 Critical | [next.config.ts:4-7](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/next.config.ts#L4-L7) | The `env: {}` block in `next.config.ts` inlines `VYOMA_DB_URL` and `VYOMA_DB_KEY` into the client bundle. While the anon key is designed for client use, it should be explicitly named `NEXT_PUBLIC_VYOMA_DB_URL` if intentional, and the `env:{}` block removed. Currently it's ambiguous and dangerous if service role key is ever set. |
| **SEC02** | **No input validation on contact form** | 🔴 Critical | [Contact.jsx:26-36](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Contact.jsx#L26-L36) | Form data goes directly to Supabase `leads` table with zero validation. No length limits, no email format check beyond `type="email"`, no XSS sanitization. Anyone can insert arbitrary data. |
| **SEC03** | **Admin panel has no server-side auth** | 🔴 Critical | [Admin.jsx](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Admin.jsx) | Authentication is purely client-side via Supabase Auth. There's no middleware, no server-side session check, and no Row Level Security verification. The admin page is statically generated and ships its full code to every visitor. |
| **SEC04** | **Direct Supabase writes from client** | 🟠 High | [Contact.jsx:40](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Contact.jsx#L40), [Admin.jsx:308](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Admin.jsx#L308) | Both the contact form and admin panel write directly to Supabase from the browser using the anon key. This means Supabase RLS policies are the ONLY security layer. If RLS is misconfigured, anyone can write to any table. |
| **SEC05** | **No rate limiting on contact form** | 🟠 High | [Contact.jsx](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Contact.jsx) | Only a honeypot field for spam protection. No CAPTCHA (reCAPTCHA/Turnstile), no server-side rate limiting. Bots can spam the leads table. |
| **SEC06** | **No security headers** | 🟠 High | No middleware.ts found | Missing: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| **SEC07** | **No CSRF protection** | 🟡 Medium | Contact form | The form submits client-side so traditional CSRF is less relevant, but there's no origin checking on any data mutations. |

### npm audit Result

```
found 0 vulnerabilities
```

✅ All dependencies are clean.

### Next.js Version CVE Check

Next.js 16.3.8 — No known CVEs for this version as of the audit date. ✅

### Ready-to-Paste Security Headers (middleware.ts)

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 
    'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https://*.supabase.co https://ui-avatars.com https://images.unsplash.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://*.supabase.co; " +
    "frame-ancestors 'none';"
  );
  
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/).*)'],
};
```

### Privacy & Data Handling

- ❌ No cookie consent banner (even though Supabase sets auth cookies)
- ❌ Privacy policy is a placeholder ([Legal.jsx:13](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Legal.jsx#L13))
- ❌ Terms of service is a placeholder
- ❌ No data retention policy for leads table
- ⚠️ Consider DPDP Act (India) / GDPR compliance if serving EU clients

---

## PART 5: ACCESSIBILITY, UX & CODE QUALITY

### Accessibility (WCAG 2.2 AA)

| Issue | Location | Priority |
| --- | --- | --- |
| **Skip-to-content link** ✅ | [layout.tsx:121-126](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/layout.tsx#L121-L126) | Done |
| **Custom cursor hides native cursor** — No fallback for keyboard users | [CustomCursor.jsx:42](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/shared/CustomCursor.jsx#L42) | High |
| **No focus trap on mobile menu** | [Navbar.tsx:118](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/components/layout/Navbar.tsx#L118) | High |
| **No `prefers-reduced-motion` respect** | All animation components | High |
| **FAQ items missing ARIA** — No `aria-expanded`, `role="region"`, `aria-controls` | [FAQ.jsx:31-37](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/FAQ.jsx#L31-L37), [Home.jsx:501-509](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Home.jsx#L501-L509) | Medium |
| **Admin panel drawer has no focus trap** | [Admin.jsx:320-353](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/views/Admin.jsx#L320-L353) | Medium |
| **No `lang` attribute on admin** — same `lang="en"` is fine | ✅ | Done |

### UX Issues

| Issue | Impact |
| --- | --- |
| Loading spinners on every section of the home page (due to client-side fetching) | Poor first impression, feels slow |
| No skeleton/placeholder loading states | Jarring content shifts |
| CTA buttons render as `<button>` not `<a>` (B11) | Breaks middle-click, right-click, SEO crawling |
| Mobile nav has no close-on-outside-click | UX gap |
| No form validation feedback until submit | Frustrating form experience |
| Admin drawer covers full screen on mobile (560px fixed width) | Admin unusable on mobile |

### Code Quality

| Issue | Details |
| --- | --- |
| **Mixed JS/TS** | Views are `.jsx`, pages are `.tsx`, components are mixed. Should standardize on TypeScript. |
| **`strict: false`** in tsconfig | Loses major type safety benefits |
| **3 duplicate Supabase client files** | `supabase.ts`, `supabase.js`, `supabase-server.ts` — consolidate to 2 (client + server) |
| **Legacy SPA artifacts** | `useRoute.js` (window.location router), `useImagePreloader.js`, `useTheme.js` (replaced by ThemeProvider) — all dead code |
| **No error boundaries per route** | Only one global ErrorBoundary; Next.js `error.tsx` convention not used |
| **No env validation** | No Zod schema or `t3-env` to validate required environment variables at build time |
| **No tests** | Zero test files found. No testing framework installed. |
| **No Prettier config** | Code formatting inconsistent |
| **76 KB CSS file** | [styles.css](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/styles.css) (unused?) + [globals.css](file:///c:/Users/manit/OneDrive/Desktop/code/VYOMA/vyoma-nextjs/src/app/globals.css) (76 KB) — likely accumulated from the SPA migration |

### Testing Starter Plan

1. **Unit Tests (Vitest)**: Test `lib/data.ts` fetchers, `cn()` utility, theme logic
2. **Component Tests**: Test `Btn`, `Link`, `ProjectCard` rendering
3. **E2E Tests (Playwright)**: Contact form submission, navigation flow, mobile menu, admin login
4. **Visual Regression**: Screenshot tests for key pages
5. **CI Pipeline**: GitHub Actions with `next build && next lint && vitest run && playwright test`

### Dependencies Assessment

| Package | Status | Note |
| --- | --- | --- |
| `@tsparticles/*` (3 packages) | ⚠️ Heavy | ~150 KB bundled. Consider removing if particles aren't used, or lazy-load |
| `@tabler/icons-react` | ⚠️ Unused? | Not found imported anywhere in the codebase. Remove if unused. |
| `@supabase/supabase-js` | ✅ | Current, essential |
| `motion` | ✅ | Framer Motion successor, well-optimized |
| `clsx` + `tailwind-merge` | ✅ | Standard, lightweight |

---

## PART 6: PRE-LAUNCH CHECKLIST

| Item | Status | Action Needed |
| --- | :---: | --- |
| **Domain & DNS** | ❓ | Confirm `vyomatechnologies.com` is purchased and DNS is configured |
| **SSL/TLS** | ❓ | Automatic on Vercel; verify if self-hosting |
| **Analytics** | ❌ FAIL | No Google Analytics, Plausible, or Vercel Analytics installed |
| **Cookie Consent** | ❌ FAIL | No consent banner despite Supabase auth cookies |
| **Privacy Policy** | ❌ FAIL | Placeholder content only |
| **Terms of Service** | ❌ FAIL | Placeholder content only |
| **Contact Form Delivery** | ⚠️ PARTIAL | Writes to Supabase `leads` table, but no email notification to you |
| **Email Setup** | ❓ | `hello@vyoma.studio` referenced but no email integration |
| **Error Monitoring** | ❌ FAIL | No Sentry, LogRocket, or equivalent |
| **Uptime Monitoring** | ❌ FAIL | No monitoring configured |
| **CI/CD** | ❌ FAIL | No GitHub Actions, no deployment pipeline |
| **Staging Environment** | ❓ | Verify Vercel preview deployments are enabled |
| **Hosting** | ❓ | Vercel recommended (free tier sufficient for launch) |
| **Env Vars** | ⚠️ PARTIAL | `.env.local` exists but no validation; `env:{}` in next.config leaks to client |
| **CDN** | ✅ | Automatic on Vercel |
| **OG Image Assets** | ⚠️ PARTIAL | Generic og-image.webp exists; needs route-specific versions |
| **Favicons** | ⚠️ PARTIAL | Present but massively oversized (409 KB each!) |
| **Security Headers** | ❌ FAIL | None configured |
| **Sitemap/Robots** | ⚠️ PARTIAL | Dynamic versions exist but shadowed by static files |
| **Performance** | ❌ FAIL | No `next/image`, client-side re-fetching, heavy bundles |
| **Build Passes** | ✅ PASS | Clean build, 0 TypeScript errors |
| **Lint Passes** | ❌ FAIL | 38 errors, 77 warnings |

---

## PART 7: FUTURISTIC ADD-ONS

### Visual/UI Enhancements

| Add-on | Business Value | Difficulty | Effort | Tech | Priority |
| --- | --- | --- | --- | --- | --- |
| **3D/WebGL hero** (React Three Fiber) | Wow factor, differentiation | High | 2-3 weeks | R3F, drei, three.js | Phase 3 |
| **GSAP scroll animations** | Premium feel, engagement | Medium | 1 week | GSAP ScrollTrigger | Phase 2 |
| **View Transitions API** | Smooth page transitions | Low | 2-3 days | Next.js built-in (experimental) | Phase 1 |
| **Theme switching** (already exists) | Personalization | Done | — | — | ✅ Done |
| **Animated case studies** | Storytelling, engagement | Medium | 1-2 weeks | Motion + scroll-driven | Phase 2 |
| **Bento/glass layouts** | Modern aesthetic | Low | 3-5 days | CSS + backdrop-filter | Phase 1 |

### Feature Add-ons

| Add-on | Business Value | Difficulty | Effort | Tech | Priority |
| --- | --- | --- | --- | --- | --- |
| **AI chatbot** for VYOMA services | Lead qualification, 24/7 availability | Medium | 2-3 weeks | Vercel AI SDK, OpenAI, Supabase | Phase 2 |
| **Instant quote estimator** | Lead conversion, transparency | Medium | 1-2 weeks | React form + pricing logic | Phase 1 |
| **Client portal** | Retention, professionalism | High | 4-6 weeks | Auth, dashboard, file sharing | Phase 3 |
| **Booking integration** (Cal.com) | Reduce friction for discovery calls | Low | 2-3 days | Cal.com embed | Phase 1 |
| **Blog/CMS** (MDX or Sanity) | SEO, thought leadership | Medium | 1-2 weeks | MDX with next-mdx-remote, or Sanity | Phase 2 |
| **Portfolio filters** | UX improvement | Low | Already exists | — | ✅ Done |
| **Multilingual** (next-intl) | Market expansion | High | 3-4 weeks | next-intl, translation management | Phase 3 |
| **PWA** | Offline access, installability | Low | 2-3 days | next-pwa | Phase 2 |

### Backend Add-ons

| Add-on | Business Value | Difficulty | Effort | Tech | Priority |
| --- | --- | --- | --- | --- | --- |
| **Headless CMS** (Sanity/Payload) | Content management, non-technical editing | Medium | 1-2 weeks | Sanity Studio or Payload CMS | Phase 2 |
| **Server Actions for contact form** | Security, validation | Low | 1-2 days | Next.js Server Actions + Zod | Phase 1 |
| **Email automation** | Lead follow-up, nurturing | Medium | 1 week | Resend/SendGrid + Supabase triggers | Phase 1 |
| **CRM/lead automation** | Pipeline management | Medium | 2-3 weeks | Supabase + custom dashboard or Pipedrive | Phase 2 |
| **Admin auth middleware** | Security hardening | Low | 1 day | Next.js middleware + Supabase Auth | Phase 1 |

### Growth Add-ons

| Add-on | Business Value | Difficulty | Effort | Tech | Priority |
| --- | --- | --- | --- | --- | --- |
| **Vercel Analytics + Speed Insights** | Performance monitoring | Low | 30 minutes | `@vercel/analytics`, `@vercel/speed-insights` | Phase 1 |
| **A/B testing** | Conversion optimization | Medium | 1 week | Vercel Edge Config or PostHog | Phase 2 |
| **WhatsApp integration** | Reduce contact friction for India market | Low | 1-2 days | WhatsApp Business API link | Phase 1 |
| **Performance budgets in CI** | Prevent regressions | Low | 1 day | Lighthouse CI in GitHub Actions | Phase 1 |

### Phased Roadmap

**🚀 Before Launch (This Week)**

1. Fix B01: Remove `env:{}` from next.config.ts, use `NEXT_PUBLIC_` prefix explicitly
2. Fix B02: Wire up server-fetched data to views (eliminate client re-fetching)
3. Fix B08: Delete `public/sitemap.xml`, `public/robots.txt`, `app/sitemap.xml/`
4. Fix B11: Fix Btn component to render `<Link>` when `to` prop is provided
5. Fix B12: Fix generateMetadata to use correct field names
6. Fix all lint errors (unescaped entities, unused imports)
7. Add security headers via middleware.ts
8. Move contact form to Server Action with Zod validation
9. Compress favicons to proper sizes
10. Delete duplicate Supabase client files and dead hooks

**📅 First Month**

1. Replace all `<img>` with `next/image`
2. Add `loading.tsx` and `error.tsx` to route segments
3. Set up Vercel Analytics + Sentry error monitoring
4. Write real privacy policy and terms
5. Add cookie consent banner
6. Set up email notifications for new leads (Resend)
7. Add Cal.com booking embed on contact page
8. Lazy-load heavy components (particles, carousel, timeline)
9. Add WhatsApp CTA button
10. Set up CI/CD with GitHub Actions

**🔮 Phase 2-3 (Later)**

1. AI chatbot for service inquiries
2. Headless CMS migration (Sanity)
3. Blog with MDX
4. GSAP scroll animations
5. Client portal
6. Multilingual support
7. A/B testing infrastructure

---

## Questions for You

1. **Domain**: Is `vyomatechnologies.com` purchased? Is `vyoma.studio` also yours? Which is the primary domain?
2. **Hosting**: Are you deploying to Vercel? (Recommended for this stack)
3. **Supabase RLS**: Are Row Level Security policies configured on your Supabase tables? (Critical for security given client-side writes)
4. **Email**: Do you have email service set up for `hello@vyoma.studio`? Should I integrate Resend for lead notification emails?
5. **Analytics**: Preference between Vercel Analytics, Google Analytics, or Plausible?
6. **Admin panel**: Should `/admin` be protected with server-side middleware, or is client-side Supabase Auth acceptable for now?
7. **Legal**: Do you have a lawyer drafting the privacy policy and terms, or should I create reasonable template versions?
8. **Backend scope**: Are you open to converting the contact form to a Server Action (recommended), or do you want to keep the current client-side Supabase approach?
9. **tsparticles**: Are particles used anywhere visible in the current site? I didn't find them rendered. Can they be removed?
10. **`@tabler/icons-react`**: Is this library used? I found no imports. Can it be removed?
