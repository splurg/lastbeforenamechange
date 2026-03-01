/*
  ------------------------------------------------------------------
  Project: lastbeforenamechange
  File: tests/e2e/smoke.spec.ts
  Purpose: Playwright smoke tests — verify each page loads and key
           elements are present.  These are intentionally broad to
           catch regressions without being fragile.
  ------------------------------------------------------------------
*/

import { test, expect } from '@playwright/test';

// ─── Home page ────────────────────────────────────────────────────────────────

test.describe('Home page', () => {
  test('loads and shows the hero heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Home/i);
    await expect(page.locator('.usa-hero__heading')).toBeVisible();
  });

  test('shows the primary navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav.usa-navbar')).toBeVisible();
    await expect(page.locator('a[href="/components.html"]').first()).toBeVisible();
  });

  test('shows the htmx demo button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('sl-button[hx-get]').first()).toBeVisible();
  });
});

// ─── Components page ──────────────────────────────────────────────────────────

test.describe('Components page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/components.html');
    await expect(page).toHaveTitle(/Components/i);
  });

  test('renders at least one Shoelace component section', async ({ page }) => {
    await page.goto('/components.html');
    await expect(page.locator('.component-section').first()).toBeVisible();
  });
});

// ─── Forms page ───────────────────────────────────────────────────────────────

test.describe('Forms page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/forms.html');
    await expect(page).toHaveTitle(/Forms/i);
  });

  test('contains a form element', async ({ page }) => {
    await page.goto('/forms.html');
    await expect(page.locator('form').first()).toBeVisible();
  });
});

// ─── API fragments ────────────────────────────────────────────────────────────

test.describe('API fragments', () => {
  test('greeting.html returns content', async ({ request }) => {
    const response = await request.get('/api/greeting.html');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body.toLowerCase()).toContain('hello');
  });

  test('card-content.html returns content', async ({ request }) => {
    const response = await request.get('/api/card-content.html');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body.trim().length).toBeGreaterThan(0);
  });
});
