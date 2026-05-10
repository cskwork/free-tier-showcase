# Free Tier Showcase Design System — Token Reference

> Always read this file first. For component specs see [design-components.md](design-components.md). For accessibility and do's/don'ts see [design-guidelines.md](design-guidelines.md).

A Product Hunt-faithful directory aesthetic — warm cream background, white card surfaces, a single saturated orange accent, Inter for body, Geist Mono for tabular numbers. Base spacing 4px. Single light theme committed (no dark mode). Static-export Next.js, so all tokens live as CSS custom properties.

**References:** Product Hunt homepage feed, Product Hunt product detail pages (e.g., `/products/notion`, `/products/linear`), Product Hunt "Today's leader" hero strip.

---

## Colors

### Accent — Primary

| Role | Hex | Usage |
|------|-----|-------|
| `--orange` | `#FF6154` | Primary CTA fill, hero accent, focus ring (matches PH's actual app primary) |
| `--orange-deep` | `#DA552F` | Hover/active on `--orange`, brand chrome (PH's logo orange) |
| `--orange-soft` | `#FFE9E3` | Recommended row tint, badge background, selection |
| `--orange-ink` | `#7A2510` | Text on `--orange-soft` |
| `--on-orange` | `#FFFFFF` | Text/icons on filled orange |

### Surface & Neutral

| Role | Hex | Usage |
|------|-----|-------|
| `--cream` | `#F8F8F4` | Page background — warm off-white, NOT pure white |
| `--surface` | `#FFFFFF` | Cards, sticky header behind blur |
| `--surface-2` | `#F4F4EE` | Sunken (chip bg, inline code), filter rail |
| `--ink` | `#21293C` | Primary text — slate-blue, NOT pure black (PH's text color) |
| `--ink-2` | `#4A5470` | Secondary text |
| `--ink-3` | `#6B7280` | Muted (meta, helper text) |
| `--rule` | `#E5E5E0` | Borders at rest |
| `--rule-strong` | `#CFCFC7` | Borders on hover, strong dividers |

### Semantic / Status

| Role | Hex | Usage |
|------|-----|-------|
| `--success` | `#16A34A` | Verified/active marker (inferred — PH doesn't expose this) |
| `--warn` | `#B45309` | Deprecated / "used to be free" tier (inferred) |

---

## Typography

```
font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace
```

| Style | Size (clamp) | Weight | Line Height | Tracking |
|-------|-------------|--------|-------------|----------|
| Display | `clamp(2.25rem, 4vw + 1rem, 3.75rem)` | 700 | 1.05 | -0.02em |
| H1 | `clamp(1.875rem, 2.4vw + 1rem, 2.5rem)` | 700 | 1.1 | -0.02em |
| H2 | `clamp(1.5rem, 1.2vw + 1rem, 1.875rem)` | 600 | 1.2 | -0.015em |
| H3 | `1.125rem` | 600 | 1.3 | -0.01em |
| Body Large | `1.0625rem` | 400 | 1.6 | 0 |
| Body | `0.9375rem` | 400 | 1.6 | 0 |
| Small | `0.8125rem` | 400 | 1.5 | 0 |
| Meta (caps mono) | `0.6875rem` | 500 | 1 | 0.16em |
| Tier (mono) | `0.8125rem` | 500 | 1.5 | 0 |

**Tabular nums** are global (`font-variant-numeric: tabular-nums`) — every numeric quota in the catalog needs to align across rows.

---

## Shape

| Token | Radius | Components |
|-------|--------|------------|
| `--radius-sm` | 6px | Inline pills, code chips |
| `--radius-md` | 8px | Inputs, smaller cards |
| `--radius-lg` | 12px | Service cards, stack cards |
| `--radius-xl` | 16px | Featured hero card |
| `--radius-pill` | 9999px | Buttons, category pills, badges |

---

## Elevation

PH uses elevation sparingly — cards rest on `--cream` with a 1px `--rule` border. Hover lifts subtly with shadow + border darkening; no aggressive drop shadows.

| Level | dp | CSS Shadow | Usage |
|-------|-----|-----------|-------|
| 0 | 0 | none | Base surface |
| 1 | 1 | `0 1px 2px rgba(33, 41, 60, 0.04)` | Card at rest (border-only) |
| 2 | 4 | `0 4px 12px -4px rgba(33, 41, 60, 0.08)` | Card on hover |
| 3 | 8 | `0 12px 24px -8px rgba(33, 41, 60, 0.12)` | Sticky header on scroll |
| 4 | 16 | `0 24px 48px -16px rgba(33, 41, 60, 0.18)` | Popovers / dialogs (inferred) |

---

## Interaction States

| State | Visual change | Notes |
|-------|---------------|-------|
| Enabled | Resting | Default |
| Hover | `border-color: var(--rule-strong)` + elevation 2 + `translate-y: -1px` | Cards |
| Hover (filled CTA) | `background: var(--orange-deep)` | Buttons |
| Focus-visible | `outline: 2px solid var(--orange)` + `outline-offset: 2px` | Keyboard only |
| Pressed | `translate-y: 0` (lock back) | Cards & buttons |
| Disabled | `opacity: 0.5` + `cursor: not-allowed` | All controls |

---

## Layout

| Class | Width | Notes |
|-------|-------|-------|
| Compact | < 640px | 1 column, full-bleed cards inside `px-5` |
| Medium | 640–1024px | 2 columns, sticky filters allowed |
| Wide | 1024–1280px | 3 columns for service grid |
| Expanded | > 1280px | Same 3-col, wider container |

| Container | Width | Usage |
|-----------|-------|-------|
| `--container-wide` | 76rem (1216px) | Catalog pages, homepage |
| `--container-narrow` | 64rem (1024px) | Detail pages |
| `--container-prose` | 44rem (704px) | About, long-form |

Spacing scale (Tailwind defaults are kept — no custom): `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 96`.

---

## Motion

| Token | Value |
|-------|-------|
| `--duration-fast` | 150ms |
| `--duration` | 200ms |
| `--duration-slow` | 380ms |
| `--ease-out-quart` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Reveals respect `prefers-reduced-motion: reduce` (handled in CSS, not JS).

---

## Icons

| Spec | Value |
|------|-------|
| Style | Inline SVG, single-stroke or filled glyphs |
| Sizes | 14px (inline), 16px (default), 20px (chrome), 24px (hero) |
| Stroke weight | 1.5px (when stroked) |
| Treatment | `currentColor` so they inherit the surrounding text color |

Used: GitHub mark (header/footer), upvote chevron (recommended badge), arrow glyphs (`→`, `↗`, `←`) — all inline SVG or text glyphs, no icon library wired up.

---

## Design Tokens

Naming convention: `kebab-case` semantic role only (`--orange`, `--ink`, not `--orange-500`). Tailwind v4 `@theme inline` exposes them as utilities (`bg-cream`, `text-ink`, `border-rule`, etc.) — no manual class authoring of raw hex values.

CSS custom property file: `app/globals.css`.
