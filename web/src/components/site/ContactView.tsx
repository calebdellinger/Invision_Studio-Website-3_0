"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      const max = 4;
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
  "mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-zinc-400 focus:bg-white focus:border-[var(--brand-creative)] focus:ring-4 focus:ring-[var(--brand-creative)]/10";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500";

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
    id: "3d-scanning",
    label: "3D Scanning",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm-1 17.5l-7-3.9v-7.2l7 3.9v7.2zm1-9.3L5 6.3 12 2.4l7 3.9-7 3.9zm8 5.4l-7 3.9v-7.2l7-3.9v7.2z" />
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
  const [copied, setCopied] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label)
        ? prev.filter((s) => s !== label)
        : [...prev, label]
    );
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@invisioncreative.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email address!", err);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-white">
      <h1 className="sr-only">Contact</h1>
      
      {/* Subtle background glow to keep it dynamic but pure white theme */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(80, 161, 42, 0.04), transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(80, 161, 42, 0.03), transparent 50%)
          `,
        }}
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-7xl flex-col px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start w-full">
          
          {/* Left Column: Brand Statement & Inquiry */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-creative)]">
                Start a Conversation
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl leading-[1.12] text-zinc-955 tracking-tight">
                Crafting premium visual stories for ambitious brands.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-500 font-medium max-w-md">
                Whether you need high-impact brand films, commercial photography, platform-native social reels, or AI creative integrations, we design it with cinematic precision.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/50 rounded-full px-4.5 py-2 w-fit shadow-sm">
                <div className="h-2 w-2 rounded-full bg-[var(--brand-creative)] animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                  Open for Q3 Project Booking
                </span>
              </div>

              {/* Direct Inquiry Copy block */}
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                  Direct Inquiry
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="group relative flex items-center gap-4 text-left focus:outline-none w-fit cursor-pointer"
                  aria-label="Copy email address"
                >
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold text-zinc-900 transition-colors group-hover:text-[var(--brand-creative)] sm:text-2xl tracking-tight">
                      hello@invisioncreative.com
                    </span>
                    <div className="mt-1.5 h-px w-0 bg-[var(--brand-creative)] transition-all duration-500 group-hover:w-full" />
                  </div>

                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all group-hover:border-[var(--brand-creative)] group-hover:bg-[var(--brand-creative)]/5 group-hover:text-[var(--brand-creative)]">
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.svg
                          key="check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4.5 w-4.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="copy"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4.5 w-4.5"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-10 whitespace-nowrap rounded-md bg-zinc-950 px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-widest"
                        >
                          Copied
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            </div>

            {/* Social shortcuts */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                Follow our work
              </p>
              <div className="flex gap-5 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-creative)] transition-colors border-b border-transparent hover:border-[var(--brand-creative)] pb-1">Instagram</a>
                <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-creative)] transition-colors border-b border-transparent hover:border-[var(--brand-creative)] pb-1">Vimeo</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-creative)] transition-colors border-b border-transparent hover:border-[var(--brand-creative)] pb-1">LinkedIn</a>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form Card & Live Pricing Builder */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <TiltPanel className="relative w-full">
              <div
                className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,1)_inset]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-[0.05] blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, var(--brand-creative), transparent 70%)",
                  }}
                  aria-hidden
                />

                <p className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                  Project inquiry
                </p>
                <p className="relative mt-2 font-serif text-2xl text-zinc-950 tracking-tight">
                  Send a brief
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
                  
                  <fieldset className="space-y-4">
                    <legend className={labelClass}>
                      What kind of work do you need?
                    </legend>
                    
                    <div className="relative flex items-center justify-center py-6 sm:py-8 overflow-visible">
                      {/* Circular Layout Container */}
                      <div
                        className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[400px] [--radius:85px] sm:[--radius:135px]"
                        style={{
                          height: "var(--radius) * 2",
                        }}
                      >
                        {/* Faint Guide Track */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                          <div className="w-[calc(2*var(--radius))] h-[calc(2*var(--radius))] rounded-full border border-dashed border-zinc-200/60" />
                        </div>

                        {/* Center Circle */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-20 w-20 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300">
                          {selectedServices.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center p-2">
                              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-zinc-400">Services</span>
                              <span className="mt-0.5 text-[7px] font-bold text-[var(--brand-creative)] uppercase tracking-widest animate-pulse">Select Any</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center p-2">
                              <span className="text-lg sm:text-xl font-extrabold text-[var(--brand-creative)] leading-none">
                                {selectedServices.length}
                              </span>
                              <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">
                                {selectedServices.length === 1 ? "Selected" : "Selected"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Service Options */}
                        {serviceOptions.map((option, index) => {
                          const angles = [0, 72, 144, 216, 288];
                          const angle = angles[index];
                          const angleRad = (angle * Math.PI) / 180;
                          const x = Math.sin(angleRad);
                          const y = -Math.cos(angleRad);
                          const isChecked = selectedServices.includes(option.label);

                          return (
                            <label
                              key={option.id}
                              style={{
                                left: `calc(50% + ${x} * var(--radius))`,
                                top: `calc(50% + ${y} * var(--radius))`,
                              }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                            >
                              <input
                                type="checkbox"
                                name="services"
                                value={option.label}
                                checked={isChecked}
                                onChange={() => handleServiceToggle(option.label)}
                                className="peer sr-only"
                              />
                              <span className="relative flex h-24 w-24 sm:h-32 sm:w-32 flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-2 text-center transition-all duration-300 ease-out shadow-[0_6px_16px_-4px_rgba(0,0,0,0.06),0_2px_4px_-1px_rgba(0,0,0,0.03),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)] group-hover:-translate-y-1 group-hover:rotate-[2deg] group-hover:scale-105 group-hover:border-zinc-300 group-hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12),0_6px_12px_-2px_rgba(0,0,0,0.04),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(228,228,231,1)] peer-checked:border-[var(--brand-creative)]/50 peer-checked:bg-[var(--brand-creative)]/[0.03] peer-checked:shadow-[inset_0_3px_8px_rgba(80,161,42,0.08),inset_0_1px_2px_rgba(80,161,42,0.04)] peer-checked:translate-y-0.5 peer-checked:rotate-0 peer-checked:group-hover:translate-y-0.5 peer-checked:group-hover:rotate-0 peer-checked:group-hover:scale-100">
                                <span
                                  className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06] peer-checked:opacity-[0.1]"
                                  style={{
                                    background:
                                      "radial-gradient(circle at center, var(--brand-creative), transparent 70%)",
                                  }}
                                  aria-hidden
                                />
                                {/* Shiny Reflection Sweep */}
                                <span
                                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                                  aria-hidden
                                />
                                <span className="relative inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50/50 text-zinc-500 transition-colors peer-checked:border-[var(--brand-creative)]/30 peer-checked:bg-white peer-checked:text-[var(--brand-creative)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                                  {option.icon}
                                </span>
                                <span className="relative mt-2 text-[8px] sm:text-[10px] font-bold leading-tight text-zinc-800 transition-colors peer-checked:text-zinc-950 max-w-[85%] break-words">
                                  {option.label}
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
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
                    className="group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:self-start cursor-pointer"
                  >
                    Send message
                  </button>
                  
                  <p className="text-center text-[10px] font-medium text-zinc-400 sm:text-left">
                    This form is a stub — connect to your email provider or CRM when ready.
                  </p>
                </form>
              </div>
            </TiltPanel>
          </div>

        </div>
      </div>
    </div>
  );
}
