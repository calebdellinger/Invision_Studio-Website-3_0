import Image from "next/image";
import { CategoryTiles } from "@/components/site/CategoryTiles";
import { HeroMockupStage } from "@/components/site/HeroMockupStage";
import { HomepageMockupShowcase } from "@/components/site/HomepageMockupShowcase";
import { InstagramPhoneShowcase } from "@/components/site/InstagramPhoneShowcase";
import { OperationPillars } from "@/components/site/OperationPillars";
import { CreativeShowcaseHero } from "@/components/site/CreativeShowcaseHero";
import { PageLoader } from "@/components/site/PageLoader";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <PageLoader />
      <CreativeShowcaseHero />

      <OperationPillars />

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

      <div className="bg-white py-24 sm:py-32">
        <HeroMockupStage />
      </div>

      <CategoryTiles />
    </div>
  );
}
