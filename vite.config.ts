/*
  ------------------------------------------------------------------
  LEGACY DEV HEADER (modernized)
  Project: lastbeforenamechange
  File: vite.config.ts
  Purpose: Vite build configuration (multi-page inputs + static copy of Shoelace assets).
  Maintainer: dev-team@example.gov
  Created: 2026-03-01
  Notes: `vite-plugin-static-copy` copies Shoelace assets to `dist/shoelace` for production.
  ------------------------------------------------------------------
*/

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets',
          dest: 'shoelace',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        components: resolve(__dirname, 'components.html'),
        forms: resolve(__dirname, 'forms.html'),
        kitchenSink: resolve(__dirname, 'kitchen-sink.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
});
