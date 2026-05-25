"use client";

import { useEffect, useRef } from "react";

type AutoScrollingMockupFrameProps = {
  title: string;
  srcDoc: string;
  className?: string;
  speed?: number;
};

export function AutoScrollingMockupFrame({
  title,
  srcDoc,
  className,
  speed = 0.38,
}: AutoScrollingMockupFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let timerId: number | null = null;
    let direction = 1;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc) return;

      const scroller = doc.scrollingElement || doc.documentElement || doc.body;
      const max = Math.max(
        0,
        scroller.scrollHeight - win.innerHeight,
        doc.documentElement.scrollHeight - win.innerHeight,
        doc.body.scrollHeight - win.innerHeight,
      );

      if (max > 0) {
        const y = Math.max(scroller.scrollTop, win.scrollY || 0);
        if (y >= max - 2) direction = -1;
        if (y <= 2) direction = 1;
        const next = Math.min(max, Math.max(0, y + speed * direction));
        scroller.scrollTop = next;
        win.scrollTo(0, next);
      }
    };

    const start = () => {
      const doc = iframe.contentDocument;
      const scroller = doc?.scrollingElement || doc?.documentElement || doc?.body;
      if (scroller) scroller.scrollTop = 0;
      iframe.contentWindow?.scrollTo(0, 0);
      direction = 1;
      if (timerId !== null) window.clearInterval(timerId);
      timerId = window.setInterval(tick, 16);
    };

    iframe.addEventListener("load", start);
    window.setTimeout(start, 120);

    return () => {
      cancelled = true;
      if (timerId !== null) window.clearInterval(timerId);
      iframe.removeEventListener("load", start);
    };
  }, [srcDoc, speed]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      srcDoc={srcDoc}
      className={className}
      loading="eager"
      aria-label={title}
    />
  );
}
