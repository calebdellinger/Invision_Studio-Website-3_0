"use client";

const WRAPAROUND_VIDEO = "/wraparound%20shot%20of%20devices.mp4";

/**
 * Full-bleed timelapse: autoplay once, muted, no app-side loop.
 * Repeat / seamless cycle: edit in Resolve and re-export; swap the file in `public/`.
 */
export function FilmProjectorHero() {
  return (
    <section
      id="motion-timelapse-hero"
      className="relative w-full min-w-0 overflow-x-clip bg-black pt-14 pb-20 sm:pt-20 sm:pb-24"
      aria-label="Motion: timelapse"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[999]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.08) 27%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.9) 100%)",
        }}
        aria-hidden
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
          Motion
        </p>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Export-ready across tablet and mobile screens.
        </p>

        <div className="relative mt-8 overflow-hidden rounded-sm bg-black">
          <video
            src={WRAPAROUND_VIDEO}
            className="block h-auto w-full bg-black"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            aria-label="Export-ready devices wraparound video"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.65)]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
