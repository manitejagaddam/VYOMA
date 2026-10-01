# VYOMA Backlog & Add-ons

This file tracks features and fixes that were identified during the second-pass audit but deferred so you can implement them later at your convenience.

## 1. Supabase RLS (Row Level Security) Verification
Currently, the `/admin` route relies solely on client-side protection. To ensure the database is secure against unauthorized access from anyone who finds the Supabase URL, you must enable RLS directly in the Supabase dashboard:
- Log in to your Supabase project.
- Go to **Authentication** > **Policies** (or Database > Tables).
- Ensure RLS is active for tables like `leads` and `subscribers`.
- Set policies (e.g., `insert` for anonymous users, `select`/`update`/`delete` restricted to authenticated admins).

## 2. Cloudflare Turnstile Integration (Anti-Spam)
The contact form currently uses a simple CSS-hidden honeypot field. For robust protection against automated bot submissions, integrate Cloudflare Turnstile:
- Register your domain at Cloudflare Turnstile and obtain a Site Key and Secret Key.
- Add them to `.env`.
- Use the `@marsidev/react-turnstile` package on the client to render the widget and pass the token to your backend/Supabase.

## 3. Edge Middleware for Route Protection
To prevent unauthenticated users from even downloading the `/admin` React bundle, you should add a `middleware.ts` file at the root:
- Use `@supabase/ssr` to check the session edge-side.
- Redirect unauthenticated requests to `/admin/login` before they hit the page component.

## 4. Sentry Error Monitoring
Add Sentry to track runtime errors and unhandled exceptions:
- Run `npx @sentry/wizard@latest -i nextjs`.
- This will wrap your Next.js config and create instrumentation hooks.

## 5. Setup `.env.example`
Provide an example `.env` file so other developers (or CI/CD pipelines) know what environment variables are required:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# (Optional) Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

## 6. Cleanup Remaining Warnings
- Remove any remaining unused variables flagged by ESLint (e.g., `BELIEFS` in `About.jsx`, unused variables in `Admin.jsx`).
- Remove `console.log` statements in production files.
