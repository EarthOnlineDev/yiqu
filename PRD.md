# YIQU - Product Requirements Document

> See `project.md` for the original product vision.

## Value Proposition

**We believe** independent photographers who want a personal online presence **will** feel empowered to express their artistic identity **through** a beautifully minimal personal website that showcases their work without platform constraints.

---

## MVP Scope

### What MVP Must Deliver

A fully designed, deployed static website that:
1. Conveys YIQU's photographic identity and aesthetic
2. Showcases photography works organized by series
3. Provides a journal/blog space for walking diaries
4. Looks and feels on par with the Japanese photographer reference sites
5. Is responsive (desktop + mobile)

### What MVP Does NOT Include

- CMS / content management (飞书表格 integration = V2)
- Search functionality
- Multi-language switching UI
- Comments / interaction
- Analytics dashboard (basic Vercel Analytics only)
- Image upload workflow

---

## Information Architecture

```
HOME (/)
├── Works (/works)
│   ├── 散步日記 Walking Diary (/works/walking-diary)
│   │   └── [Individual photo/essay] (/works/walking-diary/[slug])
│   ├── 女性人像 Female Portraits (/works/female-portraits)
│   │   └── [Individual photo/essay] (/works/female-portraits/[slug])
│   └── 她與山 She and the Mountain (/works/she-and-the-mountain)
│       └── [Individual photo/essay] (/works/she-and-the-mountain/[slug])
├── Journal (/journal)
│   └── [Individual post] (/journal/[slug])
├── About (/about)
└── Contact (/contact)
```

---

## Pages & Features

### P1: Homepage

**Layout**: Full-viewport hero with a single photograph. Photographer name (一曲 / YIQU) positioned in the upper-left area. Minimal navigation links listed vertically below the name.

**Elements**:
- Photographer name: 一曲 / YIQU (serif, elegant)
- Navigation: Works / Journal / About / Contact (small, understated)
- Hero image: Single photo, large, with generous margins
- No text overlay on the photo
- Footer: copyright line only

**Interaction**:
- Navigation links show subtle hover state (opacity change, not color change)
- Hero photo may have a gentle fade-in on load
- Clicking hero photo or "Works" navigates to Works page

### P2: Works Index (/works)

**Layout**: Left sidebar with series list, main area shows the currently selected series preview.

**Elements**:
- Left column (~25% width): Series titles listed vertically with year
  - 散步日記 Walking Diary · 2024—
  - 女性人像 Female Portraits · 2023—
  - 她與山 She and the Mountain · 2024
- Right area (~75% width): Featured photo from the hovered/selected series
- Clean transition between series on hover/click

**Interaction**:
- Hover on series title → right area shows that series' cover photo
- Click on series title → navigate to series detail page

### P3: Series Detail (/works/[series])

**Layout**: Kawauchi-style — left column with text metadata, right area with photos.

**Elements**:
- Left column: Series title (EN + 繁中), year, description text, photo count
- Right area: Photos displayed vertically, one per viewport, generous spacing between
- Each photo: full-width within the right column, aspect ratio preserved
- Optional caption below each photo (繁體中文), separated from the image

**Interaction**:
- Scroll to navigate between photos (smooth)
- Photos lazy-load as user scrolls down
- Subtle fade-in animation for each photo entering viewport

### P4: Journal (/journal)

**Layout**: Hamada Text-style — clean list of journal entries.

**Elements**:
- Title of each entry (繁體中文) on the left
- Date on the right (formatted: 2024.12.15)
- Generous vertical spacing between entries
- No thumbnails on the list page — text only

**Interaction**:
- Hover on entry → subtle highlight
- Click → navigate to journal detail

### P5: Journal Detail (/journal/[slug])

**Layout**: Single-column reading layout, centered.

**Elements**:
- Title (繁體中文, serif, larger)
- Date below title
- Body text: 繁體中文, comfortable reading width (~680px max)
- Photos interspersed in the text, but each in its own block (not floating)
- Photos and text have clear spacing between them — never touching
- No sidebar, no distractions

**Interaction**:
- Back link to Journal list
- Smooth scroll

### P6: About (/about)

**Layout**: Two-column — photo on one side, text on the other.

**Elements**:
- Portrait photo (or environmental portrait)
- Bio text (繁體中文)
- Brief English bio below
- Social media links (mock)

### P7: Contact (/contact)

**Layout**: Centered, minimal.

**Elements**:
- Email address (mock: hello@yiqu.photo)
- Social media links with icons or text (Xiaohongshu, Instagram — mock)
- Optional: simple contact form (V2)
- "For bookings and collaborations" type text

---

## User Stories

### US-1: First-time Visitor
> As a first-time visitor, I want to immediately feel the photographer's aesthetic when I land on the homepage, so I can decide if I want to explore further.
- **AC**: Homepage loads in <2s, displays a single beautiful photo with the photographer's name, and the navigation is visible but unobtrusive.

### US-2: Photography Enthusiast
> As someone interested in photography, I want to browse works organized by series, so I can explore different aspects of YIQU's work.
- **AC**: Works page shows all series with previews. Each series page displays photos with metadata. Photos are high quality with proper loading states.

### US-3: Walking Diary Reader
> As a reader interested in YIQU's walking diaries, I want to read her journal entries with photos, so I can experience her perspective on daily walks in Dali.
- **AC**: Journal lists entries chronologically. Each entry renders text and photos in a clean, readable layout. Text and photos never overlap.

### US-4: Potential Client
> As a potential photography client, I want to find YIQU's contact information and see her portrait work, so I can reach out for a booking.
- **AC**: Contact page is accessible from any page. About page shows her professional info. Portrait series showcases her best work.

### US-5: Mobile Viewer
> As someone browsing on my phone, I want the site to be beautiful and functional on mobile, so I can share it in WeChat.
- **AC**: All pages responsive. Photos scale properly. Navigation works on mobile (hamburger or minimal). Text is readable without zooming.

---

## Technical Requirements

### Performance
- Lighthouse Performance score > 90
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Images: WebP/AVIF with proper srcset for responsive sizes
- Static Site Generation (SSG) for all pages

### SEO
- Proper meta tags on all pages
- Open Graph tags for social sharing (WeChat, Xiaohongshu)
- Structured data for photographer portfolio
- Sitemap.xml

### Accessibility
- All images have alt text
- Keyboard navigation works
- Color contrast meets WCAG AA
- Focus states visible

### Browser Support
- Chrome, Safari, Firefox (latest 2 versions)
- iOS Safari, Chrome Mobile
- WeChat built-in browser (critical for Chinese users)

---

## Growth & Operations

### MVP Launch
- Deploy to Vercel on aiself.site
- Basic Vercel Analytics for traffic tracking
- Open Graph meta for social sharing (critical for Xiaohongshu / WeChat)

### Analytics & Tracking
- **North Star Metric**: Monthly unique visitors
- **Key Events**:
  1. Page views (per page, per series)
  2. Series click-through (which series gets most interest)
  3. Journal entry read (scroll depth)
  4. Contact page visits
  5. External link clicks (social media)
- **Tool**: Vercel Analytics + Speed Insights (baseline)

---

## V2 Roadmap (Future, NOT MVP)

- [ ] 飞书表格 CMS integration for content updates
- [ ] Image optimization pipeline (auto-resize, watermark)
- [ ] Contact form with email notification
- [ ] Dark mode toggle
- [ ] Bilingual content (full EN translation)
- [ ] Photo lightbox / gallery zoom
- [ ] RSS feed for Journal
- [ ] Custom domain
- [ ] Print shop / portfolio PDF export
