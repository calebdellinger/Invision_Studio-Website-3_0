"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CreativeShowcaseHero() {
  const reduceMotion = useReducedMotion();
  const [time, setTime] = useState({ h: 0, m: 18, s: 54, f: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let f = prev.f + 1;
        let s = prev.s;
        let m = prev.m;
        let h = prev.h;
        if (f >= 30) {
          f = 0;
          s += 1;
        }
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        if (h >= 24) {
          h = 0;
        }
        return { h, m, s, f };
      });
    }, 1000 / 30); // 30 fps
    return () => clearInterval(interval);
  }, []);

  const formatTimecode = () => {
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(time.h)}:${pad(time.m)}:${pad(time.s)}:${pad(time.f)}`;
  };


  return (
    <section className="relative -mt-[var(--header-height)] flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-white px-4 pb-36 sm:pb-52 pt-[calc(var(--header-height)+4rem)] sm:px-6 lg:px-8">
      {/* ── Premium Geometric Background ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Soft dot grid background */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle, #e4e4e7 1.5px, transparent 1.5px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Viewfinder crosshairs and guide lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Subtle horizontal/vertical center lines */}
          <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-zinc-200 to-transparent opacity-60" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-60" />
          
          {/* 3x3 Rule-of-thirds alignment lines */}
          <div className="absolute left-[33.33%] top-0 h-full w-[1px] bg-zinc-100/70" />
          <div className="absolute left-[66.66%] top-0 h-full w-[1px] bg-zinc-100/70" />
          <div className="absolute top-[33.33%] left-0 w-full h-[1px] bg-zinc-100/70" />
          <div className="absolute top-[66.66%] left-0 w-full h-[1px] bg-zinc-100/70" />
        </div>

        {/* Viewfinder Corners */}
        <div className="absolute inset-6 md:inset-10 border-[1.5px] border-transparent">
          {/* Top-Left Corner */}
          <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-zinc-300" />
          {/* Top-Right Corner */}
          <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-zinc-300" />
          {/* Bottom-Left Corner */}
          <div className="absolute left-0 bottom-0 h-6 w-6 border-l-2 border-b-2 border-zinc-300" />
          {/* Bottom-Right Corner */}
          <div className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-zinc-300" />
        </div>

        {/* Dynamic Animated Geometric Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-[1200px] h-[1200px] opacity-[0.06] text-zinc-900" viewBox="0 0 1000 1000" fill="none">
            {/* Outer dotted guide ring */}
            <motion.circle
              cx="500"
              cy="500"
              r="420"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle lens ring with angle ticks */}
            <motion.circle
              cx="500"
              cy="500"
              r="300"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="40 10 10 10"
              animate={{ rotate: -360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner camera aperture rings */}
            <circle cx="500" cy="500" r="180" stroke="currentColor" strokeWidth="1" />
            <circle cx="500" cy="500" r="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="500" cy="500" r="60" stroke="currentColor" strokeWidth="0.5" />

            {/* Focal guide angles */}
            <line x1="500" y1="50" x2="500" y2="950" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="50" y1="500" x2="950" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

            {/* Isometric focus lines */}
            <motion.g
              animate={{ rotate: 180 }}
              transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            >
              <line x1="180" y1="180" x2="820" y2="820" stroke="currentColor" strokeWidth="0.5" />
              <line x1="820" y1="180" x2="180" y2="820" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="500,420 580,500 500,580 420,500" stroke="currentColor" strokeWidth="1" />
            </motion.g>
          </svg>
        </div>

        {/* Edge vignette & bottom fade to white */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_50%_40%,transparent_20%,#fff_82%)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"
          aria-hidden
        />

        {/* Tech details/metadata in corners (placed after gradients for crisp visibility) */}
        <div className="absolute left-10 top-[calc(var(--header-height)+1.5rem)] z-10 hidden font-mono text-[9px] uppercase tracking-widest text-zinc-700 sm:block">
          <span className="text-[var(--brand-creative)] animate-pulse">●</span> REC [{formatTimecode()}]
        </div>
        <div className="absolute right-10 top-[calc(var(--header-height)+1.5rem)] z-10 hidden font-mono text-[9px] uppercase tracking-widest text-zinc-700 sm:block">
          <span className="text-[var(--brand-creative)]">●</span> GRID [3x3] // ASPECT [16:9]
        </div>
        <div className="absolute left-10 bottom-8 z-10 hidden font-mono text-[9px] uppercase tracking-widest text-zinc-700 sm:block">
          <span className="text-[var(--brand-creative)]">●</span> FOCAL [35mm | F1.8 | ISO 250]
        </div>
      </div>


      <div className="relative z-10 mx-auto w-full max-w-4xl flex flex-col items-center text-center">
        {/* ── Center Column: Headline and Call to Actions ── */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-6 bg-[var(--brand-creative)] opacity-85" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[color-mix(in_srgb,var(--brand-creative)_90%,#000_10%)]">
              Invision Creative
            </p>
            <div className="h-px w-6 bg-[var(--brand-creative)] opacity-85" />
          </motion.div>

          <motion.h1
            className="mt-6 font-serif text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[1.0] tracking-tight text-zinc-900"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Capture Attention.
            <br />
            <span className="text-zinc-600">Command the Feed.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-[16px] leading-relaxed text-zinc-600 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            We engineer high-impact commercial photography, retention-paced brand films, and multi-channel social content systems designed to make your brand impossible to ignore.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-10 py-4 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950 hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.25)]"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50/50 px-10 py-4 text-sm font-medium text-zinc-600 backdrop-blur-sm transition-colors hover:border-zinc-300 hover:text-black"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
