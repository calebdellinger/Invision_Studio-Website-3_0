"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type TradeId = "excavation" | "electrician" | "plumber" | "carpenter";
type SimStage = "idle" | "scanning" | "analyzing" | "optimizing" | "plan";

type TradePreset = {
  id: TradeId;
  label: string;
  tagline: string;
  painPoint: string;
  inputLabel: string;
  inputValue: string;
  stages: {
    scanning: string;
    analyzing: string;
    optimizing: string;
  };
  metrics: { label: string; before: string; after: string; delta: string }[];
  steps: string[];
  integrations: string[];
};

const TRADES: TradePreset[] = [
  {
    id: "excavation",
    label: "Excavation",
    tagline: "Staging intelligence & RFQ bidding",
    painPoint: "Idle equipment burns margin, while slow manual bidding delays miss major public works contracts.",
    inputLabel: "Job site & RFP intake",
    inputValue: "Riverside site · 2.4 ac · Municipal sewer extension RFP",
    stages: {
      scanning: "Ingesting site topography, soil density reports, and public municipal bidding documents.",
      analyzing: "Cross-referencing fuel burn, soil haul distances, and local contractor competition rates.",
      optimizing: "Generating an optimized staging sequence and a custom commercial bid proposal.",
    },
    metrics: [
      { label: "Fuel consumption", before: "1.8 gal/CY", after: "1.2 gal/CY", delta: "−33%" },
      { label: "Bid response time", before: "36 hrs", after: "4 hrs", delta: "−88%" },
      { label: "Daily haul cycles", before: "11 cycles", after: "16 cycles", delta: "+45%" },
    ],
    steps: [
      "Stage excavators on the north pad — shortest haul path to stockpile zone A.",
      "Identify optimal one-way truck loop routing to eliminate congestion on-site.",
      "Analyze public RFP requirements and auto-draft a fully compliant commercial contract proposal.",
      "Send SMS dispatch alerts to crews to minimize operator idle-time swap intervals.",
    ],
    integrations: ["Topo & vision scan", "GPS/telematics sync", "RFP portal listener", "Auto-drafted bids"],
  },
  {
    id: "electrician",
    label: "Electrician",
    tagline: "Material pricing & commercial proposal engine",
    painPoint: "Fluctuating copper prices and hours spent doing takeoffs limit how many commercial bids you can submit.",
    inputLabel: "Plan set upload",
    inputValue: "Commercial TI · 14,200 SF · 3-floor blueprint",
    stages: {
      scanning: "Reading panel schedules, single-lines, reflected ceiling plans, and distributor catalog feeds.",
      analyzing: "Calculating conduit fill and wire length requirements against six distributor price feeds.",
      optimizing: "Compiling a scrap-minimized cut list and generating a professional bid deck for the GC.",
    },
    metrics: [
      { label: "Material cost", before: "$18.4k", after: "$15.1k", delta: "−18%" },
      { label: "Takeoff hours", before: "6.5 hrs", after: "0.5 hrs", delta: "−92%" },
      { label: "Monthly bid capacity", before: "3 bids", after: "12 bids", delta: "+300%" },
    ],
    steps: [
      "Lock in EMT conduits at $0.42/ft under local averages by querying distributor APIs.",
      "Instantly compile a professional PDF commercial bid proposal for the General Contractor.",
      "Generate a scrap-minimized batch pull list for floor 2 homerun runs.",
      "Sync orders to inventory to prevent emergency material supplier runs.",
    ],
    integrations: ["Takeoff plan OCR", "Supplier price APIs", "Inventory alert sync", "Proposal designer"],
  },
  {
    id: "plumber",
    label: "Plumber",
    tagline: "Code compliance & rapid lead dispatcher",
    painPoint: "Inspection rework eats profits, while slow quote response times lose high-margin commercial service contracts.",
    inputLabel: "RFP & riser plan",
    inputValue: "Multi-family rough-in · 32 units · Commercial service inquiry",
    stages: {
      scanning: "Ingesting riser diagrams, project specs, and incoming property manager RFP emails.",
      analyzing: "Cross-referencing dimensions with local IPC plumbing codes and historical estimator margins.",
      optimizing: "Drafting code-compliant materials submittals and instant service quotes.",
    },
    metrics: [
      { label: "Lead response speed", before: "4.5 hrs", after: "9 mins", delta: "−96%" },
      { label: "Inspection failures", before: "3 re-runs", after: "0 failures", delta: "−100%" },
      { label: "Quote close rate", before: "22%", after: "48%", delta: "+118%" },
    ],
    steps: [
      "Scan incoming property manager RFP to extract repair specs and verify scope parameters.",
      "Cross-check riser layout — flag unit 12 vent piping as undersized per local plumbing codes.",
      "Route optimized service van travel paths to eliminate cross-town backtracking.",
      "Auto-draft custom quote and dispatch directly to property manager via email.",
    ],
    integrations: ["IPC code rules engine", "Route optimizer", "Van inventory scan", "Instant quote dispatcher"],
  },
  {
    id: "carpenter",
    label: "Carpenter",
    tagline: "Cut sheet precision & automated case studies",
    painPoint: "Lumber scrap piles drain overhead, while a lack of up-to-date project showcases limits high-end contract wins.",
    inputLabel: "Framing plan & photo",
    inputValue: "Custom home · 3,180 SF · Completed jobsite photo upload",
    stages: {
      scanning: "Ingesting framing plans, engineered lumber specs, and field-upload completion photos.",
      analyzing: "Running cut optimization algorithms and parsing site photos for finished quality details.",
      optimizing: "Publishing optimized cut maps and drafting a localized project case study for marketing.",
    },
    metrics: [
      { label: "Lumber waste", before: "14%", after: "5%", delta: "−64%" },
      { label: "Estimate variance", before: "±11%", after: "±3%", delta: "−73%" },
      { label: "Showcase updates", before: "1/mo", after: "8/mo", delta: "+700%" },
    ],
    steps: [
      "Generate stud batch-cut maps yielding 8 studs per stick with only 2% scrap.",
      "Pre-calculate shop-built window header requirements to save 1.8 hrs on-site.",
      "Analyze uploaded site completion photos and auto-generate SEO-optimized portfolio summary.",
      "Format and queue the case study for publishing on portfolio and Invision Marketing channels.",
    ],
    integrations: ["Cut sheet optimizer", "Lumber order sync", "Quality computer vision", "Case study builder"],
  },
];

const STAGE_ORDER: SimStage[] = ["scanning", "analyzing", "optimizing", "plan"];

function TradeIcon({ id }: { id: TradeId }) {
  const cls = "h-4 w-4";
  if (id === "excavation") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 17h16M6 17V9l4-4 4 4v8M14 17V11l4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "electrician") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "plumber") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 14c0-4 3-7 7-7s7 3 7 7M8 14v4M16 14v4M12 7V3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 20h18M6 20V8l6-4 6 4v12" strokeLinejoin="round" />
    </svg>
  );
}

function ExcavationVisual({ stage }: { stage: SimStage }) {
  const heat = stage === "idle" ? 0.2 : stage === "scanning" ? 0.45 : stage === "analyzing" ? 0.7 : 1;
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="heat-a" cx="30%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#50a12a" stopOpacity={0.55 * heat} />
          <stop offset="100%" stopColor="#50a12a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heat-b" cx="68%" cy="42%" r="40%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.45 * heat} />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="20" y="20" width="360" height="160" rx="8" fill="#0a0a0a" stroke="#333" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={40 + i * 70} y1="170" x2={80 + i * 70} y2="130" stroke="#333" strokeWidth="0.75" />
      ))}
      <ellipse cx="140" cy="110" rx="90" ry="40" fill="url(#heat-a)" />
      <ellipse cx="260" cy="95" rx="70" ry="35" fill="url(#heat-b)" />
      <path d="M60 150 Q140 90 220 120 T340 140" fill="none" stroke="#50a12a" strokeWidth="2" strokeDasharray={stage === "plan" ? "0" : "6 4"} opacity={heat} />
      <rect x="110" y="125" width="36" height="18" rx="3" fill="#111" stroke="#50a12a" strokeWidth="1.2" opacity={heat} />
      <rect x="240" y="118" width="28" height="14" rx="2" fill="#111" stroke="#fbbf24" strokeWidth="1" opacity={heat * 0.8} />
      <text x="200" y="188" textAnchor="middle" fill="#666" fontSize="9" letterSpacing="0.14em">
        HAUL PATH · FUEL HEATMAP · STAGING ZONES
      </text>
    </svg>
  );
}

function ElectricianVisual({ stage }: { stage: SimStage }) {
  const active = stage !== "idle" ? 1 : 0.25;
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
      <rect x="20" y="20" width="360" height="160" rx="8" fill="#0a0a0a" stroke="#333" strokeWidth="1" />
      {[
        { x: 60, y: 50, w: 280, h: 18 },
        { x: 60, y: 85, w: 200, h: 18 },
        { x: 60, y: 120, w: 240, h: 18 },
      ].map((r, i) => (
        <g key={i} opacity={active}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="4" fill="#111" stroke="#60a5fa" strokeWidth="1" />
          <rect x={r.x + 4} y={r.y + 4} width={r.w * (stage === "plan" ? 0.94 : 0.6 + i * 0.1)} height={r.h - 8} rx="2" fill="#60a5fa" fillOpacity={0.25} />
        </g>
      ))}
      <circle cx="330" cy="60" r="14" fill="#111" stroke="#50a12a" strokeWidth="1.2" opacity={active} />
      <text x="330" y="64" textAnchor="middle" fill="#50a12a" fontSize="8" fontWeight="700">
        −18%
      </text>
      <text x="200" y="188" textAnchor="middle" fill="#666" fontSize="9" letterSpacing="0.14em">
        CONDUIT FILL · SUPPLIER PRICE LAYER · CUT OPTIMIZATION
      </text>
    </svg>
  );
}

function PlumberVisual({ stage }: { stage: SimStage }) {
  const flow = stage === "idle" ? 0 : 1;
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
      <rect x="20" y="20" width="360" height="160" rx="8" fill="#0a0a0a" stroke="#333" strokeWidth="1" />
      <path d="M70 140 L70 80 L180 80 L180 55 L310 55 L310 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity={0.35 + flow * 0.65} />
      {flow ? (
        <circle r="4" fill="#50a12a">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M70 140 L70 80 L180 80 L180 55 L310 55 L310 140" />
        </circle>
      ) : null}
      {[70, 180, 310].map((x, i) => (
        <rect key={x} x={x - 12} y={130} width="24" height="20" rx="3" fill="#111" stroke="#38bdf8" strokeWidth="1" opacity={0.4 + i * 0.2} />
      ))}
      <text x="200" y="188" textAnchor="middle" fill="#666" fontSize="9" letterSpacing="0.14em">
        STACK SEQUENCE · VAN ROUTE · CODE FLAGS
      </text>
    </svg>
  );
}

function CarpenterVisual({ stage }: { stage: SimStage }) {
  const cut = stage === "plan" ? 1 : stage === "idle" ? 0.2 : 0.55;
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
      <rect x="20" y="20" width="360" height="160" rx="8" fill="#0a0a0a" stroke="#333" strokeWidth="1" />
      <rect x="60" y="50" width="280" height="12" fill="#111" stroke="#a78bfa" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={68 + i * 34}
          y="70"
          width="28"
          height="80"
          fill={i < 6 ? "#50a12a" : "#ef4444"}
          fillOpacity={0.15 + cut * 0.35}
          stroke={i < 6 ? "#50a12a" : "#ef4444"}
          strokeWidth="1"
        />
      ))}
      <text x="200" y="168" textAnchor="middle" fill="#888" fontSize="9">
        {cut > 0.8 ? "6 studs / stick · 2% scrap" : "Cut map loading…"}
      </text>
      <text x="200" y="188" textAnchor="middle" fill="#666" fontSize="9" letterSpacing="0.14em">
        CUT OPTIMIZER · LUMBER ORDER · PROGRESS LOG
      </text>
    </svg>
  );
}

function TradeVisual({ trade, stage }: { trade: TradeId; stage: SimStage }) {
  if (trade === "excavation") return <ExcavationVisual stage={stage} />;
  if (trade === "electrician") return <ElectricianVisual stage={stage} />;
  if (trade === "plumber") return <PlumberVisual stage={stage} />;
  return <CarpenterVisual stage={stage} />;
}

export function ConstructionTradeSimulator() {
  const [tradeId, setTradeId] = useState<TradeId>("excavation");
  const [stage, setStage] = useState<SimStage>("idle");
  const [stageIndex, setStageIndex] = useState(0);

  const trade = useMemo(() => TRADES.find((t) => t.id === tradeId)!, [tradeId]);

  useEffect(() => {
    if (stage === "idle" || stage === "plan") return;
    const timer = window.setTimeout(() => {
      const next = stageIndex + 1;
      if (next >= STAGE_ORDER.length) {
        setStage("plan");
      } else {
        setStageIndex(next);
        setStage(STAGE_ORDER[next]);
      }
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [stage, stageIndex]);

  const start = () => {
    setStageIndex(0);
    setStage("scanning");
  };

  const reset = () => {
    setStage("idle");
    setStageIndex(0);
  };

  const selectTrade = (id: TradeId) => {
    if (stage !== "idle" && stage !== "plan") return;
    setTradeId(id);
    reset();
  };

  const stageLabel =
    stage === "scanning"
      ? trade.stages.scanning
      : stage === "analyzing"
        ? trade.stages.analyzing
        : stage === "optimizing"
          ? trade.stages.optimizing
          : stage === "plan"
            ? "Action plan ready for crew lead review."
            : "Select a trade and run the optimizer.";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0d]/90 p-5 ring-1 ring-inset ring-white/[0.03] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
            Platform simulator
          </p>
          <h3 className="mt-1.5 text-xl font-semibold text-white [font-family:var(--font-montserrat)] sm:text-2xl">
            Custom AI Platforms for Construction & Trades
          </h3>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
            Select a trade. Watch how our custom-engineered systems ingest local operations data
            and cross-reference industry requirements to simultaneously automate overhead tasks (saving money)
            and scale bidding capabilities (winning more clients).
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TRADES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectTrade(t.id)}
            disabled={stage !== "idle" && stage !== "plan"}
            className={`rounded-xl border px-3 py-3 text-left transition-all disabled:opacity-45 ${
              tradeId === t.id
                ? "border-[color-mix(in_srgb,var(--brand-creative)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_10%,#0a0a0a)]"
                : "border-white/[0.07] bg-[#0a0a0a] hover:border-white/15"
            }`}
          >
            <span className="flex items-center gap-2 text-[var(--brand-creative)]">
              <TradeIcon id={t.id} />
              <span className="text-xs font-bold uppercase tracking-wider text-white">{t.label}</span>
            </span>
            <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">{t.tagline}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] bg-[#050505]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0a0a0b] px-4 py-2.5">
          <div className="flex items-center gap-2">
            {STAGE_ORDER.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  stage === "idle"
                    ? "bg-white/10"
                    : stage === "plan" || i <= stageIndex
                      ? "bg-[var(--brand-creative)]"
                      : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-zinc-500">{trade.inputValue}</span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-b border-white/[0.06] p-4 lg:border-b-0 lg:border-r">
            <div className="h-[11rem] sm:h-[12.5rem]">
              <TradeVisual trade={tradeId} stage={stage} />
            </div>
          </div>

          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              {trade.inputLabel}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200">{trade.inputValue}</p>
            <p className="mt-3 text-[11px] leading-relaxed text-zinc-400">{trade.painPoint}</p>
            <p className="mt-4 rounded-lg border border-white/[0.06] bg-[#0a0a0a] p-3 font-mono text-[11px] leading-relaxed text-[var(--brand-creative)]">
              {stageLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {stage === "idle" && (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-creative)] px-5 py-2.5 text-xs font-bold text-[#050505] shadow-[0_4px_16px_color-mix(in_srgb,var(--brand-creative)_40%,transparent)] transition-transform hover:-translate-y-0.5"
          >
            Run {trade.label} optimizer
          </button>
        )}
        {(stage === "scanning" || stage === "analyzing" || stage === "optimizing") && (
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-xs font-semibold text-zinc-400">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--brand-creative)] border-t-transparent" />
            Processing…
          </span>
        )}
        {stage === "plan" && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0e0e0f] px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-[#151517]"
          >
            Reset simulator
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {stage === "plan" && (
          <motion.div
            key={tradeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            className="mt-6 space-y-5"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {trade.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/[0.06] bg-[#080809] p-4 text-center"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{m.label}</p>
                  <p className="mt-2 text-lg font-bold text-white">{m.after}</p>
                  <p className="text-[10px] text-zinc-600 line-through">{m.before}</p>
                  <p className="mt-1 text-xs font-bold text-[var(--brand-creative)]">{m.delta}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#080809] p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                Platform action plan
              </p>
              <ol className="mt-4 space-y-3">
                {trade.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_10%,transparent)] text-[11px] font-bold text-[var(--brand-creative)]">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {trade.integrations.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
