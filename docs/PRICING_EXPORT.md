# Invision Creative — pricing export (photo, video, social)

**Source of truth:** `web/src/config/pricingScaffold.ts` (`PHOTO_PACKAGES`, `VIDEO_PACKAGES`, `SOCIAL_PACKAGES`, `VOLUME_SHOOT_TIERS`, `calculateBundlePricing`).  
**Last aligned with code:** regenerate when package prices or discount rules change.

All amounts are **USD**. Per-shoot packages are **one production visit** unless the package summary notes split days. Social is priced **per calendar month** of the commitment.

---

## Photography (per shoot)

| Tier | List price | Deliverables (summary) | On-site hours (guide) |
|------|------------|-------------------------|------------------------|
| Starter | $450 | 15 edited 45MP photos · 1 location · web/social usage | ~3 h |
| Growth | $800 | 30 edited photos · 1–2 locations · wider coverage · may split across two shoot days | ~4.5 h |
| Progress | $1,150 | 50 edited photos · job-site or brand story · may split across two shoot days | ~6 h |
| Full day | $1,450 | 80 edited photos · full documentation · may split across three shoot days | ~8 h |

---

## Videography (per shoot)

| Tier | List price | Deliverables (summary) | On-site hours (guide) |
|------|------------|-------------------------|------------------------|
| Starter | $495 | 2×30s clips · basic edit · music · simple titles | ~2.5 h |
| Growth | $978 | 4×30s clips · more shot variety · basic titles · may split across two shoot days | ~4 h |
| Progress | $1,500 | 6×30s clips · progress / detail coverage · may split across two shoot days | ~6 h |
| Full day | $2,063 | 8×30s clips · full-day site or brand story · may split across three shoot days | ~8 h |

---

## Social media (per month)

| Tier | Monthly list price | Posts / month (summary) |
|------|---------------------|---------------------------|
| Starter | $550 | 5 posts · captions · scheduling · 1 platform |
| Growth | $850 | 10 posts · 1–2 platforms · light recap |
| Momentum | $1,100 | 15 posts · cross-platform repurposing · recap |
| Authority | $1,300 | 20 posts · 2–3 platforms · stronger planning cadence |

**Social line item (before discounts):** `monthly tier price × commitment months` (minimum 1 month in the builder).

---

## Commitment discount (social) — “discounted rates when they commit”

When **social is in the cart**, a **commitment credit** applies: a percentage of **(monthly social price × commitment months)** — i.e. the same base as the social line item.

| Commitment months | Credit (% of social line) |
|-------------------|---------------------------|
| 1 | 0% |
| 2 | 10% |
| 3 | 15% |
| 4 | 25% |
| 5–12 | 30% |

**Dollar credit** = `⌊ social line × (credit % / 100) + 0.5 ⌋` rounded to the nearest whole dollar for display parity with the site’s currency formatter.

### Social totals after **only** the commitment credit (no bundle / volume / cap)

These rows are **social line minus commitment credit** for months **1–5** (5+ months use the same **30%** credit as 5).

| Tier | 1 mo | 2 mo | 3 mo | 4 mo | 5 mo |
|------|------|------|------|------|------|
| Starter ($550/mo) | $550 | $990 | $1,403 | $1,650 | $1,925 |
| Growth ($850/mo) | $850 | $1,530 | $2,167 | $2,550 | $2,975 |
| Momentum ($1,100/mo) | $1,100 | $1,980 | $2,805 | $3,300 | $3,850 |
| Authority ($1,300/mo) | $1,300 | $2,340 | $3,315 | $3,900 | $4,550 |

**Equivalent average monthly** (same table ÷ months): e.g. Starter @ 5 mo → **$385/mo** effective on social after commitment credit only ($1,925 ÷ 5).

> **Photo / video “commitment” dials on the pricing page** use the **same percentage ladder** for labels and for total photos / clips over time. In the **current** `calculateBundlePricing` implementation, **only the social commitment months** feed dollar credits; photo and video line items stay at **list tier prices** for the estimate. (Stacking rules described in Step 4 of the builder that mention extra % off social when photo/video recurring are **not** applied in that function today — treat as roadmap copy unless implemented.)

---

## Multi-shoot volume (committed shoots)

**Applies to production subtotal:** photography + videography + drone add-on (not social).

| Committed shoots (tier) | Discount off production |
|-------------------------|-------------------------|
| 1 | 0% |
| 2 | 3% |
| 3 | 5% |
| 6 | 10% |
| 12 | 15% |

---

## Package combination (“bundle”) discounts

Let **production** = photo + video + drone (whichever are in the cart).  
Let **cart subtotal** = production + social line (if social selected).

| Services in cart | Bundle % | Applied to |
|------------------|----------|--------------|
| Photo + Video (no social) | **5%** | **Production** only |
| Photo **or** Video + Social (not both production types) | **5%** | **Full cart** subtotal |
| Photo + Video + Social | **10%** | **Full cart** subtotal |

---

## How discounts stack (calculator order)

1. **Subtotal** = production + (social monthly × commitment months).  
2. **Bundle discount** (if any) per table above.  
3. **Social commitment credit** (if social selected and months ≥ 2) per month ladder.  
4. **Volume discount** on **production** per shoot tier.  
5. **Cap:** bundle + social credit + volume **cannot exceed 30%** of the **cart subtotal** (`MAX_TOTAL_DISCOUNT_PERCENT`). If they would, the estimate shows the capped total and notes the cap.

**After discounts:** travel / local surcharges (`driveTimeFee`, local multi-day or multi-location surcharge on production) are added for **grand total** — see `pricingScaffold.ts` for thresholds.

---

## Scheduling (policy text on site)

Multi-shoot discounts are tied to booking the next shoot within **`SCHEDULING_WINDOW_DAYS` (30)** days of the prior shoot’s completion unless the contract says otherwise — see `PRICING_SCHEDULING_POLICY_BULLETS` and disclaimer strings in `pricingScaffold.ts`.

---

## Disclaimer

> Estimates are for planning — final quotes depend on scope, travel, licensing, revisions, and signed agreement.
