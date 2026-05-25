import type { Metadata } from "next";
import { ConcretePanorama360 } from "@/components/site/showroom/ConcretePanorama360";
import { TradeAlbumShowcase } from "@/components/site/service/TradeAlbumShowcase";

export const metadata: Metadata = {
  title: "Concrete Showcase",
  description:
    "Concrete project photos and videos — including an interactive 360° aerial view — powered by SmugMug album media.",
};

export default async function ConcreteShowcasePage() {
  return (
    <>
      <ConcretePanorama360 panoramaPath="/api/showroom/concrete-panorama" />
      <TradeAlbumShowcase tradeLabel="Concrete" albumKey="ZC5R5b" />
    </>
  );
}
