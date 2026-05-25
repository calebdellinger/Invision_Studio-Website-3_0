"use client";

import { useCallback, useEffect, useState } from "react";

/** Triangle centroid in viewBox 0–200 (equilateral: top, BL, BR). */
const CENTROID_X_PCT = 50;
const CENTROID_Y_PCT = (302 / 3 / 200) * 100;

const PILLARS = [
  {
    title: "Innovation",
    paragraphs: [
      "New angles, new formats, and ideas that haven’t been seen before — so you don’t blend in. We chase what’s next without chasing trends for their own sake.",
      "That means testing compositions, motion, and pacing until the work feels unmistakably yours: campaign-ready stills, social-native cuts, and hero moments that earn a second look.",
      "When the landscape shifts, we adapt the craft — same standards, braver choices — so your library stays fresh instead of frozen in one era.",
    ],
  },
  {
    title: "Passion",
    paragraphs: [
      "The energy shows up on set and in the edit. Craft matters, and we treat every frame like it counts — from the first scout frame to the last grade pass.",
      "We sweat the small stuff: light, lens choice, sound where it matters, and edit rhythm that matches the story you’re trying to tell. Nothing ships until it feels intentional.",
      "That intensity is what turns a shoot day into assets you’ll actually use — not files that sit in a folder because “good enough” never felt good enough.",
    ],
  },
  {
    title: "Curiosity",
    paragraphs: [
      "Better questions lead to stronger visuals. We dig in until the work says something real — about your people, your process, and why someone should care.",
      "Before cameras roll, we want context: who you’re for, what you’ve tried, and where this piece needs to land. The answers shape lighting, tone, and how bold we can be.",
      "Curiosity also means revisiting the edit with fresh eyes: does this still land? Is the message clear in three seconds? We keep pushing until the answer is yes.",
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
  /** Single state so index + cumulative ° stay in lockstep (nested setState can desync in Strict Mode). */
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
    <section
      className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      aria-labelledby="pillars-heading"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2 bg-top bg-no-repeat"
        style={{
          backgroundImage:
            "url(/rebuild-gallery/3pillarsHero.jpg)",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 top-[360px] z-[1] w-screen max-w-[100vw] -translate-x-1/2 bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="-translate-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
            Operation
          </p>
          <h2
            id="pillars-heading"
            className="mt-3 font-serif text-3xl tracking-tight text-black sm:text-4xl"
          >
            Three pillars
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-black">
            How we show up on every project
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-12">
          <div className="relative mx-auto flex w-full max-w-[min(100%,380px)] flex-col items-center overflow-visible">
            <div className="relative aspect-square w-full max-w-[340px] overflow-visible">
              {/* Triangle behind — does not capture clicks */}
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

              {/* Pillar controls on top — receive all clicks */}
              <div className="absolute inset-0 z-10">
                <button
                  type="button"
                  onClick={() => goTo(0)}
                  aria-label="Innovation pillar"
                  aria-pressed={index === 0}
                  className={pillarBtnClass(index === 0, "top")}
                >
                  Innovation
                </button>
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  aria-label="Curiosity pillar"
                  aria-pressed={index === 2}
                  className={pillarBtnClass(index === 2, "bl")}
                >
                  Curiosity
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Passion pillar"
                  aria-pressed={index === 1}
                  className={pillarBtnClass(index === 1, "br")}
                >
                  Passion
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] ring-1 ring-inset ring-white/[0.04]">
            {/* Hero-matched green wash (linear, right → center) + grid masked to the same fade */}
            <div
              className="pointer-events-none absolute inset-0 bg-[#0a0a0a]"
              aria-hidden
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(
                    to left,
                    color-mix(in srgb, var(--brand-creative) 12%, transparent) 0%,
                    transparent 52%
                  )`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      to bottom,
                      rgba(255,255,255,0.045) 1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      to right,
                      rgba(255,255,255,0.045) 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "10px 10px",
                  WebkitMaskImage:
                    "linear-gradient(to left, #000 0%, transparent 52%)",
                  maskImage:
                    "linear-gradient(to left, #000 0%, transparent 52%)",
                }}
              />
            </div>
            <div className="relative z-10 p-8 sm:p-10">
              <h3 className="font-serif text-2xl text-white sm:text-3xl">
                {PILLARS[index].title}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
                {PILLARS[index].paragraphs.map((p, i) => (
                  <p key={`${PILLARS[index].title}-${i}`}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
