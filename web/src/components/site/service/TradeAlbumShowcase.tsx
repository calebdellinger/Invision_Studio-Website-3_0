"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { listSmugMugAlbumMedia, type SmugMugMedia } from "@/lib/smugmug";

type TradeAlbumShowcaseProps = {
  tradeLabel: string;
  albumKey: string;
};

function cleanDisplayText(value: string | undefined): string {
  if (!value) return "";
  const normalized = value.trim();
  if (!normalized) return "";
  if (normalized.toLowerCase() === "default") return "";
  return normalized;
}

function splitMedia(media: SmugMugMedia[]) {
  return {
    photos: media.filter((item) => item.kind === "photo"),
    videos: media.filter((item) => item.kind === "video"),
  };
}

export function TradeAlbumShowcase({ tradeLabel, albumKey }: TradeAlbumShowcaseProps) {
  const [media, setMedia] = useState<SmugMugMedia[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await listSmugMugAlbumMedia({
          albumKey,
          count: 200,
          media: "all",
        });
        setMedia(result.media);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Failed to load SmugMug media.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [albumKey]);

  const { photos, videos } = splitMedia(media);
  const galleryItems = [...videos, ...photos];

  return (
    <div className="bg-white min-h-screen selection:bg-[var(--brand-creative)] selection:text-white">
      {/* Editorial Header */}
      <header className="relative pt-32 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--brand-creative)]">
              Trade Archive
            </span>
            <div className="h-px w-12 bg-zinc-100" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Key: {albumKey}
            </span>
          </motion.div>

          <motion.h1
            className="mt-12 font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-tighter text-zinc-950 uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {tradeLabel.split(" / ")[0]}<br />
            <span className="italic text-zinc-400">Showcase</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex flex-wrap gap-12 border-t border-zinc-100 pt-12"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Vertical</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">{tradeLabel}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Assets</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                {isLoading ? "..." : `${galleryItems.length} High-Res Items`}
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-16">
        
        {loadError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-900">
            <p className="font-bold uppercase tracking-widest text-[10px]">Error loading archive</p>
            <p className="mt-2">{loadError}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-48 opacity-20">
             <div className="h-12 w-12 border-4 border-zinc-200 border-t-[var(--brand-creative)] rounded-full animate-spin" />
             <span className="mt-6 text-[10px] font-bold uppercase tracking-[0.5em]">Syncing Album...</span>
          </div>
        )}

        {!isLoading && galleryItems.length > 0 ? (
          <section className="mt-12">
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {galleryItems.map((item, index) => {
                const title = cleanDisplayText(item.title);
                const caption = cleanDisplayText(item.caption);
                const photoSrc = item.imageUrl ?? item.originalUrl ?? item.thumbnailUrl;
                
                return (
                  <motion.figure
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 6) * 0.05 }}
                    className="mb-6 break-inside-avoid group relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-2xl hover:border-zinc-200"
                  >
                    {item.kind === "video" ? (
                      item.videoUrl ? (
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          className="aspect-video w-full bg-white object-cover"
                          poster={item.imageUrl ?? item.originalUrl ?? item.thumbnailUrl}
                        >
                          <source src={item.videoUrl} />
                        </video>
                      ) : (
                        <div className="flex aspect-video items-center justify-center bg-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Video unavailable
                        </div>
                      )
                    ) : photoSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={photoSrc}
                        alt={item.alt || item.title || `${tradeLabel} project image`}
                        loading="lazy"
                        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex min-h-40 items-center justify-center bg-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        Image unavailable
                      </div>
                    )}
                    
                    {(title || caption) && (
                      <figcaption className="p-5 border-t border-zinc-100">
                        {title && <p className="line-clamp-1 text-xs font-bold uppercase tracking-widest text-zinc-900">{title}</p>}
                        {caption && (
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-500 font-medium">{caption}</p>
                        )}
                      </figcaption>
                    )}

                    {/* Corner Tech Detail */}
                    <div className="absolute right-4 top-4 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-40">
                      <div className="absolute right-0 top-0 h-full w-full border-r border-t border-zinc-900" />
                    </div>
                  </motion.figure>
                );
              })}
            </div>
          </section>
        ) : !isLoading && !loadError ? (
          <div className="py-48 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">Empty Archive</p>
            <p className="mt-4 text-sm text-zinc-500">No media returned from this album yet.</p>
          </div>
        ) : null}

        <div className="mt-24 flex justify-center">
          <Link
            href="/showroom"
            className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-100 transition-all group-hover:border-[var(--brand-creative)] group-hover:bg-[var(--brand-creative)] group-hover:text-white">
              <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-400 group-hover:text-zinc-950 transition-colors">
              Return to Showroom
            </span>
          </Link>
        </div>
      </main>

      {/* Footer Rule */}
      <div className="h-px w-full bg-zinc-100" />
    </div>
  );
}
