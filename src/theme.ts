// VetFlow design tokens.
// Grounded in the physical vet patient chart: manila folders with punched
// hole-tabs, and rubber ink stamps for status marks. See Stamp / Sidebar
// components for where the motif shows up.

export const theme = {
  color: {
    ink: '#17241F', // near-black green — dark surfaces, primary text
    scrub: '#2F6F52', // medical-scrub green — brand / primary actions
    scrubDark: '#1D4A37', // deeper panel fill on dark surfaces
    sage: '#E7F0E9', // pale green-tinted card background
    kraft: '#C98A2B', // kraft-tag amber — pending / attention
    clay: '#B94A3E', // clay-stamp red — critical / allergy
    white: '#FFFFFF',
    gray: '#5B6660',
    grayLight: '#84978C',
    border: '#DCE6DF',
    claySoft: '#FBEDEA',
    ash: '#A9B6AE', // stamp-pad gray — done / inactive status
    mist: '#9FB3A6', // muted text on dark surfaces
    clayDark: '#8A3A3A', // darker clay for small text on claySoft
    inkMuted: '#4A5A51', // disabled items on ink surfaces
    inkBorder: '#2E4038', // hairlines on ink surfaces
  },
  font: {
    display: "'Bitter', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
  space: (n: number) => `${n * 4}px`,
} as const;

export type Theme = typeof theme;
