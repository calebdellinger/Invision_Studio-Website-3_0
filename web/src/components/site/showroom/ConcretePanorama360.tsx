"use client";

import { CONSTANTS, EquirectangularAdapter, Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { useEffect, useRef, useState } from "react";

type ConcretePanorama360Props = {
  /** Same-origin path or absolute URL to equirectangular image */
  panoramaPath: string;
};

function resolveFetchUrl(path: string): string {
  if (path.startsWith("http") || path.startsWith("blob:")) return path;
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).href;
}

/** Photo Sphere Viewer needs non-zero container dimensions before init. */
function waitForNonZeroSize(el: HTMLElement, timeoutMs = 2000): Promise<void> {
  return new Promise((resolve) => {
    if (el.clientWidth >= 32 && el.clientHeight >= 32) {
      resolve();
      return;
    }
    const done = () => {
      clearTimeout(t);
      ro.disconnect();
      resolve();
    };
    const ro = new ResizeObserver(() => {
      if (el.clientWidth >= 32 && el.clientHeight >= 32) done();
    });
    ro.observe(el);
    const t = window.setTimeout(done, timeoutMs);
  });
}

export function ConcretePanorama360({ panoramaPath }: ConcretePanorama360Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    /** Narrow for async closure (TS loses guard inside `boot`). */
    const mountRoot: HTMLDivElement = container;

    let viewer: Viewer | null = null;
    let objectUrl: string | null = null;
    let cancelled = false;

    const onPanoramaError = (e: Event) => {
      const err = (e as unknown as { error?: Error }).error;
      setLoadError(
        err?.message ??
          "Could not decode or display this panorama (size or GPU limits).",
      );
    };

    async function boot() {
      setLoadError(null);
      await waitForNonZeroSize(mountRoot);
      if (cancelled) return;

      const fetchUrl = resolveFetchUrl(panoramaPath);

      try {
        const res = await fetch(fetchUrl, { credentials: "same-origin" });
        if (!res.ok) {
          setLoadError(`Could not load image (${res.status}).`);
          return;
        }
        const blob = await res.blob();
        const looksLikeImage =
          !blob.type ||
          blob.type.startsWith("image/") ||
          blob.type === "application/octet-stream";
        if (!looksLikeImage) {
          setLoadError("Panorama response was not an image.");
          return;
        }
        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);

        viewer = new Viewer({
          container: mountRoot,
          adapter: EquirectangularAdapter,
          panorama: objectUrl,
          loadingTxt: "Loading 360°…",
          /** No toolbar — drag / touch to look; pinch zoom on touch; Ctrl ± on keyboard */
          navbar: false,
          mousewheel: false,
          mousewheelCtrlKey: false,
          touchmoveTwoFingers: false,
          keyboard: "always",
          keyboardActions: {
            "Ctrl+Plus": CONSTANTS.ACTIONS.ZOOM_IN,
            "Ctrl+Minus": CONSTANTS.ACTIONS.ZOOM_OUT,
            /** Layouts where + is shared with = */
            "Ctrl+=": CONSTANTS.ACTIONS.ZOOM_IN,
          },
          defaultZoomLvl: 35,
          minFov: 25,
          maxFov: 90,
          canvasBackground: "#030303",
        });

        viewer.addEventListener("panorama-error", onPanoramaError);
        viewer.addEventListener("panorama-loaded", () => {
          viewer?.autoSize();
        });
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Failed to load panorama.");
        }
      }
    }

    void boot();

    return () => {
      cancelled = true;
      viewer?.destroy();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [panoramaPath]);

  return (
    <section
      className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-12 sm:px-6 sm:py-16"
      aria-label="360 degree concrete job site panorama"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-creative)]">
          360° field view
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-3xl">
          On the pour — before the slab
        </h2>

        <div className="concrete-panorama-frame mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-black ring-1 ring-inset ring-white/[0.04] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.85)]">
          <div
            ref={containerRef}
            className="h-[min(58vh,520px)] w-full min-h-[280px] [touch-action:none] sm:h-[min(62vh,600px)]"
            role="application"
            aria-label="360 degree photo viewer"
          />
        </div>
        {loadError ? (
          <p className="mt-4 text-sm text-red-300/90" role="alert">
            {loadError}
          </p>
        ) : null}
      </div>
    </section>
  );
}
