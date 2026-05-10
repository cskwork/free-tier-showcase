# Free Tier Showcase Guidelines — Accessibility & Do's/Don'ts

> See [design.md](design.md) for token values. See [design-components.md](design-components.md) for component specs.

---

## Accessibility

### Contrast Requirements

| Requirement | Ratio |
|-------------|-------|
| Body text (normal) | 4.5:1 |
| Large text (≥18pt or 14pt bold) | 3:1 |
| UI components / icons | 3:1 |

| Component | 3:1 Against |
|-----------|-------------|
| `--ink` `#21293C` on `--cream` `#F8F8F4` | 12.4:1 ✓ |
| `--ink-2` `#4A5470` on `--cream` | 7.6:1 ✓ |
| `--ink-3` `#6B7280` on `--cream` | 4.8:1 ✓ (body min) |
| `--orange` `#FF6154` on `--surface` `#FFFFFF` | 3.4:1 ✓ (UI only — not for body text) |
| `--on-orange` `#FFFFFF` on `--orange` `#FF6154` | 3.4:1 ✓ (just clears 3:1 large) |
| `--orange-ink` `#7A2510` on `--orange-soft` `#FFE9E3` | 8.1:1 ✓ |

**Note:** `--orange` as text on white fails AA for body. Use it for filled-button backgrounds and large headings only. For inline links use `--ink` with an underline.

### Touch Targets

- Minimum hit area: 44×44 CSS pixels (Apple HIG / WCAG 2.5.5).
- Inline pill buttons may render at smaller visual size if their hit area (`padding`) brings them to 44px.
- Spacing between adjacent targets: ≥8px to avoid mis-tap on touch devices.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable |
| `Shift+Tab` | Move to previous focusable |
| `Enter` | Activate link/button |
| `Space` | Activate button |
| `Esc` | Close popover/dialog (when applicable) |
| `/` | Focus search (reserved for future) |

Skip-to-main link must be the first focusable element on every page.

### Assistive Technology

- All interactive icons need `aria-label` or visually-hidden text (PH uses `aria-label="Upvote"` on its chevron — copy the pattern for the recommended badge).
- Cards-as-links must use a single `<a>` wrapper with `aria-label` summarizing the destination — do NOT nest interactive elements (buttons inside the link).
- Tabular metric blocks (Services / Categories / Stacks counts) should use `<dl><dt><dd>` so screen readers announce them as definitions, not raw numbers.
- The recommended badge announces as "Featured" or "Top pick" — never just "star icon".

---

## Gestures

| Gesture | Use |
|---------|-----|
| Tap | Activate cards, links, buttons |
| Scroll | Browse vertical feed; horizontal scroll for category-pill rail on mobile |
| Long press | (none — PH doesn't use long press) |
| Drag | (none) |
| Pinch | (none — content scales via responsive layout, not gesture) |

---

## Content Design

- **Sentence case everywhere** for buttons, headings, nav. No Title Case (`Browse Services` → `Browse services`). PH uses sentence case throughout.
- **Number formatting:** "100 GB", "100k req/day", "$0/mo". Always one space between digits and unit. Use `k` not `K`. Mono font + tabular-nums.
- **Tier line is a single sentence**, no bullets. It's what the visitor scans first.
- **Avoid superlatives.** "Generous", "powerful", "best" — drop them. State the number instead.
- **Voice:** factual, second-person ("you"), no marketing fluff. PH product taglines are short and concrete; mirror that.

---

## Do's and Don'ts

### Color

- **Do** use `--orange` for the single most important CTA per page (Browse, Open service, Visit website).
- **Do** use `--orange-soft` as the recommended badge background and as the row tint for featured cards.
- **Don't** use `--orange` on body text — it fails AA. Use `--ink` with an underline for inline links.
- **Don't** introduce additional accent hues (blue, green) outside the semantic `--success` / `--warn` tokens.

### Shape

- **Do** use `--radius-lg` (12px) on all primary cards.
- **Do** use `--radius-pill` on every button and badge.
- **Don't** mix sharp corners (0px) and rounded inside the same card.
- **Don't** use `--radius-xl` (16px) outside the homepage hero card — it creates visual hierarchy noise elsewhere.

### Elevation

- **Do** lift on hover: `translate-y: -1px` + elevation 2 shadow + `--rule-strong` border.
- **Don't** stack shadows beyond level 3 on persistent surfaces — only popovers and dialogs may go to level 4.
- **Don't** use shadow as the primary card boundary on `--cream`. The 1px `--rule` border does the work; shadow is hover affordance only.

### Interaction

- **Do** show a visible focus ring (`--orange` 2px outline + 2px offset) on every focusable.
- **Don't** remove `:focus-visible` styles to "clean up" the design — keyboard users will be invisible.

### Layout

- **Do** vary section rhythm: hero asymmetric, top picks asymmetric, stacks zig-zag, categories editorial index. No four-of-the-same grids.
- **Do** use the editorial index pattern (rules + monospace count) for the category list. PH uses a similar pattern for collection indexes.
- **Don't** stack four `sm:grid-cols-2 lg:grid-cols-3` sections in a row — that's the most generic AI layout pattern.

### Typography

- **Do** use Geist Mono + tabular-nums for every number that appears in a list (counts, tiers, dates).
- **Do** use Inter for everything else — display, body, UI.
- **Don't** introduce a third font. The previous editorial redesign added Instrument Serif; PH uses one humanist sans system-wide.
- **Don't** use ALL CAPS body text. Caps tracking is reserved for meta labels (`TODAY · MAY 10`) at `text-xs` only.

### Motion

- **Do** keep transitions ≤ 200ms. PH feels snappy because nothing waits.
- **Don't** animate scale on cards beyond `0.99–1.01` range — anything more reads as "JavaScript widget" not "polished site".

### Components

- **Do** keep the recommended badge as a single visual signal (orange chevron + "Top pick" label). No five-dot rating system on top.
- **Do** use the `verifiedAt` date as the trust signal in chrome (header/footer/cards). It's the catalog's differentiator.
- **Don't** use emoji as an icon. The previous design used `⭐` — replace with an inline SVG chevron consistent with PH's upvote glyph.

---

## Light-mode only

This is a static directory site. Dark mode is **explicitly out of scope** for v1 — every PH-faithful interaction depends on the cream-on-white split, and a dark theme would require its own token rebake (which the design system can support later via a `[data-theme="dark"]` selector but currently does not).
