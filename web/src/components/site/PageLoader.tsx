"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [frame, setFrame] = useState(0);
  const [status, setStatus] = useState("INITIALIZING HUD");

  useEffect(() => {
    // Lock scrolling on mount to prevent scroll during loading transition
    document.body.style.overflow = "hidden";

    // Fast frame counter animation (30 fps timecode)
    const frameInterval = setInterval(() => {
      setFrame((f) => (f + 1) % 30);
    }, 1000 / 30);

    // Calibration sequence messages
    const timers = [
      setTimeout(() => setStatus("CALIBRATING SHUTTER SYSTEM"), 450),
      setTimeout(() => setStatus("LOCKING AF-C COORDINATES"), 950),
      setTimeout(() => setStatus("SYSTEM READY"), 1450),
    ];

    // Hide loader after 1.8 seconds (minimum loading duration for cinematic feel)
    const exitTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1800);

    return () => {
      clearInterval(frameInterval);
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.03,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white select-none"
        >
          {/* Viewfinder Wrapper */}
          <div className="relative flex flex-col items-center justify-center pointer-events-auto">
            {/* Viewfinder Box - Horizontally & Vertically Centered */}
            <div className="relative w-72 h-72 border border-zinc-200/80 flex items-center justify-center bg-zinc-50/30 rounded-lg shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
              {/* Corner Brackets using Creative brand green */}
              <div className="absolute left-3 top-3 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-[var(--brand-creative)]/70" />
              <div className="absolute right-3 top-3 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-[var(--brand-creative)]/70" />
              <div className="absolute left-3 bottom-3 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-[var(--brand-creative)]/70" />
              <div className="absolute right-3 bottom-3 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-[var(--brand-creative)]/70" />

              {/* Central Lens HUD */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Slow-rotating dashed focus ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-zinc-200 animate-[spin_25s_linear_infinite]" />
                
                {/* Inner solid guide ring */}
                <div className="absolute inset-4 rounded-full border border-zinc-100" />

                {/* Stationary horizontal/vertical crosshair ticks */}
                <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-2 h-[1px] bg-zinc-300" />
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2 h-[1px] bg-zinc-300" />
                <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-[1px] h-2 bg-zinc-300" />
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[1px] h-2 bg-zinc-300" />

                {/* Breathing/Pulsing Red Record Sensor Core */}
                <motion.div
                  className="relative z-10 w-8 h-8 rounded-full bg-red-600/10 border border-red-500/50 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.12)]"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Glowing active center */}
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.65)]" />
                </motion.div>
              </div>

              {/* Viewfinder metadata */}
              <div className="absolute left-5 top-4 font-mono text-[8px] uppercase tracking-widest text-zinc-400 flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite] mr-1.5" />
                REC
              </div>
              <div className="absolute right-5 top-4 font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                AF-C // LOCK
              </div>
              <div className="absolute left-5 bottom-4 font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                FOCAL 35MM
              </div>
              <div className="absolute right-5 bottom-4 font-mono text-[8px] uppercase tracking-widest text-zinc-400 tabular-nums">
                00:00:00:{String(frame).padStart(2, "0")}
              </div>
            </div>

            {/* Bottom text outside viewfinder box - Absolutely positioned to avoid offsetting the box center */}
            <div className="absolute top-[calc(100%+1.5rem)] flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
                {status}
              </span>
              
              {/* Thin green progress bar */}
              <div className="w-40 h-[2px] bg-zinc-100 mt-4 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--brand-creative)] shadow-[0_0_6px_var(--brand-creative)]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
