"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { NeuralNetworkVisual } from "./NeuralNetworkVisual";

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

// Trade visuals replaced by NeuralNetworkVisual

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
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 ring-1 ring-inset ring-zinc-100 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
            Platform simulator
          </p>
          <h3 className="mt-1.5 text-xl font-semibold text-zinc-900 [font-family:var(--font-montserrat)] sm:text-2xl">
            Custom AI Platforms for Construction & Trades
          </h3>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-zinc-600 sm:text-sm">
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
                : "border-zinc-200 bg-zinc-50 hover:border-zinc-200"
            }`}
          >
            <span className="flex items-center gap-2 text-[var(--brand-creative)]">
              <TradeIcon id={t.id} />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">{t.label}</span>
            </span>
            <p className="mt-1.5 text-[10px] leading-snug text-zinc-600">{t.tagline}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-100 px-4 py-2.5">
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
          <span className="font-mono text-[10px] text-zinc-600">{trade.inputValue}</span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-b border-zinc-200 p-4 lg:border-b-0 lg:border-r">
            <div className="h-[11rem] sm:h-[12.5rem]">
              <NeuralNetworkVisual stage={stage} trade={tradeId} />
            </div>
          </div>

          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              {trade.inputLabel}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800">{trade.inputValue}</p>
            <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">{trade.painPoint}</p>
            <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-[11px] leading-relaxed text-[var(--brand-creative)]">
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
          <span className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-5 py-2.5 text-xs font-semibold text-zinc-600">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--brand-creative)] border-t-transparent" />
            Processing…
          </span>
        )}
        {stage === "plan" && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
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
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">{m.label}</p>
                  <p className="mt-2 text-lg font-bold text-zinc-900">{m.after}</p>
                  <p className="text-[10px] text-zinc-600 line-through">{m.before}</p>
                  <p className="mt-1 text-xs font-bold text-[var(--brand-creative)]">{m.delta}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                Platform action plan
              </p>
              <ol className="mt-4 space-y-3">
                {trade.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
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
                  className="rounded-md border border-zinc-200 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-600"
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
