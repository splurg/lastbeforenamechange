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
│       └── deploy.yml          # Build + FTP deploy on push to main
├── public/
│   └── api/                    # Static htmx fragment stubs (replace with real API)
│       ├── greeting.html
│       └── card-content.html
├── src/
│   ├── main.ts                 # Registers Shoelace, htmx, hyperscript
│   ├── style.css               # USWDS-inspired custom properties & layout
│   └── vite-env.d.ts
├── index.html                  # Home page
├── components.html             # Component showcase
├── forms.html                  # Forms demo
├── vite.config.ts
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

## Deployment via GitHub Actions

The workflow at `.github/workflows/deploy.yml` triggers on every push to `main` and:

1. Runs `npm ci` and `npm run build`
2. Uploads the `dist/` folder to your FTP server using [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)

### Required repository secrets

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