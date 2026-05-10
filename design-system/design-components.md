# Free Tier Showcase Components

> Full specifications for all 14 components. Grouped by workflow.
> For tokens see [design.md](design.md). For rules & accessibility see [design-guidelines.md](design-guidelines.md).

---

## Actions

### Button — Filled (Primary)

PH-orange filled pill. One per page. Sentence case label, optional trailing arrow glyph.

| Property | Value |
|---|---|
| Background | `--orange` |
| Hover | `--orange-deep` |
| Color | `--on-orange` |
| Padding | `0.625rem 1.25rem` (10px / 20px) |
| Radius | `--radius-pill` |
| Font | Inter 500, 0.875rem |
| Target | 44×44 min |
| Motion | `translate-y: -1px` on hover, 200ms ease |

**Do:** Use sentence case ("Browse 74 services"), keep ≤ 4 words.
**Don't:** End with punctuation; use ALL CAPS; pair two filled buttons side-by-side.

---

### Button — Ghost (Secondary)

Text-only with underline-on-hover. Used as the demoted CTA next to the primary.

| Property | Value |
|---|---|
| Color | `--ink-2` |
| Hover | underline + `color: --ink` |
| Padding | `0.5rem 0` |
| Font | Inter 400, 0.875rem |

---

### Link — Inline

Underline-on-rest, color-on-hover. Use for any link inside body prose.

| Property | Value |
|---|---|
| Color | `--ink` |
| Decoration | `underline 1px`, offset 4px, color `color-mix(in oklab, var(--ink) 25%, transparent)` |
| Hover | decoration color → `--ink` |

---

## Input

### Category Pill — Filter

Horizontal scrolling rail under sticky header. Active pill is `--ink` filled; inactive is bordered ghost.

| Property | Value |
|---|---|
| Active bg | `--ink` |
| Active color | `--cream` |
| Inactive border | `1px solid --rule` |
| Inactive color | `--ink-3` |
| Padding | `0.4rem 0.875rem` (6.5px / 14px) |
| Radius | `--radius-pill` |
| Font | Inter 500, 0.8125rem |
| Hover (inactive) | border `--rule-strong`, color `--ink` |

ARIA: `role="tablist"` on container, `role="tab"` + `aria-selected` per item.

---

## Navigation

### Header — Sticky Top Bar

Cream-on-white sticky strip with backdrop blur. Logo left, primary nav center, GitHub link right.

| Property | Value |
|---|---|
| Height | 64px |
| Bg | `color-mix(in oklab, var(--cream) 80%, transparent)` |
| Backdrop | `blur(12px)` (when supported) |
| Border-b | `1px solid --rule` |
| Logo font | Inter 700, 1rem, tracking -0.01em |
| Nav font | Inter 500, 0.875rem |
| Active indicator | 1px line under label, `--ink` |
| GitHub button | bordered pill, GitHub mark + "Source" label, hides on mobile |

The PH-faithful detail: subtle backdrop blur + a 1px hairline border, NEVER a drop-shadow on the header.

---

### Footer — 3-Column

Cream surface, 3-column grid (brand · browse · verified). Verified column carries the date stamp — the catalog's most concrete trust signal.

---

## Containment

### Service Card — Default

White surface on cream background. Logo block + name + tagline + tier line + categories. Recommended state has an orange-soft top tint and an upvote-style "Top pick" badge.

| Property | Value |
|---|---|
| Surface | `--surface` |
| Border | `1px solid --rule` |
| Radius | `--radius-lg` |
| Padding | `1.25rem` (20px) |
| Hover | translate-y: -1px, border `--rule-strong`, shadow level 2 |
| Logo block | 48×48, `--surface-2` bg, monogram of name initials, `--radius-md` |
| Name | Inter 600, 1rem |
| Tagline | Inter 400, 0.875rem, color `--ink-2`, line-clamp 2 |
| Tier line | Geist Mono 500, 0.8125rem, color `--ink`, top-border separator |
| Categories | inline category-pill style at 0.6875rem |
| Recommended badge | `--orange-soft` bg, `--orange-ink` text, chevron-up glyph + "Top pick" |

ARIA: whole card is one `<a>` with `aria-label="{name} — {tagline}"`.

---

### Service Card — Featured

Larger variant for hero slot. Same structure with display name and longer tagline. Optional `--orange-soft` row tint to signal "Today's leader".

| Differs | Value |
|---|---|
| Padding | `1.75rem` (28px) at md+ |
| Name | Inter 700, 1.5rem |
| Tagline | 1rem, line-clamp 3 |
| Logo | 64×64 |
| Background | `linear-gradient(180deg, --orange-soft 0%, --surface 60%)` (when recommended) |

---

### Stack Card

Two-tone card: name + tagline + cost badge + service-name pills. Service-name pills resolve `slug → service.name` so a stack reads like a sentence ("Vercel · Cloudflare Pages · Supabase"), not slugs.

| Property | Value |
|---|---|
| Surface | `--surface` |
| Border | `1px solid --rule` |
| Radius | `--radius-lg` |
| Padding | `1.5rem` |
| Index number | Geist Mono 500, 0.6875rem, `--ink-3` |
| Name | Inter 700, 1.25rem |
| Cost badge | bordered pill, `0.6875rem` mono, right-aligned |
| Service pills | `--surface-2` bg, 0.75rem |

---

### Recommended Badge

The single trust signal that replaces the previous `⭐` emoji and the 5-dot "generosity rating".

| Property | Value |
|---|---|
| Bg | `--orange-soft` |
| Color | `--orange-ink` |
| Padding | `0.125rem 0.5rem` |
| Radius | `--radius-pill` |
| Glyph | Inline SVG chevron-up (PH upvote shape), 10×10 |
| Label | Inter 500 0.6875rem, "Top pick" |

---

## Data Display

### Eyebrow Strip — "TODAY · MAY 10"

PH-style eyebrow that opens every section and the homepage. Caps mono with a hairline rule between the index and the label.

| Property | Value |
|---|---|
| Font | Geist Mono 500, 0.6875rem |
| Tracking | 0.18em |
| Color | `--ink-3` |
| Layout | `index → 1px×8 rule → label`, gap 12px |
| Index color | `--ink` (slightly stronger) |

---

### Metric Block — DL Counters

Used in the homepage hero column and on /about. Renders count + label.

| Property | Value |
|---|---|
| Number | Inter 700, 2.25rem, leading-1, tabular-nums |
| Label | Geist Mono 500, 0.6875rem, caps, tracking 0.18em, color `--ink-3` |
| Layout | `<dt>` above `<dd>`, 8px gap |

---

### Tier Line

The free-tier number per service. Always Geist Mono with tabular-nums so quotas align across cards.

| Property | Value |
|---|---|
| Font | Geist Mono 500, 0.8125rem |
| Color | `--ink` |
| Treatment | top border `--rule`, padding-top 12px |

---

### Editorial Category Index

The rules-and-counts pattern that replaces a category card grid on the homepage.

| Property | Value |
|---|---|
| Row | `border-b: 1px solid --rule`, padding 20px / 0 |
| Label | Inter 600, 1.5rem |
| Description | Inter 400, 0.875rem, `--ink-3`, hidden < md |
| Count | Geist Mono 500, 0.75rem, `--ink-3`, right-aligned, two digits zero-padded |
| Hover | label color → `--orange-deep`, border-b → `--ink` |

---

## Feedback

### Empty State

Used when the filter narrows to zero services.

| Property | Value |
|---|---|
| Border | `1px dashed --rule-strong` |
| Radius | `--radius-lg` |
| Padding | 40px |
| Headline | Inter 600, 1.5rem, `--ink-2` |
| Body | Inter 400, 0.875rem, `--ink-3` |

---

### Skeleton (Filter loading)

Used inside `<Suspense>` while the URL `?category=` resolves.

| Property | Value |
|---|---|
| Bg | `--surface-2` |
| Radius | `--radius-lg` |
| Animation | `pulse` (Tailwind default), 2s infinite |

---

## Component count

14 components covering Actions (3), Input (1), Navigation (2), Containment (4), Data Display (4), Feedback (2). All implemented in `components/` or co-located with their page in `app/`.
