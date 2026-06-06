"use client";

import type { ReactNode } from "react";

export type ApproachId = "cloud" | "private" | "hybrid";

export type ApproachFeature = {
  title: string;
  description: string;
  icon: ReactNode;
};

export type Approach = {
  id: ApproachId;
  label: string;
  title: string;
  tagline: string;
  description: string;
  highlights: { label: string; slug: string }[];
  features: ApproachFeature[];
  accent: "blue" | "green" | "amber";
};

function IconCloud() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function IconSplit() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export const APPROACHES: Approach[] = [
  {
    id: "cloud",
    label: "Approach 01",
    title: "Fully Cloud",
    tagline: "Fastest deployment. High-speed automation.",
    description:
      "Your custom AI platform runs entirely on managed cloud servers. Orchestration, API integrations, and secure language models are handled by leading enterprise SaaS providers. Ideal for rapid operational overhead reduction, instant multi-location scalability, and low ongoing maintenance.",
    highlights: [
      { label: "Enterprise SaaS", slug: "enterprise-saas" },
      { label: "Cloud Orchestration", slug: "cloud-orchestration" },
      { label: "Make & n8n Hosting", slug: "workflow-hosting" },
      { label: "Secure APIs", slug: "secure-apis" }
    ],
    features: [
      {
        icon: <IconCloud />,
        title: "Zero infrastructure overhead",
        description: "No servers to maintain. Workflows operate on secure, managed enterprise cloud environments.",
      },
      {
        icon: <IconZap />,
        title: "Rapid financial return",
        description: "Connect your existing software stack via webhooks. Most cloud-based platforms go live in 2–4 weeks.",
      },
      {
        icon: <IconLink />,
        title: "Universal integrations",
        description: "Connect your ERP, CRM, and communication channels (Slack, SMS) right out of the box.",
      },
    ],
    accent: "blue",
  },
  {
    id: "private",
    label: "Approach 02",
    title: "Fully Private",
    tagline: "Maximum security. Zero public training.",
    description:
      "We build and deploy a dedicated on-premise AI platform running on enterprise-grade hardware (like a Mac Studio M3 Max) inside your network. Every calculation, document analysis, and proposal draft is processed entirely locally. Absolute protection for proprietary estimating formulas and sensitive records.",
    highlights: [
      { label: "Mac Studio M3 Max", slug: "local-hardware" },
      { label: "Local LLMs", slug: "local-llms" },
      { label: "Air-gapped capable", slug: "air-gapped" },
      { label: "Zero public API leaks", slug: "zero-leaks" }
    ],
    features: [
      {
        icon: <IconShield />,
        title: "100% data sovereignty",
        description: "Your intellectual property, estimating history, and customer records never leave your local physical network.",
      },
      {
        icon: <IconServer />,
        title: "Dedicated hardware build",
        description: "We configure, test, and deploy a high-performance local server optimized for your business operations.",
      },
      {
        icon: <IconCpu />,
        title: "Proprietary training models",
        description: "Run custom models fine-tuned on your historical bids and SOPs without sharing data with tech companies.",
      },
    ],
    accent: "green",
  },
  {
    id: "hybrid",
    label: "Approach 03",
    title: "Hybrid",
    tagline: "The optimal balance. Local security, cloud speed.",
    description:
      "Sensitive operations—such as proprietary estimate calculations, bid analyses, and internal databases—run on secure local nodes. Standard tasks, external supplier queries, and dispatch notifications are routed through the cloud. The target setup for growing enterprises.",
    highlights: [
      { label: "Local inference nodes", slug: "local-inference-nodes" },
      { label: "Secure API gatekeepers", slug: "secure-api-gatekeepers" },
      { label: "Cloud orchestration", slug: "cloud-orchestration" },
      { label: "Human-in-the-loop", slug: "human-validation" }
    ],
    features: [
      {
        icon: <IconSplit />,
        title: "Smart operational routing",
        description: "Proprietary files stay local on secure hardware, while external notifications and scheduling sync via cloud APIs.",
      },
      {
        icon: <IconEye />,
        title: "Verification gates",
        description: "AI-generated bids and communications sit in secure drafts, waiting for human approval before release.",
      },
      {
        icon: <IconLink />,
        title: "Unified dashboard",
        description: "One interface connects local operations analysis with cloud scheduling—no split systems.",
      },
    ],
    accent: "amber",
  },
];

export const accentStyles = {
  blue: {
    ring: "ring-blue-400/20",
    border: "border-blue-400/25",
    badge: "border-blue-400/25 bg-blue-400/10 text-blue-300",
    glow: "from-blue-400/15",
    node: "border-blue-400/40 bg-blue-400/10 text-blue-300",
    icon: "border-blue-400/25 bg-blue-400/10 text-blue-300",
    line: "stroke-blue-400/35",
  },
  green: {
    ring: "ring-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)]",
    border: "border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)]",
    badge:
      "border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_12%,transparent)] text-[var(--brand-creative)]",
    glow: "from-[color-mix(in_srgb,var(--brand-creative)_18%,transparent)]",
    node: "border-[color-mix(in_srgb,var(--brand-creative)_40%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_10%,transparent)] text-[var(--brand-creative)]",
    icon: "border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_10%,transparent)] text-[var(--brand-creative)]",
    line: "stroke-[color-mix(in_srgb,var(--brand-creative)_40%,transparent)]",
  },
  amber: {
    ring: "ring-amber-400/20",
    border: "border-amber-400/25",
    badge: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    glow: "from-amber-400/15",
    node: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    icon: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    line: "stroke-amber-400/35",
  },
};

export { ApproachIllustration } from "./ApproachIllustrations";
