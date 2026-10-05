# CLAUDE.md - Portfolio Total Redesign (Parallax Edition)

This file is the single source of truth for redesigning the portfolio of **Bagus Hidayat** (https://www.bagus-hidayat.my.id). Read it fully before touching any code. Follow it exactly. When a rule here conflicts with a default habit, this file wins.

---

## 1. Mission

Rebuild the entire visual layer of the portfolio into a cinematic, scroll-driven parallax experience that feels like a premium award-level studio site, not a template.

- The result must look **exceptional on first glance**. Generic, flat, "AI-looking" output is a failure.
- Content, routes, SEO, and data stay. The look, motion, layout, and interaction are rebuilt from scratch.
- Performance and accessibility are non-negotiable. A beautiful site that janks or ignores reduced-motion is a failure.

### Success criteria

1. A visitor scrolling the home page experiences layered depth, narrative pacing, and smooth motion at 60fps on a mid-range laptop.
2. Lighthouse (production build): Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO = 100 on desktop; Performance >= 80 on mobile.

3. Zero layout shift from animations (CLS < 0.05).
4. Fully usable with keyboard only, with screen readers, and with `prefers-reduced-motion: reduce`.
5. Works from 360px to 2560px wide.

---

## 2. Project Facts

| Item | Value |
| :--- | :--- |
| Owner | Bagus Hidayat, Full Stack Web Developer / Software Engineer |
| Location | Malang, Indonesia |
| Employer | PT Universal Big Data (full-time) |
| Education | Universitas Negeri Malang (S.Pd, Informatics Engineering Education) |
| Focus | Full-stack, Data Engineering, Machine Learning, industrial mentoring |
| Package manager | **pnpm** (never npm or yarn) |
| Framework | Next.js 16 (App Router), React 19.2, TypeScript 5 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`) |
| Motion | `framer-motion` ^12 (already installed) |
| UI primitives | Radix UI, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `sonner`, `next-themes` |
| Data source | `src/data/static-db.ts` (profile, about, projects, experience, education, tech stack) |
| Dev server | `pnpm dev` (already running, do not start another) |

### Existing structure (keep the routes)

```
src/app/(website)/page.tsx                 Home
src/app/(website)/about/page.tsx           About
src/app/(website)/projects/page.tsx        Projects index
src/app/(website)/projects/[slug]/page.tsx Project detail
src/app/layout.tsx                         Root layout, fonts, metadata
src/app/globals.css                        Design tokens
src/components/sections/*                  Page sections (server wrapper + *Client)
src/components/layout/*                    Navbar, Footer, SplashScreen, BackToTop
src/components/ui/*                        Primitives
src/components/chat/*                      Chatbot
src/lib/animations.ts                      Shared motion variants
src/data/static-db.ts                      All content
```

---

## 3. Hard Rules (Do Not Break)

1. **Do not change content truth.** Names, job titles, dates, project descriptions, links, and metrics come from `static-db.ts`. Never invent employers, awards, numbers, or testimonials.
2. **Keep all routes and slugs.** `/`, `/about`, `/projects`, `/projects/[slug]` and every existing slug must keep working.
3. **Keep SEO intact.** Preserve `metadata` in `layout.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`, OG image, canonical URL, and JSON-LD if present. Exactly one `<h1>` per page.
4. **Server Components by default.** Add `"use client"` only to leaf components that need hooks or motion. Keep the existing pattern: server `Section.tsx` fetches data, `SectionClient.tsx` animates it.
5. **Animate only `transform` and `opacity`.** Never animate `top`, `left`, `width`, `height`, `margin`, or `box-shadow` in scroll loops. Use `will-change` sparingly and only during animation.
6. **Respect `prefers-reduced-motion`.** Every parallax, marquee, cursor effect, and splash must have a static fallback. See section 9.
7. **No new heavy dependencies without need.** Allowed additions: `lenis` (smooth scroll) and, if justified, `@studio-freight/react-lenis`. Prefer `framer-motion` hooks (`useScroll`, `useTransform`, `useSpring`, `useMotionValue`, `useInView`). No GSAP, no Three.js unless the user approves.
8. **Images:** use `next/image` with explicit `sizes`, `priority` only for the LCP image, and AVIF/WebP. Never ship unoptimized multi-megabyte images. The current `public/avatars/profile.png` is ~900 KB: convert and resize it.
9. **No placeholders.** No lorem ipsum, no grey boxes, no `picsum` stand-ins in the final result. Generate or source real assets (section 12).
10. **No emojis** in code, copy, commit messages, or docs. No decorative emoticons.
11. **Comments:** one concise line explaining purpose where non-obvious. Do not add generic AI-style comments. Preserve unrelated existing comments.
12. **Language:** all UI copy and documentation in English.
13. Do not remove the Chatbot, theme toggle, resume link, or GitHub stats feature unless redesigned equivalents ship in the same change.
14. Never commit secrets. `.env` stays untracked; keep `.env.example` current.

---

## 4. Creative Direction

### 4.1 Concept: "Depth of Field"

The portfolio is a journey through layered depth. Content sits on distinct planes that move at different speeds as the user scrolls, like looking through a window at a living landscape of code, data, and light. Each section is a "scene" with its own atmosphere, but all scenes share one consistent design language.

Keywords: cinematic, precise, luminous, editorial, engineered, calm confidence.

Avoid: neon cyberpunk cliches, purple-to-blue default gradients, stock "hacker green", glassmorphism overload, generic card grids, centered-everything layouts.

### 4.2 Color System

Define as CSS variables in `globals.css`, expose through Tailwind v4 `@theme inline`. Dark is the hero theme; light must be a first-class, equally polished variant.

**Dark theme (default)**

| Token | Value | Use |
| :--- | :--- | :--- |
| `--bg-0` | `#07080B` | Page base (deepest plane) |
| `--bg-1` | `#0C0E13` | Raised surfaces |
| `--bg-2` | `#141720` | Cards, panels |
| `--line` | `rgba(255,255,255,0.08)` | Hairlines, borders |
| `--text-hi` | `#F3F1EA` | Headlines (warm off-white, not pure white) |
| `--text-mid` | `#A7A9B4` | Body |
| `--text-lo` | `#6B6E7B` | Meta, captions |
| `--accent` | `#E8B04A` | Primary accent (warm amber) |
| `--accent-2` | `#4FD1C5` | Secondary accent (teal, data/ML moments) |
| `--accent-glow` | `rgba(232,176,74,0.35)` | Soft glows, never harsh |

**Light theme**

| Token | Value |
| :--- | :--- |
| `--bg-0` | `#F6F3EC` |
| `--bg-1` | `#EFEBE1` |
| `--bg-2` | `#FFFFFF` |
| `--line` | `rgba(10,10,10,0.10)` |
| `--text-hi` | `#0B0B0D` |
| `--text-mid` | `#4A4C57` |
| `--text-lo` | `#7A7C88` |
| `--accent` | `#B9770E` |
| `--accent-2` | `#0F8F85` |

Rules:
- Body text contrast >= 4.5:1, large text >= 3:1, in both themes. Verify, do not guess.
- Accent is used for focus, key numerals, active states, and one hero highlight. Maximum two accent colors on screen at once.
- Gradients are subtle and tonal (same hue family), used for atmosphere, not decoration.

### 4.3 Typography

Load through `next/font/google` (self-hosted, `display: swap`).

| Role | Font | Notes |
| :--- | :--- | :--- |
| Display | **Instrument Serif** or **Fraunces** (variable) | Huge editorial headlines, italic accents on key words |
| Sans / UI | **Geist** (already installed) | Body, nav, buttons |
| Mono | **Geist Mono** (already installed) | Labels, indices, metadata, code feel |

Scale (fluid, use `clamp`):

```
--fs-display: clamp(3.5rem, 11vw, 11rem);   line-height 0.9, tracking -0.04em
--fs-h1:      clamp(2.5rem, 6vw, 6rem);     line-height 0.95
--fs-h2:      clamp(2rem, 4vw, 3.75rem);    line-height 1.0
--fs-h3:      clamp(1.25rem, 2vw, 1.75rem); line-height 1.2
--fs-body:    clamp(1rem, 1.1vw, 1.125rem); line-height 1.65
--fs-label:   0.75rem; uppercase; tracking 0.14em; mono
```

Mix serif display with mono labels (for example `01 / Selected Work`) to create an editorial rhythm. Max line length for paragraphs: 62ch.

### 4.4 Layout and Spacing

- 12-column grid, max content width 1440px, side padding `clamp(1.25rem, 4vw, 4rem)`.
- Vertical rhythm: sections use `padding-block: clamp(6rem, 14vw, 14rem)`.
- Asymmetric compositions. Offset headlines against body copy. Overlap images with type. Break the grid deliberately, never accidentally.
- Radii: 2px (hairline UI), 14px (cards), 999px (pills). Do not use one radius everywhere.

### 4.5 Atmosphere Layers (global)

- Fine film grain overlay (SVG noise, 3-5% opacity, `pointer-events: none`, fixed).
- Soft radial glow that follows scroll progress through accent colors per scene.
- Hairline grid lines or measurement ticks in the margins as technical decoration (very low contrast).
- Custom scroll progress indicator (thin vertical line with section index).

---

## 5. Parallax System (Core Requirement)

Build a reusable, typed parallax toolkit first. Pages consume it. Do not scatter ad-hoc `useScroll` calls across components.

### 5.1 Smooth scroll

- Install `lenis`. Create `src/components/motion/SmoothScroll.tsx` (client) wrapping the app in `(website)/layout.tsx`.
- Config: `lerp: 0.085`, `smoothWheel: true`, `syncTouch: false` (keep native touch scroll on mobile).
- Disable entirely when `prefers-reduced-motion: reduce`.
- Sync with framer-motion: drive Lenis with `requestAnimationFrame`; `useScroll` reads native scroll position so it stays correct.
- Anchor links and "Back to top" must call `lenis.scrollTo`.

### 5.2 Toolkit (create under `src/components/motion/` and `src/lib/motion/`)

| File | Purpose |
| :--- | :--- |
| `SmoothScroll.tsx` | Lenis provider and RAF loop |
| `ParallaxLayer.tsx` | Moves children on Y/X at a given speed relative to scroll within a container |
| `ParallaxScene.tsx` | Sticky/pinned scene wrapper exposing `scrollYProgress` through context |
| `ScrollProgress.tsx` | Top or side progress bar, `useSpring` smoothed |
| `RevealText.tsx` | Splits text into lines/words, masked slide-up reveal on enter |
| `MagneticButton` | Already in `ui/`, refine and reuse |
| `Marquee.tsx` | Infinite scroll-velocity-reactive marquee |
| `TiltCard.tsx` | Pointer-tracking 3D tilt with spring physics |
| `CursorFollower.tsx` | Custom cursor (desktop fine-pointer only) |
| `useParallax.ts` | Hook: `(speed, range) => MotionValue` using `useScroll` + `useTransform` |
| `useReducedMotionSafe.ts` | Wrapper over `useReducedMotion` returning static fallbacks |
| `src/lib/motion/easings.ts` | Named easings and spring presets |

`ParallaxLayer` API:

```tsx
<ParallaxLayer
  speed={-0.25}        // negative = moves slower than scroll (feels farther), positive = faster (feels closer)
  axis="y"             // "y" | "x"
  range={[0, 1]}       // progress window within the offset below
  offset={["start end", "end start"]}
  scale={[1, 1.08]}    // optional scale mapping
  opacity={[1, 1]}     // optional opacity mapping
  clamp                // prevent overshoot
>
  {children}
</ParallaxLayer>
```

Implementation notes:
- Use `useScroll({ target, offset })`, then `useTransform` with a pixel range derived from container height and `speed`. Wrap the output in `useSpring({ stiffness: 120, damping: 30, mass: 0.4 })` only for hero-level layers; plain `useTransform` elsewhere for cheapness.
- Apply via `style={{ y }}` on `motion.div` so it never triggers React re-render per frame.
- Pause off-screen layers: use `useInView` with margin, and render static when out of view if the layer is expensive.

### 5.3 Depth Plane Convention

Every parallax scene composes 4-6 planes. Speeds are relative to scroll (0 = fixed to page, negative = lags behind).

| Plane | Content | Speed | Blur | Opacity |
| :--- | :--- | :--- | :--- | :--- |
| Far background | Gradient orbs, grid, star/dust field | -0.5 | 0 | 0.4-0.6 |
| Mid background | Large outlined or ghost type, abstract shapes | -0.3 | 0 | 0.6-0.8 |
| Subject | Main image or key visual | -0.1 to 0 | 0 | 1 |
| Content | Headline, body | 0 | 0 | 1 |
| Foreground accents | Small shapes, labels, ticks | +0.15 to +0.3 | 0 (or 1-2px for depth) | 1 |
| Overlay | Grain, vignette | fixed | 0 | 0.04 |

Never exceed `|speed| = 0.8`. Large values feel nauseating and cause clipping. Always wrap layers in a container with `overflow: clip` so parallax travel never creates horizontal scroll.

### 5.4 Effects Catalogue (use these, not random ones)

1. **Layered hero parallax** with mouse-reactive micro-offset (pointer parallax, 8-16px max) on desktop.
2. **Sticky scene scrolling:** a tall section (`height: 300vh`) with a sticky 100vh stage; scroll progress drives a sequence (text swap, image morph, counter).
3. **Horizontal scroll gallery:** vertical scroll translates a horizontal track of project cards (`useTransform(scrollYProgress, [0,1], ["0%", "-X%"])`). Only on >= 1024px; on smaller screens it becomes a native snap carousel.
4. **Scroll-linked masked text reveal:** words fade from `text-lo` to `text-hi` as the paragraph crosses the viewport (about section statement).
5. **Image reveal:** clip-path inset animates from `inset(12% 8% 12% 8% round 14px)` to `inset(0 round 14px)` while the image counter-scales from 1.2 to 1.
6. **Scroll-velocity marquee** for the tech stack (speed and skew respond to scroll velocity, capped).
7. **Counter animation** for stats (years coding, projects) triggered once on enter.
8. **Section transitions:** curved or masked dividers between scenes, color atmosphere crossfades through scroll progress.
9. **Page transitions** between routes: shared-element feel using `template.tsx` with a wipe or fade-scale (200-400ms).
10. **Magnetic CTAs** and **tilt cards** on pointer devices only.

### 5.5 Motion Language

- Durations: micro 150-250ms, UI 300-450ms, scenic 600-1000ms. Never above 1.2s for a single reveal.
- Easings: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) for reveals, `cubic-bezier(0.65, 0, 0.35, 1)` for transitions. Springs for physical interactions.
- Stagger: 40-80ms between words/lines/cards.
- Reveal once (`once: true`) unless the effect is scroll-linked.
- One hero moment per viewport. Do not animate everything at once.

---

## 6. Page Specifications

### 6.1 Splash / Intro (`SplashScreen.tsx`)

- Show only on first visit per session (`sessionStorage`), skip for reduced motion and for returning navigation.
- Concept: monogram "HID" draws in with a stroke animation, a thin counter runs 000 to 100, then the screen splits and slides away revealing the hero. Total <= 1.8s. Never block LCP: render hero underneath, splash is an overlay.
- Must be dismissible by key or click.

### 6.2 Navbar

- Fixed, transparent over hero, becomes blurred translucent bar after 80px scroll. Hides on scroll down, reveals on scroll up.
- Left: monogram/wordmark. Center or right: Home, Projects, About, Resume (opens `/resume.pdf`), and a "Hire Me" pill (mailto from profile email).
- Active link has an animated underline that slides between items (shared `layoutId`).
- Theme toggle with an animated sun/moon morph.
- Mobile: full-screen overlay menu with staggered large serif links, closes on route change and Escape, traps focus.

### 6.3 Home (`/`)

Sequence of scenes. Each one is a `ParallaxScene`.

**Scene 1 - Hero ("Arrival")**
- Full viewport. Giant display headline: `Bagus Hidayat.` with the surname in italic serif and an accent underline stroke that draws in.
- Sub-line (mono label): `Full Stack Web Developer / Software Engineer`, with a rotating secondary phrase (Data, ML, Mentoring) using a masked vertical text swap.
- Layers: far orbs and dust (speed -0.5), giant outlined ghost text `PORTFOLIO` behind (speed -0.3), the portrait cut into an organic arch/mask frame (speed -0.1) with subtle pointer parallax, floating tags such as `Next.js`, `Laravel`, `Python`, `Supabase` as foreground chips (speed +0.2).
- Status chip bottom-left: current company, location, availability from `profile`. Scroll cue bottom-center (animated line, hides after first scroll).
- On scroll, headline scales down slightly and rises while the portrait drifts, creating the "leaving the surface" feeling.

**Scene 2 - Manifesto ("Statement")**
- Large paragraph (from `aboutData`/bio) revealed word by word as scroll progresses (scroll-linked opacity). Key phrases (for example "data-driven intelligence") highlighted with accent color and italic serif.
- Stats row with animated counters: Years Coding, Projects, plus one more truthful stat from data. Mono labels, hairline separators.

**Scene 3 - Selected Work ("Gallery")**
- Pinned section with horizontal track of featured projects (`isFeatured` first, then top by `order`).
- Each card: large image with clip-path reveal, project index `01`, title in serif, one-line description, tech chips, arrow CTA. Hover: image scales 1.05, cursor morphs to "View", title letters shift.
- Progress bar and counter `01 / 03` tied to horizontal progress.
- End card: "View all projects" with magnetic button.

**Scene 4 - Craft ("Tech Stack")**
- Two-row marquee in opposite directions with scroll-velocity response. Each item a pill with an icon where available. Category legend (Language, Frontend, Backend, Tool) in mono labels.
- Optional sticky intro text on the left while chips move on the right.

**Scene 5 - Journey ("Experience")**
- Vertical timeline with a drawing line (stroke tied to scroll progress). Each entry (from `experienceData`, ordered) slides in alternately, shows year in mono, title in serif, organization, skills as chips, and links (for example IEEE paper) as arrow links. Achievements get an accent marker.

**Scene 6 - Contact ("Let's Build")**
- Gigantic headline `Have an idea? Let's build it.` filling the width. Magnetic email CTA, copy-to-clipboard with `sonner` toast, social links (GitHub, LinkedIn, Instagram) as large underlined rows with arrow reveal on hover.
- Contact form only if a working backend exists. Otherwise keep the mailto flow. Do not ship a fake form.

**Footer**
- Oversized wordmark that parallax-rises into view, small print: `Copyright 2026 Bagus Hidayat, Malang, Indonesia`, links, back-to-top with smooth scroll.

### 6.4 Projects Index (`/projects`)

- Hero header with split-text title `Selected Archive` and project count.
- Filter by tag/tech with animated pill bar (`layoutId` indicator). Filtering reorders with `layout` animations (no hard jumps).
- List view default: large editorial rows (index, title, tags, year, thumbnail that follows the cursor on hover with slight tilt). Toggle to grid view.
- Every row links to `/projects/[slug]`. Keyboard accessible, thumbnail follow effect disabled on touch.

### 6.5 Project Detail (`/projects/[slug]`)

- Full-bleed hero image with parallax (image moves slower than the page) and gradient scrim. Title overlaps image edge.
- Meta sidebar (sticky): role, year, tech stack, GitHub and live links.
- Body: render `content` markdown via `react-markdown` with custom styled components (headings in serif, lists with accent markers, code in mono).
- Gallery: images with clip-path reveal and mild parallax.
- Footer of page: next/previous project navigation with large titles and hover image preview.
- Keep `generateMetadata` and OG image logic.

### 6.6 About (`/about`)

- Title hero (`aboutData.heroTitle` / `heroSubtitle`) as giant stacked type with opposing horizontal parallax (one line moves left, other moves right).
- Story section: sticky portrait on the left, scrolling text on the right, paragraphs fade in sequentially.
- Philosophy: five principles as a sticky stacked-cards sequence (each card pins and scales down as the next arrives).
- Education: two compact entries with hairline separators.
- Experience recap or link to home timeline. Resume download CTA.

### 6.7 404 and Loading States

- Custom `not-found.tsx` with themed parallax glitch-free message and link home.
- `loading.tsx` files use refined skeletons matching the new layout, no pulsing grey blocks that mismatch the design.

### 6.8 Chatbot

- Restyle to the new design system (panel, bubbles, launcher). Keep logic in `chatbot-responses.ts`. Lazy loaded through `ChatbotLoader`. Must not affect LCP or scroll smoothness.

---

## 7. Component Design Details

### Buttons
- Primary: solid accent, dark text, 999px radius, magnetic hover, arrow icon slides in. Secondary: hairline border, fills on hover with a clip-path wipe.
- Focus ring: 2px accent outline with 3px offset. Never remove focus styles.

### Cards
- Surface `--bg-2`, 1px `--line` border, 14px radius. Hover raises border brightness and applies tilt (pointer devices only). No heavy drop shadows; use inner highlights and glows.

### Chips / Tags
- Mono label, 999px radius, hairline border, hover fills with accent at 12% opacity.

### Links
- Underline draws left to right on hover. External links show an arrow icon and `rel="noopener noreferrer"` with `target="_blank"`.

### Cursor
- Desktop fine pointer only: small dot plus lagging ring. Ring grows over interactive elements, shows labels ("View", "Drag") on project cards. Never hide the native cursor on touch or when reduced motion is set.

---

## 8. Technical Architecture

### 8.1 File plan

```
src/components/motion/
  SmoothScroll.tsx
  ParallaxLayer.tsx
  ParallaxScene.tsx
  ScrollProgress.tsx
  RevealText.tsx
  Marquee.tsx
  TiltCard.tsx
  CursorFollower.tsx
  GrainOverlay.tsx
src/hooks/
  useParallax.ts
  useReducedMotionSafe.ts
  useMediaQueryMatch.ts      (fine pointer, min-width)
src/lib/motion/
  easings.ts
  presets.ts
src/components/sections/
  home/Hero.tsx, HeroClient.tsx
  home/Manifesto.tsx
  home/WorkGallery.tsx
  home/TechMarquee.tsx
  home/Journey.tsx
  home/Contact.tsx
src/components/layout/
  Navbar.tsx, MobileMenu.tsx, Footer.tsx, SplashScreen.tsx
```

Refactor or replace existing sections in place where sensible. Delete dead components after migration. Keep imports clean.

### 8.2 Rendering strategy

- Pages remain Server Components that read from `static-db.ts` and pass serializable props to client components.
- Code-split heavy client scenes with `next/dynamic` where below the fold.
- Use `content-visibility: auto` with `contain-intrinsic-size` for long below-fold sections where it does not break sticky/pinned scenes.
- Avoid hydration mismatches: any value depending on `window` must be set in `useEffect`. Use `suppressHydrationWarning` only for theme class.

### 8.3 Performance budget

- JS shipped on home route (gzipped): <= 180 KB first load excluding framework.
- LCP element (hero portrait or headline) loads with `priority` and fixed dimensions.
- Fonts: at most 3 families, subset latin, `display: swap`, preloaded by `next/font`.
- Parallax layers: <= 6 animated elements per scene in view. Use CSS `transform: translate3d` through framer-motion `style`.
- Images: AVIF/WebP, correct `sizes`, no layout shift (`width`/`height` or `fill` with aspect ratio container).
- Run `pnpm build` and fix all warnings before declaring completion.

### 8.4 Next.js image config

Add to `next.config.ts` `images.remotePatterns` for `images.unsplash.com` if remote images remain, plus `formats: ["image/avif", "image/webp"]`. Prefer downloading final project art into `public/projects/` (section 12) so the site has no third-party runtime dependency.

### 8.5 Theming

- `next-themes` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`. Transitions between themes use a 300ms color transition on background and text only (disable during first paint).
- All colors come from CSS variables; no hardcoded hex inside components.

---

## 9. Accessibility and Reduced Motion

- `@media (prefers-reduced-motion: reduce)`: disable Lenis, parallax translation, marquee movement, cursor follower, splash, and horizontal pinning. Content stays fully visible and in a logical vertical order. Use fades of <= 150ms at most.
- Horizontal gallery fallback: vertical stack or native scroll-snap carousel.
- Landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- Heading order is strict: one `h1`, then `h2` per scene, `h3` inside.
- Decorative layers (`ParallaxLayer` backgrounds, grain, ghost text): `aria-hidden="true"`.
- Split-text reveals keep the full sentence in an `aria-label` on the parent and mark the spans `aria-hidden`.
- Touch targets >= 44x44px. Visible focus on every interactive element. Skip-to-content link as the first focusable element.
- Mobile menu: focus trap, Escape to close, restore focus to trigger.
- Do not rely on color alone. Provide text labels for status and active states.
- Test with keyboard-only navigation across all pages before finishing.

---

## 10. Responsive Behavior

| Breakpoint | Behavior |
| :--- | :--- |
| < 640px | Single column, reduced parallax amplitude (multiply speeds by 0.4), no pointer effects, native swipe carousel for work, stacked sections, simplified hero (portrait above headline) |
| 640-1023px | Two-column where useful, medium parallax (0.7x), carousel instead of horizontal pinned gallery |
| >= 1024px | Full effects: pinned horizontal gallery, sticky scenes, pointer parallax, cursor follower |
| >= 1920px | Cap content width at 1440px, scale display type with `clamp`, keep background layers full-bleed |

- Use `100svh`/`100dvh` instead of `100vh` for hero to avoid mobile browser UI jumps.
- Never allow horizontal page scroll. Test with `overflow-x: clip` on `body` only as a safety net, fix the real cause first.
- Test at 360, 390, 768, 1024, 1280, 1440, 1920, 2560.

---

## 11. Copy and Voice

- Direct, confident, specific. No filler, no buzzword soup, no "passionate" or "cutting-edge".
- Reuse existing truthful copy from `static-db.ts`. When rewriting, keep facts identical.
- Headlines are short (2-6 words). Labels are lowercase mono or uppercase tracked.
- Example hero secondary lines (all true to profile): `Full Stack Engineering`, `Data and Machine Learning`, `Industrial Mentoring`.
- CTA labels: `View Work`, `Read the Story`, `Say Hello`, `Download Resume`.

---

## 12. Assets

All imagery must be real and cohesive.

1. **Portrait:** process `public/avatars/profile.png` into `public/avatars/profile.avif` and `.webp` at 1200px and 600px widths. Keep the original out of the bundle path or delete after conversion.
2. **Project images:** currently Unsplash URLs in `static-db.ts`. Download chosen images to `public/projects/<slug>.webp` (1600px wide, quality ~80) and update `thumbnail` and `images` to local paths. Keep a consistent tonal grade by applying a unified dark overlay or duotone through CSS.
3. **Abstract art:** create SVG shapes, grid patterns, and noise as inline SVG or files under `public/art/`. Use `generate_image`-style tooling or hand-authored SVG. No stock grey placeholders.
4. **Icons:** `lucide-react` for UI, simple-icons style SVGs for technologies if needed (inline, optimized).
5. **OG image:** regenerate `public/og-image.png` (1200x630) to match the new identity. Update `icon.png` and `apple-icon.png` if the monogram changes.
6. Provide `alt` text for every meaningful image. Decorative images get `alt=""`.

---

## 13. Implementation Plan (Execute in Order)

Work in small, verified steps. After each phase: `pnpm lint`, check the running dev server, and view the result in the browser.

**Phase 0 - Prep**
- Create a branch `feat/parallax-redesign`. Do not work on `main`.
- Audit existing components and `static-db.ts`. List what is reused versus replaced.

**Phase 1 - Foundation**
- Rewrite `globals.css` tokens (section 4), fonts in `layout.tsx`, theme provider defaults, base typography utilities, grain overlay.
- Add `lenis`, build `SmoothScroll`, `useReducedMotionSafe`, `easings`, `presets`.

**Phase 2 - Motion toolkit**
- Build `ParallaxLayer`, `ParallaxScene`, `RevealText`, `Marquee`, `ScrollProgress`, `TiltCard`, `CursorFollower`. Create a temporary `/dev/motion` page (not linked, excluded from sitemap, deleted at the end) to verify each primitive in isolation.

**Phase 3 - Global shell**
- Navbar, mobile menu, footer, splash, back-to-top, skip link, page transition template.

**Phase 4 - Home scenes**
- Hero, Manifesto, Work Gallery, Tech Marquee, Journey, Contact. Tune parallax speeds visually. Verify at all breakpoints.

**Phase 5 - Inner pages**
- Projects index (filter + list), project detail, About, 404, loading states.

**Phase 6 - Assets and polish**
- Optimize images, regenerate OG, tune micro-interactions, restyle Chatbot.

**Phase 7 - Quality gates**
- `pnpm lint` clean, `pnpm build` clean, Lighthouse run, keyboard and screen-reader pass, reduced-motion pass, cross-browser check (Chromium, Firefox, Safari/WebKit if available), remove `/dev/motion`, update `README.md`.

---

## 14. Quality Checklist (Must All Pass)

Visual
- [ ] First viewport looks premium in both themes, no flat or default-looking areas
- [ ] Consistent spacing, type scale, radii, and color use across all pages
- [ ] Parallax depth is clearly visible yet comfortable (no clipping, no jitter, no overshoot)
- [ ] No horizontal scroll at any width
- [ ] No text over image without sufficient scrim or contrast

Motion
- [ ] Only `transform` and `opacity` animated in scroll loops
- [ ] 60fps while scrolling the home page (verify with DevTools Performance)
- [ ] Reduced-motion mode shows complete static content
- [ ] No animation replays unexpectedly on navigation or resize

Technical
- [ ] `pnpm lint` and `pnpm build` pass with zero errors and no new warnings
- [ ] No hydration warnings in console
- [ ] No unused dependencies or dead components left behind
- [ ] Routes and sitemap unchanged and working
- [ ] Metadata, OG, canonical intact; single `h1` per page

Accessibility
- [ ] Lighthouse Accessibility >= 95
- [ ] Full keyboard navigation with visible focus
- [ ] Contrast verified for body, muted, accent text in both themes
- [ ] Decorative layers hidden from assistive tech

Content
- [ ] All facts match `static-db.ts`
- [ ] No placeholders, no lorem ipsum, no emojis

---

## 15. Common Pitfalls (Avoid)

- Parallax speed too high causing blank gaps at section edges. Always oversize the moving layer by the travel distance and clip the container.
- `position: sticky` broken by an ancestor with `overflow: hidden`. Use `overflow: clip` on non-sticky ancestors only, and never on a sticky parent chain.
- Animating with `useState` on scroll. Use motion values only.
- Lenis and `position: sticky`/anchor links conflict. Always route anchors through Lenis.
- `100vh` on mobile hero. Use `svh`/`dvh`.
- Huge unoptimized images used as parallax backgrounds. Resize first.
- Mounting every effect on mobile. Gate heavy effects with media queries and `useMediaQueryMatch`.
- Theme flash on load. Keep `next-themes` script, set `suppressHydrationWarning` on `<html>`.
- Over-animating. If everything moves, nothing feels special. Reserve big motion for hero, gallery, and journey.

---

## 16. Commands

```bash
pnpm dev       # already running, reuse it
pnpm lint      # must be clean
pnpm build     # must pass before completion
pnpm start     # test production build locally
pnpm add lenis # only new runtime dependency expected
```

Docker files (`Dockerfile`, `docker-compose.yml`) exist. Do not break the build for them: avoid dependencies needing native compilation.

---

## 17. Definition of Done

The redesign is complete when every item in section 14 passes, every phase in section 13 is finished, the dev and production builds run clean, and the site delivers a cohesive, memorable parallax experience across home, about, projects, and project detail pages in both themes and on all target screen sizes. Summarize what changed, list any deviations from this document with reasons, and note any follow-ups.

<!-- rtk-instructions v2 -->
# Command output

Command output here is condensed to save tokens, keeping every signal and
dropping costly noise. Treat it as the complete result: run commands
normally, and batch related commands into one call to avoid extra turns.
Truncated results state their recovery path in their own output. Re-run a
command as `rtk proxy <cmd>` only when its result is unusable: empty when
output was clearly expected, contradicting its exit code, or garbled.
<!-- /rtk-instructions -->