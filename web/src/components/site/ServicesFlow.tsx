"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ServiceTypeIcon, type ServiceTypeIconId } from "@/components/site/service/ServiceTypeIcon";

type FlowItem = {
  key: string;
  title: string;
  tagline: string;
  icon: ServiceTypeIconId;
  href: string;
  description: string;
  caps: readonly string[];
  surface: { from: string; via: string; to: string };
  /** Which side the icon column sits on at tablet+. */
  layout?: "default" | "mirror";
};

const FLOW: FlowItem[] = [
  {
    key: "photo",
    title: "Photography",
    tagline: "Stills that campaign.",
    icon: "photo",
    href: "/services/photography",
    description:
      "Still imagery tuned for campaigns and catalogs — sharp color, honest light, and compositions that hold on the wall and in the feed.",
    caps: ["RAW delivery", "Color graded", "Art directed", "Campaign-ready"],
    surface: {
      from: "#ffffff",
      via: "color-mix(in srgb, var(--brand-creative) 5%, #f9fbf8)",
      to: "#f5f8f3",
    },
  },
  {
    key: "video",
    title: "Videography",
    tagline: "Every frame earns the next.",
    icon: "video",
    href: "/services/videography",
    layout: "mirror",
    description:
      "Motion with intent: hero cuts, campaign stories, and social-native edits — paced so every frame earns the next.",
    caps: ["4K delivery", "Color graded", "Hero cuts", "Social edits"],
    surface: {
      from: "#f5f8f3",
      via: "color-mix(in srgb, var(--brand-creative) 4%, #f7faf5)",
      to: "#edf2ea",
    },
  },
  {
    key: "social",
    title: "Social & Content",
    tagline: "Feeds that still feel human.",
    icon: "social",
    href: "/services/social-media",
    description:
      "Rhythm and craft for feeds that still feel human — concepts, shoots, and edits aligned to how your audience scrolls.",
    caps: ["Multi-platform", "Monthly rhythm", "Branded formats", "Analytics-led"],
    surface: {
      from: "#edf2ea",
      via: "color-mix(in srgb, var(--brand-creative) 6%, #f3f6f1)",
      to: "#e8eff0",
    },
  },
  {
    key: "ai",
    title: "AI Integrations",
    tagline: "Automation without compromise.",
    icon: "ai",
    href: "/services/ai-integrations",
    layout: "mirror",
    description:
      "Practical AI woven into your workflow — smart assistants, asset tagging, and automation that speeds delivery without washing out your brand voice.",
    caps: ["Workflow automation", "Asset tagging", "Brand-safe", "Faster delivery"],
    surface: {
      from: "#e8eff0",
      via: "color-mix(in srgb, var(--brand-creative) 6%, #f6f8f5)",
      to: "#ffffff",
    },
  },
];

// ---------------------------------------------------------------------------
// Floating ring icon — replaces the flat square box
// ---------------------------------------------------------------------------

function FloatingRingIcon({
  icon,
  reduceMotion,
}: {
  icon: ServiceTypeIconId;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative flex items-center justify-center" aria-hidden>
      {/* Background bloom glow */}
      <div
        className="absolute h-[400px] w-[400px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-creative) 15%, transparent) 0%, transparent 70%)",
          opacity: 0.25,
        }}
      />

      {/* Slow-spinning outer ring with accent dot */}
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full border border-zinc-200/50"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {/* Accent dot rides the ring */}
        <div className="absolute -top-[4px] left-1/2 h-[8px] w-[8px] -translate-x-1/2 rounded-full bg-[var(--brand-creative)] shadow-[0_0_14px_5px_color-mix(in_srgb,var(--brand-creative)_55%,transparent)]" />
      </motion.div>

      {/* Counter-spinning dashed inner ring */}
      <motion.div
        className="absolute h-[248px] w-[248px] rounded-full border border-dashed border-zinc-200/30"
        animate={reduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      />

      {/* Solid inner ring — gives depth layering */}
      <div className="absolute h-[200px] w-[200px] rounded-full border border-zinc-200/40" />

      {/* Main icon circle */}
      <motion.div
        className="relative flex h-[176px] w-[176px] items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_0_70px_-16px_color-mix(in_srgb,var(--brand-creative)_16%,transparent),inset_0_1px_0_rgba(255,255,255,0.8),0_24px_48px_-24px_rgba(0,0,0,0.08)]"
        initial={reduceMotion ? false : { scale: 0.88, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Radial inner glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle at 38% 30%, var(--brand-creative), transparent 62%)",
          }}
        />
        {/* Gloss highlight at top */}
        <div
          className="pointer-events-none absolute inset-x-[18%] top-[8%] h-[40%] rounded-full opacity-[0.2]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.9), transparent 80%)",
          }}
        />
        <ServiceTypeIcon
          id={icon}
          className="relative h-[68px] w-[68px] text-[color-mix(in_srgb,var(--brand-creative)_90%,black_10%)] drop-shadow-[0_0_32px_color-mix(in_srgb,var(--brand-creative)_22%,transparent)]"
        />
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subtle dot-grid decoration — unique per section index
// ---------------------------------------------------------------------------

function DotGridAccent({ index }: { index: number }) {
  const positions = [
    "right-0 top-0 h-[55%] w-[45%]",
    "left-0 bottom-0 h-[50%] w-[40%]",
    "right-0 bottom-[10%] h-[45%] w-[38%]",
    "left-0 top-[5%] h-[48%] w-[42%]",
    "right-0 top-[15%] h-[55%] w-[44%]",
  ];

  return (
    <div
      className={`pointer-events-none absolute ${positions[index % positions.length]} opacity-[0.038]`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      }}
      aria-hidden
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ServicesFlow() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const scaleX = useTransform(smooth, [0, 1], [0.04, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed scroll progress bar */}
      <div className="pointer-events-none fixed left-0 right-0 top-[calc(var(--header-height)+0.5rem)] z-40 flex justify-center px-6">
        <div className="h-[2px] w-full max-w-lg overflow-hidden rounded-full bg-zinc-200">
          <motion.div
            className="h-full origin-left rounded-full bg-[var(--brand-creative)]"
            style={{ scaleX }}
          />
        </div>
      </div>

      <div className="relative z-[2]">
        <header className="relative overflow-hidden">
          {/* Header background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 180% at 50% -20%, color-mix(in srgb, var(--brand-creative) 6%, transparent), transparent 65%)",
            }}
            aria-hidden
          />

          <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pt-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-6 bg-[var(--brand-creative)] opacity-70" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                Invision Creative
              </p>
            </motion.div>

            <motion.h1
              className="mt-6 font-serif text-[clamp(3rem,8vw,5.5rem)] font-medium leading-[1.0] tracking-tight text-zinc-950"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                delay: reduceMotion ? 0 : 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Services
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-[15px] leading-relaxed text-zinc-600"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              One continuous lane — stills, motion, content, and AI. Scroll
              through each pillar and see how they connect.
            </motion.p>

            {/* Service quick-links */}
            <motion.div
              className="mt-10 flex flex-wrap gap-2"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {FLOW.map((item, i) => (
                <a
                  key={item.key}
                  href={`#svc-anchor-${item.key}`}
                  className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[11px] font-medium text-zinc-600 transition-[border-color,color,background-color] hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <span className="tabular-nums text-zinc-400 group-hover:text-zinc-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Header bottom rule */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* Service sections                                                    */}
        {/* ------------------------------------------------------------------ */}
        {FLOW.map((item, index) => (
          <section
            key={item.key}
            id={`svc-anchor-${item.key}`}
            className="relative flex min-h-[min(88vh,860px)] flex-col justify-center scroll-mt-[var(--header-height)]"
            aria-labelledby={`svc-${item.key}`}
          >
            {/* Section background gradient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(160deg, ${item.surface.from} 0%, ${item.surface.via} 50%, ${item.surface.to} 100%)`,
              }}
              aria-hidden
            />

            {/* Dot grid accent */}
            <DotGridAccent index={index} />

            {/* Giant watermark number — sits between background and content */}
            <div
              className={`pointer-events-none absolute select-none font-serif font-bold leading-none text-zinc-950 ${
                item.layout === "mirror"
                  ? "bottom-[-5%] left-[-2%]"
                  : "bottom-[-5%] right-[-2%]"
              }`}
              style={{
                fontSize: "clamp(160px, 28vw, 340px)",
                opacity: 0.025,
                letterSpacing: "-0.04em",
              }}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Radial bloom behind icon area */}
            <div
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full blur-[120px] ${
                item.layout === "mirror" ? "left-[-5%]" : "right-[-5%]"
              }`}
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-creative) 8%, transparent), transparent 70%)",
              }}
              aria-hidden
            />

            {/* Bottom vignette */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/30 to-transparent"
              aria-hidden
            />

            {/* Content */}
            <motion.div
              className={`relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 sm:items-center sm:justify-between sm:gap-16 sm:px-8 lg:px-10 lg:py-24 ${
                item.layout === "mirror" ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px", amount: 0.3 }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
            >
              {/* ── Copy column ── */}
              <div
                className={`relative max-w-lg ${
                  item.layout === "mirror"
                    ? "sm:ml-auto sm:flex sm:flex-col sm:items-end sm:text-right"
                    : ""
                }`}
              >
                {/* Category label row */}
                <div
                  className={`flex items-center gap-3 ${
                    item.layout === "mirror" ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="h-px w-8 shrink-0 bg-[var(--brand-creative)] opacity-55" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--brand-creative)_90%,black_10%)]">
                    {item.title}
                  </span>
                  <span className="ml-1 text-[10px] tabular-nums text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Tagline — italic editorial line */}
                <p className="mt-3 font-serif text-[15px] italic leading-snug text-zinc-500 sm:text-base">
                  {item.tagline}
                </p>

                {/* Main heading */}
                <h2
                  id={`svc-${item.key}`}
                  className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.04] tracking-tight text-zinc-950"
                >
                  {item.title}
                </h2>

                {/* Description */}
                <p className="mt-5 text-[15px] leading-relaxed text-zinc-600">
                  {item.description}
                </p>

                {/* Capability pills */}
                <div
                  className={`mt-7 flex flex-wrap gap-2 ${
                    item.layout === "mirror" ? "sm:justify-end" : ""
                  }`}
                >
                  {item.caps.map((cap, i) => (
                    <span
                      key={cap}
                      className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                        i === 0
                          ? "border-[color-mix(in_srgb,var(--brand-creative)_38%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_7%,transparent)] text-[color-mix(in_srgb,var(--brand-creative)_90%,black_10%)]"
                          : "border-zinc-200 text-zinc-500"
                      }`}
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className={`mt-10 ${
                    item.layout === "mirror" ? "sm:flex sm:justify-end" : ""
                  }`}
                >
                  <Link
                    href={item.href}
                    className="group relative inline-flex items-center gap-3 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900"
                  >
                    {/* Button pill */}
                    <span className="relative overflow-hidden rounded-full border border-zinc-200 bg-white/60 px-5 py-2.5 backdrop-blur-sm transition-[border-color,background-color,box-shadow] group-hover:border-[color-mix(in_srgb,var(--brand-creative)_48%,black_12%)] group-hover:bg-[color-mix(in_srgb,var(--brand-creative)_6%,transparent)] group-hover:shadow-[0_0_32px_-8px_color-mix(in_srgb,var(--brand-creative)_25%,transparent)]">
                      {/* Shimmer sweep on hover */}
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full rounded-full opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-full group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(0,0,0,0.02), transparent)",
                        }}
                        aria-hidden
                      />
                      <span className="relative">
                        Open {item.title.split(" ")[0]}
                      </span>
                    </span>
                    {/* Arrow */}
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white/60 text-[var(--brand-creative)] transition-[transform,border-color,background-color] group-hover:translate-x-0.5 group-hover:border-[color-mix(in_srgb,var(--brand-creative)_30%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--brand-creative)_8%,transparent)]"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* ── Icon column ── */}
              <div className="relative mx-auto shrink-0 hidden sm:block sm:mx-0">
                <FloatingRingIcon icon={item.icon} reduceMotion={reduceMotion} />
              </div>
            </motion.div>

            {/* Section bottom separator (all but last) */}
            {index < FLOW.length - 1 && (
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-zinc-200 to-transparent"
                aria-hidden
              />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
