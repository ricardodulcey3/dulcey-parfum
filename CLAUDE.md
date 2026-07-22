# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is a static, dependency-free site (no `package.json`, no bundler, no build/lint/test tooling). There is nothing to install or compile.

- **Preview locally**: open `index.html` directly in a browser, or serve the folder so relative paths resolve identically to production:
  ```bash
  python3 -m http.server 8000
  ```
- **Deploy**: push to `main`. GitHub Pages is configured (Settings → Pages) to serve directly from the `main` branch root — no build step, no `gh-pages` branch. Live at https://ricardodulcey3.github.io/dulcey-parfum/. Deploys take ~1 minute; verify with a hard refresh or a cache-busting query string, since GitHub Pages' CDN and browsers both cache assets aggressively and a normal reload can show stale CSS/JS.

## Architecture

Three files, no framework: `index.html` (markup/content), `css/styles.css` (styling + animation keyframes), `js/script.js` (data + behavior). Everything is wired together through conventions rather than explicit per-section code, which is the main thing to know before editing:

- **Scroll-reveal is attribute-driven, not section-specific.** Any element with a `data-animate` attribute is auto-discovered by `initScrollReveal()` in `js/script.js` and gets `.in-view` added via a single shared `IntersectionObserver` (see matching `[data-animate]` / `.in-view` CSS rules in `styles.css`). To make new content fade in on scroll, just add the attribute — no JS changes needed. Stagger delays for grouped items (hero content, manifesto cards) are done in CSS via `:nth-child` `transition-delay`, not in JS.
- **Animated counters are also attribute-driven.** Any `.counter` element is picked up by `initCounters()`. Behavior is configured entirely via data attributes: `data-count-to` (target number), `data-prefix` / `data-suffix` (e.g. `+`, `%`, `h`), and `data-format="k"` (renders large numbers like `2000` as `2K`). Used both in the hero stats and the "Nosotros" stats.
- **The product catalog is fully client-rendered.** `index.html` only contains empty containers (`#productGrid`, `#marqueeTrack`); `renderProducts()` and `buildMarquee()` in `js/script.js` populate them at runtime from the `PRODUCTS` and `BRANDS` arrays. There is no static product markup to hand-edit — to change the catalog, edit the `PRODUCTS` array (fields: `name`, `brand`, `category`, `categoryLabel`, `price`, optional `oldPrice` which triggers a discount badge, `desc`, optional `badge`).
- **Category cards filter the catalog via a category-name mapping that is not literal.** The three collection cards in the "Colecciones" section (`.category-card[data-filter-target]`) — Árabes, Diseñador, Nicho — map to the `category` values used in `PRODUCTS`, but not 1:1 by name: Árabes → `oriental`, Diseñador → `amaderado`, Nicho → `floral` (there is no actual `arabe` category in the data). Clicking a card calls `setActiveFilter()` and scrolls to `#catalogo`. If you add a real "árabes"/oriental product line, decide whether to keep this mapping or make it literal.
- **WhatsApp is the only contact/checkout mechanism** — there is no cart or backend. Product "Comprar" links, the contact section CTA, and the floating action button all build `wa.me` deep links with a prefilled message. The number is a placeholder (`00000000000`) and is duplicated in two places: the `WHATSAPP_NUMBER` constant in `js/script.js` (used for product buy links) and hardcoded directly in `index.html` (contact section + floating button) — both must be updated together with a real number.
- **The newsletter form (`#newsletterForm`) is UI-only.** It has no backend; submit just shows a success message client-side and resets the field. Don't assume it posts anywhere.
- **Brand tokens are centralized as CSS custom properties** in `:root` at the top of `css/styles.css` (colors, fonts, container width, transition easing) — change the palette/typography there rather than hunting through individual rules.
