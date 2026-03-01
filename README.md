<!--
	LEGACY DEV HEADER (modernized)
	Project: lastbeforenamechange
	File: README.md
	Purpose: High-level project overview and developer quickstart.
	Maintainer: dev-team@example.gov
	Created: 2026-03-01
-->

# lastbeforenamechange — Static Site Starter

A modern, accessible static-site starter built with **Vite + TypeScript**, **htmx**, **hyperscript**, and **Shoelace** web components — styled to match the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/components/overview/) component catalogue.

A GitHub Actions workflow automatically builds the project and deploys the `dist/` folder to any FTP host on every push to `main`.

---

## Screenshots

| Home | Components | Forms |
|------|-----------|-------|
| ![Home](https://github.com/user-attachments/assets/eb53cd02-7ef3-469c-8b8f-61f736706c33) | ![Components](https://github.com/user-attachments/assets/ddff1c84-e9c8-4686-9f13-eb153ac8f3d9) | ![Forms](https://github.com/user-attachments/assets/ee9416c6-86b4-4501-ba06-ab4e5de765c2) |

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Bundler | [Vite 7](https://vitejs.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Interactivity (AJAX) | [htmx 2](https://htmx.org/) |
| Interactivity (behaviour) | [hyperscript](https://hyperscript.org/) |
| UI components | [Shoelace 2](https://shoelace.style/) (USWDS-inspired) |
| Deployment | GitHub Actions → FTP (`SamKirkland/FTP-Deploy-Action`) |

---

## USWDS component coverage

The following [USWDS components](https://designsystem.digital.gov/components/overview/) are demonstrated using Shoelace equivalents:

| USWDS Component | Shoelace equivalent | Page |
|-----------------|---------------------|------|
| Alert | `<sl-alert>` | Components |
| Badge / Tag | `<sl-badge>`, `<sl-tag>` | Components |
| Breadcrumb | HTML `<nav>` + CSS | Components |
| Button | `<sl-button>` | Components |
| Card | `<sl-card>` | Components |
| Checkbox | `<sl-checkbox>` | Forms |
| File input | HTML `<input type="file">` | Forms |
| Form | `<sl-input>`, `<sl-select>`, `<sl-textarea>` | Forms |
| Modal | `<sl-dialog>` | Components |
| Progress / Step indicator | `<sl-progress-bar>` | Components |
| Radio buttons | `<sl-radio-group>`, `<sl-radio>` | Forms |
| Search | `<sl-input>` + htmx | Forms |
| Spinner | `<sl-spinner>` | Components |
| Table | HTML `<table>` + CSS | Components |
| Tabs | `<sl-tab-group>` | Components |
| Tooltip | `<sl-tooltip>` | Components |

---

## Project structure

```
.
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Build + FTP deploy on push to main
│       └── test.yml            # Unit tests + E2E smoke tests (push & PRs)
├── public/
│   └── api/                    # Static htmx fragment stubs (replace with real API)
│       ├── greeting.html
│       └── card-content.html
├── src/
│   ├── main.ts                 # Registers Shoelace, htmx, hyperscript
│   ├── style.css               # USWDS-inspired custom properties & layout
│   └── vite-env.d.ts
├── tests/
│   ├── unit/
│   │   └── api.test.ts         # Vitest unit tests for API fragment content
│   └── e2e/
│       └── smoke.spec.ts       # Playwright smoke tests (page loads, API responses)
├── index.html                  # Home page
├── components.html             # Component showcase
├── forms.html                  # Forms demo
├── playwright.config.ts        # Playwright E2E configuration
├── vite.config.ts              # Vite build config (also used by Vitest)
├── tsconfig.json
└── package.json
```

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install

```bash
npm install
```

### Development server

```bash
npm run dev
```

Open <http://localhost:5173/> in your browser. Vite hot-reloads on every save.

### Production build

```bash
npm run build
```

Output is written to `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Testing

The project includes two kinds of tests, each with its own npm script and GitHub Actions workflow.

### Unit tests (Vitest)

Unit tests live in `tests/unit/` and run entirely in Node — no browser needed.
They validate the content of the static API fragment stubs and any TypeScript utilities.

```bash
npm test          # run once
npm run test:watch # watch mode during development
```

### E2E / smoke tests (Playwright)

End-to-end tests live in `tests/e2e/` and use Playwright to drive a real Chromium
browser against the built site served by `vite preview`.

```bash
npm run build       # required before first run
npm run test:e2e    # run headless
npm run test:e2e:ui # open Playwright UI explorer
```

The Playwright configuration is in `playwright.config.ts`. By default only Chromium
is enabled; add `firefox` and `webkit` entries under `projects` when you need
cross-browser coverage.

---

## GitHub Actions workflows

The repository ships with **two independent workflows** so that a failing test never
blocks a deployment and vice versa.

| Workflow file | Purpose | Triggers |
|---------------|---------|----------|
| `.github/workflows/test.yml` | Unit tests + E2E smoke tests | Push / PR to `main` |
| `.github/workflows/deploy.yml` | Build + FTP deploy | Push to `main` |

Both workflows run in parallel on every push to `main`.  On pull requests only the
**test** workflow runs (deploy is skipped because it requires FTP secrets that are
only available on the default branch).

### Viewing workflow results

Go to the **Actions** tab of your repository. Each push will show two separate
workflow runs — one labelled **Test** and one labelled **Build and Deploy to FTP**.
Click any run to expand its jobs and see step-by-step logs.

### Controlling concurrency (optional)

If you want to ensure only one deploy runs at a time add a `concurrency` block to
`deploy.yml`:

```yaml
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: false   # wait for the previous deploy to finish
```

For the test workflow you may prefer `cancel-in-progress: true` to skip stale runs
when you push multiple commits in quick succession:

```yaml
concurrency:
  group: test-${{ github.ref }}
  cancel-in-progress: true
```

### Required secrets for deploy

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | Hostname of your FTP server (e.g. `ftp.example.com`) |
| `FTP_USERNAME` | FTP login username |
| `FTP_PASSWORD` | FTP login password |

### Optional: change the remote directory

Edit `.github/workflows/deploy.yml` and uncomment / update the `server-dir` option:

```yaml
server-dir: /public_html/
```

---

## Customisation

### Rename / rebrand

1. Replace all instances of `MyAgency.gov` in the HTML files.
2. Update `<title>` tags in each HTML file.
3. Adjust the colour tokens in `src/style.css` (`--usa-blue-60v`, etc.) to match your brand.

### Add Shoelace dark theme

Add to `src/main.ts`:

```ts
import '@shoelace-style/shoelace/dist/themes/dark.css';
```

Then toggle `class="sl-theme-dark"` on `<html>` or any container element.

### Replace stub API endpoints

The htmx demos point to static HTML files in `public/api/`. Replace these with real server endpoints — no JavaScript changes required, just update the `hx-get` / `hx-post` attributes in the HTML.

### Tree-shake Shoelace

`src/main.ts` imports every Shoelace component used across all pages. If you add or remove pages, update the import list to keep the bundle lean.

---

## License

[MIT](LICENSE)