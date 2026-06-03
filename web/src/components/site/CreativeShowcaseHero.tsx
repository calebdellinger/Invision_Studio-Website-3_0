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


      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12">
        {/* ── Left Column: Headline and Call to Actions ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
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
          </motion.div>

          <motion.h1
            className="mt-6 font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[1.0] tracking-tight text-zinc-900"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Capture Attention.
            <br />
            <span className="text-zinc-400">Command the Feed.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-zinc-600 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            We engineer high-impact commercial photography, retention-paced brand films, and multi-channel social content systems designed to make your brand impossible to ignore.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.25)]"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50/50 px-8 py-3.5 text-sm font-medium text-zinc-600 backdrop-blur-sm transition-colors hover:border-zinc-300 hover:text-zinc-900"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* ── Right Column: Light-themed Feature Cards ── */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full">
          {[
            {
              title: "Photography",
              label: "Photo",
              cap: "8K Raw / Editorial Detail",
              image: "/rebuild-gallery/6F4A3334.jpg",
              href: "/services/photography",
              index: 1,
            },
            {
              title: "Videography",
              label: "Video",
              cap: "4K Cinematic / Sound Design",
              image: "/rebuild-gallery/badass.jpg",
              href: "/services/videography",
              index: 2,
            },
            {
              title: "Social & Content",
              label: "Social",
              cap: "Multi-Platform native layouts",
              image: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
              href: "/services/social-media",
              index: 3,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={item.href}
                className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_42%,transparent)] hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)]"
              >
                {/* Subtle visual card thumbnail */}
                <div
                  className="absolute inset-0 z-0 opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.08] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.image})` }}
                  aria-hidden
                />
                
                <div className="relative z-10 flex items-center gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded border border-zinc-200 bg-zinc-100 font-mono text-[10px] text-zinc-400 transition-colors group-hover:bg-zinc-200/50 group-hover:text-zinc-800">
                    {String(item.index).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-700">
                      {item.cap}
                    </p>
                  </div>
                </div>

                <span
                  className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-[var(--brand-creative)] opacity-0 transition-[transform,opacity,border-color] duration-300 -translate-x-3 group-hover:translate-x-0 group-hover:opacity-100 group-hover:border-[color-mix(in_srgb,var(--brand-creative)_20%,transparent)]"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
