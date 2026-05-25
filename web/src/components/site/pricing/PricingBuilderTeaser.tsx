"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  SOCIAL_MONTHLY_DEFAULT_TIER_INDEX,
  VOLUME_SHOOT_OPTIONS,
  calculateBundlePricing,
} from "@/config/pricingScaffold";

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function PricingBuilderTeaser() {
  const [shootTierIndex, setShootTierIndex] = useState(1);

  const committedShoots = VOLUME_SHOOT_OPTIONS[shootTierIndex] ?? 1;

  const preview = useMemo(() => {
    const r = calculateBundlePricing({
      includePhoto: true,
      photoPackageIndex: 0,
      includeVideo: true,
      videoPackageIndex: 0,
      includeSocial: true,
      socialPackageIndex: SOCIAL_MONTHLY_DEFAULT_TIER_INDEX,
      socialCommitmentMonths: 1,
      droneAddonIndex: 1,
      photoRecurring: false,
      videoRecurring: false,
      committedShoots,
    });
    return {
      total: r.grandTotal,
      sub: r.subtotal,
      saved: r.cappedTotalDiscount,
    };
  }, [committedShoots]);

  return (
    <div className="mt-10 rounded-2xl border border-white/[0.1] bg-[#0c0c0c]/90 p-6 ring-1 ring-inset ring-white/[0.04]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
        Live pricing
      </p>
      <h2 className="mt-2 font-serif text-xl text-white">
        Sample bundle (photo + video + social + drone basic)
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        Starter tiers + Drone Basic. Drag to change committed shoot volume; open
        the full calculator for every package and discount rule.
      </p>
      <label className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Committed shoots: {committedShoots}
      </label>
      <input
        type="range"
        min={0}
        max={VOLUME_SHOOT_OPTIONS.length - 1}
        step={1}
        value={shootTierIndex}
        onChange={(e) => setShootTierIndex(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--brand-creative)]"
        aria-label="Preview committed shoots tier"
      />
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="text-zinc-500">Cart before discounts</span>
        <span className="tabular-nums text-zinc-400">{currency(preview.sub)}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="text-zinc-500">Estimated after bundle rules</span>
        <span className="tabular-nums font-semibold text-[var(--brand-creative)]">
          {currency(preview.total)}
        </span>
      </div>
      <p className="mt-2 text-xs text-zinc-600">
        Total savings applied: {currency(preview.saved)}
      </p>
      <Link
        href="/pricing"
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[var(--brand-creative)] px-5 py-3.5 text-sm font-semibold text-black transition-[transform,box-shadow] hover:shadow-[0_8px_28px_-8px_color-mix(in_srgb,var(--brand-creative)_45%,transparent)] sm:w-auto"
      >
        Open full pricing calculator
      </Link>
    </div>
  );
}
