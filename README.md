# VellumGuard — Website

The marketing site for **VellumGuard**, the developer API for post-quantum encryption.

> Encryption that outlives the quantum era. Five lines of code, hybrid classical +
> post-quantum, compliance-ready.

## What this is

A static, dependency-free website — plain HTML, CSS, and a small amount of vanilla
JavaScript. No build step, no framework, no npm install required to run it.

```
.
├── index.html          Homepage
├── pricing.html        Pricing tiers
├── docs.html           Quickstart + ciphertext format
├── security.html       Security model & compliance
├── css/style.css       All styles (design tokens at the top)
├── js/main.js          Nav toggle + scroll reveals
├── assets/             Favicon and static assets
├── vercel.json         Clean URLs, cache + security headers
├── README.md
├── LICENSE
└── .gitignore
```

## Run it locally

Because it is fully static, any static file server works:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>. Internal links use clean URLs (`/pricing`,
`/docs`, `/security`) which Vercel resolves automatically; on a plain local server
you may need to append `.html` manually, or use `npx serve .` which also supports
clean URLs.

## Deploy (Vercel)

The site is configured for Vercel via `vercel.json` — clean URLs, sensible cache
headers, and basic security headers are already set. No build step.

1. Push this repo to GitHub (e.g. `github.com/vellumguard/website`).
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset: **Other**. Build command: none. Output directory: `.` (root).
4. Deploy. Vercel gives you a `*.vercel.app` URL immediately and a fresh
   preview URL on every future branch and pull request.

### Custom domain

In the Vercel project: **Settings → Domains → Add** `vellumguard.com`. Vercel shows
the DNS records to set at your registrar (an `A` record, or a `CNAME` for `www`).
Add `vellumguard.ai` as a second domain and set it to redirect to `vellumguard.com`
so the brand resolves to one canonical host.

### Other hosts

The site is plain static files, so it also drops onto Netlify, Cloudflare Pages, or
any object store. Only `vercel.json` is Vercel-specific and is simply ignored
elsewhere.

## Before launch — wire these up

This is a front-end shell. A few things need real backends connected:

- **Early-access form** (`index.html`, `#start`) — currently a front-end-only stub.
  Connect it to a form provider (Loops, Resend, Formspree) or your own endpoint.
- **Domain** — point `vellumguard.com` at the host. Keep `vellumguard.ai` as a redirect.
- **Analytics** — add a privacy-respecting analytics snippet if desired.
- **Real legal pages** — Terms, Privacy, and the sub-processor list referenced in the
  footer and security page need to be written and linked.
- **Compliance status** — `security.html` lists SOC 2 as "in progress." Keep these
  statuses accurate as certifications complete.

## Design

Editorial / ink-on-vellum aesthetic. Fraunces (display) + Newsreader (body) + JetBrains
Mono (code), loaded from Google Fonts. All design tokens — colours, type, spacing — are
CSS custom properties at the top of `css/style.css`.

## License

Site code: MIT (see `LICENSE`). "VellumGuard," the wordmark, and brand assets are not
covered by the MIT license and remain proprietary.
