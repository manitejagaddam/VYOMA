# VYOMA — Addons & Pending Configuration

> Items marked ✅ are done. Items marked ⏳ require your input or will be configured later.

---

## Analytics
| Item | Status | Notes |
|------|--------|-------|
| Vercel Analytics | ✅ Installed | `@vercel/analytics` added to layout. Enable in Vercel dashboard → Analytics tab. |
| Vercel Speed Insights | ✅ Installed | `@vercel/speed-insights` added to layout. |
| Configure analytics | ⏳ You | Go to vercel.com → your project → Analytics → Enable |

---

## Domain
| Item | Status | Notes |
|------|--------|-------|
| Domain | ⏳ Confirm | Domain is `vyoma.world`. Update DNS A/CNAME to point to Vercel. |
| SSL/TLS | ✅ Auto | Vercel auto-provisions Let's Encrypt certificate. |

---

## Email / Contact
| Item | Status | Notes |
|------|--------|-------|
| Support email | ✅ Updated | All references now use `support@vyoma.world` |
| WhatsApp link | ⏳ You | Replace `XXXXXXXXXX` in `FloatingContactDock.jsx` with your actual number (digits only, with country code, e.g. `919876543210`) |
| Phone number | ⏳ You | Add your phone number to `Contact.jsx` when ready |

---

## Error Monitoring
| Item | Status | Notes |
|------|--------|-------|
| Sentry | ⏳ Configure later | Run `npx @sentry/wizard@latest -i nextjs` when ready to add error tracking |
| Uptime monitoring | ⏳ Configure later | Recommended: [Better Uptime](https://betteruptime.com) or [UptimeRobot](https://uptimerobot.com) — free tier sufficient |

---

## CI/CD
| Item | Status | Notes |
|------|--------|-------|
| GitHub Actions | ⏳ Configure later | Add `.github/workflows/ci.yml` — see template below |
| Vercel preview deployments | ⏳ You | Enable in Vercel dashboard → Settings → Git |

### CI/CD Template (save as `.github/workflows/ci.yml`)
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

---

## Images
| Item | Status | Notes |
|------|--------|-------|
| Replace all `<img>` with `next/image` | ✅ Done | All views and components updated |
| OG image | ⏳ You | Replace `/public/og-image.png` with a 1200×630 `.webp`. Place at `public/og-image.webp` and update `layout.tsx` reference. |
| Local asset PNGs → WebP | ⏳ You | You said you'll provide `.webp` versions. Replace files in `public/assets/`. All `next/image` calls will pick them up automatically. |
| Favicons | ✅ Fixed | Regenerated: 16×16 (948 B), 32×32 (2.6 KB), 180×180 apple-touch (44 KB). Down from 409 KB each. |

---

## Privacy & Legal
| Item | Status | Notes |
|------|--------|-------|
| Cookie consent banner | ✅ Added | Shows on first visit, stores choice in localStorage |
| Privacy Policy | ⏳ You | `/privacy` page has placeholder content. Replace with real policy. |
| Terms of Service | ⏳ You | `/terms` page has placeholder content. Replace with real terms. |

---

## Security (all done)
| Item | Status |
|------|--------|
| Security headers (CSP, HSTS, X-Frame, etc.) | ✅ Done via `src/proxy.ts` |
| Supabase key leak removed from `next.config.ts` (handled differently now) | ✅ Fixed |
| Env vars renamed to avoid framework prefixes | ✅ Fixed |
| Static `robots.txt` / `sitemap.xml` shadowing dynamic routes | ✅ Deleted |

---

## When You Have Assets
Drop `.webp` files into `public/assets/` with the same names as the current `.png` files.
Next.js `next/image` will automatically serve them via the Vercel CDN with the right `sizes` hints.
