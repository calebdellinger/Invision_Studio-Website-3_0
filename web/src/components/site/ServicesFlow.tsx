"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ServiceTypeIcon, type ServiceTypeIconId } from "@/components/site/service/ServiceTypeIcon";

type FlowItem = {
  key: string;
  title: string;
  tagline: string;
  icon: ServiceTypeIconId;
  href: string;
  description: string;
  caps: readonly string[];
  image: string;
  theme: "light" | "dark";
};

const FLOW: FlowItem[] = [
  {
    key: "social",
    title: "Social Media",
    tagline: "Native rhythm. Proven growth.",
    icon: "social",
    href: "/services/social-media",
    image: "/rebuild-gallery/badass.jpg",
    theme: "light",
    description:
      "Strategic distribution systems that scale your brand voice. We synchronize production days to capture, edit, and deploy high-retention content natively across Instagram, TikTok, and YouTube.",
    caps: ["Multi-platform", "Monthly rhythm", "Branded formats", "Analytics-led"],
  },
  {
    key: "photo",
    title: "Photography",
    tagline: "Stills that define the benchmark.",
    icon: "photo",
    href: "/services/photography",
    image: "/rebuild-gallery/6F4A3334.jpg",
    theme: "dark",
    description:
      "High-resolution commercial assets tuned for campaigns and catalogs. We focus on composition, honest light, and technical precision to create imagery that commands attention on any surface.",
    caps: ["RAW delivery", "Color graded", "Art directed", "Campaign-ready"],
  },
  {
    key: "video",
    title: "Videography",
    tagline: "Motion with intentional pacing.",
    icon: "video",
    href: "/services/videography",
    image: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
    theme: "light",
    description:
      "Cinema-grade brand films and social-native cuts. Every frame is paced to hold attention, using detailed sound design and professional color grading to tell a deeper brand narrative.",
    caps: ["4K delivery", "Color graded", "Hero cuts", "Social edits"],
  },
  {
    key: "3d-scanning",
    title: "3D Scanning",
    tagline: "The world, digitized accurately.",
    icon: "gaussian",
    href: "/services/3d-scanning",
    image: "/rebuild-gallery/3pillarsHero.jpg",
    theme: "dark",
    description:
      "High-fidelity Gaussian Splatting and volumetric digital twins. Photorealistic 1:1 replicas of physical spaces for immersive tours, training, and architectural analysis.",
    caps: ["Gaussian Splatting", "WebGPU Ready", "Millimeter Accurate", "UE5 Integrated"],
  },
  {
    key: "ai",
    title: "AI Integrations",
    tagline: "Automation without diluting your soul.",
    icon: "ai",
    href: "/services/ai-integrations",
    image: "/ai-creative-workflow.png",
    theme: "light",
    description:
      "Practical automation woven into your creative workflow. Smart assistants and vision-led asset tagging that speeds up delivery without washing out your unique brand identity.",
    caps: ["Workflow automation", "Asset tagging", "Brand-safe", "Faster delivery"],
  },
];

function ParallaxSection({ item, index }: { item: FlowItem; index: number }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isDark = item.theme === "dark";

  return (
    <section
      ref={containerRef}
      id={`svc-anchor-${item.key}`}
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden ${isDark ? "bg-black text-white" : "bg-white text-zinc-950"}`}
    >
      {/* Background Parallax Image Cut */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          style={{ y: imageY }}
          className="relative h-[130%] w-full"
        >
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover grayscale"
            sizes="100vw"
          />
        </motion.div>
        <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-b from-black via-transparent to-black" : "bg-gradient-to-b from-white via-transparent to-white"}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-32 sm:px-10 lg:px-16">
        <motion.div 
          style={{ y: contentY, opacity }}
          className="flex flex-col items-center text-center"
        >
          {/* Metadata Row */}
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              {String(index + 1).padStart(2, "0")} / Pillar
            </span>
            <div className={`h-px w-12 ${isDark ? "bg-white/20" : "bg-black/10"}`} />
            <div className="h-8 w-8 text-[var(--brand-creative)]">
              <ServiceTypeIcon id={item.icon} />
            </div>
          </div>

          {/* Oversized Editorial Heading */}
          <h2 className="mt-12 font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] tracking-tighter uppercase italic">
            {item.title.split(" ")[0]}
            {item.title.split(" ").length > 1 && (
              <span className={`block not-italic tracking-tight text-[0.4em] mt-4 font-sans font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>
                {item.title.split(" ").slice(1).join(" ")}
              </span>
            )}
          </h2>

          <p className={`mt-10 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            <span className={isDark ? "text-white" : "text-zinc-950"}>{item.tagline}</span> {item.description}
          </p>

          {/* Capability Grid */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {item.caps.map((cap) => (
              <span 
                key={cap}
                className={`rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  isDark 
                    ? "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10" 
                    : "border-black/5 bg-black/5 text-zinc-600 hover:bg-black/10"
                }`}
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Editorial CTA */}
          <div className="mt-20">
            <Link
              href={item.href}
              className={`group flex flex-col items-center gap-4 transition-transform hover:scale-105`}
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full border ${isDark ? "border-white/20" : "border-black/10"} transition-all group-hover:border-[var(--brand-creative)] group-hover:bg-[var(--brand-creative)] group-hover:text-white`}>
                <span className="text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[-45deg]">→</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.5em] ${isDark ? "text-zinc-500 group-hover:text-white" : "text-zinc-400 group-hover:text-black"}`}>
                Dive into Workflow
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className={`absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 ${isDark ? "bg-gradient-to-b from-white/20 to-transparent" : "bg-gradient-to-b from-black/10 to-transparent"}`} />
      <div className={`absolute left-1/2 bottom-0 h-24 w-px -translate-x-1/2 ${isDark ? "bg-gradient-to-t from-white/20 to-transparent" : "bg-gradient-to-t from-black/10 to-transparent"}`} />
    </section>
  );
}

export function ServicesFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative bg-white selection:bg-[var(--brand-creative)] selection:text-white">
      {/* Editorial Header */}
      <header className="relative min-h-[70vh] flex flex-col justify-end px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--brand-creative)]">
              Services
            </span>
            <div className="h-px flex-1 bg-zinc-100" />
          </motion.div>

          <motion.h1
            className="mt-12 font-serif text-[clamp(4rem,15vw,12rem)] leading-[0.8] tracking-tighter text-zinc-950 uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            The Lane<br />
            <span className="italic text-[var(--brand-creative)] opacity-20 transition-opacity hover:opacity-100 cursor-default">of execution</span>
          </motion.h1>

          <motion.p
            className="mt-12 max-w-lg text-lg leading-relaxed text-zinc-500 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We don't just shoot assets; we engineer continuous lanes of creative execution that scale across every brand touchpoint.
          </motion.p>

          <div className="mt-20 flex flex-wrap gap-x-12 gap-y-6 border-t border-zinc-100 pt-12">
            {FLOW.map((item, i) => (
              <a
                key={item.key}
                href={`#svc-anchor-${item.key}`}
                className="group flex flex-col gap-2"
              >
                <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest group-hover:text-[var(--brand-creative)] transition-colors">
                  0{i + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Service Blocks */}
      <div className="flex flex-col">
        {FLOW.map((item, i) => (
          <ParallaxSection key={item.key} item={item} index={i} />
        ))}
      </div>

      {/* Closing Statement */}
      <section className="bg-zinc-950 py-48 px-6 text-center overflow-hidden relative">
         <motion.div 
           initial={{ scale: 1.2, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 0.1 }}
           className="absolute inset-0 z-0 pointer-events-none"
         >
           <Image src="/brand/logo_white.svg" alt="" fill className="object-contain p-24" />
         </motion.div>
         <div className="relative z-10 mx-auto max-w-4xl">
           <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-white uppercase italic">
             Ready to<br /> build the lane?
           </h2>
           <Link
             href="/contact"
             className="mt-16 inline-flex items-center justify-center rounded-full bg-white px-12 py-5 text-sm font-bold uppercase tracking-[0.3em] text-black transition-all hover:scale-105 active:scale-[0.98]"
           >
             Start a project
           </Link>
         </div>
      </section>
    </div>
  );
}
