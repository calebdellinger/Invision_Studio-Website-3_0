"use client";

import Image from "next/image";
import { useSyncExternalStore, type CSSProperties } from "react";
import { photographyFilmstripSlides } from "@/data/rebuildGallery";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const MARQUEE_VARIANTS = [
  "aspect-[3/4] w-[min(44vw,13rem)] sm:w-52",
  "aspect-[4/3] w-[min(56vw,16rem)] sm:w-64",
  "aspect-[9/16] w-[min(34vw,10rem)] sm:w-40",
  "aspect-[3/2] w-[min(58vw,17rem)] sm:w-68",
  "aspect-[2/3] w-[min(40vw,12rem)] sm:w-48",
] as const;

export function PhotographyFilmstripMarquee() {
  const reduceMotion = usePrefersReducedMotion();
  const slides = photographyFilmstripSlides;
  const durationSec = Math.max(40, slides.length * 10);

  return (
    <section
      className="w-full max-w-none overflow-hidden rounded-none border-0 bg-[#040404]"
      aria-label="Photography samples shown as a scrolling marquee"
    >
      <div className="flex items-center border-b border-black/[0.06] px-3 py-2 sm:px-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-creative)]">
          Stills
        </p>
      </div>

      <div className="relative bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_50%,#0a0a0a_100%)] py-5 sm:py-6">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[3.3rem] bg-gradient-to-r from-[#050505] to-transparent sm:w-[5.5rem]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[3.3rem] bg-gradient-to-l from-[#050505] to-transparent sm:w-[5.5rem]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        {reduceMotion ? (
          <ul className="relative z-[1] flex flex-wrap justify-center gap-3 px-3 sm:gap-5">
            {slides.map((slide, i) => (
              <li
                key={slide.src}
                className={`relative shrink-0 overflow-hidden rounded-sm border border-black/10 bg-white shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-black/[0.04] ${
                  MARQUEE_VARIANTS[i % MARQUEE_VARIANTS.length]
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 46vw, 208px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="relative z-[1] overflow-hidden">
            <ul
              className="film-marquee-track flex w-max items-end gap-3 px-3 sm:gap-5"
              style={
                {
                  "--film-marquee-duration": `${durationSec}s`,
                } as CSSProperties
              }
            >
              {slides.map((slide, i) => (
                <li
                  key={slide.src}
                  className={`relative shrink-0 overflow-hidden rounded-sm border border-black/10 bg-white shadow-[0_16px_48px_-24px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-black/[0.05] ${
                    MARQUEE_VARIANTS[i % MARQUEE_VARIANTS.length]
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 42vw, 208px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.35)]"
                    aria-hidden
                  />
                </li>
              ))}
              {/* Duplicate set — required for seamless CSS translate(-50%) loop; hidden from assistive tech */}
              {slides.map((slide, i) => (
                <li
                  key={`dup-${slide.src}`}
                  aria-hidden="true"
                  className={`relative shrink-0 overflow-hidden rounded-sm border border-black/10 bg-white shadow-[0_16px_48px_-24px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-black/[0.05] ${
                    MARQUEE_VARIANTS[(slides.length + i) % MARQUEE_VARIANTS.length]
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 42vw, 208px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.35)]"
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
