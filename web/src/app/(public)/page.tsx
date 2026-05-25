import Image from "next/image";
import { CategoryTiles } from "@/components/site/CategoryTiles";
import { FilmProjectorHero } from "@/components/site/FilmProjectorHero";
import { HeroMockupStage } from "@/components/site/HeroMockupStage";
import { HomepageMockupShowcase } from "@/components/site/HomepageMockupShowcase";
import { InstagramPhoneShowcase } from "@/components/site/InstagramPhoneShowcase";
import { OperationPillars } from "@/components/site/OperationPillars";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* <section className="relative flex min-h-[calc(100dvh-var(--header-height))] w-full flex-col justify-end overflow-hidden bg-[#050505] px-4 pb-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Hero%20page.png')" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/65"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            The Art of
            <br />
            a New Idea
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
            Photography, video, social, and AI — built for teams that want to be
            seen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[var(--brand-creative)]/50 hover:bg-[var(--brand-creative)]/10"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-6 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section> */}

      <HeroMockupStage />

      <OperationPillars />

      <FilmProjectorHero />

      <section className="-mb-px w-full overflow-hidden bg-black" aria-label="Mirrored mountain scene">
        <Image
          src="/rebuild-gallery/3pillarsHero.jpg"
          alt="Mirrored mountain silhouette"
          width={1920}
          height={1080}
          className="h-auto w-full scale-y-[-1]"
          priority={false}
        />
      </section>

      <div className="relative z-10 -mt-[240px] translate-y-[17%]">
        <InstagramPhoneShowcase />
      </div>
      <HomepageMockupShowcase />

      <CategoryTiles />
    </div>
  );
}
