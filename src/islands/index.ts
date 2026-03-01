/**
 * islands/index.ts — entry point for pages that use Preact islands.
 *
 * Import this module instead of (or in addition to) main.ts on pages that
 * host island mount points.  It bootstraps the same Shoelace + htmx +
 * hyperscript stack as main.ts, then auto-mounts every [data-island] node.
 */

// Re-export the full main.ts bootstrap so islands pages get Shoelace, htmx,
// and hyperscript as well.
import '../main';

import { mountIslands } from './mount';

// Wait for the DOM to be ready, then hydrate all islands.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => mountIslands());
} else {
  mountIslands();
}
