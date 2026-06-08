"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/** Triangle centroid in viewBox 0–200 (equilateral: top, BL, BR). */
const CENTROID_X_PCT = 50;
const CENTROID_Y_PCT = (302 / 3 / 200) * 100;

const PILLARS = [
  {
    title: "Photo",
    paragraphs: [
      "Premium photography is the visual foundation. Stills freeze craftsmanship, capture honest lighting, and establish the aesthetic benchmark of your brand campaign.",
      "Still imagery establishes the creative direction for everything else. It defines the color grading palette, art direction, and staging setups that keep your visuals cohesive.",
      "By shooting high-resolution assets, you build a permanent library for digital listings, print lookbooks, catalog covers, and high-impact website banners.",
    ],
  },
  {
    title: "Video",
    paragraphs: [
      "Videography brings the static framework to life. We add motion, pacing, and detailed sound design to hold the viewer's attention and tell a deeper narrative.",
      "Every frame of our motion cuts maintains visual continuity with our photography set designs. Light, colors, and styling align so your brand voice remains unified.",
      "Motion assets translate static concepts into active brand experiences — ideal for high-impact homepage heroes, YouTube embeds, and platform ads.",
    ],
  },
  {
    title: "Social Media",
    paragraphs: [
      "Social media is the engine that deploys your library. We package raw photos and video cuts into native, platform-optimized vertical feeds and rhythms.",
      "The three services operate as a loop: premium photo and video assets feed your channels with high-grade content, while automated publishing ensures they reach your audience.",
      "We synchronize the pipeline: shooting stills and motion on the same production day, then formatting, captioning, and scheduling deliverables natively for Instagram, TikTok, and YouTube.",
    ],
  },
] as const;

const PILLAR_AUTO_ROTATE_MS = 5000;

/** Radial glow centered in the button; dark base is vertically symmetric. */
const pillarActiveGradient =
  "bg-[radial-gradient(ellipse_95%_85%_at_50%_50%,color-mix(in_srgb,var(--brand-creative)_18%,transparent),transparent_62%),linear-gradient(180deg,#111111_0%,#0a0a0a_50%,#080808_100%)]";

const pillarBtnBase =
  "pointer-events-auto absolute rounded-[5px] border-0 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] shadow-[0_4px_16px_-4px_rgba(0,0,0,0.75)] backdrop-blur-sm transition-[color,background-image,box-shadow,transform] sm:px-4 sm:py-2.5 sm:text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-creative)] active:scale-[0.98]";

function pillarBtnClass(active: boolean, position: "top" | "bl" | "br") {
  const pos =
    position === "top"
      ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1"
      : position === "bl"
        ? "bottom-[10%] left-0 max-w-[46%] -translate-x-2 sm:bottom-[8%] sm:-translate-x-3"
        : "bottom-[10%] right-0 max-w-[46%] translate-x-2 sm:bottom-[8%] sm:translate-x-3";
  const state = active
    ? `z-[2] text-[var(--brand-creative)] shadow-[0_0_32px_-10px_color-mix(in_srgb,var(--brand-creative)_50%,transparent),0_6px_20px_-8px_rgba(0,0,0,0.85)] ${pillarActiveGradient}`
    : "z-[1] bg-[linear-gradient(180deg,#141414_0%,#0f0f0f_100%)] text-zinc-400 hover:bg-[linear-gradient(180deg,#181818_0%,#121212_100%)] hover:text-zinc-100";
  return `${pillarBtnBase} ${pos} ${state}`;
}

type PillarVisualState = { index: number; rotationDeg: number };

export function OperationPillars() {
  const [pillar, setPillar] = useState<PillarVisualState>({
    index: 0,
    rotationDeg: 0,
  });
  const { index, rotationDeg } = pillar;

  const goTo = useCallback((i: number) => {
    const target = ((i % PILLARS.length) + PILLARS.length) % PILLARS.length;
    setPillar((prev) => {
      const cwSteps = (target - prev.index + PILLARS.length) % PILLARS.length;
      if (cwSteps === 0) return prev;
      return {
        index: target,
        rotationDeg: prev.rotationDeg + cwSteps * 120,
      };
    });
  }, []);

  const advanceClockwise = useCallback(() => {
    setPillar((prev) => ({
      index: (prev.index + 1) % PILLARS.length,
      rotationDeg: prev.rotationDeg + 120,
    }));
  }, []);

  useEffect(() => {
    const id = window.setInterval(advanceClockwise, PILLAR_AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [index, advanceClockwise]);

  return (
    <>
      {/* ── IMAGE 1: Top Hero Image (Responsive Scaling) ── */}
      <div className="relative w-full overflow-hidden bg-black">
        <div className="aspect-video sm:aspect-[21/9] w-full">
          <Image
            src="/rebuild-gallery/3pillarsHero.jpg"
            alt="Connected services visual"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── DIV: Connected Services Content (Black Background) ── */}
      <section
        className="relative bg-black px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
        aria-labelledby="pillars-heading"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
              Connected Workflow
            </p>
            <h2
              id="pillars-heading"
              className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl"
            >
              Connected Services
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 mx-auto sm:mx-0">
              How photo, video, and social media support each other
            </p>
          </div>

          <div className="mt-12 sm:mt-20 flex flex-col items-center gap-12 sm:gap-16">
            {/* Desktop/Tablet Triangle Controls */}
            <div className="relative mx-auto hidden sm:flex w-full max-w-[min(100%,380px)] flex-col items-center overflow-visible">
              <div className="relative aspect-square w-full max-w-[340px] overflow-visible">
                {/* Triangle behind */}
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center pt-8 sm:pt-10">
                  <div
                    className="relative h-[72%] w-[72%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{
                      transform: `rotate(${rotationDeg}deg)`,
                      transformOrigin: `${CENTROID_X_PCT}% ${CENTROID_Y_PCT}%`,
                    }}
                  >
                    <svg
                      viewBox="0 0 200 200"
                      className="h-full w-full drop-shadow-[0_0_28px_color-mix(in_srgb,var(--brand-creative)_22%,transparent)]"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient
                          id="pillar-tri-fill"
                          x1="100"
                          y1="18"
                          x2="100"
                          y2="182"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            stopColor="var(--brand-creative)"
                            stopOpacity="0.14"
                          />
                          <stop
                            offset="1"
                            stopColor="var(--brand-creative)"
                            stopOpacity="0.02"
                          />
                        </linearGradient>
                      </defs>
                      <polygon
                        points="100,18 28,142 172,142"
                        fill="url(#pillar-tri-fill)"
                        stroke="var(--brand-creative)"
                        strokeOpacity="0.55"
                        strokeWidth="1.25"
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle
                        cx="100"
                        cy="18"
                        r="5"
                        fill="var(--brand-creative)"
                        fillOpacity="0.95"
                      />
                      <circle
                        cx="100"
                        cy="18"
                        r="9"
                        stroke="var(--brand-creative)"
                        strokeOpacity="0.35"
                        fill="none"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>

                {/* Pillar controls on top */}
                <div className="absolute inset-0 z-10">
                  <button
                    type="button"
                    onClick={() => goTo(0)}
                    aria-label="Photo pillar"
                    aria-pressed={index === 0}
                    className={pillarBtnClass(index === 0, "top")}
                  >
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(2)}
                    aria-label="Social media pillar"
                    aria-pressed={index === 2}
                    className={pillarBtnClass(index === 2, "bl")}
                  >
                    Social Media
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Video pillar"
                    aria-pressed={index === 1}
                    className={pillarBtnClass(index === 1, "br")}
                  >
                    Video
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Vertical Controls */}
            <div className="sm:hidden flex flex-col w-full gap-3 px-2">
              {[
                { idx: 0, label: "Photo" },
                { idx: 1, label: "Video" },
                { idx: 2, label: "Social Media" },
              ].map((btn) => {
                const active = index === btn.idx;
                return (
                  <button
                    key={btn.idx}
                    type="button"
                    onClick={() => goTo(btn.idx)}
                    aria-pressed={active}
                    className={`relative flex items-center justify-between overflow-hidden rounded-lg px-5 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.15em] transition-[color,box-shadow,transform] ${
                      active
                        ? `text-[var(--brand-creative)] shadow-[0_0_24px_-8px_color-mix(in_srgb,var(--brand-creative)_50%,transparent)] border border-[var(--brand-creative)]/40 ${pillarActiveGradient}`
                        : "bg-[#111111] text-zinc-400 border border-transparent hover:bg-[#151515] hover:text-zinc-200"
                    }`}
                  >
                    <span className="relative z-10">{btn.label}</span>
                    {active && (
                      <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)] shadow-[0_0_8px_var(--brand-creative)]" />
                    )}
                    {active && (
                      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[var(--brand-creative)]/10 to-transparent" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] ring-1 ring-inset ring-white/[0.04]">
              {/* Geometric Camera Viewfinder Background */}
              <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden bg-[#0a0a0a]">
                <div 
                  className="absolute inset-0 opacity-[0.25]"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1.2px, transparent 1.2px)`,
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/[0.02]" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.02]" />
                </div>
                <div className="absolute inset-4 border border-transparent">
                  <div className="absolute left-0 top-0 h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-zinc-700/50" />
                  <div className="absolute right-0 top-0 h-3 w-3 border-r-[1.5px] border-t-[1.5px] border-zinc-700/50" />
                  <div className="absolute left-0 bottom-0 h-3 w-3 border-l-[1.5px] border-b-[1.5px] border-zinc-700/50" />
                  <div className="absolute right-0 bottom-0 h-3 w-3 border-r-[1.5px] border-b-[1.5px] border-zinc-700/50" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] text-white">
                  <svg className="w-[450px] h-[450px]" viewBox="0 0 1000 1000" fill="none">
                    <circle cx="500" cy="500" r="420" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
                    <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="1" strokeDasharray="40 10 10 10" />
                    <circle cx="500" cy="500" r="180" stroke="currentColor" strokeWidth="1" />
                    <circle cx="500" cy="500" r="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="500" cy="500" r="60" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="500" y1="50" x2="500" y2="950" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="50" y1="500" x2="950" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="180" y1="180" x2="820" y2="820" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="820" y1="180" x2="180" y2="820" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className="absolute left-6 top-4 font-mono text-[8px] uppercase tracking-widest text-zinc-500/60">
                  <span className="text-[var(--brand-creative)] animate-pulse">●</span> REC
                </div>
                <div className="absolute right-6 top-4 font-mono text-[8px] uppercase tracking-widest text-zinc-500/60">
                  GRID: 3x3
                </div>
                <div className="absolute left-6 bottom-4 font-mono text-[8px] uppercase tracking-widest text-zinc-500/60">
                  F1.8 | ISO 250
                </div>
                <div className="absolute right-6 bottom-4 font-mono text-[8px] uppercase tracking-widest text-zinc-500/60">
                  Connected
                </div>
              </div>
              <div className="relative z-10 p-8 sm:p-10">
                <h3 className="font-serif text-2xl text-white sm:text-3xl text-center sm:text-left">
                  {PILLARS[index].title}
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400 text-center sm:text-left">
                  {PILLARS[index].paragraphs.map((p, i) => (
                    <p key={`${PILLARS[index].title}-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE 2: Inverted Bottom Image (Mirrored) ── */}
      <div className="relative w-full overflow-hidden bg-black mb-24 sm:mb-32 lg:mb-48">
        <div className="aspect-video sm:aspect-[21/9] w-full scale-y-[-1]">
          <Image
            src="/rebuild-gallery/3pillarsHero.jpg"
            alt="Connected services visual mirrored"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
    </>
  );
}
