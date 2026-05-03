---
name: invision-creative
description: >-
  Work on the Invision Creative Next.js site in web/ — dark cinematic UI, green
  monogram, Fraunces + Plus Jakarta, brand switch to Invision Marketing, visual-first pages.
---

# Invision Creative — project skill

## When to use

- Editing or adding pages under `web/src/app/`.
- Changing header, footer, monogram, or Marketing ↔ Creative switch.
- Applying brand tokens (`--brand-creative`, `--brand-partner`) or typography.

## Rules

1. Read `docs/WEBSITE_LAYOUT.md` before large IA or copy changes.
2. Keep **dark cinematic** styling; do not introduce a default light theme without user request.
3. Place new shared UI in `web/src/components/site/`, brand pieces in `web/src/components/brand/`.
4. **Serif** = Fraunces for display lines; **sans** = Plus Jakarta for everything else.
5. Partner site: `https://invisionmarketing.io/` — use for Marketing links and purple accent reference.

## Checklist for new routes

- [ ] `metadata` title/description in `page.tsx` or layout.
- [ ] Minimal copy; visuals or placeholders dominate.
- [ ] Header nav updated if top-level route is added.
