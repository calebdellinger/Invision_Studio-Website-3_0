# Invision Creative — AI creative brief

**How to use:** Attach this file (not the full repo) when asking another AI for layout ideas, copy, mood boards, section concepts, or UX flows. Treat the JSON block as hard constraints; treat the prose sections as taste and context.

```json
{
  "brief_version": "1.0",
  "product": "Invision Creative",
  "tagline_domain": "Photography, video, social content, and AI integrations for brands that want to be seen.",
  "sibling_brand": {
    "name": "Invision Marketing",
    "url": "https://invisionmarketing.io/",
    "role": "SEO, paid media, lead-focused web",
    "accent_color": "#8b5cf6",
    "note": "Purple is partner-only on Creative. Cross-link in footer; header/footer brand switch."
  },
  "brand": {
    "primary_accent": "#50a12a",
    "primary_accent_muted": "#2d5a1a",
    "background": "#050505",
    "foreground": "#e8e8e8",
    "surface": "#0c0c0c",
    "theme": "dark cinematic default; no sitewide light theme unless a section intentionally needs contrast"
  },
  "typography": {
    "display_serif": "Fraunces — hero headlines, logo emphasis, occasional section titles",
    "ui_sans": "Plus Jakarta Sans — nav, body, forms, captions",
    "service_headings": "Montserrat semibold appears on some service/showroom pages — keep weight tight, not playful"
  },
  "ux_principles": [
    "visual-first",
    "minimal copy on gallery and home scroll sections",
    "large imagery and video",
    "subtle motion (marquee, scroll reveals, spring pills) with reduced-motion respect",
    "optional cinematic vignette and film-grain mood — never cheesy lens flare stock"
  ],
  "responsive": {
    "phone_only_max_px": 430,
    "tailwind_phone": "max-mobile: (0–430px)",
    "tailwind_tablet_desktop": "mobile: (431px+)"
  },
  "nav_primary": [
    { "label": "Services", "path": "/services" },
    { "label": "Showroom", "path": "/showroom" },
    { "label": "Pricing", "path": "/pricing" },
    { "label": "My Story", "path": "/about" },
    { "label": "Contact", "path": "/contact" }
  ],
  "services": [
    {
      "title": "Photography",
      "path": "/services/photography",
      "tagline": "Stills that campaign.",
      "caps": ["RAW delivery", "Color graded", "Art directed", "Campaign-ready"]
    },
    {
      "title": "Videography",
      "path": "/services/videography",
      "tagline": "Every frame earns the next.",
      "caps": ["4K delivery", "Color graded", "Hero cuts", "Social edits"]
    },
    {
      "title": "Social & Content",
      "path": "/services/social-media",
      "tagline": "Feeds that still feel human.",
      "subroutes": ["instagram", "facebook", "tiktok", "youtube"],
      "caps": ["Multi-platform", "Monthly rhythm", "Branded formats", "Analytics-led"]
    },
    {
      "title": "AI Integrations",
      "path": "/services/ai-integrations",
      "tagline": "Automation without compromise.",
      "caps": ["Workflow automation", "Asset tagging", "Brand-safe", "Faster delivery"]
    }
  ],
  "showroom": {
    "purpose": "Trade album showcases (construction / trades vertical)",
    "albums": ["dirt-work", "concrete", "demo", "roofing"]
  },
  "home_sections_order": [
    "Hero mockup stage (scaled iframe carousel of client-site mockups on white stage)",
    "Operation pillars (Innovation / Passion / Curiosity — triangular layout, green glow)",
    "Film projector hero (full-bleed device timelapse video, vignette)",
    "Mirrored mountain image band",
    "Instagram phone showcase",
    "Homepage mockup showcase",
    "Category tiles (light band: four service deep-links)"
  ],
  "chrome": {
    "header": "Fixed glass pill — frosted white border, backdrop blur, green nav links, dark logo lockup",
    "footer": "Dark, zinc-muted copy, green CTA to contact, brand switch pill (Creative active / Marketing external)"
  },
  "voice": {
    "tone": "confident craft, campaign-ready, human not corporate",
    "structure": "short eyebrows (uppercase tracking), punchy taglines, supporting lines in zinc-400/500",
    "avoid": ["wall of SEO fluff on visual pages", "generic agency superlatives", "startup bro hype", "purple-as-primary"]
  }
}
```

---

## What this site is

**Invision Creative** is the visual arm of the Invision family: commercial photography, videography, social/content production, and practical AI workflow help. It should feel like a **premium production studio**, not a generic marketing agency template.

The sibling site **Invision Marketing** owns lead-gen, SEO, and ads language. Creative owns **show, don’t tell** — portfolios, motion, mockups, and proof of craft.

---

## Hard guardrails (stay on-brand)

| Do | Don’t |
|----|--------|
| Dark backgrounds (`#050505`–`#0c0c0c`), soft white borders at ~6–35% opacity | Bright SaaS landing pages, default light mode sitewide |
| **Green** `#50a12a` for accents, CTAs, eyebrows, active states | Purple or blue as the primary accent (purple only for Marketing links) |
| Big visuals, ≤1-line captions on gallery-style routes | Long paragraphs on `/`, service scroll sections, or showroom grids |
| Fraunces for display moments; Plus Jakarta for UI | Comic sans vibes, bubbly rounded marketing fonts |
| Respect `prefers-reduced-motion` — ideas should work static too | Constant parallax spam, autoplay audio |
| Cross-link Marketing when mentioning SEO/ads/funnels | Position Creative as a full-service SEO shop |

**Header pattern:** Floating frosted bar, not a flat solid nav. Links are **green and semibold**, not white ghost links.

**Service page pattern (when copy is needed):** Eyebrow → title → short subtitle → “power” section → “asset library” (or compound effect for photo/video) → footer CTA. Max content width ~`3xl`, borders `white/[0.06]`, body text `zinc-400`.

---

## Creative latitude (where you can wiggle)

These are **in-bounds** experiments — pitch them freely:

- **Hero concepts:** Full-bleed video, film-strip marquees, device mockup stages, split-screen before/after, scroll-linked chapter breaks (home already mixes a **white mockup stage** with **black cinematic bands** — contrast is intentional, not a mistake).
- **Portfolio / showroom:** Horizontal film reels, masonry with hover captions, chaptered albums per trade (earthwork, concrete, demo, roofing), full-screen lightbox with minimal UI.
- **Services flow:** Alternating icon columns, radial green glows, capability chips (the live site uses floating ring icons + scroll motion).
- **Social sub-pages:** Platform-specific strength grids (Reels vs Shorts vs static carousels) — still visual-first.
- **Motion:** Timelapse wraps, projector metaphor, subtle spring toggles (brand switch), bar-grow accents — cinematic, not gamified.
- **About (“My Story”):** Can carry slightly more prose than home, but still image-led; pillars theme: **Innovation, Passion, Curiosity**.
- **AI integrations:** Frame as **workflow speed + brand-safe**, never “replace your creative team.”

**Out of bounds:** Rebrand to Marketing’s purple identity, clipart icons, testimonial carousels with 10-star fluff, pricing tables that look like a hosting company, or dense FAQ walls on the homepage.

---

## Layout & rhythm

- **Visual hierarchy:** Eyebrow (tiny uppercase, wide tracking, green) → headline → one supporting line → media.
- **Spacing:** Generous vertical padding (`py-16`–`24` on sections); content often centered in `max-w-3xl` to `max-w-7xl`.
- **Surfaces:** Gradients that **hint** green in the mix (`color-mix` with `--brand-creative`), not flat neon panels.
- **Borders:** Hairline `white/5`–`white/10`; glass uses `backdrop-blur` + low-opacity white fills.
- **CTAs:** Rounded-full pills; primary green fill with **black text** on footer contact; secondary = ghost/outline on dark.

**Phone vs desktop:** Phone layouts may stack and simplify motion; tablet+ can use mirror layouts (icon left vs right) and multi-column grids.

---

## Copy cheat sheet

Use language like the live site — **specific and craft-forward:**

- Photography: *“Stills that campaign.”* — honest light, catalog-ready, holds in feed and on wall.
- Video: *“Every frame earns the next.”* — hero cuts, social-native pacing.
- Social: *“Feeds that still feel human.”* — rhythm, branded formats, analytics-informed.
- AI: *“Automation without compromise.”* — tagging, assistants, faster delivery without diluting voice.

**Eyebrow examples:** `Services`, `Motion`, `What we do`, `Albums`  
**Supporting text color:** zinc-500/400 on dark; zinc-900 on intentional light bands (e.g. category tiles).

---

## Suggested prompts (for the external AI)

Copy-paste and fill in the bracket:

1. *“Using the attached Invision Creative brief, propose **three homepage hero alternatives** that stay visual-first. One must use video, one static photography, one mockup/device stage. Sketch section order and one-line labels only.”*

2. *“Design a **showroom album page** for the concrete trade: above-the-fold layout, grid behavior, and caption rules (max 12 words). Dark cinematic, green accents only.”*

3. *“Write **six capability chips** and a **40-word description** for a new ‘Brand film’ service line that matches existing Photography/Videography voice.”*

4. *“Given the brief, what should **not** change if we add a client logo marquee? List 5 guardrails and 3 acceptable creative tweaks.”*

---

## What this brief deliberately omits

- Implementation stack (Next.js, Tailwind v4, component paths) — not needed for ideation.
- Internal routes (`/internal`, login, learning tools).
- Exact asset filenames and HTML mockup sources.

For engineering changes, use the repo (`web/`, `docs/WEBSITE_LAYOUT.md`). For **ideas, mood, and layout direction**, this file is enough.

---

*Last aligned with site structure: Services, Showroom, Pricing, My Story, Contact; four service pillars + showroom albums.*
