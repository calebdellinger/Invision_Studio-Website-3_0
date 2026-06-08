"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", subtitle: "Overview & Featured reels" },
  { href: "/services", label: "Services", subtitle: "Photo, video & 3D workflows" },
  { href: "/showroom", label: "Showroom", subtitle: "Interactive project gallery" },
  { href: "/pricing", label: "Pricing", subtitle: "Clear, value-driven tiers" },
  { href: "/about", label: "My Story", subtitle: "Our philosophy & director's note" },
  { href: "/contact", label: "Contact", subtitle: "Kick off your next project" },
] as const;

export function SiteHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  // Close when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isExpanded]);

  return (
    <header 
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex justify-center px-4 w-full"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the ribbon itself
    >
      <motion.div
        layout
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : "36px",
          width: isExpanded ? "100%" : "240px",
          maxWidth: isExpanded ? "920px" : "240px",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="group relative w-full px-6 flex flex-col items-center rounded-b-3xl border-x border-b border-black/10 bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden"
      >
        {/* Trigger Area */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-0 left-0 right-0 h-[36px] z-20 flex items-center justify-center focus:outline-none cursor-pointer"
          aria-label={isExpanded ? "Close Menu" : "Open Menu"}
        >
          {/* Subtle click target area */}
        </button>

        {/* Closed State Header/Ribbon content */}
        <motion.div
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 top-0 flex items-center justify-center gap-4 pointer-events-none h-[36px]"
        >
          <svg width="6" height="4" viewBox="0 0 6 4" className="fill-current text-zinc-900/30 transition-colors duration-300 group-hover:text-zinc-950">
            <path d="M0 0L3 4L6 0H0Z" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-[0.65em] text-zinc-900/60 whitespace-nowrap transition-all duration-300 group-hover:text-zinc-950 group-hover:tracking-[0.8em] translate-x-[0.325em]">
            Navigation
          </span>
          <svg width="6" height="4" viewBox="0 0 6 4" className="fill-current text-zinc-900/30 transition-colors duration-300 group-hover:text-zinc-950">
            <path d="M0 0L3 4L6 0H0Z" />
          </svg>
        </motion.div>

        {/* Dropdown Content */}
        <motion.div
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : -20,
            scale: isExpanded ? 1 : 0.98
          }}
          transition={{ 
            duration: 0.35,
            delay: isExpanded ? 0.08 : 0,
            ease: "easeOut"
          }}
          className="w-full pt-10 pb-12"
          style={{ pointerEvents: isExpanded ? "auto" : "none" }}
        >
          {/* Desktop Mega-menu (3 Columns) */}
          <div className="hidden md:grid grid-cols-12 gap-8 w-full">
            {/* Left Column: Brand & Description */}
            <div className="col-span-4 flex flex-col gap-6 border-r border-zinc-100 pr-6">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo_dark.svg" alt="Invision Creative" className="h-18 w-auto object-contain" />
              </div>
              
              <p className="text-xs leading-relaxed text-zinc-500 font-medium">
                Elevating commercial storytelling through cinematic photography, high-fidelity 3D scanning, and post-production workflows.
              </p>
            </div>

            {/* Middle Column: Navigation Links */}
            <div className="col-span-5 flex flex-col gap-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                Explore Destinations
              </p>
              <nav className="flex flex-col gap-1">
                {navItems.map(({ href, label, subtitle }, index) => {
                  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                  const isContact = label === "Contact";
                  
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsExpanded(false)}
                      className={`group/item flex items-center justify-between rounded-xl p-2.5 transition-all duration-200 ${
                        isActive 
                          ? "bg-[var(--brand-creative)]/5 text-[var(--brand-creative)]" 
                          : isContact
                            ? "border border-zinc-100 bg-zinc-50/40 text-zinc-800 hover:border-[var(--brand-creative)]/20 hover:bg-[var(--brand-creative)]/5 hover:text-zinc-950"
                            : "text-zinc-800 hover:bg-zinc-50 hover:text-zinc-955"
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold uppercase tracking-[0.15em]">
                          {label}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium group-hover/item:text-zinc-500 transition-colors mt-0.5">
                          {subtitle}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isContact && !isActive && (
                          <span className="text-[7px] font-extrabold uppercase tracking-widest bg-[var(--brand-creative)]/10 text-[var(--brand-creative)] px-2 py-0.5 rounded-full transition-colors group-hover/item:bg-[var(--brand-creative)]/20">
                            Get in Touch
                          </span>
                        )}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)] shadow-[0_0_8px_var(--brand-creative)]" />
                        )}
                        <span className={`text-sm transition-all duration-300 transform ${
                          isActive 
                            ? "translate-x-0 opacity-100 text-[var(--brand-creative)]" 
                            : "translate-x-[-4px] opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 text-zinc-400"
                        }`}>
                          →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Column: CTA card & Social links */}
            <div className="col-span-3 flex flex-col justify-between pl-2">
              <div className="flex flex-col gap-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                  Collaborate
                </p>
                
                <div className="rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 border border-zinc-200/40 p-4 flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider leading-snug">
                    Have a concept?
                  </h4>
                  <p className="text-[10px] leading-relaxed text-zinc-500">
                    Let's collaborate on your next campaign or project.
                  </p>
                  
                  <Link
                    href="/contact"
                    onClick={() => setIsExpanded(false)}
                    className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-[var(--brand-creative)] py-2.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-[0_4px_12px_-2px_rgba(80,161,42,0.35)] hover:bg-[var(--brand-creative)]/90 hover:scale-[1.02] hover:shadow-[0_6px_16px_-2px_rgba(80,161,42,0.45)] active:scale-[0.98] transition-all"
                  >
                    Start Project
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                  Follow us
                </p>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-creative)] transition-colors">IG</a>
                  <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-creative)] transition-colors">VM</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-creative)] transition-colors">LI</a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout (Stacked & Compact) */}
          <div className="flex md:hidden flex-col gap-6 w-full items-center">
            {/* Logo */}
            <div className="flex items-center justify-center py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo_dark.svg" alt="Invision Creative" className="h-12 w-auto object-contain" />
            </div>

            {/* Links List */}
            <nav className="flex flex-col gap-1.5 w-full max-w-[280px]">
              {navItems.map(({ href, label }, index) => {
                const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsExpanded(false)}
                    className={`block py-2 rounded-xl text-xs font-bold uppercase tracking-[0.18em] transition-all text-center ${
                      isActive 
                        ? "bg-[var(--brand-creative)]/5 text-[var(--brand-creative)]" 
                        : href === "/contact"
                          ? "bg-[var(--brand-creative)] text-white shadow-[0_4px_12px_-2px_rgba(80,161,42,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                          : "text-zinc-800 hover:text-zinc-950"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Close Handle at bottom */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-30 hover:opacity-100 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Close menu"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" className="fill-current text-zinc-400 hover:text-zinc-900 transition-colors">
              <path d="M5 0L0 5L1.4 6L5 2.8L8.6 6L10 5L5 0Z" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </header>
  );
}
