I’ll add a short todo plan for this task, then outline SPA options, gov-recommended models, sample data schemas, backend suggestions, and next steps.

Starting: *Propose SPA architecture options* (1/5)

- SPA design options (short)
  - Full SPA (CSR): single bundle (React/Preact/Svelte). Pros: rich client UX, client routing. Cons: heavier, may reduce progressive enhancement and SEO unless SSR is added.
  - SSR + Hydration (Universal): server-render pages for SEO/first-load, hydrate client for interactivity (Next.js/Remix/ SvelteKit). Good for government sites needing fast first paint and accessibility.
  - Island/Partial SPA (progressive decoupling): keep existing HTML-first pages but convert high-interactivity regions to client islands (Tiny frameworks / Preact islands). Preserves progressive enhancement and current htmx-friendly approach.
  - Headless CMS + SPA front-end: content stored in CMS (e.g., Drupal, Strapi, Contentful), SPA consumes APIs. Best when non-dev editors need frequent content updates.
  - Microfrontend / Module federation: split large apps into independently deployable features (only if scale justifies complexity).

- Government-recommended patterns and integrations
  - Accessibility: follow WCAG 2.1+ and Section 508; run automated checks (Lighthouse, axe) plus manual keyboard/screen-reader tests. Document in QA checklist.
  - Identity & auth: integrate with login.gov or enterprise SSO (OIDC/OAuth2) for authenticated user flows; follow NIST SP 800-63 guidance for identity assurance.
  - API design: publish OpenAPI specs for all endpoints; prefer resource-oriented REST or JSON:API for consistent patterns. Validate payloads with JSON Schema server-side.
  - Privacy & records: follow federal records management and privacy impact assessment (PIA) guidance if storing PII; minimize data retention and encrypt in transit/at rest.
  - Hosting & compliance: use cloud.gov, GSA-approved FedRAMP Moderate/P-ATO hosting, or equivalent FedRAMP-compliant cloud setups.
  - Security: adopt Content Security Policy, strict CORS rules, input validation, rate limiting, and logging for audit trails. Follow DHS/CDM or agency security baseline.

- Concrete data-model ideas (minimal examples)
  - ContentBlock (for CMS / SPA render)
    {
      "id": "uuid",
      "type": "content_block",
      "title": "Hero callout",
      "variant": "hero",
      "body": "<p>HTML or markdown</p>",
      "metadata": { "published": true, "tags": ["home","marketing"] },
      "created_at": "2026-03-01T12:00:00Z"
    }
  - ContactSubmission
    {
      "id": "uuid",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.gov",
      "subject": "support",
      "message": "Details…",
      "consent": true,
      "received_at": "2026-03-01T12:05:00Z"
    }
  - SiteComponent registry (SPA client state)
    {
      "name":"sl-dialog",
      "props":{ "label":"Confirm" },
      "mountPoint":"#dialog-area"
    }

- Example API surface (recommended)
  - GET /api/content/:slug  → returns ContentBlock or page composition (OpenAPI-documented)
  - POST /api/contact → accepts ContactSubmission (validate + rate-limit)
  - GET /api/components → metadata for client to lazy-load component code (for islands)
  - Auth endpoints: standard OIDC endpoints (use login.gov or agency IdP)

- Backend & hosting recommendations (gov-friendly)
  - Minimal stack: Node (Fastify/Express) or Go for concise APIs; use OpenAPI + request validation (AJV).
  - Serverless option: AWS Lambda / cloud.gov functions for low-traffic pages; ensure FedRAMP compliance.
  - Database: managed Postgres (RDS/cloud.gov) with encryption and backups; consider encrypted S3 for blobs.
  - Observability: structured logs (JSON), centralized logging (CloudWatch/stackdriver), and SCA scans.
  - CI/CD: GitHub Actions (already used) with secrets for deploy; integrate static analysis and accessibility checks into pipeline.

- Accessibility & test tooling to include in CI
  - Headless Lighthouse runs on preview builds.
  - axe-core or axe CLI for automated checks.
  - Pa11y or WAVE snapshots for visual/manual signoffs.
  - Keyboard navigation smoke tests (playwright/cypress).

- If you need a concrete starting plan I can:
  - Scaffold a minimal SSR SPA (e.g., Preact + Vite + Express) with OpenAPI stub and login.gov stub, or
  - Add an islands approach: produce a small module loader and example island components while keeping current static pages.

Which direction do you want to explore first (Full SPA, SSR + Hydration, Islands, or Headless CMS)? I can scaffold the selected option and include OpenAPI sample and JSON Schema validators.
