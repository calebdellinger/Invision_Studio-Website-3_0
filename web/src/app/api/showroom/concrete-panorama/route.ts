/**
 * Proxies the concrete showroom 360° asset so the viewer loads same-origin
 * (WebGL textures often fail on cross-domain images without permissive CORS).
 */
const PANORAMA_SOURCE =
  "https://photos.smugmug.com/photos/i-3PBT9vr/0/KMbvXRkx3Chsh4kptcpV42Xc6zG9PbdJwnWMjm3mL/5K/i-3PBT9vr-5K.jpg";

export async function GET() {
  const upstream = await fetch(PANORAMA_SOURCE, {
    next: { revalidate: 86_400 },
    headers: {
      Accept: "image/jpeg,image/*;q=0.8,*/*;q=0.5",
      "User-Agent":
        "Mozilla/5.0 (compatible; InvisionCreativeSite/1.0; +https://invisioncreative.com)",
    },
  });
  if (!upstream.ok) {
    return new Response("Failed to load panorama", { status: 502 });
  }
  const buf = await upstream.arrayBuffer();
  const type = upstream.headers.get("content-type") ?? "image/jpeg";
  return new Response(buf, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      /** Allow WebGL/canvas to use this URL cross-origin if loaded directly */
      "Access-Control-Allow-Origin": "*",
    },
  });
}
