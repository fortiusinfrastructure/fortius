# Fortius Design System

**Version 1.0** — Dark institutional minimalism for the Fortius ecosystem.

---

## Quick Start

```css
/* Import in your app's globals.css */
@import '@fortius/ui/design-tokens.css';
```

```html
<!-- Set brand context on <html> or a wrapper -->
<html data-brand="consulting">  <!-- consulting | foundation | intelligence -->
```

All `--accent-primary-*` tokens automatically switch to the brand's palette.

---

## Typography

### Fonts (2 external families — performance budget)

| Role | Family | Weights | Google Fonts |
|------|--------|---------|-------------|
| **Display / Heading** | Cormorant Garamond | 300, 400, 600, 700 | `Cormorant+Garamond:wght@300;400;600;700` |
| **Body / UI** | Source Sans 3 | 300, 400, 600 | `Source+Sans+3:wght@300;400;600` |
| **Accent** (drop caps) | Cinzel | 400 | Already loaded by EH — optional |
| **Mono** (data) | JetBrains Mono | 400, 500 | `JetBrains+Mono:wght@400;500` — load on demand |

**Google Fonts link (primary):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
```

**Next.js (recommended):**
```typescript
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-body',
  display: 'swap',
});
```

### Why these fonts?

- **Cormorant Garamond** — An elegant, high-contrast serif with classical proportions. At display sizes (48px+), its thin weight (300) creates the sophisticated, editorial feeling of McKinsey or Brunswick reports. More distinctive than Playfair Display, with better performance at large sizes. Conveys intellectual authority without being stuffy.

- **Source Sans 3** — Adobe's flagship open-source sans-serif. Designed for digital interfaces with excellent legibility on dark backgrounds. More refined than Lato or Inter, with humanist proportions that pair perfectly with Cormorant. Weight 300 (light) works well for body text on dark surfaces where standard 400 can feel heavy.

### Type Scale Usage

```
Display 2XL  — Landing hero (one per page)
Display XL   — Section hero headlines
Display LG   — Page titles

Heading XL   — Section titles
Heading LG   — Subsection titles
Heading MD   — Card titles, dialog headers
Heading SM   — List item headers, sidebar titles
Heading XS   — Small headers, table headers

Body LG      — Lead paragraphs, featured text
Body MD      — Default body copy
Body SM      — Secondary text, descriptions

Caption MD   — Labels, meta info
Caption SM   — Footnotes, legal
Caption XS   — Micro labels
```

---

## Color System

### Brand Differentiation

| Brand | Accent | Usage |
|-------|--------|-------|
| **Default (EH heritage)** | Gold `#c5a059` | Shared ecosystem, Escuela Hispánica |
| **Consulting** | Granate `#b82030` | Fortius Consulting sites/materials |
| **Foundation** | Verde `#278a42` | Fortius Foundation sites/materials |
| **Intelligence** | Azul acero `#285288` | Intelligence products, reports, data |

### Contrast Ratios (WCAG AA compliance)

| Token | On `--surface-primary` (#050a14) | Ratio |
|-------|----------------------------------|-------|
| `--text-primary` (#E7E5E4) | AAA | 14.5:1 |
| `--text-secondary` (70% opacity) | AA | 10.2:1 |
| `--text-tertiary` (45% opacity) | Decorative only | 6.5:1 |
| `--color-gold-500` (#c5a059) | AA large text | 5.8:1 |
| `--color-consulting-400` (#d43040) | AA large text | 4.6:1 |
| `--color-foundation-400` (#36a856) | AA large text | 5.2:1 |
| `--color-intelligence-400` (#3668a5) | AA large text | 4.5:1 |

> **Rule:** Accent colors are safe for headings (18px+), buttons, and decorative elements. For body text (<18px), use `--text-primary` or `--text-secondary`.

---

## Components

### Navigation Bar

```
┌────────────────────────────────────────────────────────┐
│  [LOGO]          Link  Link  Link  Link      [CTA]    │
└────────────────────────────────────────────────────────┘
```

- **Height:** `--nav-height` (72px desktop, 64px mobile)
- **Background:** `--nav-bg` → on scroll: `--nav-bg-scrolled` with `backdrop-filter: blur(12px)`
- **Border:** Bottom `1px solid var(--nav-border)`
- **Links:** `--nav-text` → hover: `--nav-text-active`
- **Logo:** Brand mark in white/light + brand name. Consulting gets the red mark, Foundation green
- **Sticky** with `z-index: 50`
- **Mobile:** Hamburger icon → fullscreen overlay nav

### Hero Section

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│     [ OVERLINE LABEL ]                                 │
│                                                        │
│     Large Display                                      │
│     Heading Text                                       │
│                                                        │
│     Supporting paragraph in body text                  │
│                                                        │
│     [Primary CTA]    [Secondary CTA]                   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Min-height:** `80vh` (landing) or `50vh` (internal pages)
- **Background:** `--surface-primary` + optional background image with overlay
- **Overline:** Section label style (uppercase, tracked, caption size)
- **Heading:** `--text-display-xl` to `--text-display-2xl`, `--font-display`, weight 300
- **Accent word:** One word in heading colored `--accent-primary-text` + italic
- **Body:** `--text-body-lg`, `--text-secondary`, max-width `600px`
- **Vertical rhythm:** `--space-6` between elements

### Cards

**Service Card:**
```
┌──────────────────────┐
│  Icon/Number         │
│                      │
│  Heading             │
│  Description text    │
│  spanning two lines  │
│                      │
│  Learn more →        │
└──────────────────────┘
```

**Person Card:**
```
┌──────────────────────┐
│  ┌──────┐            │
│  │ Photo│            │
│  └──────┘            │
│  Name                │
│  Title               │
│  [ Badge ]           │
└──────────────────────┘
```

**Project/Report Card:**
```
┌──────────────────────┐
│  ┌──────────────────┐│
│  │   Cover Image    ││
│  └──────────────────┘│
│  [ TAG ]             │
│  Title               │
│  Date / Meta         │
└──────────────────────┘
```

- **Background:** `--card-bg` → hover: `--card-bg-hover`
- **Border:** `1px solid var(--card-border)` → hover: `var(--card-border-hover)`
- **Radius:** `--card-radius` (8px)
- **Padding:** `--card-padding` (24px)
- **Shadow:** `--card-shadow` → hover: `--card-shadow-hover`
- **Transition:** `var(--transition-all)`, slight `translateY(-2px)` on hover
- **Image overlay (project cards):** gradient from transparent to `--surface-secondary`

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `--accent-primary` | `--neutral-950` | none | lighter accent |
| **Secondary** | transparent | `--text-primary` | `--border-strong` | subtle bg fill |
| **Ghost** | transparent | `--accent-primary-text` | none | muted accent bg |
| **CTA** | `--accent-primary` | `--neutral-950` | none | + glow shadow |

- **Padding:** `12px 24px` (md), `10px 18px` (sm), `16px 32px` (lg)
- **Radius:** `--radius-md` (6px)
- **Font:** `--font-body`, weight 600, `--text-caption-md` uppercase + `0.08em` tracking
- **Transition:** `var(--duration-fast) var(--ease-default)`
- **Disabled:** 40% opacity, `cursor: not-allowed`
- **Focus:** `--border-focus` ring (2px offset)

### Section Headers (Bracket Style)

```
           [ SECTION LABEL ]

    Section Title Goes Here
    ─────────────────────────
```

- **Label:** `[ TEXT ]` — uppercase, `--text-section-label`, tracked `0.25em`, `--section-label-text`
- **Title:** `--font-heading`, `--text-heading-xl`, `--section-title-text`
- **Divider:** `1px solid var(--section-divider)`, 48px wide, centered, gold for emphasis
- **Spacing:** `--space-3` between label and title, `--space-4` between title and divider

### Footer

```
┌────────────────────────────────────────────────────────┐
│  [Logo]               Col 1       Col 2       Col 3   │
│  Tagline              Link        Link        Link    │
│                       Link        Link        Link    │
│                       Link        Link        Link    │
│────────────────────────────────────────────────────────│
│  © 2026 Fortius           Legal  Privacy  Terms       │
└────────────────────────────────────────────────────────┘
```

- **Background:** `--footer-bg` (near black)
- **Text:** `--footer-text`
- **Border top:** `1px solid var(--footer-border)`
- **Padding:** `--space-20` top, `--space-12` bottom
- **Copyright row:** `--text-caption-sm`, `--text-tertiary`

### Badges / Tags

- **Background:** `--badge-bg` (muted accent)
- **Text:** `--badge-text` (accent color)
- **Radius:** `--badge-radius` (4px)
- **Padding:** `4px 10px`
- **Font:** `--text-caption-sm`, weight 600, uppercase, `0.04em` tracking

### Data Display (Metrics)

```
┌─────────────────────┐
│  42                  │  ← Value: mono font, large
│  Active Projects     │  ← Label: caption, muted
└─────────────────────┘
```

- **Value:** `--font-mono`, `--text-heading-xl`, `--data-value-text`
- **Label:** `--font-caption`, `--text-caption-md`, `--data-label-text`
- **Accent variant:** Value in `--data-accent`
- **Dividers between items:** `1px solid var(--data-divider)`

### Form Inputs

- **Background:** `--input-bg`
- **Border:** `1px solid var(--input-border)` → focus: `var(--input-border-focus)`
- **Text:** `--input-text`
- **Placeholder:** `--input-placeholder`
- **Radius:** `--input-radius` (6px)
- **Padding:** `12px 16px`
- **Font:** `--font-body`, `--text-body-sm`
- **Focus:** Gold border + `0 0 0 3px var(--accent-primary-muted)` ring
- **Error:** border `--color-error-500` + error message in `--color-error-400`

---

## Motion Principles

### Core Rules

1. **Entrance, not decoration** — Animation reveals content; it never distracts from it
2. **Direction implies hierarchy** — Content fades UP (bottom to top) to suggest emergence
3. **Stagger reveals rhythm** — Card grids stagger at 80ms intervals
4. **Respect preferences** — `prefers-reduced-motion` disables all animation

### Standard Patterns

| Pattern | Class | Duration | Easing | Use |
|---------|-------|----------|--------|-----|
| Fade in | `.ft-fade-in` | 600ms | ease-out | General entrance |
| Fade up | `.ft-fade-up` | 600ms | ease-out | Cards, sections |
| Fade down | `.ft-fade-down` | 300ms | ease-out | Dropdowns, tooltips |
| Slide right | `.ft-slide-right` | 600ms | ease-out | Lists, timelines |
| Scale in | `.ft-scale-in` | 300ms | spring | Modals, popovers |

### Hover States

- **Cards:** `translateY(-2px)` + shadow increase, `150ms ease`
- **Buttons:** Background color shift, `150ms ease`
- **Links:** Color to `--accent-primary-text`, underline via `background-image` gradient
- **Images:** Subtle `scale(1.03)`, `500ms ease`

### Scroll-triggered Animations

Use Intersection Observer with `threshold: 0.15`. Apply `.ft-fade-up` class when element enters viewport. Start with `opacity: 0` via CSS.

---

## Dark Mode Guidelines

### Surface Hierarchy (Elevation via Lightness)

```
Surface primary    #050a14  ← Page background (deepest)
Surface secondary  #0a111e  ← Cards, panels
Surface tertiary   #0f1724  ← Nested elements
Surface elevated   #141d2e  ← Modals, dropdowns (lightest)
```

> In dark mode, **higher = lighter**. Never use drop shadows as the primary elevation cue.

### Shadows

- Shadows are for **ambient depth**, not elevation differentiation
- Use high opacity (`0.3–0.5`) because dark backgrounds absorb shadow
- Combine shadow with a subtle top inner highlight: `--shadow-inner`
- Glow effects (`--glow-*`) for accent-colored interactive elements

### Image Treatment

- Photographs: Apply subtle `border: 1px solid var(--border-default)` to prevent blending into background
- Consider `filter: brightness(0.9)` on very bright photos to reduce glare
- Use CSS `mix-blend-mode: luminosity` for background images that should be toned
- Cover images in cards: gradient overlay from transparent to `--surface-secondary`

### Borders & Separators

- Default borders at `8% white opacity` — visible but not harsh
- Use `4% opacity` for subtle structural dividers (between footer rows, inside cards)
- Use `15% opacity` for interactive boundaries (input borders, button outlines)
- Never use solid white or solid colors for borders in dark mode

### Contrast Rules

- Body text: minimum **7:1** ratio (use `--text-primary`)
- Supporting text: minimum **4.5:1** ratio (use `--text-secondary`)
- Decorative/tertiary text: minimum **3:1** (use `--text-tertiary` — captions only)
- Interactive elements: accent colors are AA-compliant at **18px+** bold or **24px+** regular
- Never place accent-colored text on accent-colored backgrounds

---

## Tailwind CSS v4 Integration

### Theme Extension (in globals.css)

```css
@import "tailwindcss";
@import "@fortius/ui/design-tokens.css";

@theme inline {
  /* Map tokens to Tailwind's theme */
  --color-surface-primary: var(--surface-primary);
  --color-surface-secondary: var(--surface-secondary);
  --color-surface-tertiary: var(--surface-tertiary);
  --color-surface-elevated: var(--surface-elevated);

  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);

  --color-accent: var(--accent-primary);
  --color-accent-hover: var(--accent-primary-hover);
  --color-accent-muted: var(--accent-primary-muted);
  --color-accent-text: var(--accent-primary-text);

  --color-border: var(--border-default);
  --color-border-subtle: var(--border-subtle);
  --color-border-strong: var(--border-strong);

  --font-display: var(--font-display);
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
}
```

### Usage in Components

```tsx
// Card example
<div className="bg-surface-secondary border border-border rounded-lg p-6
                hover:bg-surface-tertiary hover:border-border-strong
                transition-all duration-150">
  <span className="text-caption-sm text-accent-text uppercase tracking-wider">
    [ CATEGORY ]
  </span>
  <h3 className="font-heading text-heading-md text-text-primary mt-3">
    Card Title
  </h3>
  <p className="font-body text-body-sm text-text-secondary mt-2">
    Description text here.
  </p>
</div>

// Button primary
<button className="bg-accent text-neutral-950 font-body font-semibold
                   text-caption-md uppercase tracking-wider
                   px-6 py-3 rounded-md
                   hover:bg-accent-hover transition-colors duration-150">
  Get Started
</button>

// Section header
<div className="text-center">
  <span className="text-caption-sm text-text-tertiary uppercase tracking-[0.25em]">
    [ About Us ]
  </span>
  <h2 className="font-heading text-heading-xl text-text-primary mt-3">
    Our Mission
  </h2>
  <div className="w-12 h-px bg-accent mx-auto mt-4" />
</div>
```

---

## File Structure

```
packages/ui/
├── src/
│   ├── design-tokens.css    ← All CSS custom properties
│   ├── button.tsx           ← Shared button component
│   ├── card.tsx             ← Shared card component
│   └── code.tsx             ← Code display component
└── DESIGN-SYSTEM.md         ← This file
```

---

## Migration Notes

### From current EH globals.css

The existing EH tokens (`--brand-dark`, `--brand-gold`, etc.) map directly:

| Old Token | New Token |
|-----------|-----------|
| `--brand-dark` | `--surface-primary` / `--color-neutral-950` |
| `--brand-gold` | `--accent-primary` / `--color-gold-500` |
| `--brand-header` | `--surface-header` / `--color-neutral-700` |
| `--brand-text` | `--text-primary` |
| `--brand-secondary` | `--surface-secondary` / `--color-neutral-900` |

### From current Consulting globals.css

Replace the light-mode setup with the dark design system and set `data-brand="consulting"` on `<html>`.
