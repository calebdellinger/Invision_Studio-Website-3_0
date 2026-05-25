"use client";

import { useMemo, useState, type ReactElement } from "react";
import { SOCIAL_MONTHLY_DEFAULT_TIER_INDEX, SOCIAL_MONTHLY_TIERS_USD } from "@/config/pricingScaffold";

type BundleType = "photo" | "video";
type BillingView = "monthly" | "yearly";

const socialManagementMonthly =
  SOCIAL_MONTHLY_TIERS_USD[SOCIAL_MONTHLY_DEFAULT_TIER_INDEX];

const bundleProfiles: Record<
  BundleType,
  {
    label: string;
    separateProductionMonthly: number;
    icon: ReactElement;
  }
> = {
  photo: {
    label: "Social + Photography",
    separateProductionMonthly: 1800,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M7 5l1.2-2h7.6L17 5h2a3 3 0 013 3v8a3 3 0 01-3 3H5a3 3 0 01-3-3V8a3 3 0 013-3h2zm5 3.2A4.8 4.8 0 1012 18a4.8 4.8 0 000-9.6zm0 2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6z" />
      </svg>
    ),
  },
  video: {
    label: "Social + Videography",
    separateProductionMonthly: 2500,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M4 6h11a3 3 0 013 3v1.3l3.3-2a1 1 0 011.5.9v5.6a1 1 0 01-1.5.9L18 13.7V15a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3zm6.5 3.2v5.6l4.8-2.8-4.8-2.8z" />
      </svg>
    ),
  },
};

const currency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function SocialBundleSavingsEstimator() {
  const [bundleType, setBundleType] = useState<BundleType>("photo");
  const [billingView, setBillingView] = useState<BillingView>("monthly");
  const [bundleDiscount, setBundleDiscount] = useState(20);

  const values = useMemo(() => {
    const separateProduction =
      bundleProfiles[bundleType].separateProductionMonthly;
    const separateStackMonthly = socialManagementMonthly + separateProduction;
    const bundledMonthly =
      separateStackMonthly * (1 - bundleDiscount / 100);

    const multiplier = billingView === "yearly" ? 12 : 1;

    return {
      managementOnly: socialManagementMonthly * multiplier,
      separateStack: separateStackMonthly * multiplier,
      bundled: bundledMonthly * multiplier,
      savings: (separateStackMonthly - bundledMonthly) * multiplier,
      viewLabel: billingView === "yearly" ? "per year" : "per month",
    };
  }, [bundleType, billingView, bundleDiscount]);

  const maxValue = Math.max(values.separateStack, values.managementOnly, values.bundled);
  const width = (value: number) => `${Math.max((value / maxValue) * 100, 10)}%`;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0f0f0f]/90 p-6 ring-1 ring-inset ring-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
          Savings simulator
        </p>
        <div className="inline-flex rounded-full border border-white/10 bg-[#0a0a0a] p-1">
          {(["monthly", "yearly"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setBillingView(view)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                billingView === view
                  ? "bg-[var(--brand-creative)] text-[#0b0b0b]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)]">
        Bundle and save on content production
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Most of the effort is in the content itself. Bundling social management
        with a recurring shoot usually costs less than hiring separate teams for
        planning, production, and rollout.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["photo", "video"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setBundleType(type)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
              bundleType === type
                ? "border-[color-mix(in_srgb,var(--brand-creative)_50%,white_10%)] bg-[color-mix(in_srgb,var(--brand-creative)_16%,#0a0a0a)] text-white"
                : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <span className={bundleType === type ? "text-[var(--brand-creative)]" : ""}>
              {bundleProfiles[type].icon}
            </span>
            {bundleProfiles[type].label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Bundle discount: {bundleDiscount}%
        </label>
        <input
          type="range"
          min={10}
          max={40}
          step={1}
          value={bundleDiscount}
          onChange={(event) => setBundleDiscount(Number(event.target.value))}
          className="mt-3 w-full accent-[var(--brand-creative)]"
        />
      </div>

      <div className="mt-7 space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
            <span>Avg social media management ({values.viewLabel})</span>
            <span>{currency(values.managementOnly)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-zinc-400/65"
              style={{ width: width(values.managementOnly) }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
            <span>Separate teams: social + {bundleProfiles[bundleType].label.split(" + ")[1]} ({values.viewLabel})</span>
            <span>{currency(values.separateStack)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-zinc-200/85"
              style={{ width: width(values.separateStack) }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-zinc-300">
            <span>Bundled with Invision ({values.viewLabel})</span>
            <span className="text-[var(--brand-creative)]">{currency(values.bundled)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[var(--brand-creative)]"
              style={{ width: width(values.bundled) }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[color-mix(in_srgb,var(--brand-creative)_30%,white_6%)] bg-[color-mix(in_srgb,var(--brand-creative)_12%,#0a0a0a)] p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-300">
          Estimated savings ({values.viewLabel})
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--brand-creative)]">
          {currency(values.savings)}
        </p>
      </div>
    </div>
  );
}
