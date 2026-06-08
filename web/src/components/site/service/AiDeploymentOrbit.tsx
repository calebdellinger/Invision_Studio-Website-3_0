"use client";

import {
  animate,
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  APPROACHES,
  ApproachIllustration,
  accentStyles,
  type Approach,
  type ApproachId,
} from "./aiDeploymentData";

function ApproachMonogram({ id, active }: { id: ApproachId; active: boolean }) {
  const stroke = active ? "var(--brand-creative)" : "currentColor";
  const fill = active ? "color-mix(in srgb, var(--brand-creative) 14%, transparent)" : "transparent";
  const fillSoft = active ? "color-mix(in srgb, var(--brand-creative) 8%, transparent)" : "transparent";

  if (id === "cloud") {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
        <circle cx="32" cy="32" r="30" fill={fillSoft} stroke={stroke} strokeWidth="1.25" strokeOpacity="0.55" />
        {/* Layered cloud — isometric depth */}
        <ellipse cx="32" cy="36" rx="17" ry="5.5" fill={fill} stroke={stroke} strokeWidth="1.25" strokeOpacity="0.35" />
        <path
          d="M18 34c0-5.5 4.5-10 10.5-10 2.2 0 4.2.7 5.8 1.9 1.6-2.8 4.6-4.7 8.1-4.7 5.1 0 9.2 4 9.2 9.2 0 .5 0 1-.1 1.5H18.8c-1.5 0-2.8-1.2-2.8-2.7z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <ellipse cx="32" cy="28.5" rx="11" ry="4" fill="none" stroke={stroke} strokeWidth="1.1" strokeOpacity="0.45" />
        {/* API nodes */}
        <circle cx="22" cy="44" r="1.75" fill={stroke} fillOpacity="0.7" />
        <circle cx="32" cy="44" r="1.75" fill={stroke} fillOpacity="0.7" />
        <circle cx="42" cy="44" r="1.75" fill={stroke} fillOpacity="0.7" />
        <line x1="22" y1="44" x2="42" y2="44" stroke={stroke} strokeWidth="0.75" strokeOpacity="0.35" />
      </svg>
    );
  }

  if (id === "private") {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
        <circle cx="32" cy="32" r="30" fill={fillSoft} stroke={stroke} strokeWidth="1.25" strokeOpacity="0.55" />
        <rect x="22" y="26" width="20" height="16" rx="3" fill={fill} stroke={stroke} strokeWidth="1.35" />
        <path d="M26 26v-3a6 6 0 0 1 12 0v3" fill="none" stroke={stroke} strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="32" cy="34" r="2.25" fill={stroke} fillOpacity="0.85" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
      <circle cx="32" cy="32" r="30" fill={fillSoft} stroke={stroke} strokeWidth="1.25" strokeOpacity="0.55" />
      {/* Divider */}
      <line x1="32" y1="16" x2="32" y2="48" stroke={stroke} strokeWidth="0.75" strokeOpacity="0.2" />
      {/* Cloud side */}
      <path
        d="M14 30c0-4.2 3.4-7.6 7.6-7.6 1.6 0 3 .5 4.2 1.4 1-2 3-3.3 5.2-3.3 3.3 0 5.9 2.6 5.9 5.9 0 .3 0 .6-.1.8H14.8c-1 0-1.8-.8-1.8-1.8z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Local side — monitor + base unit */}
      <rect x="36" y="22" width="16" height="11" rx="1.5" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="38.5" y="24.5" width="11" height="6" rx="0.75" fill="none" stroke={stroke} strokeWidth="0.85" strokeOpacity="0.5" />
      <rect x="38" y="36" width="12" height="7" rx="1.5" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <circle cx="44" cy="39.5" r="1.25" fill={stroke} fillOpacity="0.8" />
      {/* Sync bridge */}
      <circle cx="32" cy="32" r="4.5" fill={fillSoft} stroke={stroke} strokeWidth="1.1" strokeOpacity="0.65" />
      <path
        d="M29.5 32h5M31 30.5 29.5 32 31 33.5M33 30.5 34.5 32 33 33.5"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

const ORBIT_ANGLES: Record<ApproachId, number> = {
  cloud: 0,
  private: 120,
  hybrid: 240,
};

const FLOAT_CLASS: Record<ApproachId, string> = {
  cloud: "orbit-float-a",
  private: "orbit-float-b",
  hybrid: "orbit-float-c",
};

const ORBIT_RADIUS = 10.5;
const ROTATION_SPEED = 0.012;
const SNAP_EASE = [0.22, 1, 0.36, 1] as const;

function depthZIndex(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return Math.round(10 + Math.cos(rad) * 10);
}

function snapOrbitTarget(baseAngle: number, currentOrbit: number) {
  const target = (360 - baseAngle) % 360;
  const currentMod = ((currentOrbit % 360) + 360) % 360;
  let delta = target - currentMod;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return currentOrbit + delta;
}

function updateOrbTransforms(orbitDeg: number, refs: Record<ApproachId, HTMLDivElement | null>) {
  for (const approach of APPROACHES) {
    const el = refs[approach.id];
    if (!el) continue;
    const total = ORBIT_ANGLES[approach.id] + orbitDeg;
    el.style.transform = `rotateY(${total}deg) translateZ(${ORBIT_RADIUS}rem) rotateY(${-total}deg)`;
    el.style.zIndex = String(depthZIndex(total));
  }
}

const ExpandedCard = memo(function ExpandedCard({
  approach,
  onClose,
}: {
  approach: Approach;
  onClose: () => void;
}) {
  const s = accentStyles[approach.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.5, ease: SNAP_EASE }}
      className={`relative overflow-hidden rounded-2xl border bg-white ring-1 ring-inset shadow-2xl sm:rounded-[2rem] ${s.border} ${s.ring}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${s.glow} to-transparent opacity-50`}
        aria-hidden
      />

      <div className="relative border-b border-zinc-100 bg-black/5 backdrop-blur-md px-4 py-6 sm:px-8 sm:py-8">
        <div className="h-[12rem] sm:h-[16rem] relative rounded-2xl overflow-hidden shadow-inner bg-zinc-50/50 border border-zinc-100/80">
          <ApproachIllustration id={approach.id} accent={approach.accent} />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
        </div>
      </div>

      <div className="relative p-6 sm:p-10 bg-gradient-to-b from-white to-zinc-50/50">
        <div className="flex items-start justify-between gap-4">
          <motion.div layoutId={`approach-chip-${approach.id}`} className="flex items-start gap-5">
            <div className="hidden sm:block p-3 bg-white rounded-2xl shadow-sm border border-zinc-100">
               <ApproachMonogram id={approach.id} active />
            </div>
            <div className="pt-1">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm ${s.badge}`}
              >
                {approach.label}
              </span>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-4xl">
                {approach.title}
              </h3>
              <p className="mt-2 text-xs font-bold text-zinc-600 uppercase tracking-[0.15em]">{approach.tagline}</p>
            </div>
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full bg-white border border-zinc-200 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-black active:scale-95"
          >
            Close
          </button>
        </div>

        <div className="mt-10">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-3">Architecture Overview</h4>
          <p className="text-[15px] leading-relaxed text-zinc-600 sm:text-[17px] max-w-3xl">
            {approach.description}
          </p>
        </div>

        <div className="mt-12">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-5">Core Capabilities</h4>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {approach.features.map((feature) => (
              <li
                key={feature.title}
                className="group relative flex gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-200"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${s.icon}`}>
                  {feature.icon}
                </span>
                <div className="relative">
                  <p className="text-[15px] font-bold text-zinc-900">{feature.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-100">
          <ul className="flex flex-wrap gap-2.5">
            {approach.highlights.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/ai-integrations/architecture#${item.slug}`}
                  className={`inline-flex items-center gap-1.5 rounded-lg border bg-white px-3.5 py-2 text-[11px] font-bold tracking-wider sm:text-xs shadow-sm transition-all hover:bg-zinc-50 hover:scale-105 active:scale-95 ${s.node}`}
                >
                  {item.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-60">
                     <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
});

const OrbitOrb = memo(function OrbitOrb({
  approach,
  onSelect,
  isDimmed,
  pauseFloat,
  wrapperRef,
}: {
  approach: Approach;
  onSelect: (id: ApproachId) => void;
  isDimmed: boolean;
  pauseFloat: boolean;
  wrapperRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={wrapperRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`orbit-float ${FLOAT_CLASS[approach.id]}`}
        style={pauseFloat ? { animationPlayState: "paused" } : undefined}
      >
        <motion.button
          type="button"
          layoutId={`approach-chip-${approach.id}`}
          onClick={() => onSelect(approach.id)}
          aria-label={`Open ${approach.title} deployment model`}
          className="pointer-events-auto relative flex w-[9.5rem] cursor-pointer flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white/95 px-4 py-5 text-center shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-[border-color,box-shadow,opacity] hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--brand-creative)_25%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-creative)] sm:w-[10.5rem]"
          animate={{ opacity: isDimmed ? 0.4 : 1 }}
          transition={{ opacity: { duration: 0.25 }, layout: { duration: 0.48, ease: SNAP_EASE } }}
        >
          <ApproachMonogram id={approach.id} active={false} />
          <span className="text-sm font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-base">
            {approach.title}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            {approach.id === "hybrid" ? "Recommended" : "Click to open"}
          </span>
        </motion.button>
      </div>
    </div>
  );
});

export function AiDeploymentOrbit() {
  const reducedMotion = useReducedMotion();
  const orbitRotate = useMotionValue(0);
  const [selected, setSelected] = useState<ApproachId | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<Record<ApproachId, HTMLDivElement | null>>({
    cloud: null,
    private: null,
    hybrid: null,
  });
  const snappingRef = useRef(false);
  const visibleRef = useRef(true);
  const snapCtrlRef = useRef<ReturnType<typeof animate> | null>(null);

  useMotionValueEvent(orbitRotate, "change", (v) => {
    updateOrbTransforms(v, orbRefs.current);
  });

  const applyOrbit = useCallback((deg: number) => {
    updateOrbTransforms(deg, orbRefs.current);
  }, []);

  useEffect(() => {
    applyOrbit(orbitRotate.get());
  }, [applyOrbit, orbitRotate]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || selected || isSnapping) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (visibleRef.current && !snappingRef.current) {
        const dt = now - last;
        const next = orbitRotate.get() + dt * ROTATION_SPEED;
        orbitRotate.set(next);
        applyOrbit(next);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, selected, isSnapping, orbitRotate, applyOrbit]);

  const handleSelect = useCallback(
    (id: ApproachId) => {
      if (snappingRef.current) return;

      snappingRef.current = true;
      setIsSnapping(true);
      snapCtrlRef.current?.stop();

      const target = snapOrbitTarget(ORBIT_ANGLES[id], orbitRotate.get());

      snapCtrlRef.current = animate(orbitRotate, target, {
        duration: reducedMotion ? 0.05 : 0.48,
        ease: SNAP_EASE,
        onUpdate: () => applyOrbit(orbitRotate.get()),
        onComplete: () => {
          snappingRef.current = false;
          setIsSnapping(false);
          setSelected(id);
          snapCtrlRef.current = null;
          requestAnimationFrame(() => {
            cardRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
          });
        },
      });
    },
    [orbitRotate, reducedMotion, applyOrbit],
  );

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  const selectedApproach = selected ? APPROACHES.find((a) => a.id === selected) : null;

  return (
    <div ref={containerRef} className="mt-10">
      <LayoutGroup id="approach-layout">
        <div
          className="relative mx-auto h-[min(56vw,24rem)] max-h-[24rem] w-full max-w-3xl contain-[layout_style] [perspective:1400px] sm:h-[28rem]"
          style={{ perspectiveOrigin: "50% 40%" }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
              {APPROACHES.map((approach) => {
                if (selected === approach.id) return null;
                return (
                  <OrbitOrb
                    key={approach.id}
                    approach={approach}
                    onSelect={handleSelect}
                    isDimmed={selected !== null}
                    pauseFloat={isSnapping}
                    wrapperRef={(el) => {
                      orbRefs.current[approach.id] = el;
                      if (el) applyOrbit(orbitRotate.get());
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-[6%] left-1/2 h-28 w-[75%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--brand-creative)_14%,transparent),transparent_70%)]"
            aria-hidden
          />
        </div>

        <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-600">
          Click any model — it snaps forward, then opens
        </p>

        <AnimatePresence mode="wait">
          {selectedApproach ? (
            <motion.div
              ref={cardRef}
              key={selectedApproach.id}
              className="mx-auto mt-6 max-w-2xl scroll-mt-8"
              initial={false}
            >
              <ExpandedCard approach={selectedApproach} onClose={handleClose} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
