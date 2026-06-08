"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandSwitch } from "@/components/brand/BrandSwitch";

const MARKETING_URL = "https://invisionmarketing.io/";
const CONTACT_EMAIL = "hello@invisioncreative.com";

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
        Direct Inquiry
      </p>
      <button
        onClick={handleCopy}
        className="group relative flex items-center gap-4 text-left focus:outline-none"
        aria-label="Copy email address"
      >
        <div className="flex flex-col">
          <span className="text-lg font-medium text-zinc-900 transition-colors group-hover:text-[var(--brand-creative)] sm:text-xl">
            {CONTACT_EMAIL}
          </span>
          <div className="mt-1 h-px w-0 bg-[var(--brand-creative)] transition-all duration-500 group-hover:w-full" />
        </div>
        
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all group-hover:border-[var(--brand-creative)] group-hover:bg-[var(--brand-creative)]/5 group-hover:text-[var(--brand-creative)]">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.svg
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </motion.svg>
            )}
          </AnimatePresence>
          
          {/* Tooltip */}
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-widest"
              >
                Copied
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-zinc-100 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo_dark.svg" alt="Invision Creative" className="h-8 w-auto" />
                <div className="h-4 w-px bg-zinc-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                  Visual Engineering
                </span>
              </div>
              <h2 className="max-w-md font-serif text-3xl leading-[1.1] tracking-tight text-zinc-950 sm:text-4xl">
                Elevating brands through cinematic precision.
              </h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-zinc-500">
                Specialized in commercial photography, retention-paced brand films, 
                high-fidelity 3D scanning, and AI-integrated creative workflows.
              </p>
            </div>
          </div>

          {/* Navigation & Contact Links */}
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7">
            
            {/* Contact Information */}
            <div className="flex flex-col gap-10">
              <CopyEmailButton />
              
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                  Availability
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--brand-creative)] animate-pulse" />
                  <span className="text-sm font-semibold text-zinc-900 uppercase tracking-widest">
                    Open for Q3 Project Booking
                  </span>
                </div>
              </div>
            </div>

            {/* Strategic Partner Section */}
            <div className="flex flex-col gap-8 rounded-3xl border border-zinc-100 bg-zinc-50/50 p-8">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                  Strategic Growth
                </p>
                <h3 className="font-serif text-xl tracking-tight text-zinc-950">
                  Invision Marketing
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500">
                For performance-led SEO, paid acquisition, and lead-generation web systems, visit our marketing division.
              </p>
              <Link
                href={MARKETING_URL}
                className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-partner)] transition-colors hover:text-[var(--brand-partner)]/80"
              >
                Visit Invision Marketing
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Action & Switcher */}
        <div className="mt-20 flex flex-col items-center justify-between gap-10 border-t border-zinc-100 pt-12 sm:flex-row">
          
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-10 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[var(--brand-creative)]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            
            <div className="flex flex-col items-center gap-3 sm:items-start">
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                 Platform Context
               </p>
               <div className="flex items-center gap-6 scale-110 sm:scale-100 origin-left">
                  <BrandSwitch variant="light" />
               </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              © {new Date().getFullYear()} Invision Creative
            </p>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <Link href="/privacy" className="hover:text-zinc-950 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-950 transition-colors">Terms</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
