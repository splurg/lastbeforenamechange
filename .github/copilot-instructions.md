# Copilot Instructions for this repository

## Project shape and runtime model
- This is a multi-page static site (not an SPA): `index.html`, `components.html`, and `forms.html` are separate Vite build inputs configured in `vite.config.ts`.
- All pages load one shared entrypoint, `src/main.ts`, which is the only place that bootstraps runtime libraries.
- Interactivity is HTML-first: use `hx-*` attributes (htmx) and `_="..."` attributes (hyperscript) directly in markup instead of adding page-specific JS files.
- `public/api/*.html` are static response fragments used by htmx demos; they are placeholders for real backend endpoints.

## Core integration details (easy to break)
- Keep Shoelace asset path handling in sync with build mode in `src/main.ts`:
  - dev: `/node_modules/@shoelace-style/shoelace/dist`
  - prod: `/shoelace` (copied by `vite-plugin-static-copy`)
- If you add/remove Shoelace components in HTML, update explicit imports in `src/main.ts` (tree-shaken component registration model).
- Do not remove the `viteStaticCopy` config in `vite.config.ts`; icons/fonts depend on copied `dist/shoelace/assets`.

## Styling and UI conventions
- USWDS-inspired styling is centralized in `src/style.css` using `--usa-*` tokens mapped to Shoelace tokens (for example `--sl-color-primary-600`).
- Prefer existing utility/layout classes already defined here (`.grid-container`, `.grid-row`, `.component-section`, `.usa-*`) over introducing new naming systems.
- Current pages mix Shoelace components with semantic HTML fallbacks (examples: `.usa-button`, `.usa-alert`, `.usa-table`). Preserve that pattern.

## Page patterns to follow
- Navigation/header/footer are duplicated intentionally across HTML pages; update all three pages for global nav/branding changes.
- htmx loading UX uses `.htmx-indicator` and `hx-indicator` (see `index.html` greeting demo and `forms.html` form/search).
- hyperscript is used for small behavior orchestration (menu toggle, inline validation, modal control) instead of imperative TS.

## Build, preview, and deploy workflow
- Install: `npm install`
- Local dev (HMR): `npm run dev`
- Production build: `npm run build` (runs `tsc` with strict/noUnused checks, then Vite build)
- Local dist preview: `npm run preview`
- CI deploy workflow: `.github/workflows/deploy.yml` builds on pushes to `main` and uploads `dist/` via `SamKirkland/FTP-Deploy-Action`.

## Change guidance for agents
- For UI/content changes, edit HTML first; only touch `src/main.ts` when a new Shoelace component import or global bootstrap behavior is required.
- For theming/brand updates, prefer changing CSS custom properties in `src/style.css` before adding new CSS rules.
- When converting demo endpoints to real services, update `hx-get`/`hx-post` URLs in HTML and keep progressive enhancement behavior intact.
- Keep outputs static-host friendly (no server runtime assumptions in build artifacts).
