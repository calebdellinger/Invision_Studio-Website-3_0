"use client";

import { useEffect, useRef, useState } from "react";

export function BoomerangHeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const update = () => {
      if (direction === -1) {
        // Manually reverse
        if (video.currentTime <= 0.1) {
          setDirection(1);
          video.play().catch(() => {});
        } else {
          // Seek backwards. Using a small step.
          // Note: This can be choppy depending on the video's keyframes.
          video.currentTime -= 0.033; // ~30fps
        }
      } else {
        // Playing forward normally
        if (video.currentTime >= video.duration - 0.1) {
          setDirection(-1);
          video.pause();
        }
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [direction]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      className="h-full w-full object-cover"
    />
  );
}
