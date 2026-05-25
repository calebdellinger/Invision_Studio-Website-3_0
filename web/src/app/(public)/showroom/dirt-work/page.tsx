import type { Metadata } from "next";
import { TradeAlbumShowcase } from "@/components/site/service/TradeAlbumShowcase";

export const metadata: Metadata = {
  title: "Dirt Work & Grading Showcase",
  description: "Dirt work and grading project photos and videos powered by SmugMug album media.",
};

export default async function DirtWorkShowcasePage() {
  return <TradeAlbumShowcase tradeLabel="Dirt Work / Grading" albumKey="wXM9Qk" />;
}
