# CLAUDE.md — Kaoooai Website Draft

Pure static marketing site for Kaoooai, a Japan-focused enterprise AI agent software development platform.

## Tech Stack
- **No framework / no build step** — plain HTML, CSS, JS served as-is.
- **No external runtime dependencies** (no npm, no CDN scripts).
- **No package.json** — no frontend toolchain, bundler, or linter configured.

## File Structure
```
/                      # All HTML pages at root
├── index.html         # Top page (hero, value props, CTA)
├── about.html         # Product concept / target orgs
├── features.html      # Platform features overview
├── effect.html        # ROI calculator, quantitative impact
├── security.html      # Security & compliance
├── flow.html          # PoC → rollout flow
├── cases.html         # Anonymous case studies overview
├── articles.html      # Article hub
├── resources.html     # Downloads & FAQ
├── contact.html       # Demo/PoC/material inquiry form
├── docs.html          # Technical docs overview
├── sitemap.html       # Visual sitemap
├── 404.html           # Custom 404
├── styles.css         # SINGLE shared stylesheet (~4800 lines)
├── app.js             # SINGLE shared JS (~500 lines)
├── README.md          # Page index
├── sitemap.txt        # Plain-text sitemap
├── article/           # Article detail pages (5 HTML files)
├── feature/           # Feature detail pages (3 HTML files)
│   ├── e2e-testing.html
│   ├── ground-truth.html
│   └── repair-agent.html
└── assets/            # All static assets
    ├── brand-mark.svg
    ├── kaoooai-product.svg
    ├── security-console.svg
    ├── workflow-map.svg
    ├── developer-team.png
    ├── case-sier-team.png
    ├── case-qa-team.png
    ├── case-insourcing-team.png
    ├── cover-poc.png
    ├── cover-release.png
    └── cover-standardization.png
```

## Design System (styles.css)
- **CSS Custom Properties** in `:root` — colors (`--navy`, `--blue`, `--teal`, `--gold`, `--ink`, `--muted`, `--subtle`, `--line`, `--bg`, `--panel`), shadow (`--shadow`), max-width (`--max: 1160px`).
- **Font**: `"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, system-ui, sans-serif`
- **Responsive breakpoints**: 980px, 640px, 480px (`@media (max-width: …)`).
- **Naming**: BEM-like utility classes — `.button`, `.button.primary`, `.button.accent`, `.button.text`, `.section`, `.section.alt`, `.section.navy`, `.wrap`, `.site-header`, `.nav`, `.hero`, `.site-footer`, `.reveal` / `.is-visible` (IntersectionObserver animation).
- **Sticky header**: `position: sticky` with `backdrop-filter: blur(14px)`.
- No CSS reset beyond `* { box-sizing: border-box }` — the rest is manual.

## JavaScript (app.js) — Self-contained modules via IIFEs
All JS is vanilla ES6+, no transpilation. Modules (all IIFE-wrapped):

1. **Mobile menu toggle** — `.menu-toggle` click toggles `.is-open` on `.site-header`.
2. **Demo form submit** — `[data-demo-form]` intercepts submit, shows "送信ありがとう…".
3. **Footer link patching** — rewrites hrefs for `会社概要` (external), `セキュリティ方針` (relative), `セキュリティ要件の相談` (intent param).
4. **Footer company note** — injects `<div class="footer-company-note">` with `創点株式会社` into first `.footer-grid > div`.
5. **ROI Calculator** (`[data-roi-calculator]`) — live-updating cost comparison between manual development and Kaoooai-assisted development. Formats values in 万円/億円.
6. **Scroll reveal** — `IntersectionObserver` adds `.is-visible` to `.reveal` elements on scroll.
7. **Intent-based contact form** (`contact.html`) — URL param `?intent=` (`material`, `demo`, `poc`, `letter`, `security`) switches page title, description, placeholder text. Clickable `.intent-card` elements sync with `<select name="topic">`.
8. **Video modal** — `<dialog id="video-modal">` triggered by `[data-video-trigger]`, closes on backdrop click.
9. **Floating CTA banner** — `#floating-cta` appears after 320px scroll, hides near footer, dismissable via `sessionStorage`.
10. **Chat widget** — `#chat-window` with bot responses, quick-select options (`[data-chat-opt]: material | demo | custom`), typing indicator, custom message input.

## Key Conventions
- **Language**: All content is Japanese (`lang="ja"`), all code comments are Japanese.
- **Meta robots**: Every page has `noindex, nofollow, noarchive, noai, noimageai, nosnippet, noydir, noimageindex` — this is a draft/staging site, NOT for production indexing.
- **Cache-Control**: Every page sets `no-cache, no-store, must-revalidate`.
- **Favicon**: `assets/brand-mark.svg` ( SVG favicon).
- **Navigation**: Copied inline on every page (no templating/SSI). To update nav, must edit ALL HTML files.
- **Structured data**: `index.html` has JSON-LD `Service` schema for the organization (`創点株式会社`).
- **External link**: `会社概要` links to `https://www.istart.co.jp/about.html` with `target="_blank"`.

## Common Tasks
- **Adding a new page**: Duplicate an existing HTML, update `<title>`, `<meta description>`, main content. Copy the `<header>` and `<footer>` from index.html. Add to nav across all pages.
- **Updating navigation**: Edit every `.html` file's `<nav class="nav">` block — they are all independently maintained.
- **Adding new CSS**: Append to `styles.css` under the relevant section. Use existing CSS variables. Follow the 980/640 breakpoint pattern.
- **Adding new JS**: Wrap in an IIFE `(function() { … })();` and append to `app.js`.
- **Adding an article**: Create new file in `article/`, follow existing article structure, link from `articles.html`.
- **Adding assets**: Place in `assets/`, reference as `assets/filename.ext`.
