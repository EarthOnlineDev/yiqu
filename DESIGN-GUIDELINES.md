# YIQU - Design Guidelines

> 越简单的东西越不好做。— 一曲

## Design Philosophy

**日式極簡 (Japanese Minimalism)**

This website is a quiet space. Every pixel exists for a reason. The design serves the photographs — it frames them, gives them room to breathe, and then steps back.

### Principles

1. **Restraint over decoration** — If in doubt, remove it
2. **Breathing room** — Generous whitespace is not empty space, it's composition
3. **Text and image never compete** — They coexist in separate, respected zones
4. **Warmth in minimalism** — Not cold or sterile; subtle warmth through tone and typography
5. **The photograph is the protagonist** — Everything else is supporting cast

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#F5F5F3` | Page background — warm off-white, not clinical |
| `--bg-secondary` | `#ECEAE6` | Subtle section differentiation, hover states |
| `--text-primary` | `#1A1A1A` | Body text, headings — softer than pure black |
| `--text-secondary` | `#6B6B6B` | Dates, captions, metadata |
| `--text-tertiary` | `#9A9A9A` | Subtle labels, copyright text |
| `--border` | `#E0DED9` | Dividers, subtle separations |
| `--accent` | `#1A1A1A` | Links on hover (same as text-primary, underline differentiates) |

### Extended Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-image` | `#E8E6E1` | Image placeholder / loading background |
| `--bg-overlay` | `rgba(26, 26, 26, 0.03)` | Very subtle overlay for depth |
| `--white` | `#FFFFFF` | Used sparingly — photo backgrounds, modal overlays |

### Color Rules

- **NO bright colors.** No blues, reds, greens, purples. Ever.
- **NO gradients.** Flat, solid colors only.
- Background is warm (yellowish undertone), not cool (bluish).
- Text transitions: `--text-primary` → `--text-secondary` via opacity, not color change.
- Links differentiated by underline or opacity, never by color.

---

## Typography

### Font Stack

#### English — Cormorant Garamond (Google Fonts)

A refined, high-contrast serif with old-style elegance. Inspired by Adobe Garamond used on rinkokawauchi.com, but freely available.

```
font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
```

- Used for: Navigation, headings, English labels, photographer name
- Weight: 400 (Regular), 500 (Medium) for name only
- Style: Elegant, literary, unhurried

#### 繁體中文 — Noto Serif TC (Google Fonts)

The best freely available Traditional Chinese serif font. Pairs beautifully with Cormorant Garamond.

```
font-family: 'Noto Serif TC', '游明朝体', 'Yu Mincho', 'Hiragino Mincho Pro', 'Source Han Serif TC', serif;
```

- Used for: Article titles, journal text, captions, all Chinese content
- Weight: 400 (Regular), 500 (Medium) for titles
- Style: Classic, readable, dignified

#### Fallback Sans — For UI elements only (rare)

```
font-family: 'Inter', -apple-system, 'Helvetica Neue', sans-serif;
```

- Used for: Copyright line, tiny metadata only if needed
- Should almost never appear

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 11px / 0.6875rem | 1.5 | Copyright, fine print |
| `--text-sm` | 13px / 0.8125rem | 1.6 | Navigation links, metadata |
| `--text-base` | 15px / 0.9375rem | 1.8 | Body text (journal content) |
| `--text-lg` | 18px / 1.125rem | 1.7 | Section titles, series names |
| `--text-xl` | 22px / 1.375rem | 1.5 | Page titles |
| `--text-2xl` | 28px / 1.75rem | 1.3 | Journal entry titles |
| `--text-3xl` | 36px / 2.25rem | 1.2 | Homepage name (一曲) |
| `--text-4xl` | 48px / 3rem | 1.1 | Hero name display |

### Typography Rules

- **Font weight is always 400** (Regular). The only exception is the photographer's name which may use 500.
- **Letter spacing**: `0.02em` for English text, `0.05em` for navigation, `normal` for Chinese text.
- **Never use bold.** Emphasis through size difference or color weight, never font-weight.
- **Line height for Chinese text**: 1.8–2.0 (Chinese characters need more vertical breathing room).
- **Text alignment**: Left-aligned for body. Never centered for paragraphs. Name may be left or centered on homepage.
- **No text transforms**: No uppercase, no capitalize. Lowercase English is the norm (like the reference sites).
- **anti-aliased rendering**: Always use `-webkit-font-smoothing: antialiased`.

---

## Spacing System

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Minimum gap |
| `--space-2` | 8px | Tight gaps (between lines in a group) |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Default gap between related items |
| `--space-5` | 20px | |
| `--space-6` | 24px | Between nav items |
| `--space-8` | 32px | Section internal padding |
| `--space-10` | 40px | Between content blocks |
| `--space-12` | 48px | |
| `--space-16` | 64px | Major section separation |
| `--space-20` | 80px | Page top/bottom margins |
| `--space-24` | 96px | Hero section padding |
| `--space-32` | 128px | Between photos in a series |

### Spacing Philosophy

- **More space is always better than less.** When unsure, add more.
- Photos need at minimum `--space-32` (128px) between each other vertically.
- Text blocks need `--space-16` (64px) from adjacent photos.
- Page margins: minimum `--space-20` (80px) from viewport edges on desktop.
- Mobile margins: minimum `--space-8` (32px).

---

## Layout

### Grid System

Desktop (≥1024px):
```
| Left Column (280px fixed) | Gap (80px) | Right Column (flexible) |
```

- Left column: Navigation, metadata, series info
- Right column: Photos, main content
- This mirrors Rinko Kawauchi's layout and matches 一曲's stated preference

Tablet (768px–1023px):
```
| Left Column (200px) | Gap (40px) | Right Column (flexible) |
```

Mobile (<768px):
```
| Single Column (full width, 32px padding) |
```
- Left column content stacks above right column content
- Navigation becomes a minimal hamburger or top bar

### Page Margins

| Breakpoint | Side Margin |
|------------|-------------|
| Desktop (≥1280px) | 80px |
| Desktop (≥1024px) | 60px |
| Tablet (≥768px) | 40px |
| Mobile (<768px) | 24px |

### Content Width

- Maximum content width: **1200px** (centered)
- Journal reading width: **680px** (optimal for reading)
- Photo max width: **100% of right column** (never exceeds container)

---

## Photography Display

### Image Treatment

- **No borders, no shadows, no rounded corners** on photos
- Photos sit directly on the background — the warm off-white acts as a natural mat
- Aspect ratio always preserved — never crop or stretch
- Loading state: `--bg-image` (#E8E6E1) placeholder, same aspect ratio as final image

### Image Sizing

- Series detail page: Photos fill the right column width (approximately 800-900px on desktop)
- Homepage hero: Single photo, large but with breathing room (never edge-to-edge)
- Journal inline photos: Full-width within the 680px reading column
- Thumbnail/grid: Not used in MVP (photos are always shown at meaningful size)

### Image Quality

- Format: WebP with JPEG fallback
- Quality: 85% for display, original quality preserved in source
- Responsive: `srcset` with sizes for 640w, 960w, 1280w, 1920w
- Lazy loading: All images below the fold use `loading="lazy"`
- Blur placeholder: Low-quality blurred version during load (next/image blur)

---

## Navigation

### Desktop Navigation

Position: Left column, below photographer name, vertical list.

```
一曲 / YIQU          ← Name (--text-3xl, Cormorant Garamond, 500 weight)

Works                ← Nav link (--text-sm, Cormorant Garamond, 400)
Journal
About
Contact

                     ← Generous space before footer content
© 2024               ← Copyright (--text-xs, --text-tertiary)
```

### Mobile Navigation

- Minimal top bar with name on left
- Hamburger icon on right (simple line icon, not filled)
- Menu opens as full-screen overlay with centered navigation
- Background: `--bg-primary` with slight opacity
- Links: larger text (`--text-xl`) for touch targets

### Navigation Behavior

- Current page: text at `--text-primary` with subtle underline
- Other pages: text at `--text-secondary`
- Hover: transition to `--text-primary`, 300ms ease
- No icons in navigation — text only
- Navigation is fixed/sticky on desktop (left column stays in place while right column scrolls)

---

## Interactions & Animation

### Philosophy: Almost None

The reference sites use virtually zero animation. Movement should be so subtle that users barely notice it — they just feel the site is "smooth."

### Allowed Animations

| Effect | Duration | Easing | Usage |
|--------|----------|--------|-------|
| Fade in | 600ms | ease-out | Photos entering viewport |
| Opacity hover | 300ms | ease | Nav links, interactive elements |
| Page transition | 400ms | ease-in-out | Between pages (opacity crossfade) |

### Forbidden

- No slide-ins, no bounces, no parallax
- No image zoom on hover
- No loading spinners (use skeleton/placeholder)
- No scroll-triggered animations (besides fade-in for photos)
- No cursor effects, no particle effects, no anything "fancy"

### Scroll Behavior

- `scroll-behavior: smooth` for anchor links only
- Natural browser scroll otherwise — no hijacking
- No scroll snap (let the user scroll freely)

---

## Component Patterns

### Photo Card (Series Detail)

```
┌─────────────────────────────────────────┐
│                                         │
│              [Photograph]               │
│                                         │
├─────────────────────────────────────────┤
│                                         │  ← --space-4 gap
│  散步途中，遇見一棵開滿花的樹。          │  ← Caption (--text-sm, --text-secondary)
│                                         │
└─────────────────────────────────────────┘

         ↕ --space-32 (128px)

┌─────────────────────────────────────────┐
│              [Next Photo]               │
└─────────────────────────────────────────┘
```

### Journal Entry (List Item)

```
散步途中的光                                              2024.12.15
────────────────────────────────────────────────────────────────────
冬天的花                                                  2024.11.28
```

- Title: `--text-base`, `--text-primary`, Noto Serif TC
- Date: `--text-sm`, `--text-tertiary`, Cormorant Garamond
- Separator: 1px line in `--border` color, OR just generous spacing
- Hover: entire row text shifts to full `--text-primary` opacity

### Journal Entry (Detail)

```
                    散步途中的光                    ← Title (--text-2xl, Noto Serif TC)
                    2024.12.15                     ← Date (--text-sm, --text-tertiary)

                    ← --space-16 gap

                    今天下午三點，從古城南門出發...    ← Body (--text-base, 1.8 line-height)
                    沿著洱海邊走了很久。

                    ← --space-12 gap

                    [Photograph - full width]

                    ← --space-12 gap

                    路邊的野花開得正好，
                    陽光透過雲層灑在水面上...
```

---

## Responsive Behavior

### Desktop (≥1024px)
- Two-column layout (fixed left + flexible right)
- Left nav is sticky
- Photos at full right-column width

### Tablet (768px–1023px)
- Two-column with narrower left column
- Photos scale down proportionally

### Mobile (<768px)
- Single column, stacked layout
- Name + hamburger nav at top
- Photos full-width with side padding
- Journal entries stack naturally
- Touch targets minimum 44px

---

## Do's and Don'ts

### Do
- Use generous whitespace — the "empty" space IS the design
- Let photos be large — they are the content
- Keep text small and understated
- Use opacity transitions for hover states
- Maintain consistent left alignment
- Use serif fonts throughout — they convey the literary, contemplative mood

### Don't
- Don't put text on top of photos — EVER
- Don't use bold text — use size or color weight for hierarchy
- Don't use bright colors — everything is grayscale with warm undertones
- Don't add animations beyond subtle fades
- Don't use card shadows or borders — photos sit directly on the background
- Don't use uppercase text — keep everything lowercase or natural case
- Don't add decorative elements (icons, dividers, badges, tags)
- Don't make the site feel "techy" — it should feel like a printed book
