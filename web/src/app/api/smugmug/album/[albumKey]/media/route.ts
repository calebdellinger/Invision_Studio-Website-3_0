import { NextResponse } from "next/server";
import { listSmugMugAlbumMedia } from "@/lib/smugmug";

type Params = { albumKey: string };

function parsePositiveInt(value: string | null, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

export async function GET(request: Request, context: { params: Promise<Params> }) {
  const { albumKey } = await context.params;
  const url = new URL(request.url);

  const start = parsePositiveInt(url.searchParams.get("start"), 1);
  const count = parsePositiveInt(url.searchParams.get("count"), 100);
  const mediaParam = url.searchParams.get("media");
  const media = mediaParam === "photos" || mediaParam === "videos" ? mediaParam : "all";

  try {
    const result = await listSmugMugAlbumMedia({ albumKey, start, count, media });
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SmugMug error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
