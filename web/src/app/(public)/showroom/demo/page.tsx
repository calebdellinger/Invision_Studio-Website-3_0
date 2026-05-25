import type { Metadata } from "next";
import { TradeAlbumShowcase } from "@/components/site/service/TradeAlbumShowcase";

export const metadata: Metadata = {
  title: "Demo Showcase",
  description: "Demolition project photos and videos powered by SmugMug album media.",
};

export default async function DemoShowcasePage() {
  return <TradeAlbumShowcase tradeLabel="Demo" albumKey="nrqZSv" />;
}
