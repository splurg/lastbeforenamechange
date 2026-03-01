/**
 * mount.ts — lightweight island mounting utility.
 *
 * Scans the document for elements that carry a `data-island` attribute,
 * then dynamically imports the matching Preact component and renders it
 * into that element.  Props are passed via JSON in `data-props`.
 *
 * Usage in HTML:
 *   <div data-island="CounterIsland" data-props='{"start":5}'></div>
 *
 * The element's existing inner HTML is used as the static fallback
 * (progressive enhancement) until JavaScript hydrates the island.
 */

import { render, h, type ComponentType } from 'preact';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>;
type IslandModule = { default: AnyComponent };

const registry: Record<string, () => Promise<IslandModule>> = {
  CounterIsland: () => import('./CounterIsland'),
  LiveSearchIsland: () => import('./LiveSearchIsland'),
  DataTableIsland: () => import('./DataTableIsland'),
};

export async function mountIslands(): Promise<void> {
  const nodes = document.querySelectorAll<HTMLElement>('[data-island]');

  await Promise.all(
    Array.from(nodes).map(async (el) => {
      const name = el.dataset['island'] ?? '';
      const loader = registry[name];
      if (!loader) {
        console.warn(`[islands] Unknown island: "${name}"`);
        return;
      }

      let props: Record<string, unknown> = {};
      try {
        props = el.dataset['props'] ? JSON.parse(el.dataset['props']) : {};
      } catch {
        console.warn(`[islands] Invalid data-props JSON on island "${name}"`);
      }

      const mod = await loader();
      render(h(mod.default, props), el);
    }),
  );
}
