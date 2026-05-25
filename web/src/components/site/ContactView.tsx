"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PricingBuilderTeaser } from "@/components/site/pricing/PricingBuilderTeaser";

function TiltPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg)",
  });
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!motionOk || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const max = 5;
      setStyle({
        transform: `perspective(1100px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateZ(0)`,
      });
    },
    [motionOk],
  );

  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)",
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`transform-gpu transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

const inputClass =
  "mt-2.5 w-full rounded-xl border border-white/[0.09] bg-zinc-950/90 px-4 py-3.5 text-sm text-white shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-600 focus:border-[color-mix(in_srgb,var(--brand-creative)_45%,transparent)] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_0_0_3px_color-mix(in_srgb,var(--brand-creative)_12%,transparent)]";

const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500";

const serviceOptions = [
  {
    id: "social-media-management",
    label: "Social Media Management",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-4.6 6.8A5.7 5.7 0 0112 6.3c1.7 0 3.2.7 4.3 1.9l-1.7 1.2A3.8 3.8 0 0012 8.2c-1 0-2 .4-2.6 1l1.3 1h-4V6.6l.7.5zm9.2 6.4A5.7 5.7 0 0112 17.7c-1.7 0-3.2-.7-4.3-1.9l1.7-1.2a3.8 3.8 0 002.6 1.2c1 0 2-.4 2.6-1l-1.3-1h4v3.6l-.7-.5z" />
      </svg>
    ),
  },
  {
    id: "photography",
    label: "Photography",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M7 5l1.2-2h7.6L17 5h2a3 3 0 013 3v8a3 3 0 01-3 3H5a3 3 0 01-3-3V8a3 3 0 013-3h2zm5 3.2A4.8 4.8 0 1012 18a4.8 4.8 0 000-9.6zm0 2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6z" />
      </svg>
    ),
  },
  {
    id: "videography",
    label: "Videography",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M4 6h11a3 3 0 013 3v1.3l3.3-2a1 1 0 011.5.9v5.6a1 1 0 01-1.5.9L18 13.7V15a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3zm6.5 3.2v5.6l4.8-2.8-4.8-2.8z" />
      </svg>
    ),
  },
  {
    id: "ai-integrations",
    label: "AI integrations",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm1 2v12h10V6H7zm2 3h6v1.5H9V9zm0 3h4v1.5H9V12zm0 3h6v1.5H9V15z" />
      </svg>
    ),
  },
] as const;

export function ContactView() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <h1 className="sr-only">Contact</h1>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 60% at 15% 20%, color-mix(in srgb, var(--brand-creative) 16%, transparent), transparent 55%),
            radial-gradient(ellipse 70% 50% at 85% 75%, rgba(80, 80, 120, 0.08), transparent 50%),
            linear-gradient(180deg, #050505 0%, #080808 45%, #050505 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(105deg, transparent 0%, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%, transparent 100%)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-lg flex-col px-4 py-16 sm:px-6 sm:py-20 lg:max-w-xl lg:px-8 lg:py-24">
        <div className="relative w-full lg:pt-4">
          <div
            className="pointer-events-none absolute -right-2 top-4 hidden h-[calc(100%-2rem)] w-[92%] rounded-2xl border border-white/[0.04] bg-[#0a0a0a] shadow-[8px_12px_40px_rgba(0,0,0,0.55)] sm:block"
            style={{ transform: "rotateY(-4deg) rotateX(2deg)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-1 top-2 hidden h-[calc(100%-1rem)] w-[96%] rounded-2xl border border-white/[0.06] bg-zinc-900/40 sm:block"
            aria-hidden
          />

          <TiltPanel className="relative">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-zinc-900/[0.85] via-[#0c0c0c] to-[#060606] p-8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_1px_0_0_rgba(255,255,255,0.08)_inset] sm:p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-[0.15] blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--brand-creative), transparent 70%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                aria-hidden
              />

              <p className="relative text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
                Project inquiry
              </p>
              <p className="relative mt-2 font-serif text-2xl text-white">
                Send a note
              </p>

              <form
                className="relative mt-8 flex flex-col gap-6"
                action="#"
                method="post"
              >
                <label className={labelClass}>
                  Name
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Your name"
                  />
                </label>
                <label className={labelClass}>
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </label>
                <fieldset className="space-y-3">
                  <legend className={labelClass}>
                    What kind of work do you need?
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceOptions.map((option) => (
                      <label key={option.id} className="group cursor-pointer">
                        <input
                          type="checkbox"
                          name="services"
                          value={option.label}
                          className="peer sr-only"
                        />
                        <span className="relative flex min-h-[112px] flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-4 ring-1 ring-inset ring-white/[0.04] transition-[border-color,box-shadow,background-color,transform] duration-300 peer-checked:border-[color-mix(in_srgb,var(--brand-creative)_60%,transparent)] peer-checked:bg-[color-mix(in_srgb,var(--brand-creative)_12%,#0a0a0a)] peer-checked:shadow-[0_0_30px_-10px_color-mix(in_srgb,var(--brand-creative)_40%,transparent)] group-hover:-translate-y-0.5 group-hover:border-white/20">
                          <span
                            className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.14] peer-checked:opacity-[0.2]"
                            style={{
                              background:
                                "radial-gradient(circle at center, var(--brand-creative), transparent 70%)",
                            }}
                            aria-hidden
                          />
                          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d0d] text-zinc-400 transition-colors peer-checked:border-[color-mix(in_srgb,var(--brand-creative)_45%,white_8%)] peer-checked:text-[var(--brand-creative)]">
                            {option.icon}
                          </span>
                          <span className="relative mt-4 text-sm leading-tight text-zinc-200">
                            {option.label}
                          </span>
                          <span className="relative mt-3 inline-flex w-fit rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors peer-checked:border-[color-mix(in_srgb,var(--brand-creative)_35%,white_10%)] peer-checked:text-zinc-200">
                            Select
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className={labelClass}>
                  Description
                  <textarea
                    name="message"
                    rows={5}
                    className={`${inputClass} min-h-[140px] resize-y`}
                    placeholder="Project type, timeline, references…"
                  />
                </label>
                <button
                  type="submit"
                  className="group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-[var(--brand-creative)] px-6 py-4 text-sm font-semibold text-black shadow-[0_6px_0_0_color-mix(in_srgb,var(--brand-creative-muted)_85%,#000),0_12px_32px_-8px_color-mix(in_srgb,var(--brand-creative)_35%,transparent)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_0_color-mix(in_srgb,var(--brand-creative-muted)_85%,#000)] sm:w-auto sm:self-start"
                >
                  <span className="relative z-10">Send message</span>
                  <span
                    className="pointer-events-none absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0"
                    aria-hidden
                  />
                </button>
                <p className="text-center text-[11px] text-zinc-600 sm:text-left">
                  This form is a stub — connect to your email provider or CRM
                  when ready.
                </p>
              </form>
            </div>
          </TiltPanel>
          <PricingBuilderTeaser />
        </div>
      </div>
    </div>
  );
}
