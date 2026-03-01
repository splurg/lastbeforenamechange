/*
  ------------------------------------------------------------------
  LEGACY DEV HEADER (modernized)
  Project: lastbeforenamechange
  File: src/theme.ts
  Purpose: Color-scheme definitions and localStorage persistence helpers.
  Maintainer: dev-team@example.gov
  Created: 2026-03-01
  Notes: Each scheme overrides --usa-blue-60v and --usa-blue-80 on :root;
         the CSS file maps those tokens to --sl-color-primary-* so Shoelace
         components automatically follow the active scheme.
  Accessibility: Validate new scheme colors meet WCAG AA contrast before adding them.
  ------------------------------------------------------------------
*/

export const THEME_STORAGE_KEY = 'site-color-scheme';

export interface ColorScheme {
  name: string;
  label: string;
  description: string;
  /** Primary color used in the preview swatch (matches --usa-blue-60v). */
  primary: string;
  /** Dark variant used in hover/hero states (matches --usa-blue-80). */
  dark: string;
}

/**
 * Government-approved color schemes.
 * Each scheme overrides only the two root USWDS primary tokens; all other
 * custom properties and Shoelace tokens cascade automatically from those two.
 */
export const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: 'uswds-blue',
    label: 'USWDS Blue',
    description:
      'The standard U.S. Web Design System blue — required baseline for most federal web properties.',
    primary: '#005ea2',
    dark: '#1a4480',
  },
  {
    name: 'gsa-green',
    label: 'GSA Green',
    description:
      'Inspired by the General Services Administration historic green branding palette.',
    primary: '#2e8540',
    dark: '#1a5c2a',
  },
  {
    name: 'navy-gold',
    label: 'Navy & Gold',
    description:
      'Deep navy used by several federal departments including the DOJ and Department of the Navy.',
    primary: '#1c2b4a',
    dark: '#0d1a2e',
  },
  {
    name: 'forest-green',
    label: 'Forest Service',
    description:
      'Earthy greens reflecting the U.S. Forest Service and National Park Service visual identity.',
    primary: '#367c2b',
    dark: '#1f4d18',
  },
  {
    name: 'high-contrast',
    label: 'High Contrast',
    description:
      'Near-black primary for maximum legibility and WCAG AAA compliance — recommended for accessibility-first deployments.',
    primary: '#1b1b1b',
    dark: '#000000',
  },
];

/** Apply a color scheme by name, updating CSS custom properties on :root. */
export function applyColorScheme(name: string): void {
  const scheme = COLOR_SCHEMES.find((s) => s.name === name);
  if (!scheme) {
    console.warn(`[theme] Unknown color scheme: "${name}". No changes applied.`);
    return;
  }
  const root = document.documentElement;
  root.style.setProperty('--usa-blue-60v', scheme.primary);
  root.style.setProperty('--usa-blue-80', scheme.dark);
}

/** Persist a color scheme choice and immediately apply it. */
export function saveColorScheme(name: string): void {
  localStorage.setItem(THEME_STORAGE_KEY, name);
  applyColorScheme(name);
}

/** Return the currently saved scheme name, or null if none. */
export function getSavedSchemeName(): string | null {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

/** Restore the user's saved scheme on page load. No-op if nothing is saved. */
export function restoreSavedScheme(): void {
  const saved = getSavedSchemeName();
  if (saved) applyColorScheme(saved);
}
