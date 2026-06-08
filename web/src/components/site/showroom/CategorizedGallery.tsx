"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { SmugMugMedia } from "@/lib/smugmug";

type Category = "All" | "Trades" | "Real Estate";

type CategorizedGalleryProps = {
  tradesMedia: SmugMugMedia[];
};

export function CategorizedGallery({ tradesMedia }: CategorizedGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Trades", "Real Estate"];

  const filteredMedia = useMemo(() => {
    switch (activeCategory) {
      case "Trades":
        return tradesMedia;
      case "Real Estate":
        return []; // Placeholder
      case "All":
      default:
        return tradesMedia;
    }
  }, [activeCategory, tradesMedia]);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 border-b border-zinc-100 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`group relative py-2 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors ${
              activeCategory === cat ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[var(--brand-creative)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="mt-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
          >
            {filteredMedia.length > 0 ? (
              filteredMedia.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-6 break-inside-avoid group relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-2xl hover:border-zinc-200"
                >
                  {item.kind === "video" ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full bg-white object-cover"
                      poster={item.imageUrl}
                    >
                      <source src={item.videoUrl} />
                    </video>
                  ) : (
                    <div className="relative aspect-[4/5] sm:aspect-auto">
                      <img
                        src={item.imageUrl || item.thumbnailUrl}
                        alt={item.alt}
                        loading="lazy"
                        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Hover Overlay with Technical Detail */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none flex flex-col justify-end p-6">
                    {/* Technical corner marking */}
                    <div className="absolute right-4 top-4 h-4 w-4">
                       <div className="absolute right-0 top-0 h-full w-full border-r border-t border-white/40" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-48 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">Empty Category</p>
                <p className="mt-4 text-sm text-zinc-500">No media available for {activeCategory} yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
