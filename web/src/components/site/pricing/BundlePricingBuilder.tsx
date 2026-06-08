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
      className={`group relative flex h-full min-h-[10.75rem] w-[260px] md:w-full shrink-0 flex-col rounded-xl border p-4 text-left transition-all duration-200 snap-center ${
        selected
          ? "border-[var(--brand-creative)] bg-[color-mix(in_srgb,var(--brand-creative)_3%,white)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-[var(--brand-creative)] -translate-y-1"
          : "border-zinc-200 bg-white hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
      }`}
    >
      {selected ? (
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--brand-creative)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
          <span aria-hidden>✓</span>
          Selected
        </span>
      ) : null}
      <p className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] ${selected ? "text-[var(--brand-creative)]" : "text-zinc-500"}`}>
        {pkg.name}
      </p>
      <p className="mt-1.5 shrink-0 font-serif text-2xl text-zinc-900">{currency(pkg.price)}</p>
      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        <p className="text-xs leading-relaxed text-zinc-600">{pkg.summary}</p>
        {footer ? (
          <div className={`mt-auto flex shrink-0 flex-col border-t pt-3 ${selected ? "border-[var(--brand-creative)]/10" : "border-zinc-100"}`}>
            {footer}
          </div>
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
    <div className="mt-3 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 shadow-sm transition-colors"
        aria-label="Decrease months"
      >
        −
      </button>
      <div
        ref={dialRef}
        className={`relative grid place-items-center rounded-full touch-none select-none ${
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
        role="slider"
        aria-valuemin={1}
        aria-valuemax={12}
        aria-valuenow={value}
      >
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={circleRadius} fill="none" stroke="#f4f4f5" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={circleRadius}
            fill="none"
            stroke="var(--brand-creative)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circleLength} ${circleLength}`}
            strokeDashoffset={progressOffset}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>
        <div className={`flex flex-col items-center justify-center text-center ${compact ? "gap-0" : "gap-1"}`}>
          <span className={`${compact ? "text-xl" : "text-3xl"} font-semibold text-zinc-900 tracking-tight`}>
            {value}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
            {compact ? "mo" : "months"}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 shadow-sm transition-colors"
        aria-label="Increase months"
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
    <div className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <CommitmentDial value={months} onChange={onMonthsChange} compact={compact} center="exchange" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Discount</p>
          <p className="mt-1 text-sm font-bold text-[var(--brand-creative)]">{discountPercent}% off</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">{totalLabel}</p>
          <p className="mt-1 text-sm font-bold text-zinc-900">{totalAmount}</p>
          {detailLabel ? <p className="text-[10px] text-zinc-500 mt-0.5">{detailLabel}</p> : null}
        </div>
      </div>
    </div>
  );
}

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
      includePhoto, photoIx, includeVideo, videoIx, includeSocial, socialIx,
      socialMonths, droneIx, photoRecurring, videoRecurring, committedShoots,
    ]
  );

  const hasDroneStep = includePhoto || includeVideo;

  useEffect(() => {
    if (currentStep === 2 && !hasDroneStep) {
      dispatch({ type: "SET_STEP", value: 1 });
    }
  }, [currentStep, hasDroneStep]);

  const selectPhotoTier = (i: number) => dispatch({ type: "SELECT_PHOTO_TIER", index: i });
  const selectVideoTier = (j: number) => dispatch({ type: "SELECT_VIDEO_TIER", index: j });
  const updateSocialMonths = (next: number) => dispatch({ type: "SET_SOCIAL_MONTHS", value: next });
  const updatePhotoRecurringMonths = (next: number) => dispatch({ type: "SET_PHOTO_RECURRING_MONTHS", value: next });
  const updateVideoRecurringMonths = (next: number) => dispatch({ type: "SET_VIDEO_RECURRING_MONTHS", value: next });

  const toggle = (on: boolean) =>
    `relative flex h-full min-h-[80px] cursor-pointer flex-col justify-center gap-1 overflow-hidden rounded-xl border p-4 transition-all duration-200 ${
      on
        ? "border-[var(--brand-creative)] bg-[color-mix(in_srgb,var(--brand-creative)_3%,white)] shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-[var(--brand-creative)] -translate-y-0.5"
        : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:shadow-sm"
    }`;

  const navButtonClass =
    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-md";

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

  const isServicesComplete = includePhoto || includeVideo || includeSocial;
  const isStep2Navigable = isServicesComplete && hasDroneStep;
  const isStep3Navigable = isServicesComplete;

  const maxNavigableStep = isStep3Navigable ? 3 : (isStep2Navigable ? 2 : 1);
  const effectiveStep = currentStep > maxNavigableStep ? maxNavigableStep : currentStep < 1 ? 1 : currentStep;
  const progressPct = Math.max(10, Math.round((effectiveStep / 3) * 100));

  const canGoBack = effectiveStep > 1;
  const canGoNext = effectiveStep < maxNavigableStep;
  
  const nextStep = effectiveStep === 1 && !hasDroneStep ? 3 : Math.min(effectiveStep + 1, 3);
  const prevStep = effectiveStep === 3 && !hasDroneStep ? 1 : Math.max(effectiveStep - 1, 1);

  const currentStepLabel = !isServicesComplete ? "Services" : (effectiveStep === 1 ? "Services" : (effectiveStep === 2 ? "Drone" : "Savings"));

  const stepStates = [
    { label: "Services", complete: includePhoto || includeVideo || includeSocial, required: true },
    { label: "Drone", complete: true, required: includePhoto || includeVideo },
    { label: "Savings", complete: committedShoots >= 1, required: true },
  ] as const;

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 md:flex-row md:items-start pb-40 md:pb-12 bg-white">
      
      {/* LEFT COLUMN - BUILDER */}
      <div className="flex-1 w-full space-y-12">
        
        {/* Progress Header */}
        <section className="rounded-[24px] border border-zinc-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Build flow · {currentStepLabel}
            </p>
            <p className="text-xs font-semibold tabular-nums text-zinc-500">{progressPct}% complete</p>
          </div>
          <div className="mt-4 h-2.5 rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-[var(--brand-creative)] transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {stepStates.map((step, idx) => {
              const isCurrent = idx + 1 === effectiveStep;
              const isLocked = idx + 1 > maxNavigableStep;
              return (
                <button
                  key={step.label}
                  type="button"
                  disabled={isLocked}
                  onClick={() => dispatch({ type: "SET_STEP", value: idx + 1 })}
                  className={`rounded-xl border p-3 text-left transition-all duration-200 ${
                    isCurrent
                      ? "border-[var(--brand-creative)] bg-[color-mix(in_srgb,var(--brand-creative)_3%,white)] ring-1 ring-[var(--brand-creative)]"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100"
                  } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isCurrent ? "text-[var(--brand-creative)]" : "text-zinc-400"}`}>Step {idx + 1}</p>
                  <p className={`mt-1 text-sm font-semibold ${isCurrent ? "text-zinc-900" : "text-zinc-600"}`}>{step.label}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 1: SERVICES */}
        {effectiveStep === 1 && (
          <section className="space-y-10">
            <div className="rounded-[24px] border border-zinc-200 bg-white p-5 md:p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-zinc-900 md:text-3xl">Step 1 · Services</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                <label className={toggle(includePhoto)}>
                  <input type="checkbox" className="sr-only" checked={includePhoto} onChange={() => dispatch({ type: "TOGGLE_PHOTO" })} />
                  <span className="text-sm font-bold text-zinc-900">Photography</span>
                  <span className="text-xs text-zinc-500 mt-0.5">Packages & on-site time</span>
                </label>
                <label className={toggle(includeVideo)}>
                  <input type="checkbox" className="sr-only" checked={includeVideo} onChange={() => dispatch({ type: "TOGGLE_VIDEO" })} />
                  <span className="text-sm font-bold text-zinc-900">Videography</span>
                  <span className="text-xs text-zinc-500 mt-0.5">Clips & edit scope</span>
                </label>
                <label className={toggle(includeSocial)}>
                  <input type="checkbox" className="sr-only" checked={includeSocial} onChange={() => dispatch({ type: "TOGGLE_SOCIAL" })} />
                  <span className="text-sm font-bold text-zinc-900">Social</span>
                  <span className="text-xs text-zinc-500 mt-0.5">Posts / month</span>
                </label>
              </div>
            </div>

            {/* Mobile Swipeable / Desktop Grid */}
            <div className="space-y-10">
              {includePhoto && (
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-900 mb-4 px-1">Photography packages</h3>
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 md:grid md:grid-cols-4 md:overflow-visible no-scrollbar">
                    {PHOTO_PACKAGES.map((p, i) => (
                      <PackageCard
                        key={p.id}
                        pkg={p}
                        selected={photoIx === i}
                        onSelect={() => selectPhotoTier(i)}
                        footer={<p className="text-[11px] font-medium text-zinc-500">On-site ~{p.onSiteHours}h · {p.photos} finals</p>}
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
                    className="mt-2"
                  />
                </div>
              )}

              {includeVideo && (
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-900 mb-4 px-1">Video packages</h3>
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 md:grid md:grid-cols-4 md:overflow-visible no-scrollbar">
                    {VIDEO_PACKAGES.map((p, i) => (
                      <PackageCard
                        key={p.id}
                        pkg={p}
                        selected={videoIx === i}
                        onSelect={() => selectVideoTier(i)}
                        footer={<p className="text-[11px] font-medium text-zinc-500">On-site ~{p.onSiteHours}h · {p.clips}×{p.clipLengthSec}s clips</p>}
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
                    className="mt-2"
                  />
                </div>
              )}

              {includeSocial && (
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-900 mb-4 px-1">Social packages / month</h3>
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 md:grid md:grid-cols-4 md:overflow-visible no-scrollbar">
                    {SOCIAL_PACKAGES.map((p, i) => (
                      <PackageCard
                        key={p.id}
                        pkg={p}
                        selected={socialIx === i}
                        onSelect={() => dispatch({ type: "SET_SOCIAL_IX", index: i })}
                        footer={<p className="text-[11px] font-medium text-zinc-500">{p.postsPerMonth} posts / mo</p>}
                      />
                    ))}
                  </div>
                  <RecurringCommitmentCard
                    title="Social commitment"
                    months={socialMonths}
                    onMonthsChange={updateSocialMonths}
                    discountPercent={socialDiscountPct}
                    totalAmount={totalScheduledPosts}
                    totalLabel="Total posts"
                    detailLabel={platformRange}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={() => dispatch({ type: "SET_STEP", value: prevStep })} disabled={!canGoBack} className={navButtonClass}>
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l-6 6 6 6" /></svg>
              </button>
              <button type="button" onClick={() => dispatch({ type: "SET_STEP", value: nextStep })} disabled={!canGoNext} className={navButtonClass}>
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l6 6-6 6" /></svg>
              </button>
            </div>
          </section>
        )}

        {/* STEP 2: DRONE */}
        {effectiveStep === 2 && hasDroneStep && (
          <section className="space-y-6">
            <div className="rounded-[24px] border border-zinc-200 bg-white p-5 md:p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-zinc-900 md:text-3xl">Step 2 · Drone</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
                Add a dedicated drone package, or skip.
              </p>
              <div className="mt-6 grid grid-cols-1 items-stretch gap-3 md:grid-cols-3">
                {DRONE_ADDONS.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => dispatch({ type: "SET_DRONE_IX", index: i })}
                    className={`relative flex min-h-[100px] flex-col rounded-xl border p-4 text-left transition-all duration-200 ${
                      droneIx === i
                        ? "border-[var(--brand-creative)] bg-[color-mix(in_srgb,var(--brand-creative)_3%,white)] shadow-sm ring-1 ring-[var(--brand-creative)]"
                        : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white"
                    }`}
                  >
                    <span className="font-bold text-zinc-900">{d.name}</span>
                    {droneIx === i && (
                      <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[var(--brand-creative)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                        Selected
                      </span>
                    )}
                    <span className="mt-auto block pt-3 text-xs leading-relaxed text-zinc-500">
                      <span className="font-semibold text-zinc-700">{d.price > 0 ? currency(d.price) : "—"}</span> · {d.summary}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={() => dispatch({ type: "SET_STEP", value: prevStep })} disabled={!canGoBack} className={navButtonClass}>
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l-6 6 6 6" /></svg>
              </button>
              <button type="button" onClick={() => dispatch({ type: "SET_STEP", value: nextStep })} disabled={!canGoNext} className={navButtonClass}>
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l6 6-6 6" /></svg>
              </button>
            </div>
          </section>
        )}

        {/* STEP 3: SAVINGS */}
        {effectiveStep === 3 && (
          <section className="space-y-6">
            <div className="rounded-[24px] border border-zinc-200 bg-white p-5 md:p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-zinc-900 md:text-3xl">Step 3 · Savings</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
                Choose committed shoots to unlock more savings (up to {MAX_TOTAL_DISCOUNT_PERCENT}% max).
              </p>
              <div className="mt-6 max-w-md rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Committed shoots: {committedShoots} → <span className="text-[var(--brand-creative)]">{result.volumeDiscountPercent}% off production</span>
                </label>
                <select
                  value={committedShoots}
                  onChange={(e) =>
                    dispatch({ type: "SET_COMMITTED_SHOOTS", value: Number(e.target.value) as (typeof VOLUME_SHOOT_OPTIONS)[number] })
                  }
                  className="mt-3 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm outline-none focus:border-[var(--brand-creative)] focus:ring-1 focus:ring-[var(--brand-creative)]"
                >
                  {VOLUME_SHOOT_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n} shoot{n !== 1 ? "s" : ""} booked
                    </option>
                  ))}
                </select>
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-3 text-sm font-medium text-zinc-600 md:grid-cols-2">
                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)]"></div>Photo + Video (no social) → 5% off production</li>
                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)]"></div>Photo or Video + Social → 5% off full cart</li>
                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)]"></div>Photo + Video + Social → 10% off full cart</li>
                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)]"></div>Recurring photo or video + social → 10% off social fees; both → 20%</li>
              </ul>
            </div>
            
            <details className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 group transition-colors hover:border-zinc-300">
              <summary className="cursor-pointer text-sm font-bold text-zinc-900 group-open:text-[var(--brand-creative)]">
                View scheduling policy & terms
              </summary>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600">
                {PRICING_SCHEDULING_POLICY_BULLETS.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium italic text-zinc-500 border-t border-zinc-200 pt-3">{PRICING_SCHEDULING_CONTRACT_NOTE}</p>
            </details>

            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={() => dispatch({ type: "SET_STEP", value: prevStep })} disabled={!canGoBack} className={navButtonClass}>
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l-6 6 6 6" /></svg>
              </button>
              <button type="button" onClick={() => dispatch({ type: "SET_STEP", value: nextStep })} disabled={!canGoNext} className={navButtonClass}>
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l6 6-6 6" /></svg>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* RIGHT COLUMN - STICKY LIVE ESTIMATE */}
      <aside className="fixed bottom-0 left-0 z-40 w-full md:sticky md:top-28 md:w-[340px] lg:w-[380px] shrink-0">
        <div className="rounded-t-[32px] md:rounded-[24px] border-t md:border border-zinc-200 bg-white/80 backdrop-blur-xl md:bg-white p-5 md:p-6 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] md:shadow-xl">
          <p className="hidden md:block text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400 mb-2">
            Live estimate
          </p>
          <div className="flex items-center justify-between md:flex-col md:items-start md:justify-start">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-zinc-900">
                {currency(result.grandTotal)}
              </p>
              <p className="mt-1 text-xs font-semibold text-[var(--brand-creative)]">
                {result.effectiveDiscountPercent}% effective savings
              </p>
            </div>
            
            {/* Mobile Expand Toggle - In a real scenario we'd use state to expand the mobile drawer, but here we'll just show the breakdown gracefully on desktop and keep it tight on mobile */}
            <div className="md:hidden text-right">
              <p className="text-[10px] font-bold uppercase text-zinc-400">Subtotal</p>
              <p className="text-sm font-semibold text-zinc-700">{currency(result.subtotal)}</p>
            </div>
          </div>

          {/* Breakdown - Hidden on small mobile screens unless we implement a toggle, but we will use hidden md:block for pure CSS simplicity or just show it if there's room */}
          <div className="hidden md:block">
            <dl className="mt-6 space-y-3 border-t border-zinc-100 pt-6 text-sm">
              {includePhoto && (
                <div className="flex justify-between gap-4 text-zinc-600">
                  <dt>
                    Photo · <span className="font-semibold text-zinc-900">{PHOTO_PACKAGES[result.effectivePhotoPackageIndex]?.name}</span>
                    {photoIx !== result.effectivePhotoPackageIndex ? (
                      <span className="block text-[10px] text-zinc-400 font-medium">(card: {PHOTO_PACKAGES[photoIx]?.name})</span>
                    ) : null}
                  </dt>
                  <dd className="tabular-nums font-semibold">{currency(result.photoPrice)}</dd>
                </div>
              )}
              {includeVideo && (
                <div className="flex justify-between gap-4 text-zinc-600">
                  <dt>
                    Video · <span className="font-semibold text-zinc-900">{VIDEO_PACKAGES[result.effectiveVideoPackageIndex]?.name}</span>
                    {videoIx !== result.effectiveVideoPackageIndex ? (
                      <span className="block text-[10px] text-zinc-400 font-medium">(card: {VIDEO_PACKAGES[videoIx]?.name})</span>
                    ) : null}
                  </dt>
                  <dd className="tabular-nums font-semibold">{currency(result.videoPrice)}</dd>
                </div>
              )}
              {droneIx > 0 && (
                <div className="flex justify-between gap-4 text-zinc-600">
                  <dt>Drone · <span className="font-semibold text-zinc-900">{DRONE_ADDONS[droneIx]?.name}</span></dt>
                  <dd className="tabular-nums font-semibold">{currency(result.dronePrice)}</dd>
                </div>
              )}
              {includeSocial && (
                <div className="flex justify-between gap-4 text-zinc-600">
                  <dt>
                    Social · <span className="font-semibold text-zinc-900">{SOCIAL_PACKAGES[socialIx]?.name}</span> × {socialMonths} mo
                  </dt>
                  <dd className="tabular-nums font-semibold">{currency(result.socialLine)}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 border-t border-zinc-200 pt-3 font-bold text-zinc-900">
                <dt>Cart subtotal</dt>
                <dd className="tabular-nums">{currency(result.subtotal)}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-2 text-sm font-medium">
              {result.bundleDiscountAmount > 0 && (
                <li className="flex justify-between text-[var(--brand-creative)]">
                  <span>Bundle ({result.bundleDiscountPercent}% {includePhoto && includeVideo && !includeSocial ? "production" : "cart"})</span>
                  <span className="tabular-nums">−{currency(result.bundleDiscountAmount)}</span>
                </li>
              )}
              {result.socialRecurringCreditAmount > 0 && (
                <li className="flex justify-between text-[var(--brand-creative)]">
                  <span>Social commitment ({result.socialRecurringCreditPercent}%)</span>
                  <span className="tabular-nums">−{currency(result.socialRecurringCreditAmount)}</span>
                </li>
              )}
              {result.volumeDiscountAmount > 0 && (
                <li className="flex justify-between text-[var(--brand-creative)]">
                  <span>Volume ({result.volumeDiscountPercent}%)</span>
                  <span className="tabular-nums">−{currency(result.volumeDiscountAmount)}</span>
                </li>
              )}
              {result.capAdjustment > 0.01 && (
                <li className="mt-3 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs leading-relaxed text-orange-800">
                  Stacked rules would save {currency(result.rawTotalDiscount)}; applied savings are capped at {MAX_TOTAL_DISCOUNT_PERCENT}% of subtotal ({currency(result.cappedTotalDiscount)}).
                </li>
              )}
            </ul>
          </div>
          
          <button className="mt-4 md:mt-6 w-full rounded-xl bg-[var(--brand-creative)] px-4 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-creative)] focus:ring-offset-2">
            Continue to booking
          </button>
        </div>
      </aside>

    </div>
  );
}
