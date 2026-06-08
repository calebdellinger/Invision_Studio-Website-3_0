"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WorkflowPreset = "campaign" | "ecommerce" | "culture";
type WorkflowStage = "idle" | "ingesting" | "analyzing" | "generating" | "approving" | "completed";

interface PresetDetails {
  id: WorkflowPreset;
  title: string;
  assetName: string;
  size: string;
  icon: React.ReactNode;
  steps: {
    ingesting: string;
    analyzing: string;
    generating: string;
    approving: string;
    completed: string;
  };
  outputMock: {
    title: string;
    tags: string[];
    copy: { platform: string; text: string }[];
    destination: string[];
  };
}

const PRESETS: Record<WorkflowPreset, PresetDetails> = {
  campaign: {
    id: "campaign",
    title: "Campaign Event Recap",
    assetName: "shoot_day_raw_recap.mp4",
    size: "4.2 GB Raw Video",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    steps: {
      ingesting: "[SYS] Ingesting shoot_day_raw_recap.mp4... Splitting into multi-aspect ratios (9:16 vertical, 16:9 widescreen, 1:1 square). Normalizing frame rates.",
      analyzing: "[VISION] Scene boundary detection active. Extracting transcripts, visual descriptors, audio energy peaks, and subject identities.",
      generating: "[LLM] Interpolating brand voice. Writing platform variants: 1x Instagram Reel caption, 1x LinkedIn corporate narrative, 1x X/Twitter snappy summary. Generating alt-text and SEO metadata.",
      approving: "[HIL] Creative Guardrails Active. Human review required: Verify generated transcriptions, brand copy templates, and social hashtags.",
      completed: "[DAM] Routed vertical crop to IG Drafts, widescreen crop + caption to Webflow CMS, and synced catalog to Adobe AEM Brand DAM.",
    },
    outputMock: {
      title: "Summer Creative Launch Event",
      tags: ["Event Recap", "Creative Tech", "Invision Creative", "Behind the Scenes"],
      copy: [
        { platform: "Instagram", text: "Lights, cameras, and creative flow. Here is a peak behind the scenes of our latest production shoot day. #creative" },
        { platform: "LinkedIn", text: "Visual-first strategy in action. Yesterday, the Invision Creative team wrapped production on our upcoming brand campaign. We focused on multi-channel content delivery from a single shoot day." }
      ],
      destination: ["Instagram Reels Drafts", "Webflow CMS Library", "Enterprise Adobe DAM"]
    }
  },
  ecommerce: {
    id: "ecommerce",
    title: "Ecommerce Catalog Shoot",
    assetName: "studio_product_batch_24.zip",
    size: "180 Raw Photos",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    steps: {
      ingesting: "[SYS] Unpacking batch_24_studio.zip. Parsing EXIF data. Converting RAW color profiles to web-friendly sRGB specs.",
      analyzing: "[VISION] Classifying products (e.g., jackets, trousers, hoodies). Identifying Pantone color codes, fabric textures, and collar cuts.",
      generating: "[LLM] Generating ADA-compliant descriptive ALT text. Constructing Shopify product tag strings and catalog title recommendations.",
      approving: "[HIL] Quality Control Check: Confirm automatic category assignments and color naming alignments before syncing to inventory.",
      completed: "[API] Created 180 synced products inside Shopify Storefront (Draft Mode). High-res RAW archive synced to secure Brand cloud backup.",
    },
    outputMock: {
      title: "Men's Utility Rain Jacket - Olive",
      tags: ["Apparel", "Outerwear", "Waterproof", "Fall 2026", "Olive Hex #4A5D4E"],
      copy: [
        { platform: "Alt Text", text: "Model wearing a water-resistant olive green utility rain jacket with adjustable hood and double-stitched storm flap pockets, set against a concrete studio backdrop." },
        { platform: "Shopify Tag Line", text: "Engineered for elements. Modern styling meets heavy weather protection in an lightweight, packable design." }
      ],
      destination: ["Shopify Storefront", "Active Inventory DAM", "Cloud Raw Archive"]
    }
  },
  culture: {
    id: "culture",
    title: "Company Culture & Lifestyle",
    assetName: "hq_lifestyle_day_1.zip",
    size: "75 Raw Photos",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    steps: {
      ingesting: "[SYS] Reading hq_lifestyle_day_1.zip. Extracting timestamp sequences and clustering images by lighting environments.",
      analyzing: "[VISION] Facial clustering active. Tagging team members, candid boardrooms, collab lounges, and team building assets.",
      generating: "[LLM] Composing custom LinkedIn bio descriptions for team page. Drafting 3 culture spotlight posts and category directory updates.",
      approving: "[HIL] Compliance Check: Verify employee name tagging permissions and review LinkedIn copywriting tone check.",
      completed: "[API] Syced directory headshots to Internal HR DAM, pushed scheduled culture posts to LinkedIn Scheduler (Draft mode).",
    },
    outputMock: {
      title: "Creative Collaboration Day",
      tags: ["Team Culture", "Workspace", "Invision Office", "Collaboration", "Productivity"],
      copy: [
        { platform: "LinkedIn Post", text: "Collaboration isn't just about sharing a room — it's about sharing a creative vision. Inside our studio workspace, our directors are mapping out next month's video campaigns. #InvisionCreative" },
        { platform: "HR Metadata", text: "Employees detected: Alex Chen (Lead Video), Sarah Miller (Creative Producer). Location: Studio Lounge B." }
      ],
      destination: ["LinkedIn Scheduler", "Internal Team Portal", "Culture Assets Shared Drive"]
    }
  }
};

export function AiWorkflowSimulator() {
  const [preset, setPreset] = useState<WorkflowPreset>("campaign");
  const [stage, setStage] = useState<WorkflowStage>("idle");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const activePreset = PRESETS[preset];

  // Scroll to bottom of terminal when logs update
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Handle stage progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === "ingesting") {
      setProgress(0);
      setLogs([`Starting integration pipeline: ${activePreset.title}`, activePreset.steps.ingesting]);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("analyzing");
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    } else if (stage === "analyzing") {
      setProgress(0);
      setLogs((prev) => [...prev, "[OK] Ingestion complete.", activePreset.steps.analyzing]);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("generating");
            return 100;
          }
          return prev + 4;
        });
      }, 120);

      return () => clearInterval(interval);
    } else if (stage === "generating") {
      setProgress(0);
      setLogs((prev) => [...prev, "[OK] Analysis details saved.", activePreset.steps.generating]);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("approving");
            return 100;
          }
          return prev + 3;
        });
      }, 120);

      return () => clearInterval(interval);
    } else if (stage === "approving") {
      setProgress(100);
      setLogs((prev) => [...prev, "[ALERT] Generation complete. Review pipeline outputs below.", activePreset.steps.approving]);
    } else if (stage === "completed") {
      setProgress(100);
      setLogs((prev) => [...prev, "[OK] Human approved.", activePreset.steps.completed, `[SUCCESS] Pipeline finished. Routed all assets successfully.`]);
    }
  }, [stage, preset]);

  const handleStart = () => {
    setLogs([]);
    setStage("ingesting");
  };

  const handleApprove = () => {
    setStage("completed");
  };

  const handleReset = () => {
    setStage("idle");
    setProgress(0);
    setLogs([]);
  };

  const selectPreset = (id: WorkflowPreset) => {
    if (stage === "idle" || stage === "completed" || stage === "approving") {
      setPreset(id);
      handleReset();
    }
  };

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white/90 p-5 ring-1 ring-inset ring-black/[0.03] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
            Interactive simulator
          </p>
          <h3 className="mt-1.5 text-xl font-semibold text-zinc-900 [font-family:var(--font-montserrat)]">
            AI Ingest & Routing Pipeline
          </h3>
        </div>
        <div className="flex gap-2">
          {(["campaign", "ecommerce", "culture"] as const).map((id) => (
            <button
              key={id}
              onClick={() => selectPreset(id)}
              disabled={stage !== "idle" && stage !== "completed" && stage !== "approving"}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                preset === id
                  ? "border-[color-mix(in_srgb,var(--brand-creative)_50%,white_10%)] bg-[color-mix(in_srgb,var(--brand-creative)_16%,#0a0a0a)] text-zinc-900"
                  : "border-black/5 text-zinc-600 hover:border-black/10 hover:text-zinc-600 disabled:opacity-40"
              }`}
            >
              {PRESETS[id].icon}
              <span className="hidden sm:inline">{PRESETS[id].title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-600">
        Choose a production preset, click ingest, and watch how our AI pipelines automate extraction, asset tagging, copywriting, and CMS routing while keeping human verification in control.
      </p>

      {/* Simulator Terminal Screen */}
      <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.06] bg-[#050505]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#0a0a0b] px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-[10px] text-zinc-600">invision-pipeline-terminal</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-600">
            <span>{activePreset.assetName} ({activePreset.size})</span>
          </div>
        </div>

        {/* Terminal Console Logs */}
        <div className="h-44 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-zinc-600">
          {stage === "idle" && (
            <div className="flex h-full flex-col items-center justify-center text-center text-zinc-600">
              <svg viewBox="0 0 24 24" className="h-8 w-8 mb-2 stroke-current" fill="none" strokeWidth="1">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <p>Pipeline offline. Select preset and click Ingest Assets below.</p>
            </div>
          )}
          {logs.map((log, index) => {
            let colorClass = "text-zinc-600";
            if (log.startsWith("[SYS]")) colorClass = "text-blue-400";
            else if (log.startsWith("[VISION]")) colorClass = "text-purple-400";
            else if (log.startsWith("[LLM]")) colorClass = "text-emerald-400 font-medium";
            else if (log.startsWith("[HIL]")) colorClass = "text-amber-400 font-semibold";
            else if (log.startsWith("[DAM]") || log.startsWith("[API]")) colorClass = "text-cyan-400";
            else if (log.startsWith("[SUCCESS]")) colorClass = "text-[var(--brand-creative)] font-bold";
            else if (log.startsWith("[OK]")) colorClass = "text-zinc-600";
            
            return (
              <div key={index} className={`mb-1.5 ${colorClass}`}>
                {log}
              </div>
            );
          })}
          <div ref={consoleEndRef} />
        </div>

        {/* Progress Bar */}
        {(stage !== "idle" && stage !== "completed") && (
          <div className="h-1 bg-white/5 w-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--brand-creative)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        {stage === "idle" && (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 rounded-lg bg-[var(--brand-creative)] px-5 py-2.5 text-xs font-bold text-[#050505] shadow-[0_4px_16px_color-mix(in_srgb,var(--brand-creative)_40%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_color-mix(in_srgb,var(--brand-creative)_50%,transparent)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Ingest Assets
          </button>
        )}

        {(stage === "ingesting" || stage === "analyzing" || stage === "generating") && (
          <button
            disabled
            className="flex items-center gap-2 rounded-lg border border-black/5 bg-white/[0.02] px-5 py-2.5 text-xs font-semibold text-zinc-600 cursor-not-allowed"
          >
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--brand-creative)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Pipeline...
          </button>
        )}

        {stage === "approving" && (
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#050505] shadow-[0_4px_16px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(245,158,11,0.5)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Approve Outputs & Route
          </button>
        )}

        {stage === "completed" && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-black/10 bg-[#0e0e0f] px-5 py-2.5 text-xs font-semibold text-zinc-600 transition-all hover:bg-[#151517]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Reset Simulator
          </button>
        )}
      </div>

      {/* Simulated Output Panel */}
      <AnimatePresence mode="wait">
        {(stage === "approving" || stage === "completed") && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 rounded-xl border border-black/[0.06] bg-[#080809] p-4 ring-1 ring-inset ring-black/[0.02]"
          >
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${stage === "completed" ? "bg-[var(--brand-creative)]" : "bg-amber-400 animate-pulse"}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  {stage === "completed" ? "Final Ingestion Outputs (Routed)" : "Verification Queue: Assets Pending Review"}
                </span>
              </div>
              {stage === "completed" && (
                <span className="rounded-full bg-[var(--brand-creative)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--brand-creative)] uppercase tracking-wider">
                  Complete
                </span>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {/* Output Title */}
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Title Field</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">{activePreset.outputMock.title}</p>
              </div>

              {/* Output Tags */}
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Auto-generated Tags</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activePreset.outputMock.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-black/[0.08] bg-white/[0.02] px-2 py-0.5 text-[10px] font-medium text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Output Copy */}
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Generated Copy Variants</p>
                <div className="mt-1.5 space-y-2">
                  {activePreset.outputMock.copy.map((item) => (
                    <div key={item.platform} className="rounded border border-black/[0.04] bg-[#0c0c0e] p-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--brand-creative)]">{item.platform}</p>
                      <p className="mt-1 leading-relaxed text-zinc-600 font-sans">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Destinations */}
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                  {stage === "completed" ? "Routed Destinations" : "Target Destinations"}
                </p>
                <div className="mt-1.5 space-y-1.5">
                  {activePreset.outputMock.destination.map((dest) => (
                    <div key={dest} className="flex items-center gap-2 text-zinc-600">
                      <span className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                        stage === "completed" 
                          ? "border-[var(--brand-creative)] bg-[var(--brand-creative)]/10 text-[var(--brand-creative)]" 
                          : "border-black/10 bg-white/[0.02] text-transparent"
                      }`}>
                        <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className={stage === "completed" ? "text-zinc-200" : "text-zinc-600"}>{dest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
