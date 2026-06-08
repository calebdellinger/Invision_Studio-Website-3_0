"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SocialPlatformIcon, type SocialPlatformId } from "./SocialPlatformIcon";

type PlatformInsight = {
  id: SocialPlatformId;
  name: string;
  focus: string;
  algorithmSignal: string;
  strengths: string[];
  route?: string;
};

const platformInsights: PlatformInsight[] = [
  {
    id: "instagram",
    name: "Instagram",
    focus: "Visual storytelling + community signals",
    algorithmSignal: "Watch time, saves, shares, and profile actions",
    strengths: [
      "Strong brand aesthetics and day-to-day relationship building.",
      "Reels, stories, and carousels support both reach and nurture.",
      "Great for building familiarity through consistent visual language.",
    ],
    route: "/services/social-media/instagram",
  },
  {
    id: "youtube",
    name: "YouTube",
    focus: "Search visibility + long-form authority",
    algorithmSignal: "Click-through rate, session watch time, and retention",
    strengths: [
      "Compounds over time through search and suggested video traffic.",
      "Best platform for trust-building educational or proof content.",
      "Can anchor your broader content system with evergreen assets.",
    ],
    route: "/services/social-media/youtube",
  },
  {
    id: "facebook",
    name: "Facebook",
    focus: "Local reach + community ecosystems",
    algorithmSignal: "Meaningful interactions, comments, and shares",
    strengths: [
      "Still highly useful for local businesses and community groups.",
      "Supports events, offers, and practical conversion pathways.",
      "Works well for older demographics and neighborhood visibility.",
    ],
    route: "/services/social-media/facebook",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    focus: "B2B trust + professional credibility",
    algorithmSignal: "Early engagement velocity and dwell time",
    strengths: [
      "Excellent for founders, agencies, and expertise-driven brands.",
      "Builds authority through perspective, case studies, and insights.",
      "High-quality audience for strategic partnerships and lead intent.",
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    focus: "Searchable inspiration + long shelf life",
    algorithmSignal: "Pin saves, outbound clicks, and relevance matching",
    strengths: [
      "Content has a longer lifespan than most social channels.",
      "Strong traffic driver for product, lifestyle, and design niches.",
      "Ideal for visual planning behavior and discovery-led buying.",
    ],
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    focus: "Real-time conversation + cultural positioning",
    algorithmSignal: "Engagement speed, relevance, and recency",
    strengths: [
      "Fast feedback loop on ideas, trends, and audience sentiment.",
      "Powerful for thought leadership and topical brand voice.",
      "Helps brands stay culturally relevant in real-time moments.",
    ],
  },
  {
    id: "threads",
    name: "Threads",
    focus: "Conversational reach connected to Instagram graph",
    algorithmSignal: "Engagement consistency and conversation depth",
    strengths: [
      "Easy extension of an existing Instagram audience base.",
      "Supports lightweight dialogue without high production demand.",
      "Useful for commentary-driven and personality-led content.",
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    focus: "Discovery engine + short-form velocity",
    algorithmSignal: "Hook strength, completion rate, and replays",
    strengths: [
      "Highest breakout potential for new account discovery.",
      "Low polish barrier when concepts are clear and native.",
      "Excellent lab for testing hooks, offers, and storytelling angles.",
    ],
    route: "/services/social-media/tiktok",
  },
];

/** ~20% longer than a typical native `smooth` scroll (~500ms). */
const PLATFORM_DETAIL_SCROLL_MS = 600;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function scrollToDescriptionPanel(el: HTMLElement) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.scrollIntoView({ block: "start", inline: "nearest" });
    return;
  }

  const scrollMarginTop = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const rect = el.getBoundingClientRect();
  const docTop = rect.top + window.scrollY;
  const targetY = Math.max(0, docTop - scrollMarginTop);
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const start = performance.now();
  function step(now: number) {
    const t = Math.min(1, (now - start) / PLATFORM_DETAIL_SCROLL_MS);
    window.scrollTo(0, startY + distance * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function SocialPlatformStrengthGrid() {
  const [activeId, setActiveId] = useState(platformInsights[0]?.id ?? "");
  const descriptionRef = useRef<HTMLElement>(null);

  const active = useMemo(
    () =>
      platformInsights.find((platform) => platform.id === activeId) ??
      platformInsights[0],
    [activeId],
  );

  if (!active) {
    return null;
  }

  function selectPlatform(id: SocialPlatformId) {
    setActiveId(id);
    requestAnimationFrame(() => {
      const el = descriptionRef.current;
      if (!el) return;
      scrollToDescriptionPanel(el);
    });
  }

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="grid gap-4 sm:grid-cols-2 [perspective:1400px]">
        {platformInsights.map((platform, index) => {
          const selected = platform.id === active.id;
          const tiltY = index % 2 === 0 ? "2deg" : "-2deg";
          const transformStraight = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(10px)`;
          const transformLeanHover = `perspective(1200px) rotateX(6deg) rotateY(${tiltY}) translateZ(22px) translateY(-5px)`;
          const transformSelectedStraight = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(14px) translateY(-2px)`;
          const transformSelectedLeanHover = `perspective(1200px) rotateX(6.5deg) rotateY(${tiltY}) translateZ(26px) translateY(-6px)`;

          const shadowIdle =
            "shadow-[0_1px_0_0_rgba(255,255,255,0.07)_inset,0_14px_28px_-10px_rgba(0,0,0,0.82),0_6px_14px_-6px_rgba(0,0,0,0.55),0_2px_0_0_rgba(0,0,0,0.35)]";
          const shadowHover =
            "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_22px_44px_-12px_rgba(0,0,0,0.88),0_10px_22px_-8px_rgba(0,0,0,0.6),0_3px_0_0_rgba(0,0,0,0.4)]";
          const shadowSelected =
            "shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_18px_42px_-14px_color-mix(in_srgb,var(--brand-creative)_38%,transparent),0_12px_28px_-10px_rgba(0,0,0,0.75),0_4px_0_0_rgba(0,0,0,0.45)]";
          const shadowSelectedHover =
            "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_24px_48px_-12px_color-mix(in_srgb,var(--brand-creative)_45%,transparent),0_14px_28px_-8px_rgba(0,0,0,0.65),0_4px_0_0_rgba(0,0,0,0.5)]";

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => selectPlatform(platform.id)}
              style={
                {
                  "--tf-idle": selected ? transformSelectedStraight : transformStraight,
                  "--tf-hover": selected ? transformSelectedLeanHover : transformLeanHover,
                } as React.CSSProperties & Record<"--tf-idle" | "--tf-hover", string>
              }
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left ring-1 ring-inset ring-black/[0.04] [transform:var(--tf-idle)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out will-change-transform [transform-style:preserve-3d] hover:[transform:var(--tf-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-creative)] ${
                selected
                  ? `border-[color-mix(in_srgb,var(--brand-creative)_55%,white_4%)] bg-[linear-gradient(165deg,rgba(30,30,30,0.98)_0%,#111_45%,#0c0c0c_100%)] ${shadowSelected} ${shadowSelectedHover}`
                  : `border-black/12 bg-[linear-gradient(165deg,rgba(24,24,24,0.95)_0%,#0f0f0f_50%,#090909_100%)] ${shadowIdle} ${shadowHover} hover:border-black/28 hover:bg-[linear-gradient(165deg,#141414_0%,#121212_50%,#0d0d0d_100%)]`
              } `}
              aria-pressed={selected}
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
                aria-hidden
              />
              <div className="relative flex gap-3 [transform-style:preserve-3d]">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_10px_-4px_rgba(0,0,0,0.65)] transition-[transform,colors,border-color,box-shadow] duration-300 [transform:translateZ(6px)] group-hover:[transform:translateZ(18px)] ${
                    selected
                      ? "border-[color-mix(in_srgb,var(--brand-creative)_40%,white_12%)] bg-[linear-gradient(160deg,rgba(40,40,40,0.9)_0%,#0a0a0a_100%)] text-[var(--brand-creative)]"
                      : "border-black/12 bg-[linear-gradient(160deg,#1a1a1a_0%,#0a0a0a_100%)] text-zinc-600 group-hover:border-black/22 group-hover:text-zinc-100"
                  }`}
                  aria-hidden
                >
                  <SocialPlatformIcon id={platform.id} className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                    Platform
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900">
                    {platform.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 transition-colors group-hover:text-zinc-600">
                    {platform.focus}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <aside
        ref={descriptionRef}
        id="platform-strength-detail"
        className="scroll-mt-[calc(var(--header-height)+1rem)] rounded-2xl border border-black/10 bg-[#101010]/90 p-6 ring-1 ring-inset ring-black/[0.03]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
          Why {active.name} matters
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)]">
          Strategic strengths
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          <span className="font-medium text-zinc-600">Algorithm signals:</span>{" "}
          {active.algorithmSignal}
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-600">
          {active.strengths.map((strength) => (
            <li key={strength} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-creative)]" />
              <span>{strength}</span>
            </li>
          ))}
        </ul>
        {active.route ? (
          <Link
            href={active.route}
            className="mt-6 inline-flex items-center rounded-full border border-black/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:border-[color-mix(in_srgb,var(--brand-creative)_45%,white_12%)] hover:text-black"
          >
            Open {active.name} page
          </Link>
        ) : null}
      </aside>
    </div>
  );
}
