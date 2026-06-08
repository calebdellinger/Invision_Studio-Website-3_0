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
    <div className="mt-10 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-6 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
        Live pricing
      </p>
      <h2 className="mt-2 font-serif text-xl text-zinc-950 tracking-tight">
        Sample bundle (photo + video + social + drone basic)
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 font-medium">
        Starter tiers + Drone Basic. Drag to change committed shoot volume; open
        the full calculator for every package and discount rule.
      </p>
      
      <label className="mt-5 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
        Committed shoots: <span className="text-zinc-800 font-extrabold">{committedShoots}</span>
      </label>
      
      <input
        type="range"
        min={0}
        max={VOLUME_SHOOT_OPTIONS.length - 1}
        step={1}
        value={shootTierIndex}
        onChange={(e) => setShootTierIndex(Number(e.target.value))}
        className="mt-3.5 w-full accent-[var(--brand-creative)] cursor-ew-resize"
        aria-label="Preview committed shoots tier"
      />
      
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 text-sm border-b border-zinc-200/50 pb-2.5">
        <span className="text-zinc-500 font-medium">Cart before discounts</span>
        <span className="tabular-nums text-zinc-700 font-semibold">{currency(preview.sub)}</span>
      </div>
      
      <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="text-zinc-700 font-semibold">Estimated after bundle rules</span>
        <span className="tabular-nums font-extrabold text-[var(--brand-creative)] text-base shadow-sm bg-[var(--brand-creative)]/5 px-2.5 py-0.5 rounded-md">
          {currency(preview.total)}
        </span>
      </div>
      
      <p className="mt-3.5 text-xs text-zinc-400 font-semibold tracking-wide">
        Total savings applied: <span className="text-zinc-700 font-bold">{currency(preview.saved)}</span>
      </p>
      
      <Link
        href="/pricing"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-zinc-950 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
      >
        Open full pricing calculator
      </Link>
    </div>
  );
}
