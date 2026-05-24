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
└── .github/workflows/  GitHub Pages deploy workflow
```

## Run it locally

Because it is fully static, any static file server works:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Deploy

### GitHub Pages (included)

The workflow at `.github/workflows/deploy.yml` publishes the site to GitHub Pages on
every push to `main`. To enable it:

1. Push this repo to `github.com/vellumguard/website` (or any repo).
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Push to `main`. The site builds and deploys automatically.

### Other hosts

The site is static, so it also drops cleanly onto Netlify, Vercel, Cloudflare Pages, or
any object store. No configuration needed — point the host at the repo root.

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
