import type { Metadata } from "next";
import { listSmugMugAlbumMedia, type SmugMugMedia } from "@/lib/smugmug";
import { CategorizedGallery } from "@/components/site/showroom/CategorizedGallery";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Showroom | Visual Portfolio",
  description:
    "A consolidated master archive of Invision Creative's latest work. High-end trade execution and commercial real estate showcases.",
};

const TRADE_ALBUMS = [
  { label: "Dirt Work", key: "wXM9Qk" },
  { label: "Concrete", key: "ZC5R5b" },
  { label: "Demo", key: "nrqZSv" },
  { label: "Roofing", key: "5zNXzG" },
];

export default async function ShowroomPage() {
  let tradesMedia: SmugMugMedia[] = [];

  try {
    const albumResults = await Promise.all(
      TRADE_ALBUMS.map((album) =>
        listSmugMugAlbumMedia({
          albumKey: album.key,
          count: 50,
          media: "all",
        })
      )
    );
    tradesMedia = albumResults.flatMap((res) => res.media);
    // Shuffle slightly to mix trades together
    tradesMedia.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Failed to load showroom media:", error);
  }

  return (
    <div className="bg-white min-h-screen selection:bg-[var(--brand-creative)] selection:text-white pb-32">
      {/* Editorial Header */}
      <header className="relative pt-32 pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--brand-creative)]">
              Visual Archive
            </span>
            <div className="h-px w-12 bg-zinc-100" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Invision Creative Master
            </span>
          </div>

          <h1 className="mt-12 font-serif text-[clamp(4rem,15vw,10rem)] leading-[0.8] tracking-tighter text-zinc-950 uppercase">
            The<br />
            <span className="italic text-[var(--brand-creative)]">Showroom</span>
          </h1>

          <p className="mt-12 max-w-lg text-lg leading-relaxed text-zinc-500 font-medium">
            Tactical evidence of creative execution. A consolidated stream of our latest commercial captures, high-end trades, and industrial precision.
          </p>
        </div>
      </header>

      {/* Categorized Gallery Section */}
      <main className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        <CategorizedGallery 
          tradesMedia={tradesMedia} 
        />
      </main>

      {/* Closing Call to Action */}
      <footer className="mt-48 text-center px-6">
        <div className="mx-auto max-w-3xl">
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
             Ready for your project?
           </p>
           <h2 className="mt-8 font-serif text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tight text-zinc-950 uppercase">
             Build your own lane.
           </h2>
           <Link
             href="/contact"
             className="mt-12 inline-flex items-center justify-center rounded-full bg-zinc-950 px-12 py-5 text-sm font-bold uppercase tracking-[0.3em] text-white transition-all hover:scale-105 active:scale-[0.98]"
           >
             Start a project
           </Link>
         </div>
      </footer>
    </div>
  );
}
