"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type TradeId = "excavation" | "electrician" | "plumber" | "carpenter";
type OverlayType = "blueprint" | "material";

export function TradeSchematicOverlay({ 
  trade, 
  isVisible,
  type
}: { 
  trade: TradeId; 
  isVisible: boolean;
  type: OverlayType;
}) {
  const imgSrc = `/assets/ai-overlays/${type}_${trade}.png`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: [0, 1, 1, 0], 
            scale: [0.95, 1, 1.05, 1.1],
          }}
          transition={{
            duration: 0.8, 
            times: [0, 0.15, 0.85, 1], // Fade in quick, hold for 1/2 sec, fade out
            ease: "easeOut"
          }}
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden"
        >
          {/* Dark background to make the image pop */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
          
          <div className="relative z-10 h-[90%] aspect-square max-w-[90%] sm:h-[85%] sm:aspect-video sm:max-w-2xl rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-black/20">
            <Image 
              src={imgSrc} 
              alt={`${trade} ${type}`}
              fill
              className={`object-cover opacity-90 ${type === 'blueprint' ? 'mix-blend-screen grayscale contrast-125' : ''}`}
            />
            {/* Tech UI Overlays */}
            <div className="absolute inset-0 border border-black/10 m-2 rounded pointer-events-none" />
            <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-900/70">
              SYS.ANALYSIS // {trade.toUpperCase()} // {type.toUpperCase()}
            </div>
            
            {/* Scanning reticle over image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-black/30 rounded-full flex items-center justify-center">
               <div className="w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>
          
          {/* Scanning Line */}
          <motion.div 
             className="absolute left-0 right-0 h-[2px] bg-white opacity-40 shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20"
             animate={{ top: ["-10%", "110%"] }}
             transition={{ duration: 0.8, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
