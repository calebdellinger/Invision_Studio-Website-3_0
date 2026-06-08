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

      <div className="relative z-10">
        <InstagramPhoneShowcase />
      </div>

      <HomepageMockupShowcase />

      <CategoryTiles />
    </div>
  );
}
