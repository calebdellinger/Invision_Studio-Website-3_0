/**
 * Invision Creative — modular pricing engine (photo, video, social, drone add-ons).
 * Package tiers and discounts follow the site’s market-research-backed MVP model.
 */

export const SCHEDULING_WINDOW_DAYS = 30;

export const MAX_TOTAL_DISCOUNT_PERCENT = 30;

/** Travel / location — estimates from Mukilteo, WA. */
export const PRICING_BASE_CITY_LABEL = "Mukilteo, WA";
/** Fixed origin for driving-distance APIs (full address improves routing). */
export const PRICING_DRIVE_ORIGIN = "Mukilteo, WA 98275, USA";
/** No travel surcharge for work within this radius (road or straight-line — client uses Maps). */
export const LOCAL_RADIUS_MILES = 45;
/** Added to production subtotal when local but multiple shoot days or multiple locations. */
export const LOCAL_MULTI_DAY_OR_LOCATION_SURCHARGE_PERCENT = 10;
/** Billed one way; partial hours round up (e.g. 45 min → 1 hr). */
export const DRIVE_TIME_RATE_USD_PER_HOUR = 100;
/** Billable one-way drive hours per shoot day (cap). */
export const MAX_BILLABLE_DRIVE_HOURS_ONE_WAY_PER_DAY = 3;
/**
 * If one-way drive is at least this many hours (after rounding up), at least Photo or Video
 * must be Growth tier or higher (when that service is in the cart).
 */
export const REMOTE_DRIVE_HOURS_ONE_WAY_REQUIRING_MIN_GROWTH = 2;
/** When drive time isn’t entered, estimate minutes from miles using this average MPH. */
export const DRIVE_TIME_ESTIMATE_MPH = 45;

/** Photography — four tiers (step-down $/photo). */
export const PHOTO_PACKAGES = [
  {
    id: "photo-starter",
    name: "Starter",
    price: 450,
    photos: 15,
    onSiteHours: 3,
    summary: "15 edited 45MP photos · 1 location · web/social usage",
  },
  {
    id: "photo-growth",
    name: "Growth",
    price: 800,
    photos: 30,
    onSiteHours: 4.5,
    summary:
      "30 edited photos · 1–2 locations · wider coverage · may be split across two shoot days",
  },
  {
    id: "photo-progress",
    name: "Progress",
    price: 1150,
    photos: 50,
    onSiteHours: 6,
    summary:
      "50 edited photos · job-site or brand story coverage · may be split across two shoot days",
  },
  {
    id: "photo-full-day",
    name: "Full day",
    price: 1450,
    photos: 80,
    onSiteHours: 8,
    summary:
      "80 edited photos · full documentation day · may be split across three shoot days",
  },
] as const;

/** Videography — four tiers. */
export const VIDEO_PACKAGES = [
  {
    id: "video-starter",
    name: "Starter",
    price: 495,
    clips: 2,
    clipLengthSec: 30,
    onSiteHours: 2.5,
    summary: "2×30s clips · basic edit · music · simple titles",
  },
  {
    id: "video-growth",
    name: "Growth",
    price: 978,
    clips: 4,
    clipLengthSec: 30,
    onSiteHours: 4,
    summary:
      "4×30s clips · more shot variety · basic titles · may be split across two shoot days",
  },
  {
    id: "video-progress",
    name: "Progress",
    price: 1500,
    clips: 6,
    clipLengthSec: 30,
    onSiteHours: 6,
    summary:
      "6×30s clips · progress / detail coverage · may be split across two shoot days",
  },
  {
    id: "video-full-day",
    name: "Full day",
    price: 2063,
    clips: 8,
    clipLengthSec: 30,
    onSiteHours: 8,
    summary:
      "8×30s clips · full-day site or brand story · may be split across three shoot days",
  },
] as const;

/** Social — content support / light management. */
export const SOCIAL_PACKAGES = [
  {
    id: "social-starter",
    name: "Starter",
    price: 550,
    postsPerMonth: 5,
    summary: "5 posts · captions · scheduling · 1 platform",
  },
  {
    id: "social-growth",
    name: "Growth",
    price: 850,
    postsPerMonth: 10,
    summary: "10 posts · 1–2 platforms · light recap",
  },
  {
    id: "social-momentum",
    name: "Momentum",
    price: 1100,
    postsPerMonth: 15,
    summary: "15 posts · cross-platform repurposing · recap",
  },
  {
    id: "social-authority",
    name: "Authority",
    price: 1300,
    postsPerMonth: 20,
    summary: "20 posts · 2–3 platforms · stronger planning cadence",
  },
] as const;

/** Drone add-ons. */
export const DRONE_ADDONS = [
  { id: "drone-none", name: "No drone", price: 0, summary: "—" },
  {
    id: "drone-basic",
    name: "Drone Basic",
    price: 125,
    summary: "5 aerial photos + 3 landscape hero shots",
  },
  {
    id: "drone-plus",
    name: "Drone Plus",
    price: 225,
    summary: "10 aerial photos + 1 aerial clip",
  },
  {
    id: "drone-story",
    name: "Drone Story",
    price: 350,
    summary: "10 aerial photos + 3 aerial clips",
  },
  {
    id: "drone-recurring",
    name: "Recurring visit",
    price: 95,
    summary: "Light aerial per visit (3+ shoot plans)",
  },
] as const;

/** Multi-shoot volume: % off production (photo + video + drone). */
export const VOLUME_SHOOT_TIERS: { shoots: number; percent: number }[] = [
  { shoots: 1, percent: 0 },
  { shoots: 2, percent: 3 },
  { shoots: 3, percent: 5 },
  { shoots: 6, percent: 10 },
  { shoots: 12, percent: 15 },
];

export const VOLUME_SHOOT_OPTIONS = [1, 2, 3, 6, 12] as const;

export function getVolumeDiscountPercent(committedShoots: number): number {
  const tier = [...VOLUME_SHOOT_TIERS]
    .filter((t) => t.shoots <= committedShoots)
    .sort((a, b) => b.shoots - a.shoots)[0];
  return tier?.percent ?? 0;
}

/**
 * @deprecated Prefer getVolumeDiscountPercent — maps old 1–5 shoot UI to volume tiers.
 */
export function getShootBundleDiscountPercent(linedUpShoots: number): number {
  const n = Math.min(Math.max(Math.round(linedUpShoots), 1), 5);
  const map: Record<number, number> = { 1: 0, 2: 3, 3: 5, 4: 5, 5: 5 };
  return map[n] ?? 0;
}

export const SOCIAL_MONTHLY_TIERS_USD = SOCIAL_PACKAGES.map((p) => p.price);
export const SOCIAL_MONTHLY_DEFAULT_TIER_INDEX = 1;

/** Optional — merged with DEFAULT_LOCATION_PRICING for travel / split estimates. */
export type LocationPricingFields = {
  /** One-way distance from Mukilteo (miles). ≤30 = local zone for travel rules. */
  milesFromMukilteo: number;
  /** One-way drive time; if null outside local zone, estimated from miles at DRIVE_TIME_ESTIMATE_MPH. */
  oneWayDriveMinutes: number | null;
  /** Scheduled shoot days for this scope (multi-day triggers local surcharge when in-zone). */
  shootDays: number;
  /** Distinct locations for this scope (multi-location triggers local surcharge when in-zone). */
  locationCount: number;
};

export const DEFAULT_LOCATION_PRICING: LocationPricingFields = {
  milesFromMukilteo: 15,
  oneWayDriveMinutes: null,
  shootDays: 1,
  locationCount: 1,
};

export type PricingSelection = {
  includePhoto: boolean;
  photoPackageIndex: number;
  includeVideo: boolean;
  videoPackageIndex: number;
  includeSocial: boolean;
  socialPackageIndex: number;
  socialCommitmentMonths: number;
  droneAddonIndex: number;
  /** Monthly recurring production (unlocks social % credit when paired with social). */
  photoRecurring: boolean;
  videoRecurring: boolean;
  committedShoots: number;
  location?: Partial<LocationPricingFields>;
};

export type PricingResult = {
  subtotal: number;
  productionSubtotal: number;
  socialLine: number;
  photoPrice: number;
  videoPrice: number;
  dronePrice: number;
  bundleDiscountPercent: number;
  bundleDiscountAmount: number;
  socialRecurringCreditPercent: number;
  socialRecurringCreditAmount: number;
  volumeDiscountPercent: number;
  volumeDiscountAmount: number;
  rawTotalDiscount: number;
  cappedTotalDiscount: number;
  capAdjustment: number;
  finalTotal: number;
  effectiveDiscountPercent: number;
  /** Package indices used after remote long-drive Growth minimum (for display). */
  effectivePhotoPackageIndex: number;
  effectiveVideoPackageIndex: number;
  /** Price includes auto bump to Growth when required (long remote drive). */
  autoBumpedPhotoToGrowth: boolean;
  autoBumpedVideoToGrowth: boolean;
  /** After bundle discounts; before drive / local split add-ons. */
  driveTimeFee: number;
  localMultiDayLocationSurcharge: number;
  /** finalTotal + driveTimeFee + localMultiDayLocationSurcharge */
  grandTotal: number;
  location: {
    isLocalZone: boolean;
    oneWayDriveMinutesUsed: number;
    oneWayDriveHoursRounded: number;
    billableOneWayDriveHours: number;
    driveFeeCappedAtDailyMax: boolean;
    requiresMinGrowthTier: boolean;
    minGrowthTierSatisfied: boolean;
  };
};

export function roundUpOneWayDriveHoursFromMinutes(minutes: number): number {
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  return Math.ceil(minutes / 60);
}

export function estimateOneWayMinutesFromMiles(miles: number): number {
  if (!Number.isFinite(miles) || miles <= 0) return 0;
  return (miles / DRIVE_TIME_ESTIMATE_MPH) * 60;
}

export function isWithinLocalRadius(miles: number): boolean {
  return Number.isFinite(miles) && miles <= LOCAL_RADIUS_MILES;
}

function resolveEffectivePhotoVideoIndices(
  hasPhoto: boolean,
  hasVideo: boolean,
  photoIx: number,
  videoIx: number,
  requiresMinGrowth: boolean,
): {
  photoPackageIndex: number;
  videoPackageIndex: number;
  autoBumpedPhoto: boolean;
  autoBumpedVideo: boolean;
} {
  if (!requiresMinGrowth) {
    return {
      photoPackageIndex: photoIx,
      videoPackageIndex: videoIx,
      autoBumpedPhoto: false,
      autoBumpedVideo: false,
    };
  }
  const userMeetsMinGrowth =
    hasPhoto && hasVideo
      ? photoIx >= 1 || videoIx >= 1
      : hasPhoto
        ? photoIx >= 1
        : hasVideo
          ? videoIx >= 1
          : true;
  if (userMeetsMinGrowth) {
    return {
      photoPackageIndex: photoIx,
      videoPackageIndex: videoIx,
      autoBumpedPhoto: false,
      autoBumpedVideo: false,
    };
  }
  const p0 = hasPhoto && photoIx === 0;
  const v0 = hasVideo && videoIx === 0;
  if (hasPhoto && hasVideo && p0 && v0) {
    return {
      photoPackageIndex: 1,
      videoPackageIndex: videoIx,
      autoBumpedPhoto: true,
      autoBumpedVideo: false,
    };
  }
  if (p0) {
    return {
      photoPackageIndex: 1,
      videoPackageIndex: videoIx,
      autoBumpedPhoto: true,
      autoBumpedVideo: false,
    };
  }
  if (v0) {
    return {
      photoPackageIndex: photoIx,
      videoPackageIndex: 1,
      autoBumpedPhoto: false,
      autoBumpedVideo: true,
    };
  }
  return {
    photoPackageIndex: photoIx,
    videoPackageIndex: videoIx,
    autoBumpedPhoto: false,
    autoBumpedVideo: false,
  };
}

function bundlePercentForCart(
  hasPhoto: boolean,
  hasVideo: boolean,
  hasSocial: boolean,
): number {
  if (hasPhoto && hasVideo && hasSocial) return 10;
  if (hasPhoto && hasVideo) return 5;
  if (
    (hasPhoto && hasSocial && !hasVideo) ||
    (hasVideo && hasSocial && !hasPhoto)
  )
    return 5;
  return 0;
}

function bundleDiscountAmount(
  hasPhoto: boolean,
  hasVideo: boolean,
  hasSocial: boolean,
  subtotal: number,
  productionSubtotal: number,
): number {
  const pct = bundlePercentForCart(hasPhoto, hasVideo, hasSocial);
  if (pct === 0) return 0;
  if (hasPhoto && hasVideo && !hasSocial)
    return productionSubtotal * (pct / 100);
  return subtotal * (pct / 100);
}

function socialCommitmentPercent(
  hasSocial: boolean,
  commitmentMonths: number,
): number {
  if (!hasSocial) return 0;
  if (commitmentMonths >= 5) return 30;
  if (commitmentMonths === 4) return 25;
  if (commitmentMonths === 3) return 15;
  if (commitmentMonths === 2) return 10;
  return 0;
}

export function calculateBundlePricing(sel: PricingSelection): PricingResult {
  const loc: LocationPricingFields = {
    ...DEFAULT_LOCATION_PRICING,
    ...sel.location,
  };

  const hasPhoto = sel.includePhoto;
  const hasVideo = sel.includeVideo;
  const hasSocial = sel.includeSocial;

  const miles = loc.milesFromMukilteo;
  const isLocal = isWithinLocalRadius(miles);

  const oneWayDriveMinutesUsed =
    loc.oneWayDriveMinutes != null && loc.oneWayDriveMinutes >= 0
      ? loc.oneWayDriveMinutes
      : estimateOneWayMinutesFromMiles(miles);

  const oneWayDriveHoursRounded =
    roundUpOneWayDriveHoursFromMinutes(oneWayDriveMinutesUsed);

  const requiresMinGrowthTier =
    !isLocal &&
    oneWayDriveHoursRounded >= REMOTE_DRIVE_HOURS_ONE_WAY_REQUIRING_MIN_GROWTH &&
    (hasPhoto || hasVideo);

  const eff = resolveEffectivePhotoVideoIndices(
    hasPhoto,
    hasVideo,
    sel.photoPackageIndex,
    sel.videoPackageIndex,
    requiresMinGrowthTier,
  );

  const userMeetsMinGrowthTier =
    !requiresMinGrowthTier ||
    (hasPhoto && hasVideo
      ? sel.photoPackageIndex >= 1 || sel.videoPackageIndex >= 1
      : hasPhoto
        ? sel.photoPackageIndex >= 1
        : hasVideo
          ? sel.videoPackageIndex >= 1
          : true);

  const minGrowthTierSatisfied = userMeetsMinGrowthTier;

  const photo = hasPhoto
    ? PHOTO_PACKAGES[eff.photoPackageIndex] ?? PHOTO_PACKAGES[0]
    : null;
  const video = hasVideo
    ? VIDEO_PACKAGES[eff.videoPackageIndex] ?? VIDEO_PACKAGES[0]
    : null;
  const socialPkg = hasSocial
    ? SOCIAL_PACKAGES[sel.socialPackageIndex] ?? SOCIAL_PACKAGES[0]
    : null;
  const drone = DRONE_ADDONS[sel.droneAddonIndex] ?? DRONE_ADDONS[0];

  const photoPrice = photo?.price ?? 0;
  const videoPrice = video?.price ?? 0;
  const dronePrice = drone.price;
  const productionSubtotal = photoPrice + videoPrice + dronePrice;

  const socialLine = socialPkg
    ? socialPkg.price * Math.max(1, sel.socialCommitmentMonths)
    : 0;

  const subtotal = productionSubtotal + socialLine;

  const bundlePct = bundlePercentForCart(hasPhoto, hasVideo, hasSocial);
  const dBundle = bundleDiscountAmount(
    hasPhoto,
    hasVideo,
    hasSocial,
    subtotal,
    productionSubtotal,
  );

  const socialCreditPct = socialCommitmentPercent(
    hasSocial,
    Math.max(1, sel.socialCommitmentMonths),
  );
  const socialMonthlyFees = socialPkg
    ? socialPkg.price * sel.socialCommitmentMonths
    : 0;
  const dSocialCredit =
    hasSocial && socialCreditPct > 0
      ? socialMonthlyFees * (socialCreditPct / 100)
      : 0;

  const volPct =
    productionSubtotal > 0 ? getVolumeDiscountPercent(sel.committedShoots) : 0;
  const dVolume = productionSubtotal * (volPct / 100);

  const rawTotalDiscount = dBundle + dSocialCredit + dVolume;
  const maxDiscount = subtotal * (MAX_TOTAL_DISCOUNT_PERCENT / 100);
  const cappedTotalDiscount = Math.min(rawTotalDiscount, maxDiscount);
  const capAdjustment = rawTotalDiscount - cappedTotalDiscount;

  const finalTotal = Math.max(0, subtotal - cappedTotalDiscount);
  const effectiveDiscountPercent =
    subtotal > 0
      ? Math.round((cappedTotalDiscount / subtotal) * 1000) / 10
      : 0;

  const multiDayOrLocation =
    loc.shootDays > 1 || loc.locationCount > 1;
  const localMultiDayLocationSurcharge =
    isLocal && multiDayOrLocation
      ? productionSubtotal * (LOCAL_MULTI_DAY_OR_LOCATION_SURCHARGE_PERCENT / 100)
      : 0;

  let billableOneWayDriveHours = oneWayDriveHoursRounded;
  let driveFeeCappedAtDailyMax = false;
  if (!isLocal && oneWayDriveHoursRounded > 0) {
    if (billableOneWayDriveHours > MAX_BILLABLE_DRIVE_HOURS_ONE_WAY_PER_DAY) {
      billableOneWayDriveHours = MAX_BILLABLE_DRIVE_HOURS_ONE_WAY_PER_DAY;
      driveFeeCappedAtDailyMax = true;
    }
  }

  const driveTimeFee =
    !isLocal && billableOneWayDriveHours > 0
      ? billableOneWayDriveHours * DRIVE_TIME_RATE_USD_PER_HOUR
      : 0;

  const grandTotal = Math.max(
    0,
    finalTotal + driveTimeFee + localMultiDayLocationSurcharge,
  );

  return {
    subtotal,
    productionSubtotal,
    socialLine,
    photoPrice,
    videoPrice,
    dronePrice,
    bundleDiscountPercent: bundlePct,
    bundleDiscountAmount: dBundle,
    socialRecurringCreditPercent: socialCreditPct,
    socialRecurringCreditAmount: dSocialCredit,
    volumeDiscountPercent: volPct,
    volumeDiscountAmount: dVolume,
    rawTotalDiscount,
    cappedTotalDiscount,
    capAdjustment,
    finalTotal,
    effectiveDiscountPercent,
    effectivePhotoPackageIndex: eff.photoPackageIndex,
    effectiveVideoPackageIndex: eff.videoPackageIndex,
    autoBumpedPhotoToGrowth: eff.autoBumpedPhoto,
    autoBumpedVideoToGrowth: eff.autoBumpedVideo,
    driveTimeFee,
    localMultiDayLocationSurcharge,
    grandTotal,
    location: {
      isLocalZone: isLocal,
      oneWayDriveMinutesUsed,
      oneWayDriveHoursRounded,
      billableOneWayDriveHours,
      driveFeeCappedAtDailyMax,
      requiresMinGrowthTier,
      minGrowthTierSatisfied,
    },
  };
}

export const PRICING_SCAFFOLD_DISCLAIMER =
  "Estimates are for planning — final quotes depend on scope, travel, licensing, revisions, and signed agreement.";

export const PRICING_SCHEDULING_POLICY_HEADLINE =
  "Bundle discount scheduling (sample contract language)";

export const PRICING_SCHEDULING_POLICY_BULLETS = [
  `Multi-shoot discounts apply only when each remaining shoot is scheduled within ${SCHEDULING_WINDOW_DAYS} days of the prior shoot’s completion date (or as stated in your agreement).`,
  "If a follow-up shoot is not booked within that window, bundle pricing for the affected portion may revert to standard rates.",
  "You may be invoiced for the difference between discounted amounts and standard rates for work already delivered (back-charge). Sample language only — have counsel review.",
] as const;

export const PRICING_SCHEDULING_CONTRACT_NOTE =
  "Not legal advice. Final terms belong in your statement of work or master services agreement.";
