"use client";

import { motion } from "framer-motion";

interface StatItem {
  trade: string;
  task: string;
  manualTime: number;
  automatedTime: number;
  description: string;
}

const STATS_DATA: StatItem[] = [
  {
    trade: "Excavation",
    task: "Site Staging & RFP Bidding",
    manualTime: 180,
    automatedTime: 12,
    description:
      "Custom platform processes site topography and maps out haul sequences (reducing fuel waste) while automatically drafting compliant commercial proposal bids for public RFPs.",
  },
  {
    trade: "Electrician",
    task: "Plan Takeoff & GC Proposals",
    manualTime: 240,
    automatedTime: 25,
    description:
      "Blueprints are read and calculated against distributor price feeds (locking lowest material costs) while compiling a professional commercial bid deck for the General Contractor.",
  },
  {
    trade: "Plumber",
    task: "IPC Compliance & Lead Dispatch",
    manualTime: 150,
    automatedTime: 18,
    description:
      "Riser layouts are scanned for local code compliance to prevent inspection failures (saving rework) while inbound emergency requests generate instant, competitive service quotes.",
  },
  {
    trade: "Carpenter",
    task: "Cut sheet optimization & Case Studies",
    manualTime: 210,
    automatedTime: 20,
    description:
      "Framing blueprints yield optimized stud cutting patterns (reducing lumber waste) while jobsite completion photo uploads automatically build localized web-ready case studies.",
  },
];

const TOTAL_MANUAL = STATS_DATA.reduce((s, d) => s + d.manualTime, 0);
const TOTAL_AUTO = STATS_DATA.reduce((s, d) => s + d.automatedTime, 0);
const TOTAL_SAVED = TOTAL_MANUAL - TOTAL_AUTO;
const AVG_IMPROVEMENT = Math.round((1 - TOTAL_AUTO / TOTAL_MANUAL) * 1000) / 10;

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function TimeReclaimBar({
  manualTime,
  automatedTime,
  index,
}: {
  manualTime: number;
  automatedTime: number;
  index: number;
}) {
  const aiPct = Math.max((automatedTime / manualTime) * 100, 2.5);
  const savedPct = 100 - aiPct;

  return (
    <div className="relative mt-4">
      {/* Timeline tick marks */}
      <div className="mb-1.5 flex justify-between px-0.5">
        {[0, 25, 50, 75, 100].map((tick) => (
          <span key={tick} className="font-mono text-[8px] text-zinc-600">
            {tick === 0 ? "0" : tick === 100 ? formatDuration(manualTime) : ""}
          </span>
        ))}
      </div>

      <div className="relative h-10 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
        {/* Reclaimed zone — the dramatic "time back" area */}
        <motion.div
          className="absolute inset-y-0 right-0 overflow-hidden"
          style={{ left: `${aiPct}%` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(80,161,42,0.06) 4px, rgba(80,161,42,0.06) 8px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--brand-creative)_18%,transparent)] via-[color-mix(in_srgb,var(--brand-creative)_8%,transparent)] to-transparent" />
          {/* Fading clock ticks in reclaimed zone */}
          <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none" aria-hidden>
            {Array.from({ length: Math.max(Math.floor(savedPct / 8), 3) }).map((_, i, arr) => (
              <line
                key={i}
                x1={`${((i + 1) / (arr.length + 1)) * 100}%`}
                y1="20%"
                x2={`${((i + 1) / (arr.length + 1)) * 100}%`}
                y2="80%"
                stroke="var(--brand-creative)"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity={1 - i / arr.length}
              />
            ))}
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--brand-creative)_70%,white)]">
            Time reclaimed
          </span>
        </motion.div>

        {/* AI segment — compact, glowing */}
        <motion.div
          className="absolute inset-y-0 left-0 z-10 overflow-hidden rounded-l-[10px]"
          initial={{ width: 0 }}
          whileInView={{ width: `${aiPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[var(--brand-creative)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-white" />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]" />
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]">
            AI · {formatDuration(automatedTime)}
          </span>
        </motion.div>

        {/* Manual baseline ghost */}
        <div className="pointer-events-none absolute inset-0 border-r-2 border-dashed border-zinc-600/40" />
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-zinc-600">
          <span className="h-2 w-2 rounded-sm bg-zinc-600/50" />
          Manual · {formatDuration(manualTime)}
        </span>
        <span className="flex items-center gap-1.5 text-[var(--brand-creative)]">
          <span className="h-2 w-2 rounded-sm bg-[var(--brand-creative)]" />
          AI review · {formatDuration(automatedTime)}
        </span>
      </div>
    </div>
  );
}

function SavingsGauge({ percent }: { percent: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <svg width="104" height="104" viewBox="0 0 104 104" className="-rotate-90" aria-hidden>
        <circle cx="52" cy="52" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke="var(--brand-creative)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none text-zinc-900 [font-family:var(--font-montserrat)]">
          {percent}%
        </span>
        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-zinc-600">faster</span>
      </div>
    </div>
  );
}

function TimeBlockStack({
  totalMinutes,
  variant,
  label,
}: {
  totalMinutes: number;
  variant: "manual" | "ai";
  label: string;
}) {
  const blockCount = Math.min(Math.ceil(totalMinutes / 60), 14);
  const partialPct = totalMinutes % 60 ? (totalMinutes % 60) / 60 : 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-600">{label}</p>
      <div className="flex flex-wrap justify-center gap-1 max-w-[140px]">
        {Array.from({ length: blockCount }).map((_, i) => {
          const isPartial = i === blockCount - 1 && partialPct > 0 && partialPct < 1;
          const fill = variant === "ai" ? "bg-[var(--brand-creative)]" : "bg-zinc-700/50";
          const partial = variant === "ai" ? "bg-[color-mix(in_srgb,var(--brand-creative)_40%,#333)]" : "bg-zinc-800/60";

          return (
            <motion.div
              key={i}
              className={`h-5 w-5 rounded-sm border border-zinc-200 ${isPartial ? partial : fill}`}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              style={
                isPartial
                  ? {
                      background: `linear-gradient(to top, var(--brand-creative) ${partialPct * 100}%, transparent ${partialPct * 100}%)`,
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
      <p
        className={`font-mono text-sm font-bold ${variant === "ai" ? "text-[var(--brand-creative)]" : "text-zinc-600 line-through decoration-zinc-600"}`}
      >
        {formatDuration(totalMinutes)}
      </p>
    </div>
  );
}

function TradeStatRow({ item, index }: { item: StatItem; index: number }) {
  const timeSavedMin = item.manualTime - item.automatedTime;
  const multiplier = Math.round(item.manualTime / item.automatedTime);
  const savedPct = Math.round((timeSavedMin / item.manualTime) * 100);

  return (
    <motion.div
      className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-creative)]">
            {item.trade}
          </p>
          <h4 className="mt-0.5 text-sm font-semibold text-zinc-900">{item.task}</h4>
          <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">{item.description}</p>
        </div>

        {/* Hero numbers — before → after */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Before</p>
              <p className="font-mono text-lg font-bold text-zinc-600 line-through decoration-zinc-600 sm:text-xl">
                {formatDuration(item.manualTime)}
              </p>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-zinc-600" aria-hidden>
              <path
                d="M5 12h12M13 8l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--brand-creative)]">After</p>
              <p className="font-mono text-lg font-bold text-[var(--brand-creative)] sm:text-xl">
                {formatDuration(item.automatedTime)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_12%,#0a0a0a)] px-2.5 py-1 font-mono text-[11px] font-bold text-[var(--brand-creative)]">
              <ClockIcon className="h-3 w-3" />−{formatDuration(timeSavedMin)}
            </span>
            <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-[11px] font-bold text-zinc-700">
              {multiplier}× faster
            </span>
            <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-[11px] font-bold text-zinc-600">
              {savedPct}% back
            </span>
          </div>
        </div>
      </div>

      <TimeReclaimBar manualTime={item.manualTime} automatedTime={item.automatedTime} index={index} />
    </motion.div>
  );
}

export function AiStatsChart() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 ring-1 ring-inset ring-zinc-100 sm:p-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
          Financial & Time ROI
        </p>
        <h3 className="mt-1.5 text-xl font-semibold text-zinc-900 [font-family:var(--font-montserrat)]">
          Operations Analysis & Revenue Growth Capacity
        </h3>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-600">
        Same four trades as the simulator above. In addition to direct labor hours saved, these custom platforms
        help prevent material scrap, reduce fuel waste, avoid code inspection failures, and accelerate commercial bidding.
      </p>

      <div className="mt-6 space-y-4">
        {STATS_DATA.map((item, index) => (
          <TradeStatRow key={item.task} item={item} index={index} />
        ))}
      </div>

      {/* Summary — visual before/after + gauge */}
      <motion.div
        className="mt-6 overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--brand-creative)_25%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_6%,#0a0a0a)]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              Combined Platform ROI
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 sm:justify-start sm:gap-8">
              <TimeBlockStack totalMinutes={TOTAL_MANUAL} variant="manual" label="Before Platform" />
              <div className="flex flex-col items-center gap-1">
                <svg viewBox="0 0 32 32" className="h-8 w-8 text-[var(--brand-creative)]" aria-hidden>
                  <path
                    d="M6 16h16M18 10l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-creative)] px-3 py-1 font-mono text-xs font-bold text-[#050505]">
                  <ClockIcon className="h-3.5 w-3.5" />−{formatDuration(TOTAL_SAVED)}
                </span>
              </div>
              <TimeBlockStack totalMinutes={TOTAL_AUTO} variant="ai" label="With Platform" />
            </div>

            <p className="mt-5 text-2xl font-bold tracking-tight text-zinc-900 [font-family:var(--font-montserrat)] sm:text-3xl">
              {formatDuration(TOTAL_SAVED)}{" "}
              <span className="text-base font-medium text-[var(--brand-creative)] sm:text-lg">
                reclaimed · Direct Overhead & Bidding ROI
              </span>
            </p>
            <div className="mt-4 grid gap-4 border-t border-zinc-200 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--brand-creative)]">Estimated Cost Savings</p>
                <p className="mt-1 text-sm text-zinc-700 font-semibold">$3,500 – $5,200 / month</p>
                <p className="mt-0.5 text-[10px] text-zinc-600">From reduced material waste, fuel burn, and foreman hours.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--brand-creative)]">Growth Capacity Increase</p>
                <p className="mt-1 text-sm text-zinc-700 font-semibold">+$150k+ in annual contracts</p>
                <p className="mt-0.5 text-[10px] text-zinc-600">From 4x bidding capacity and faster lead response times.</p>
              </div>
            </div>
          </div>

          <SavingsGauge percent={AVG_IMPROVEMENT} />
        </div>
      </motion.div>
    </div>
  );
}
