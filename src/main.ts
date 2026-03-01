/**
 * main.ts — entry point loaded by every page.
 *
 * Responsibilities:
 *  1. Register Shoelace icons from the bundled asset path.
 *  2. Bootstrap htmx so hx-* attributes work on all elements.
 *  3. Load hyperscript so _="…" attributes work on all elements.
 */

// ─── Shoelace ────────────────────────────────────────────────────────────────
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Register every Shoelace component used across the site.
// Tree-shake unused components by importing only what you need.
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

// Point the icon loader at the bundled assets folder.
// In development Vite serves from node_modules; in production the
// vite-plugin-static-copy task copies assets to dist/shoelace/assets.
const isProd = import.meta.env.PROD;
setBasePath(isProd ? '/shoelace' : '/node_modules/@shoelace-style/shoelace/dist');

// ─── htmx ────────────────────────────────────────────────────────────────────
import htmx from 'htmx.org';

// Make htmx available globally so inline hx-* attributes on web components
// and dynamically-upgraded elements can still call htmx.process().
(window as unknown as Record<string, unknown>)['htmx'] = htmx;

// ─── hyperscript ─────────────────────────────────────────────────────────────
// hyperscript ships as a plain script — importing the ESM entry activates
// the global `_hyperscript` runtime and processes all _="…" attributes.
import 'hyperscript.org';
