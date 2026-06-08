"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling on mount
    document.body.style.overflow = "hidden";

    // Hide loader after 1.8 seconds (cinematic minimum)
    const exitTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1800);

    return () => {
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
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed left-0 top-0 w-screen h-screen z-[99999] bg-white select-none overflow-hidden"
        >
          {/* Centered Large Pulsing Record Button - Anchored to w-screen to prevent scrollbar jumps */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Outer soft glow ring */}
              <motion.div
                className="absolute h-32 w-32 rounded-full bg-red-500/5 blur-2xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              />

              {/* Inner technical ring */}
              <motion.div
                className="absolute h-24 w-24 rounded-full border border-red-500/10"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              />

              {/* Primary Record Button */}
              <motion.div
                className="relative z-10 h-16 w-16 rounded-full bg-red-600/10 border border-red-500/40 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.12)]"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              >
                {/* Glowing active core */}
                <div className="h-6 w-6 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
