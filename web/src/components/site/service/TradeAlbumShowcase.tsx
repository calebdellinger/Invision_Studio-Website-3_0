import Link from "next/link";
import { listSmugMugAlbumMedia, type SmugMugMedia } from "@/lib/smugmug";

type TradeAlbumShowcaseProps = {
  tradeLabel: string;
  albumKey: string;
};

function cleanDisplayText(value: string | undefined): string {
  if (!value) return "";
  const normalized = value.trim();
  if (!normalized) return "";
  if (normalized.toLowerCase() === "default") return "";
  return normalized;
}

function splitMedia(media: SmugMugMedia[]) {
  return {
    photos: media.filter((item) => item.kind === "photo"),
    videos: media.filter((item) => item.kind === "video"),
  };
}

export async function TradeAlbumShowcase({ tradeLabel, albumKey }: TradeAlbumShowcaseProps) {
  let media: SmugMugMedia[] = [];
  let loadError: string | null = null;

  try {
    const result = await listSmugMugAlbumMedia({
      albumKey,
      count: 200,
      media: "all",
    });
    media = result.media;
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Failed to load SmugMug media.";
  }

  const { photos, videos } = splitMedia(media);
  const galleryItems = [...videos, ...photos];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
          {tradeLabel} showcase
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-4xl">
          {tradeLabel} photos and video
        </h1>
      </header>

      {loadError ? (
        <div className="rounded-xl border border-red-500/25 bg-red-950/20 p-4 text-sm text-red-200">
          Could not load SmugMug media: {loadError}
        </div>
      ) : null}

      {galleryItems.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-2xl">
            Gallery
          </h2>
          <div className="mt-4 columns-1 gap-3 sm:columns-2 lg:columns-3">
            {galleryItems.map((item) => {
              const title = cleanDisplayText(item.title);
              const caption = cleanDisplayText(item.caption);
              const photoSrc = item.imageUrl ?? item.originalUrl ?? item.thumbnailUrl;
              return (
                <figure
                  key={item.id}
                  className="mb-3 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-[#0f0f10] ring-1 ring-inset ring-white/[0.03]"
                >
                  {item.kind === "video" ? (
                    item.videoUrl ? (
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="aspect-video w-full bg-black object-cover"
                        poster={item.imageUrl ?? item.originalUrl ?? item.thumbnailUrl}
                      >
                        <source src={item.videoUrl} />
                      </video>
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-black/60 text-xs text-zinc-500">
                        Video source unavailable
                      </div>
                    )
                  ) : photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={item.alt || item.title || `${tradeLabel} project image`}
                      loading="lazy"
                      className="h-auto w-full object-cover"
                    />
                  ) : (
                    <div className="flex min-h-40 items-center justify-center bg-black/60 text-xs text-zinc-500">
                      Image unavailable
                    </div>
                  )}
                  {title || caption ? (
                    <figcaption className="p-3">
                      {title ? <p className="line-clamp-1 text-sm font-medium text-zinc-200">{title}</p> : null}
                      {caption ? (
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{caption}</p>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </section>
      ) : null}

      {!loadError && media.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-[#101010] p-4 text-sm text-zinc-400">
          No media returned from this album yet.
        </p>
      ) : null}

      <div className="mt-10">
        <Link
          href="/showroom"
          className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:border-[color-mix(in_srgb,var(--brand-creative)_45%,white_12%)] hover:text-white"
        >
          Back to Showroom
        </Link>
      </div>
    </div>
  );
}
