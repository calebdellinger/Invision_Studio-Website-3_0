"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StatItem {
  task: string;
  manualTime: number; // in minutes
  automatedTime: number; // in minutes
  description: string;
}

const STATS_DATA: StatItem[] = [
  {
    task: "Metadata Tagging (150+ assets)",
    manualTime: 180,
    automatedTime: 2,
    description: "AI reads frames and colors, generates file descriptors, and inserts keywords into DAM."
  },
  {
    task: "Social Copy Variants (3 platforms)",
    manualTime: 120,
    automatedTime: 3,
    description: "Auto-generates draft captions tuned to brand tone guidelines for approval."
  },
  {
    task: "Multi-format Slicing & Crop",
    manualTime: 90,
    automatedTime: 1,
    description: "Applies smart central focus cropping for vertical, square, and wide formats."
  },
  {
    task: "CMS Upload & Route Sync",
    manualTime: 60,
    automatedTime: 1,
    description: "Uploads assets to Shopify, Webflow, or DAM via API, linking tags and fields instantly."
  }
];

export function AiStatsChart() {
  const [activeTab, setActiveTab] = useState<"time" | "percentage">("time");

  // Find max manual time to scale width to 100%
  const maxManualTime = Math.max(...STATS_DATA.map(d => d.manualTime));

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0d]/90 p-5 ring-1 ring-inset ring-white/[0.03] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
            Efficiency data
          </p>
          <h3 className="mt-1.5 text-xl font-semibold text-white [font-family:var(--font-montserrat)]">
            The Integration Premium: Manual vs. Automated
          </h3>
        </div>
        <div className="inline-flex rounded-lg border border-white/10 bg-[#050506] p-0.5">
          <button
            onClick={() => setActiveTab("time")}
            className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === "time" ? "bg-[var(--brand-creative)] text-[#050505]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Minutes Saved
          </button>
          <button
            onClick={() => setActiveTab("percentage")}
            className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === "percentage" ? "bg-[var(--brand-creative)] text-[#050505]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Speed multiplier
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-400">
        AI doesn&apos;t replace creative thought — it replaces mechanical clicks. Here is the average time saved per typical production batch size of 150 items.
      </p>

      <div className="mt-6 space-y-6">
        {STATS_DATA.map((item, index) => {
          const manualWidth = 100;
          const automatedWidth = Math.max((item.automatedTime / item.manualTime) * 100, 1.8);
          const timeSavedMin = item.manualTime - item.automatedTime;
          const multiplier = Math.round(item.manualTime / item.automatedTime);

          return (
            <div key={item.task} className="group">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-sm font-semibold text-white">{item.task}</h4>
                <div className="font-mono text-xs font-bold text-zinc-500">
                  {activeTab === "time" ? (
                    <span>
                      <span className="text-zinc-500 line-through">{item.manualTime}m</span>
                      {" → "}
                      <span className="text-[var(--brand-creative)]">{item.automatedTime}m</span>
                    </span>
                  ) : (
                    <span className="text-[var(--brand-creative)]">{multiplier}x faster</span>
                  )}
                </div>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">{item.description}</p>

              {/* Dual Bar Chart */}
              <div className="mt-3 space-y-1.5">
                {/* Manual Bar */}
                <div className="relative">
                  <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-zinc-600/40"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${manualWidth}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[8px] uppercase tracking-wider text-zinc-500 pointer-events-none">
                    Manual Process
                  </span>
                </div>

                {/* Automated Bar */}
                <div className="relative">
                  <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--brand-creative)] to-[var(--brand-creative)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${automatedWidth}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.15 }}
                    />
                  </div>
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[8px] uppercase tracking-wider text-[#050506] font-bold pointer-events-none">
                    Automated Pipeline (-{timeSavedMin}m)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div className="mt-6 rounded-xl border border-[color-mix(in_srgb,var(--brand-creative)_25%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_6%,#0a0a0a)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Pipeline Savings</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-white [font-family:var(--font-montserrat)]">
              7.4 Hours <span className="text-zinc-500 font-medium text-sm">per batch</span>
            </p>
          </div>
          <span className="rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_40%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_15%,transparent)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--brand-creative)]">
            98.5% faster
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
          A single shoot library can be categorized, keyworded, written up for social promotion, and routed into your DAM and Shopify store in less than 10 minutes total human inspection time.
        </p>
      </div>
    </div>
  );
}
