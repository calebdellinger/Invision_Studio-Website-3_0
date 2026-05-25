import type { Metadata } from "next";
import { TradeAlbumShowcase } from "@/components/site/service/TradeAlbumShowcase";

export const metadata: Metadata = {
  title: "Roofing Media Showcase",
  description: "Roofing project photos and videos powered by SmugMug album media.",
};

const ALBUM_KEY = "5zNXzG";

export default async function RoofingShowcasePage() {
  return <TradeAlbumShowcase tradeLabel="Roofing" albumKey={ALBUM_KEY} />;
}
