"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/showroom", label: "Showroom" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "My Story" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-[20px] z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full flex-col overflow-hidden rounded-md border border-white/35 bg-white/22 backdrop-blur-xl supports-[backdrop-filter]:bg-white/18">
        <div className="flex w-full items-center justify-between gap-3 px-4 py-[0.45rem] sm:gap-6 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center pl-1 text-[var(--foreground)] sm:pl-2"
            aria-label="Invision Creative home"
            onClick={() => setIsOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG lockup used directly for precise header sizing. */}
            <img
              src="/brand/logo_dark.svg"
              alt=""
              decoding="async"
              fetchPriority="high"
              className="block h-[var(--header-logo-height)] w-auto max-w-none shrink-0 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex min-h-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm font-semibold text-[var(--brand-creative)] sm:gap-x-5 sm:text-base"
            aria-label="Primary"
          >
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors hover:text-[color-mix(in_oklab,var(--brand-creative)_80%,black)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-[var(--brand-creative)] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <div className="flex flex-col gap-[5px] w-6">
              <span className={`h-[2px] w-full bg-current transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-[2px] w-full bg-current transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-full bg-current transition-transform duration-300 ease-in-out ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-white/20 overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-4" aria-label="Mobile Primary">
                {nav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-[var(--brand-creative)] hover:text-white transition-colors py-2 border-b border-white/10 last:border-b-0"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
