"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./InstagramPhoneShowcase.module.css";

const POSTS = [
  {
    src: "/rebuild-gallery/6F4A3492.jpg",
    alt: "Compact excavator at the edge of a trench.",
    handle: "invisioncreative",
    likes: "412 likes",
  },
  {
    src: "/rebuild-gallery/6F4A8380-2.jpg",
    alt: "Concrete mixer and pump truck on site.",
    handle: "invisioncreative",
    likes: "537 likes",
  },
  {
    src: "/rebuild-gallery/badass.jpg",
    alt: "Hydraulic breaker demolition action shot.",
    handle: "invisioncreative",
    likes: "689 likes",
  },
  {
    src: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
    alt: "Drone shot over an excavator beside mirrored glass.",
    handle: "invisioncreative",
    likes: "761 likes",
  },
] as const;

type SocialSlide = "instagram" | "facebook" | "tiktok" | "pinterest";

function PhoneShell({
  children,
  ctaLabel,
  ctaHref,
  className,
}: {
  children: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}) {
  return (
    <Link
      href={ctaHref}
      className={`group block w-[min(90vw,230px)] rounded-[2.6rem] border border-white/20 bg-[#0b0b0b] p-2 shadow-[0_28px_72px_-30px_rgba(0,0,0,0.9)] transition-[transform,border-color] hover:-translate-y-0.5 hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-creative)] ${className ?? ""}`}
    >
      <article className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] border border-white/10 bg-black">
        <div className="pointer-events-none absolute left-1/2 top-1.5 z-30 h-5 w-[5.5rem] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        {children}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
            {ctaLabel}
          </span>
        </div>
      </article>
    </Link>
  );
}

function InstagramPhone({ reduceMotion }: { reduceMotion: boolean }) {
  const durationSec = Math.max(24, POSTS.length * 7);

  return (
    <PhoneShell
      ctaLabel="Why Instagram?"
      ctaHref="/services/social-media/instagram"
    >
      <div className="relative z-20 border-b border-white/[0.08] bg-[#0f0f11] px-4 pt-9 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-white">Instagram</p>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          </div>
        </div>
        <div className="mt-3 flex gap-3 overflow-hidden pb-1">
          {POSTS.map((post, i) => (
            <div key={`${post.src}-story-${i}`} className="shrink-0">
              <div className="rounded-full bg-[conic-gradient(from_120deg,#f9ce34,#ee2a7b,#6228d7,#f9ce34)] p-[1.5px]">
                <div className="rounded-full bg-black p-[1.5px]">
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-zinc-900">
                    <Image
                      src={post.src}
                      alt={post.alt}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                      sizes="44px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[calc(100%-7.7rem)] overflow-hidden bg-black">
        <div
          className={`${reduceMotion ? "" : styles.scrollTrack} flex flex-col`}
          style={{ "--ig-loop-duration": `${durationSec}s` } as CSSProperties}
        >
          {POSTS.map((post, i) => (
            <article
              key={`post-${i}`}
              className="border-b border-white/[0.08] bg-black"
            >
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 overflow-hidden rounded-full border border-white/10">
                    <Image
                      src={post.src}
                      alt=""
                      width={28}
                      height={28}
                      className="h-full w-full object-cover"
                      sizes="28px"
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-100">{post.handle}</p>
                </div>
                <span className="text-xs text-zinc-500">...</span>
              </div>

              <div className="relative aspect-square w-full">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 340px"
                />
              </div>

              <div className="px-3 pt-2 pb-3">
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-sm">♡</span>
                  <span className="text-sm">💬</span>
                  <span className="text-sm">↗</span>
                </div>
                <p className="mt-2 text-[11px] font-semibold text-zinc-200">
                  {post.likes}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-200">{post.handle}</span>{" "}
                  Project highlights in motion and stills.
                </p>
              </div>
            </article>
          ))}
          {/* Duplicate set — required for seamless CSS translateY(-50%) loop; hidden from assistive tech */}
          {POSTS.map((post, i) => (
            <article
              key={`dup-post-${i}`}
              aria-hidden="true"
              className="border-b border-white/[0.08] bg-black"
            >
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 overflow-hidden rounded-full border border-white/10">
                    <Image
                      src={post.src}
                      alt=""
                      width={28}
                      height={28}
                      className="h-full w-full object-cover"
                      sizes="28px"
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-100">{post.handle}</p>
                </div>
                <span className="text-xs text-zinc-500">...</span>
              </div>

              <div className="relative aspect-square w-full">
                <Image
                  src={post.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 340px"
                />
              </div>

              <div className="px-3 pt-2 pb-3">
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-sm">♡</span>
                  <span className="text-sm">💬</span>
                  <span className="text-sm">↗</span>
                </div>
                <p className="mt-2 text-[11px] font-semibold text-zinc-200">
                  {post.likes}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-200">{post.handle}</span>{" "}
                  Project highlights in motion and stills.
                </p>
              </div>
            </article>
          ))}
        </div>
        <div
          className={`pointer-events-none absolute inset-0 z-10 ${
            reduceMotion ? "" : styles.likePulse
          }`}
          style={{ "--ig-loop-duration": `${durationSec}s` } as CSSProperties}
          aria-hidden
        >
          <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-6xl leading-none text-[#ff3040] drop-shadow-[0_10px_26px_rgba(0,0,0,0.6)]">
            ❤
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function FacebookPhone({ reduceMotion }: { reduceMotion: boolean }) {
  const cards = [
    {
      image: "/rebuild-gallery/6F4A8380-2.jpg",
      alt: "Concrete mixer and pump truck post preview.",
      text: "Weekly project recap from the field.",
      stats: "146 reactions",
      comments: "19 comments",
    },
    {
      image: "/rebuild-gallery/6F4A3492.jpg",
      alt: "Excavator trench progress post preview.",
      text: "Morning trenching progress and cleanup sequence.",
      stats: "201 reactions",
      comments: "27 comments",
    },
  ] as const;
  return (
    <PhoneShell
      ctaLabel="Why Facebook?"
      ctaHref="/services/social-media?autoPlatform=facebook"
    >
      <div className="border-b border-[#2f333a] bg-[#1c1f25] px-3 pt-6 pb-2.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#1877f2]">facebook</p>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[#2c3037] px-1.5 py-0.5 text-[9px] text-zinc-300">
              +
            </span>
            <span className="rounded-full bg-[#2c3037] px-1.5 py-0.5 text-[9px] text-zinc-300">
              ...
            </span>
          </div>
        </div>
      </div>

      <div className="h-[calc(100%-2.75rem)] overflow-hidden bg-[#1b1e23] px-2.5 py-2">
        <div
          className={`${reduceMotion ? "" : styles.socialScrollTrack} flex flex-col gap-2`}
          style={{ "--social-loop-duration": "24.3s" } as CSSProperties}
        >
          {cards.map((card, i) => (
            <div
              key={`card-${i}`}
              className="rounded-xl border border-[#3a3f48] bg-[#252a31] p-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#1877f2]" />
                <div>
                  <p className="text-[9px] font-semibold text-zinc-100">
                    Invision Creative
                  </p>
                  <p className="text-[8px] text-zinc-500">2h · Public</p>
                </div>
              </div>
              <p className="mt-1.5 text-[8px] leading-relaxed text-zinc-300">
                {card.text}
              </p>
              <div className="relative mt-2 aspect-[4/5] overflow-hidden rounded-md">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[8px] text-zinc-400">
                <p>{card.stats}</p>
                <p>{card.comments}</p>
              </div>
              <div className="mt-1.5 grid grid-cols-3 border-t border-[#3a3f48] pt-1.5 text-center text-[8px] text-zinc-300">
                <span>Like</span>
                <span>Comment</span>
                <span>Share</span>
              </div>
            </div>
          ))}
          {/* Duplicate set — required for seamless CSS translateY(-50%) loop; hidden from assistive tech */}
          {cards.map((card, i) => (
            <div
              key={`dup-card-${i}`}
              aria-hidden="true"
              className="rounded-xl border border-[#3a3f48] bg-[#252a31] p-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#1877f2]" />
                <div>
                  <p className="text-[9px] font-semibold text-zinc-100">
                    Invision Creative
                  </p>
                  <p className="text-[8px] text-zinc-500">2h · Public</p>
                </div>
              </div>
              <p className="mt-1.5 text-[8px] leading-relaxed text-zinc-300">
                {card.text}
              </p>
              <div className="relative mt-2 aspect-[4/5] overflow-hidden rounded-md">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[8px] text-zinc-400">
                <p>{card.stats}</p>
                <p>{card.comments}</p>
              </div>
              <div className="mt-1.5 grid grid-cols-3 border-t border-[#3a3f48] pt-1.5 text-center text-[8px] text-zinc-300">
                <span>Like</span>
                <span>Comment</span>
                <span>Share</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

function TikTokPhone({ reduceMotion }: { reduceMotion: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [tiktokIndex, setTiktokIndex] = useState(0);
  const [tiktokAnimate, setTiktokAnimate] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(0);
  const videos = [
    {
      src: "/rebuild-gallery/badass.jpg",
      alt: "Hydraulic breaker demolition vertical clip preview.",
      handle: "@invisioncreative",
      caption: "When the breaker hits clean and the edit lands.",
      sound: "Original sound - Invision Creative",
      likes: "2.1K",
      comments: "129",
      shares: "88",
    },
    {
      src: "/rebuild-gallery/6F4A3492.jpg",
      alt: "Excavator trench progress vertical clip preview.",
      handle: "@invisioncreative",
      caption: "Trench progress timelapse from first break to finish.",
      sound: "Original sound - Invision Creative",
      likes: "1.7K",
      comments: "94",
      shares: "61",
    },
    {
      src: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
      alt: "Aerial excavator pass vertical clip preview.",
      handle: "@invisioncreative",
      caption: "Aerial pass showing approach, staging, and first cuts.",
      sound: "Original sound - Invision Creative",
      likes: "2.8K",
      comments: "141",
      shares: "109",
    },
  ] as const;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (el.clientHeight > 0) setViewportHeight(el.clientHeight);
    };

    updateHeight();
    const rafId = window.requestAnimationFrame(updateHeight);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateHeight);
      observer.observe(el);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setTiktokIndex((prev) => {
        const next = prev + 1;
        if (next >= videos.length) {
          setTiktokAnimate(false);
          window.requestAnimationFrame(() => {
            setTiktokAnimate(true);
          });
          return 0;
        }
        return next;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduceMotion, videos.length]);
  return (
    <PhoneShell
      ctaLabel="Why TikTok?"
      ctaHref="/services/social-media?autoPlatform=tiktok"
    >
      <div ref={viewportRef} className="relative h-full bg-black">
        <div
          className="absolute inset-0 flex h-full flex-col"
          style={
            {
              transform: `translateY(-${tiktokIndex * (viewportHeight || 1)}px)`,
              transition:
                reduceMotion || !tiktokAnimate
                  ? "none"
                  : "transform 420ms cubic-bezier(0.24,0.86,0.34,1)",
            } as CSSProperties
          }
        >
          {videos.map((video, i) => (
            <div
              key={`${video.src}-${i}`}
              className="relative h-full min-h-full w-full shrink-0 basis-full"
            >
              <Image
                src={video.src}
                alt={video.alt}
                fill
                className="object-cover"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />

              <div className="absolute bottom-3 left-3 right-10 z-10">
                <p className="text-[9px] font-semibold text-white">
                  {video.handle}
                </p>
                <p className="mt-1 text-[8px] leading-relaxed text-zinc-200">
                  {video.caption}
                </p>
                <p className="mt-1 text-[8px] text-zinc-400">{video.sound}</p>
              </div>

              <div className="absolute bottom-3 right-2.5 z-10 flex flex-col items-center gap-2 text-white">
                <div className="h-7 w-7 rounded-full border border-white/40 bg-black/35" />
                <div className="text-center">
                  <p className="text-[10px]">❤</p>
                  <p className="text-[7px] text-zinc-200">{video.likes}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px]">💬</p>
                  <p className="text-[7px] text-zinc-200">{video.comments}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px]">↗</p>
                  <p className="text-[7px] text-zinc-200">{video.shares}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-3 right-3 top-6 z-10 flex justify-center text-[9px] font-semibold text-white">
          <div className="absolute left-0 top-0 flex items-center gap-1 rounded-full bg-black/45 px-1.5 py-0.5 ring-1 ring-white/10">
            <span className="text-[10px] leading-none text-[#25f4ee]">♪</span>
            <span className="text-[10px] leading-none text-[#fe2c55]">♪</span>
          </div>
          <p className="border-b border-white px-2 pb-0.5">Following</p>
          <p className="px-2 pb-0.5 text-zinc-300">For You</p>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-10 ${
            reduceMotion ? "" : styles.tiktokLikePulse
          }`}
          style={{ "--ig-loop-duration": "12s" } as CSSProperties}
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl leading-none text-[#ff3040] drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
            ❤
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function PinterestPhone({ reduceMotion }: { reduceMotion: boolean }) {
  const pins = [
    {
      image: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
      alt: "Aerial construction shot pin preview.",
      aspect: "aspect-[3/4]",
      title: "Commercial site transformation inspiration",
    },
    {
      image: "/rebuild-gallery/6F4A8380-2.jpg",
      alt: "Mixer truck pin preview.",
      aspect: "aspect-[4/5]",
      title: "Concrete operation references",
    },
    {
      image: "/rebuild-gallery/badass.jpg",
      alt: "Hydraulic breaker demolition pin preview.",
      aspect: "aspect-[2/3]",
      title: "Demolition motion frame",
    },
    {
      image: "/rebuild-gallery/6F4A3492.jpg",
      alt: "Excavator trench progress pin preview.",
      aspect: "aspect-[5/6]",
      title: "Trenching storyboard",
    },
  ] as const;
  const leftPins = [pins[0], pins[2], pins[1], pins[3]];
  const rightPins = [pins[1], pins[3], pins[0], pins[2]];

  const PinItem = ({ pin, ariaHidden = false }: { pin: typeof leftPins[number]; ariaHidden?: boolean }) => (
    <div className="space-y-1" aria-hidden={ariaHidden || undefined}>
      <div className={`relative overflow-hidden rounded-xl ${pin.aspect}`}>
        <Image
          src={pin.image}
          alt={ariaHidden ? "" : pin.alt}
          fill
          className="object-cover"
          sizes="110px"
        />
        <div className="absolute right-1.5 top-1.5 rounded-full bg-[#e60023] px-1.5 py-0.5 text-[7px] font-semibold text-white">
          Save
        </div>
      </div>
      <p className="line-clamp-2 text-[7px] font-medium leading-tight text-zinc-200">
        {pin.title}
      </p>
    </div>
  );

  return (
    <PhoneShell
      ctaLabel="Why Pinterest?"
      ctaHref="/services/social-media?autoPlatform=pinterest"
    >
      <div className="border-b border-[#262626] bg-[#111111] px-3 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-[#e60023]">Pinterest</p>
          <div className="flex items-center gap-1.5 text-[8px]">
            <p className="rounded-full bg-white px-2 py-0.5 font-semibold text-black">
              All
            </p>
            <p className="rounded-full bg-[#2a2a2a] px-2 py-0.5 text-zinc-200">
              Saved
            </p>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-hidden bg-[#111111] p-2">
        <div className="grid grid-cols-2 gap-1.5">
          <div
            className={`${reduceMotion ? "" : styles.socialScrollTrack} space-y-1.5`}
            style={{ "--social-loop-duration": "26.4s" } as CSSProperties}
          >
            {leftPins.map((pin, i) => (
              <PinItem key={`left-${i}`} pin={pin} />
            ))}
            {/* Duplicate set — required for seamless CSS translateY(-50%) loop */}
            {leftPins.map((pin, i) => (
              <PinItem key={`dup-left-${i}`} pin={pin} ariaHidden />
            ))}
          </div>
          <div
            className={`${reduceMotion ? "" : styles.socialScrollTrack} space-y-1.5`}
            style={
              {
                "--social-loop-duration": "28.8s",
              } as CSSProperties
            }
          >
            {rightPins.map((pin, i) => (
              <PinItem key={`right-${i}`} pin={pin} />
            ))}
            {/* Duplicate set — required for seamless CSS translateY(-50%) loop */}
            {rightPins.map((pin, i) => (
              <PinItem key={`dup-right-${i}`} pin={pin} ariaHidden />
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

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

export function InstagramPhoneShowcase() {
  const reduceMotion = usePrefersReducedMotion();
  const [activePhone, setActivePhone] = useState<SocialSlide>("instagram");
  const slideOrder: SocialSlide[] = ["instagram", "facebook", "tiktok", "pinterest"];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActivePhone((current) => {
        const currentIx = slideOrder.indexOf(current);
        const nextIx = (currentIx + 1) % slideOrder.length;
        return slideOrder[nextIx] ?? "instagram";
      });
    }, 10000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const slides = {
    instagram: <InstagramPhone reduceMotion={reduceMotion} />,
    facebook: <FacebookPhone reduceMotion={reduceMotion} />,
    tiktok: <TikTokPhone reduceMotion={reduceMotion} />,
    pinterest: <PinterestPhone reduceMotion={reduceMotion} />,
  } as const;

  const activeIx = slideOrder.indexOf(activePhone);
  const getRelativePosition = (id: SocialSlide) => {
    const ix = slideOrder.indexOf(id);
    let delta = (ix - activeIx + slideOrder.length) % slideOrder.length;
    if (delta > slideOrder.length / 2) delta -= slideOrder.length;
    return delta;
  };

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
            Social
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl">
            Social feed preview
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600">
            A rotating in-app showcase that cycles through Instagram, Facebook,
            TikTok, and Pinterest patterns in a single phone stage.
          </p>
        </div>

        <div
          className="mx-auto [perspective:1400px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 33.333%, black 66.667%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 33.333%, black 66.667%, transparent 100%)",
          }}
        >
          <div className="relative h-[512px] w-[608px] max-w-[95vw]">
            {slideOrder.map((id) => {
              const rel = getRelativePosition(id);
              const isVisible = rel === 0 || rel === -1 || rel === 1;
              const transform =
                rel === 0
                  ? "translate3d(-50%, -50%, 120px) rotateY(0deg) scale(1)"
                  : rel === -1
                    ? "translate3d(calc(-50% - 176px), -50%, -120px) rotateY(30deg) scale(0.84)"
                    : rel === 1
                      ? "translate3d(calc(-50% + 176px), -50%, -120px) rotateY(-30deg) scale(0.84)"
                      : "translate3d(-50%, -50%, -240px) rotateY(0deg) scale(0.72)";

              return (
                <div
                  key={id}
                  className="absolute left-1/2 top-1/2 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform,
                    opacity: !isVisible ? 0 : rel === 0 ? 1 : 0.78,
                    zIndex: rel === 0 ? 30 : rel === -1 || rel === 1 ? 20 : 10,
                    pointerEvents: rel === 0 ? "auto" : "none",
                    filter:
                      rel === 0
                        ? "drop-shadow(0 34px 56px rgba(0,0,0,0.47))"
                        : "drop-shadow(0 14px 28px rgba(0,0,0,0.31))",
                  }}
                >
                  {slides[id]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
