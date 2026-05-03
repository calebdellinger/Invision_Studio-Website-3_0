# Invision Creative — site layout

Partner brand: [Invision Marketing](https://invisionmarketing.io/) (SEO, ads, web funnels). This site is the **visual** arm: photography, video, social, branding.

## Visual & UX principles

- **Dark cinematic** look sitewide: deep blacks, subtle film grain (optional), green accents, minimal copy.
- **Visual-first**: large imagery/video; text as short labels or one-line headlines.
- **Typography**: serif for display lines only; sans for UI, captions, navigation.
- **Cross-brand**: shared monogram shape; Creative uses **green** monogram, Marketing uses **purple** (on their site). A **Marketing ↔ Creative** switch in the header links between properties.

## Information architecture

| Route | Purpose |
|--------|---------|
| `/` | Home: full-viewport hero (image or video), one serif headline, optional sublabel, scroll to work preview. |
| `/work` | Case studies / portfolio: masonry or horizontal scroll; captions ≤ 1 line. |
| `/services` | Four pillars: Photography, Video, Social & content, Branding — each tile is visual + title. |
| `/about` | Short story + team or process; still lighter on copy than Marketing site. |
| `/contact` | Contact form + email/phone; optional calendar embed later. |

**SEO note:** Long-form FAQ or location copy (if needed) can live on `/about` or a dedicated `/faq` so gallery routes stay minimal.

## Global chrome

- **Header (fixed):** Monogram + wordmark (Creative styling), primary nav (`Work`, `Services`, `About`, `Contact`), **Brand switch** (Marketing \| Creative).
  - Implemented in `web/src/components/brand/BrandSwitch.tsx`: spring-animated pill; **Creative** highlights on this site; **Marketing** navigates to `https://invisionmarketing.io/`. Add a reciprocal control on the Marketing site when ready.
- **Footer:** © Invision Creative, link to Invision Marketing, social placeholders.

## Assets

- Replace `public/brand/invision-monogram.svg` with the official artwork when available. Component `InvisionMonogram` tints via CSS for Creative green vs partner purple reference.

## Build & deploy

- App lives in `web/` (see root `README.md`). Configure hosting with base directory `web` if required.
