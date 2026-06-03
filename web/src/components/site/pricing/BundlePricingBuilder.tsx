"use client";

import { useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import {
  DRIVE_TIME_RATE_USD_PER_HOUR,
  DRONE_ADDONS,
  LOCAL_MULTI_DAY_OR_LOCATION_SURCHARGE_PERCENT,
  MAX_BILLABLE_DRIVE_HOURS_ONE_WAY_PER_DAY,
  MAX_TOTAL_DISCOUNT_PERCENT,
  PHOTO_PACKAGES,
  PRICING_SCHEDULING_CONTRACT_NOTE,
  PRICING_SCHEDULING_POLICY_BULLETS,
  SOCIAL_PACKAGES,
  VIDEO_PACKAGES,
  VOLUME_SHOOT_OPTIONS,
  calculateBundlePricing,
} from "@/config/pricingScaffold";

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

type PricingState = {
  includePhoto: boolean;
  photoIx: number;
  includeVideo: boolean;
  videoIx: number;
  includeSocial: boolean;
  socialIx: number;
  socialMonths: number;
  droneIx: number;
  photoRecurringMonths: number;
  videoRecurringMonths: number;
  committedShoots: (typeof VOLUME_SHOOT_OPTIONS)[number];
  currentStep: number;
};

type PricingAction =
  | { type: "SET_STEP"; value: number }
  | { type: "TOGGLE_PHOTO" }
  | { type: "TOGGLE_VIDEO" }
  | { type: "TOGGLE_SOCIAL" }
  | { type: "SELECT_PHOTO_TIER"; index: number }
  | { type: "SELECT_VIDEO_TIER"; index: number }
  | { type: "SET_SOCIAL_IX"; index: number }
  | { type: "SET_DRONE_IX"; index: number }
  | { type: "SET_SOCIAL_MONTHS"; value: number }
  | { type: "SET_PHOTO_RECURRING_MONTHS"; value: number }
  | { type: "SET_VIDEO_RECURRING_MONTHS"; value: number }
  | { type: "SET_COMMITTED_SHOOTS"; value: (typeof VOLUME_SHOOT_OPTIONS)[number] };

const initialState: PricingState = {
  includePhoto: true,
  photoIx: 0,
  includeVideo: true,
  videoIx: 0,
  includeSocial: true,
  socialIx: 0,
  socialMonths: 1,
  droneIx: 0,
  photoRecurringMonths: 1,
  videoRecurringMonths: 1,
  committedShoots: 1,
  currentStep: 1,
};

function pricingReducer(state: PricingState, action: PricingAction): PricingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.value };

    case "TOGGLE_PHOTO":
      return { ...state, includePhoto: !state.includePhoto };

    case "TOGGLE_VIDEO":
      return { ...state, includeVideo: !state.includeVideo };

    case "TOGGLE_SOCIAL":
      return { ...state, includeSocial: !state.includeSocial };

    case "SELECT_PHOTO_TIER":
      return { ...state, photoIx: action.index };

    case "SELECT_VIDEO_TIER":
      return { ...state, videoIx: action.index };

    case "SET_SOCIAL_IX":
      return { ...state, socialIx: action.index };

    case "SET_DRONE_IX":
      return { ...state, droneIx: action.index };

    case "SET_SOCIAL_MONTHS":
      return { ...state, socialMonths: Math.min(12, Math.max(1, action.value)) };

    case "SET_PHOTO_RECURRING_MONTHS":
      return { ...state, photoRecurringMonths: Math.min(12, Math.max(1, action.value)) };

    case "SET_VIDEO_RECURRING_MONTHS":
      return { ...state, videoRecurringMonths: Math.min(12, Math.max(1, action.value)) };

    case "SET_COMMITTED_SHOOTS":
      return { ...state, committedShoots: action.value };

    default:
      return state;
  }
}

function PackageCard<T extends { name: string; price: number; summary: string }>({
  pkg,
  selected,
  onSelect,
  footer,
}: {
  pkg: T;
  selected: boolean;
  onSelect: () => void;
  footer?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex h-full min-h-[10.75rem] w-full flex-col rounded-xl border px-3.5 py-3 text-left ring-1 ring-inset transition-[border-color,box-shadow,transform,background-color] active:translate-y-[1px] ${
        selected
          ? "translate-y-[1px] border-[color-mix(in_srgb,var(--brand-creative)_42%,transparent)] bg-[#121212] shadow-[inset_5px_5px_12px_rgba(0,0,0,0.78),inset_-4px_-4px_10px_rgba(255,255,255,0.05)] ring-[color-mix(in_srgb,var(--brand-creative)_24%,transparent)]"
          : "-translate-y-1 border-transparent bg-[#1b1b1b] shadow-[16px_16px_32px_rgba(0,0,0,0.66)] ring-transparent hover:-translate-y-1.5 hover:shadow-[18px_18px_36px_rgba(0,0,0,0.68)]"
      }`}
    >
      {selected ? (
        <span className="pointer-events-none absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          <span aria-hidden>✓</span>
          Selected
        </span>
      ) : null}
      <p className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-creative)]">
        {pkg.name}
      </p>
      <p className="mt-1.5 shrink-0 font-serif text-lg text-white">{currency(pkg.price)}</p>
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col">
        <p className="text-[11px] leading-relaxed text-zinc-500">{pkg.summary}</p>
        {footer ? (
          <div className="mt-auto flex shrink-0 flex-col border-t border-white/[0.06] pt-2.5">{footer}</div>
        ) : null}
        {selected ? (
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-300">Locked in</p>
        ) : null}
      </div>
    </button>
  );
}

function CommitmentDial({
  value,
  onChange,
  compact = false,
  center = "months",
}: {
  value: number;
  onChange: (next: number) => void;
  compact?: boolean;
  center?: "months" | "exchange";
}) {
  const dialRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const progress = (value - 1) / 11;
  const circleRadius = 46;
  const circleLength = 2 * Math.PI * circleRadius;
  const progressOffset = circleLength * (1 - progress);

  const updateFromPointer = (clientX: number, clientY: number) => {
    const el = dialRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - cy, clientX - cx);
    const deg = angle * (180 / Math.PI) + 90;
    const normalized = (deg + 360) % 360;
    const slot = Math.round(normalized / 30) % 12;
    onChange(slot + 1);
  };

  return (
    <div className="mt-3 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-lg text-zinc-200 shadow-[6px_6px_12px_rgba(0,0,0,0.45),-3px_-3px_8px_rgba(255,255,255,0.03)]"
        aria-label={center === "exchange" ? "Decrease recurring months" : "Decrease social commitment months"}
      >
        −
      </button>
      <div
        ref={dialRef}
        className={`relative grid place-items-center rounded-full border border-white/10 touch-none select-none ${
          compact ? "h-24 w-24" : "h-32 w-32"
        }`}
        onPointerDown={(e) => {
          e.preventDefault();
          draggingRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromPointer(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return;
          e.preventDefault();
          updateFromPointer(e.clientX, e.clientY);
        }}
        onPointerUp={(e) => {
          draggingRef.current = false;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
        onPointerCancel={(e) => {
          draggingRef.current = false;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
        aria-label={
          center === "exchange"
            ? "Rotate to set recurring commitment months"
            : "Rotate to set social commitment months"
        }
        role="slider"
        aria-valuemin={1}
        aria-valuemax={12}
        aria-valuenow={value}
      >
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r={circleRadius} fill="none" stroke="#222" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={circleRadius}
            fill="none"
            stroke="var(--brand-creative)"
            strokeWidth="8"
            strokeLinecap="butt"
            strokeDasharray={`${circleLength} ${circleLength}`}
            strokeDashoffset={progressOffset}
          />
        </svg>
        <div
          className={`flex flex-col items-center justify-center rounded-full bg-[#121212] text-center shadow-[inset_4px_4px_9px_rgba(0,0,0,0.6),inset_-2px_-2px_7px_rgba(255,255,255,0.04)] ${
            compact ? "h-16 w-16 gap-0.5" : "h-24 w-24 gap-1"
          }`}
        >
          {center === "exchange" ? (
            <>
              <span className={compact ? "text-sm font-semibold tabular-nums text-white" : "text-lg font-semibold tabular-nums text-white"}>
                {value}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-500">mo</span>
            </>
          ) : (
            <>
              <span className={compact ? "text-sm font-semibold text-white" : "text-lg font-semibold text-white"}>
                {value}
              </span>
              {!compact ? (
                <span className="text-[9px] uppercase tracking-[0.15em] text-zinc-500">months</span>
              ) : null}
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-lg text-zinc-200 shadow-[6px_6px_12px_rgba(0,0,0,0.45),-3px_-3px_8px_rgba(255,255,255,0.03)]"
        aria-label={center === "exchange" ? "Increase recurring months" : "Increase social commitment months"}
      >
        +
      </button>
    </div>
  );
}

function socialCommitmentDiscountPercent(months: number): number {
  if (months >= 5) return 30;
  if (months === 4) return 25;
  if (months === 3) return 15;
  if (months === 2) return 10;
  return 0;
}

function platformRangeFromSummary(summary: string): string {
  const m = summary.match(/(\d(?:[–-]\d)?)\s*platform/i);
  return m ? `${m[1]} platforms` : "multi-platform";
}

function RecurringCommitmentCard({
  title,
  months,
  onMonthsChange,
  discountPercent,
  totalAmount,
  totalLabel,
  detailLabel,
  compact = false,
  className = "",
}: {
  title: string;
  months: number;
  onMonthsChange: (next: number) => void;
  discountPercent: number;
  totalAmount: number;
  totalLabel: string;
  detailLabel?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`w-full rounded-2xl border border-white/[0.08] bg-[#181818] p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.55),inset_-2px_-2px_6px_rgba(255,255,255,0.03)] ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <CommitmentDial value={months} onChange={onMonthsChange} compact={compact} center="exchange" />
      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
        <div className="rounded-lg border border-white/[0.07] bg-[#141414] px-2 py-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Discount</p>
          <p className="mt-0.5 font-semibold text-[var(--brand-creative)]">{discountPercent}% off</p>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-[#141414] px-2 py-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{totalLabel}</p>
          <p className="mt-0.5 font-semibold text-white">{totalAmount}</p>
          {detailLabel ? <p className="text-[10px] text-zinc-500">{detailLabel}</p> : null}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BundlePricingBuilder() {
  const [state, dispatch] = useReducer(pricingReducer, initialState);
  const {
    includePhoto, photoIx, includeVideo, videoIx,
    includeSocial, socialIx, socialMonths, droneIx,
    photoRecurringMonths, videoRecurringMonths, committedShoots,
    currentStep,
  } = state;

  const photoRecurring = photoRecurringMonths > 1;
  const videoRecurring = videoRecurringMonths > 1;

  const result = useMemo(
    () =>
      calculateBundlePricing({
        includePhoto,
        photoPackageIndex: photoIx,
        includeVideo,
        videoPackageIndex: videoIx,
        includeSocial,
        socialPackageIndex: socialIx,
        socialCommitmentMonths: socialMonths,
        droneAddonIndex: droneIx,
        photoRecurring,
        videoRecurring,
        committedShoots,
        location: {
          milesFromMukilteo: 0,
          oneWayDriveMinutes: null,
          shootDays: 1,
          locationCount: 1,
        },
      }),
    [
      includePhoto,
      photoIx,
      includeVideo,
      videoIx,
      includeSocial,
      socialIx,
      socialMonths,
      droneIx,
      photoRecurring,
      videoRecurring,
      committedShoots,
    ],
  );

  const hasDroneStep = includePhoto || includeVideo;

  // Redirect from Drone step (Step 2) to Services step (Step 1) if Photo/Video are toggled off
  useEffect(() => {
    if (currentStep === 2 && !hasDroneStep) {
      dispatch({ type: "SET_STEP", value: 1 });
    }
  }, [currentStep, hasDroneStep]);

  // Thin wrappers so JSX call sites don't need inline dispatch objects
  const selectPhotoTier = (i: number) =>
    dispatch({ type: "SELECT_PHOTO_TIER", index: i });
  const selectVideoTier = (j: number) =>
    dispatch({ type: "SELECT_VIDEO_TIER", index: j });
  const updateSocialMonths = (next: number) => dispatch({ type: "SET_SOCIAL_MONTHS", value: next });
  const updatePhotoRecurringMonths = (next: number) => dispatch({ type: "SET_PHOTO_RECURRING_MONTHS", value: next });
  const updateVideoRecurringMonths = (next: number) => dispatch({ type: "SET_VIDEO_RECURRING_MONTHS", value: next });

  const toggle = (on: boolean) =>
    `relative flex h-full min-h-[72px] cursor-pointer flex-col justify-center gap-1 overflow-hidden rounded-xl border px-3.5 py-2.5 ring-1 ring-inset transition-[transform,border-color,box-shadow,background-color] ${
      on
        ? "translate-y-[1px] border-[color-mix(in_srgb,var(--brand-creative)_48%,white_8%)] bg-[linear-gradient(160deg,#161616_0%,#0e0e0e_100%)] shadow-[inset_4px_4px_10px_rgba(0,0,0,0.72),inset_-3px_-3px_9px_rgba(255,255,255,0.05)] ring-[color-mix(in_srgb,var(--brand-creative)_22%,transparent)]"
        : "-translate-y-0.5 border-white/[0.08] bg-[#141414] ring-white/[0.04] shadow-[10px_10px_22px_rgba(0,0,0,0.62),-6px_-6px_16px_rgba(255,255,255,0.04)] hover:-translate-y-1"
    }`;
  const navButtonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-zinc-100 shadow-[8px_8px_18px_rgba(0,0,0,0.45)] transition-[transform,opacity,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[10px_10px_20px_rgba(0,0,0,0.52)] disabled:cursor-not-allowed disabled:opacity-35";

  const selectedPhotoPackage = PHOTO_PACKAGES[photoIx] ?? PHOTO_PACKAGES[0];
  const selectedVideoPackage = VIDEO_PACKAGES[videoIx] ?? VIDEO_PACKAGES[0];
  const selectedSocialPackage = SOCIAL_PACKAGES[socialIx] ?? SOCIAL_PACKAGES[0];
  const photoRecurringDiscountPct = socialCommitmentDiscountPercent(photoRecurringMonths);
  const videoRecurringDiscountPct = socialCommitmentDiscountPercent(videoRecurringMonths);
  const totalRecurringPhotos = selectedPhotoPackage.photos * photoRecurringMonths;
  const totalRecurringClips = selectedVideoPackage.clips * videoRecurringMonths;
  const socialDiscountPct = socialCommitmentDiscountPercent(socialMonths);
  const totalScheduledPosts = selectedSocialPackage.postsPerMonth * socialMonths;
  const platformRange = platformRangeFromSummary(selectedSocialPackage.summary);

  const stepStates = [
    {
      label: "Services",
      complete: includePhoto || includeVideo || includeSocial,
      required: true,
    },
    {
      label: "Drone",
      complete: true,
      required: includePhoto || includeVideo,
    },
    {
      label: "Savings",
      complete: committedShoots >= 1,
      required: true,
    },
  ] as const;

  const isServicesComplete = includePhoto || includeVideo || includeSocial;
  const isStep2Navigable = isServicesComplete && hasDroneStep;
  const isStep3Navigable = isServicesComplete;

  const maxNavigableStep = isStep3Navigable ? 3 : (isStep2Navigable ? 2 : 1);
  const effectiveStep =
    currentStep > maxNavigableStep ? maxNavigableStep : currentStep < 1 ? 1 : currentStep;

  const progressPct = Math.max(8, Math.round((effectiveStep / 3) * 100));

  const canGoBack = effectiveStep > 1;
  const canGoNext = effectiveStep < maxNavigableStep;
  
  const nextStep = effectiveStep === 1 && !hasDroneStep ? 3 : Math.min(effectiveStep + 1, 3);
  const prevStep = effectiveStep === 3 && !hasDroneStep ? 1 : Math.max(effectiveStep - 1, 1);

  const currentStepLabel =
    !isServicesComplete ? "Services" : (effectiveStep === 1 ? "Services" : (effectiveStep === 2 ? "Drone" : "Savings"));

  return (
    <div className="space-y-14 bg-[#0b0b0b]">
      <section className="rounded-[22px] border border-white/[0.08] bg-[#1a1a1a] p-4 shadow-[14px_14px_34px_rgba(0,0,0,0.64),-8px_-8px_18px_rgba(255,255,255,0.04)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Build flow · {currentStepLabel}
          </p>
          <p className="text-xs tabular-nums text-zinc-500">{progressPct}% complete</p>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-[#111] p-0.5 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.7),inset_-3px_-3px_8px_rgba(255,255,255,0.04)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-creative)_0%,color-mix(in_srgb,var(--brand-creative)_70%,white_30%)_100%)] transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {stepStates.map((step, idx) => {
            const isCurrent = idx + 1 === effectiveStep;
            const isComplete = step.complete;
            const isLocked = idx + 1 > maxNavigableStep;
            const baseStateClasses =
              "border-[color-mix(in_srgb,var(--brand-creative)_50%,white_10%)] bg-[#1c1c1c] text-zinc-100 shadow-[10px_10px_18px_rgba(0,0,0,0.52),-5px_-5px_12px_rgba(255,255,255,0.04)]";
            const stateRingClasses = isCurrent
              ? "ring-1 ring-[color-mix(in_srgb,var(--brand-creative)_65%,white_20%)]"
              : isComplete
                ? "ring-1 ring-white/15"
                : "ring-0";
            return (
              <button
                key={step.label}
                type="button"
                disabled={isLocked}
                onClick={() => dispatch({ type: "SET_STEP", value: idx + 1 })}
                className={`rounded-xl border px-3 py-2 text-left text-xs transition-opacity ${baseStateClasses} ${stateRingClasses} ${
                  isLocked ? "cursor-not-allowed opacity-45" : "cursor-pointer"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Step {idx + 1}</p>
                <p className="mt-1 font-medium">{step.label}</p>
              </button>
            );
          })}
        </div>
      </section>

      {effectiveStep === 1 ? (
        <>
          <section className="rounded-[22px] border border-white/[0.08] bg-[#1a1a1a] p-5 shadow-[14px_14px_34px_rgba(0,0,0,0.64),-8px_-8px_18px_rgba(255,255,255,0.04)]">
            <h2 className="font-serif text-xl text-white sm:text-2xl">
              Step 1 · Services
            </h2>
            <div className="mt-4 grid grid-cols-1 items-stretch gap-3 md:grid-cols-3">
              <label className={toggle(includePhoto)}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={includePhoto}
                  onChange={() => dispatch({ type: "TOGGLE_PHOTO" })}
                />
                <span className="text-[13px] font-medium text-white">Photography</span>
                <span className="text-xs text-zinc-500">Packages & on-site time</span>
              </label>
              <label className={toggle(includeVideo)}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={includeVideo}
                  onChange={() => dispatch({ type: "TOGGLE_VIDEO" })}
                />
                <span className="text-[13px] font-medium text-white">Videography</span>
                <span className="text-xs text-zinc-500">Clips & edit scope</span>
              </label>
              <label className={toggle(includeSocial)}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={includeSocial}
                  onChange={() => dispatch({ type: "TOGGLE_SOCIAL" })}
                />
                <span className="text-[13px] font-medium text-white">Social</span>
                <span className="text-xs text-zinc-500">Posts / month</span>
              </label>
            </div>
          </section>

          {/* Phone: stacked by category. md+: tier rows (below). */}
          <div className="space-y-9 md:hidden">
        {includePhoto ? (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Photography packages
            </h3>
            <div className="mt-3.5 grid gap-2.5">
              {PHOTO_PACKAGES.map((p, i) => (
                <PackageCard
                  key={p.id}
                  pkg={p}
                  selected={photoIx === i}
                  onSelect={() => selectPhotoTier(i)}
                  footer={
                    <p className="text-[10px] text-zinc-600">
                      On-site ~{p.onSiteHours}h · {p.photos} finals
                    </p>
                  }
                />
              ))}
            </div>
            <RecurringCommitmentCard
              title="Photo commitment"
              months={photoRecurringMonths}
              onMonthsChange={updatePhotoRecurringMonths}
              discountPercent={photoRecurringDiscountPct}
              totalAmount={totalRecurringPhotos}
              totalLabel="Total photos"
              className="mt-3.5"
            />
          </section>
        ) : null}

        {includeVideo ? (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Video packages
            </h3>
            <div className="mt-3.5 grid gap-2.5">
              {VIDEO_PACKAGES.map((p, i) => (
                <PackageCard
                  key={p.id}
                  pkg={p}
                  selected={videoIx === i}
                  onSelect={() => selectVideoTier(i)}
                  footer={
                    <p className="text-[10px] text-zinc-600">
                      On-site ~{p.onSiteHours}h · {p.clips}×{p.clipLengthSec}s
                      clips
                    </p>
                  }
                />
              ))}
            </div>
            <RecurringCommitmentCard
              title="Video commitment"
              months={videoRecurringMonths}
              onMonthsChange={updateVideoRecurringMonths}
              discountPercent={videoRecurringDiscountPct}
              totalAmount={totalRecurringClips}
              totalLabel="Total clips"
              className="mt-3.5"
            />
          </section>
        ) : null}

        {includeSocial ? (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Social packages / month
            </h3>
            <div className="mt-3.5 grid gap-2.5">
              {SOCIAL_PACKAGES.map((p, i) => (
                <PackageCard
                  key={p.id}
                  pkg={p}
                  selected={socialIx === i}
                  onSelect={() => dispatch({ type: "SET_SOCIAL_IX", index: i })}
                  footer={
                    <p className="text-[10px] text-zinc-600">
                      {p.postsPerMonth} posts / mo
                    </p>
                  }
                />
              ))}
            </div>
            <div className="mt-4 w-full rounded-2xl border border-white/[0.08] bg-[#181818] p-4 shadow-[inset_3px_3px_8px_rgba(0,0,0,0.58),inset_-2px_-2px_6px_rgba(255,255,255,0.03)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Commitment
              </p>
              <CommitmentDial value={socialMonths} onChange={updateSocialMonths} />
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                <div className="rounded-lg border border-white/[0.07] bg-[#141414] px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Discount</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--brand-creative)]">{socialDiscountPct}% off</p>
                </div>
                <div className="rounded-lg border border-white/[0.07] bg-[#141414] px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Total posts</p>
                  <p className="mt-1 text-sm font-semibold text-white">{totalScheduledPosts} posts</p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">{platformRange}</p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
          </div>

          {/* md+: tier rows align across columns; tiles share height per row */}
          <div className="hidden space-y-3.5 md:block">
        {(() => {
          const active = [includePhoto, includeVideo, includeSocial].filter(Boolean).length;
          if (active === 0) return null;
          const colClass =
            active === 3 ? "md:grid-cols-3" : active === 2 ? "md:grid-cols-2" : "md:grid-cols-1";
          return (
            <>
              <div className={`grid gap-x-6 gap-y-2 ${colClass}`}>
                {includePhoto ? (
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Photography packages
                  </h3>
                ) : null}
                {includeVideo ? (
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Video packages
                  </h3>
                ) : null}
                {includeSocial ? (
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Social packages / month
                  </h3>
                ) : null}
              </div>

              {[0, 1, 2, 3].map((tier) => (
                <div key={tier} className={`grid items-stretch gap-2.5 ${colClass}`}>
                  {includePhoto ? (
                    <PackageCard
                      pkg={PHOTO_PACKAGES[tier]!}
                      selected={photoIx === tier}
                      onSelect={() => selectPhotoTier(tier)}
                      footer={
                        <p className="text-[10px] text-zinc-600">
                          On-site ~{PHOTO_PACKAGES[tier]!.onSiteHours}h ·{" "}
                          {PHOTO_PACKAGES[tier]!.photos} finals
                        </p>
                      }
                    />
                  ) : null}
                  {includeVideo ? (
                    <PackageCard
                      pkg={VIDEO_PACKAGES[tier]!}
                      selected={videoIx === tier}
                      onSelect={() => selectVideoTier(tier)}
                      footer={
                        <p className="text-[10px] text-zinc-600">
                          On-site ~{VIDEO_PACKAGES[tier]!.onSiteHours}h ·{" "}
                          {VIDEO_PACKAGES[tier]!.clips}×{VIDEO_PACKAGES[tier]!.clipLengthSec}s clips
                        </p>
                      }
                    />
                  ) : null}
                  {includeSocial ? (
                    <PackageCard
                      pkg={SOCIAL_PACKAGES[tier]!}
                      selected={socialIx === tier}
                      onSelect={() => dispatch({ type: "SET_SOCIAL_IX", index: tier })}
                      footer={
                        <p className="text-[10px] text-zinc-600">
                          {SOCIAL_PACKAGES[tier]!.postsPerMonth} posts / mo
                        </p>
                      }
                    />
                  ) : null}
                </div>
              ))}

              <div className={`mt-1.5 grid items-start gap-x-6 gap-y-3.5 ${colClass}`}>
                {includePhoto ? (
                  <RecurringCommitmentCard
                    title="Photo commitment"
                    months={photoRecurringMonths}
                    onMonthsChange={updatePhotoRecurringMonths}
                    discountPercent={photoRecurringDiscountPct}
                    totalAmount={totalRecurringPhotos}
                    totalLabel="Total photos"
                    compact
                  />
                ) : null}
                {includeVideo ? (
                  <RecurringCommitmentCard
                    title="Video commitment"
                    months={videoRecurringMonths}
                    onMonthsChange={updateVideoRecurringMonths}
                    discountPercent={videoRecurringDiscountPct}
                    totalAmount={totalRecurringClips}
                    totalLabel="Total clips"
                    compact
                  />
                ) : null}
                {includeSocial ? (
                  <div className="w-full rounded-2xl border border-white/[0.08] bg-[#181818] p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.55),inset_-2px_-2px_6px_rgba(255,255,255,0.03)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Commitment
                    </p>
                    <CommitmentDial value={socialMonths} onChange={updateSocialMonths} compact />
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                      <div className="rounded-lg border border-white/[0.07] bg-[#141414] px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Discount</p>
                        <p className="mt-0.5 font-semibold text-[var(--brand-creative)]">{socialDiscountPct}% off</p>
                      </div>
                      <div className="rounded-lg border border-white/[0.07] bg-[#141414] px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Total posts</p>
                        <p className="mt-0.5 font-semibold text-white">{totalScheduledPosts}</p>
                        <p className="text-[10px] text-zinc-500">{platformRange}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          );
        })()}
          </div>
          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_STEP", value: prevStep })}
              disabled={!canGoBack}
              className={navButtonClass}
              aria-label="Previous step"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M11.75 4.5 6.25 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_STEP", value: nextStep })}
              disabled={!canGoNext}
              className={navButtonClass}
              aria-label="Next step"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M8.25 4.5 13.75 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </>
      ) : null}

      {effectiveStep === 2 && hasDroneStep && (
        <section className="rounded-[22px] border border-white/[0.08] bg-[#1a1a1a] p-5 shadow-[14px_14px_34px_rgba(0,0,0,0.64),-8px_-8px_18px_rgba(255,255,255,0.04)]">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            Step 2 · Drone
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
            Add a dedicated drone package, or skip.
          </p>
          <div className="mt-4 grid grid-cols-1 items-stretch gap-2.5 md:grid-cols-3">
            {DRONE_ADDONS.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => dispatch({ type: "SET_DRONE_IX", index: i })}
                className={`flex h-full min-h-[5rem] w-full flex-col rounded-xl border px-3.5 py-3 text-left text-sm ring-1 ring-inset transition-[transform,border-color,box-shadow,background-color] ${
                  droneIx === i
                    ? "translate-y-[1px] border-[color-mix(in_srgb,var(--brand-creative)_48%,white_8%)] bg-[linear-gradient(160deg,#161616_0%,#0e0e0e_100%)] text-white shadow-[inset_4px_4px_10px_rgba(0,0,0,0.72),inset_-3px_-3px_9px_rgba(255,255,255,0.05)] ring-[color-mix(in_srgb,var(--brand-creative)_22%,transparent)]"
                    : "-translate-y-0.5 border-white/[0.08] bg-[#141414] text-zinc-400 ring-white/[0.04] shadow-[10px_10px_22px_rgba(0,0,0,0.62),-6px_-6px_16px_rgba(255,255,255,0.04)] hover:-translate-y-1"
                }`}
              >
                <span className="shrink-0 font-medium text-white">{d.name}</span>
                {droneIx === i ? (
                  <span className="mt-1 inline-flex w-fit rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-200">
                    Selected
                  </span>
                ) : null}
                <span className="mt-auto block pt-2 text-xs leading-relaxed text-zinc-500">
                  {d.price > 0 ? currency(d.price) : "—"} · {d.summary}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_STEP", value: prevStep })}
              disabled={!canGoBack}
              className={navButtonClass}
              aria-label="Previous step"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M11.75 4.5 6.25 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_STEP", value: nextStep })}
              disabled={!canGoNext}
              className={navButtonClass}
              aria-label="Next step"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M8.25 4.5 13.75 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </section>
      )}

      {effectiveStep === 3 ? (
        <section className="rounded-[22px] border border-white/[0.08] bg-[#1a1a1a] p-5 shadow-[14px_14px_34px_rgba(0,0,0,0.64),-8px_-8px_18px_rgba(255,255,255,0.04)]">
        <h2 className="font-serif text-xl text-white sm:text-2xl">
          Step 3 · Savings
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Choose committed shoots to unlock more savings (up to {MAX_TOTAL_DISCOUNT_PERCENT}% max).
        </p>
        <div className="mt-4 max-w-md">
          <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Committed shoots (volume tier): {committedShoots} →{" "}
            {result.volumeDiscountPercent}% off production
          </label>
          <select
            value={committedShoots}
            onChange={(e) =>
              dispatch({ type: "SET_COMMITTED_SHOOTS", value: Number(e.target.value) as (typeof VOLUME_SHOOT_OPTIONS)[number] })
            }
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#141414] px-3.5 py-2.5 text-[13px] text-white shadow-[inset_5px_5px_12px_rgba(0,0,0,0.72),inset_-4px_-4px_10px_rgba(255,255,255,0.03)] outline-none focus:border-white/20"
            aria-label="Committed shoots for volume discount"
          >
            {VOLUME_SHOOT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} shoot{n !== 1 ? "s" : ""} booked
              </option>
            ))}
          </select>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-2 text-xs text-zinc-500 md:grid-cols-2">
          <li>Photo + Video (no social) → 5% off production</li>
          <li>Photo or Video + Social → 5% off full cart</li>
          <li>Photo + Video + Social → 10% off full cart</li>
          <li>
            Recurring photo or video + social → 10% off social fees; both → 20%
          </li>
        </ul>
        <div className="mt-5 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_STEP", value: prevStep })}
            disabled={!canGoBack}
            className={navButtonClass}
            aria-label="Previous step"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M11.75 4.5 6.25 10l5.5 5.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_STEP", value: nextStep })}
            disabled={!canGoNext}
            className={navButtonClass}
            aria-label="Next step"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M8.25 4.5 13.75 10l-5.5 5.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        </section>
      ) : null}

      <aside className="rounded-[24px] border border-white/[0.1] bg-[#1a1a1a] p-5 shadow-[16px_16px_36px_rgba(0,0,0,0.64),-9px_-9px_20px_rgba(255,255,255,0.04)] ring-1 ring-inset ring-white/[0.04] lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Live estimate
        </p>
        <p className="mt-2 font-serif text-2xl text-[var(--brand-creative)]">
          {currency(result.grandTotal)}
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          {result.effectiveDiscountPercent}% effective savings on services · Subtotal{" "}
          {currency(result.subtotal)}
        </p>

        <dl className="mt-5 space-y-2 border-t border-white/[0.06] pt-5 text-sm">
          {includePhoto && (
            <div className="flex justify-between gap-4 text-zinc-400">
              <dt>
                Photo · {PHOTO_PACKAGES[result.effectivePhotoPackageIndex]?.name}
                {photoIx !== result.effectivePhotoPackageIndex ? (
                  <span className="block text-[10px] text-zinc-600">
                    (card: {PHOTO_PACKAGES[photoIx]?.name})
                  </span>
                ) : null}
              </dt>
              <dd className="tabular-nums">{currency(result.photoPrice)}</dd>
            </div>
          )}
          {includeVideo && (
            <div className="flex justify-between gap-4 text-zinc-400">
              <dt>
                Video · {VIDEO_PACKAGES[result.effectiveVideoPackageIndex]?.name}
                {videoIx !== result.effectiveVideoPackageIndex ? (
                  <span className="block text-[10px] text-zinc-600">
                    (card: {VIDEO_PACKAGES[videoIx]?.name})
                  </span>
                ) : null}
              </dt>
              <dd className="tabular-nums">{currency(result.videoPrice)}</dd>
            </div>
          )}
          {droneIx > 0 && (
            <div className="flex justify-between gap-4 text-zinc-400">
              <dt>Drone · {DRONE_ADDONS[droneIx]?.name}</dt>
              <dd className="tabular-nums">{currency(result.dronePrice)}</dd>
            </div>
          )}
          {includeSocial && (
            <div className="flex justify-between gap-4 text-zinc-400">
              <dt>
                Social · {SOCIAL_PACKAGES[socialIx]?.name} × {socialMonths} mo
              </dt>
              <dd className="tabular-nums">{currency(result.socialLine)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 border-t border-white/[0.06] pt-2 font-medium text-zinc-300">
            <dt>Cart subtotal</dt>
            <dd className="tabular-nums">{currency(result.subtotal)}</dd>
          </div>
        </dl>

        <ul className="mt-4 space-y-2 text-sm">
          {result.bundleDiscountAmount > 0 && (
            <li className="flex justify-between text-[var(--brand-creative)]">
              <span>
                Bundle ({result.bundleDiscountPercent}%{" "}
                {includePhoto && includeVideo && !includeSocial
                  ? "production"
                  : "cart"}
                )
              </span>
              <span className="tabular-nums">
                −{currency(result.bundleDiscountAmount)}
              </span>
            </li>
          )}
          {result.socialRecurringCreditAmount > 0 && (
            <li className="flex justify-between text-[var(--brand-creative)]">
              <span>
                Social commitment ({result.socialRecurringCreditPercent}% of
                social line)
              </span>
              <span className="tabular-nums">
                −{currency(result.socialRecurringCreditAmount)}
              </span>
            </li>
          )}
          {result.volumeDiscountAmount > 0 && (
            <li className="flex justify-between text-[var(--brand-creative)]">
              <span>Volume ({result.volumeDiscountPercent}% production)</span>
              <span className="tabular-nums">
                −{currency(result.volumeDiscountAmount)}
              </span>
            </li>
          )}
          {result.capAdjustment > 0.01 && (
            <li className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/90">
              Stacked rules would save {currency(result.rawTotalDiscount)}; applied
              savings are capped at {MAX_TOTAL_DISCOUNT_PERCENT}% of subtotal (
              {currency(result.cappedTotalDiscount)} total).
            </li>
          )}

        </ul>
      </aside>

      <details className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-5">
        <summary className="cursor-pointer text-sm font-semibold text-amber-100/90">
          Scheduling policy
        </summary>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          {PRICING_SCHEDULING_POLICY_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-zinc-500">{PRICING_SCHEDULING_CONTRACT_NOTE}</p>
      </details>
    </div>
  );
}
