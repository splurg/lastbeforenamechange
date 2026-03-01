/*
  ------------------------------------------------------------------
  Project: lastbeforenamechange
  File: tests/unit/api.test.ts
  Purpose: Unit tests for static API fragment stubs in public/api/.
           These validate the content of the server-response fragments
           that htmx fetches at runtime.
  ------------------------------------------------------------------
*/

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '../../public/api');

describe('API fragment: greeting.html', () => {
  const content = readFileSync(resolve(root, 'greeting.html'), 'utf-8');

  it('contains a success alert', () => {
    expect(content).toContain('sl-alert');
    expect(content).toContain('variant="success"');
  });

  it('contains a timestamp placeholder element', () => {
    expect(content).toContain('id="ts"');
  });

  it('contains a greeting message', () => {
    expect(content.toLowerCase()).toContain('hello');
  });
});

describe('API fragment: card-content.html', () => {
  const content = readFileSync(resolve(root, 'card-content.html'), 'utf-8');

  it('contains lazy-load copy', () => {
    expect(content.toLowerCase()).toContain('lazily');
  });

  it('is non-empty HTML', () => {
    expect(content.trim().length).toBeGreaterThan(0);
    expect(content).toContain('<p>');
  });
});
