import crypto from "node:crypto";

const SMUGMUG_API_BASE = "https://api.smugmug.com";

type MediaKind = "photo" | "video";

export type SmugMugMedia = {
  id: string;
  kind: MediaKind;
  title: string;
  caption: string;
  alt: string;
  width?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  originalUrl?: string;
  videoUrl?: string;
  pageUrl?: string;
  raw: Record<string, unknown>;
};

export type SmugMugListAlbumMediaOptions = {
  albumKey: string;
  start?: number;
  count?: number;
  media?: "all" | "photos" | "videos";
  revalidateSeconds?: number;
};

type SmugMugAlbumImage = {
  ImageKey?: string;
  Uri?: string;
  Title?: string;
  Caption?: string;
  AltDescription?: string;
  Width?: number;
  Height?: number;
  DateTimeOriginal?: string;
  LastUpdated?: string;
  IsVideo?: boolean;
  WebUri?: string;
  ThumbnailUrl?: string;
  TinyUrl?: string;
  SmallUrl?: string;
  MediumUrl?: string;
  LargeUrl?: string;
  XLargeUrl?: string;
  X2LargeUrl?: string;
  X3LargeUrl?: string;
  OriginalUrl?: string;
  Video320Url?: string;
  Video640Url?: string;
  Video960Url?: string;
  Video1280Url?: string;
  Video1920Url?: string;
  ArchivedUri?: string;
  Uris?: {
    LargestImage?: { Uri?: string } | string;
    LargestVideo?: { Uri?: string } | string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
};

type SmugMugAlbumImageResponse = {
  Response?: {
    AlbumImage?: SmugMugAlbumImage[];
    Pages?: {
      Start?: number;
      Count?: number;
      Total?: number;
      NextPage?: string;
      PrevPage?: string;
    };
  };
  Message?: string;
  Code?: number;
};

type SmugMugLargestVideoResponse = {
  Response?: {
    LargestVideo?: {
      Url?: string;
    };
  };
};

type SmugMugLargestImageResponse = {
  Response?: {
    LargestImage?: {
      Url?: string;
    };
  };
};

function mustEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function toPercent(input: string): string {
  return encodeURIComponent(input)
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/'/g, "%27");
}

function nonce(length = 24): string {
  return crypto.randomBytes(length).toString("hex");
}

function nowSeconds(): string {
  return Math.floor(Date.now() / 1000).toString();
}

function normalizeUrl(input: string): string {
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/")) return `${SMUGMUG_API_BASE}${input}`;
  return `${SMUGMUG_API_BASE}/${input}`;
}

function buildSignedOAuthHeader(url: URL): string {
  const apiKey = mustEnv("SMUGMUG_API_KEY");
  const apiSecret = mustEnv("SMUGMUG_API_SECRET");
  const accessToken = process.env.SMUGMUG_ACCESS_TOKEN;
  const accessTokenSecret = process.env.SMUGMUG_ACCESS_TOKEN_SECRET;

  const oauth: Record<string, string> = {
    oauth_consumer_key: apiKey,
    oauth_nonce: nonce(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: nowSeconds(),
    oauth_version: "1.0",
  };

  if (accessToken) {
    oauth.oauth_token = accessToken;
  }

  const params: Array<[string, string]> = [];
  url.searchParams.forEach((value, key) => {
    params.push([key, value]);
  });
  Object.entries(oauth).forEach(([key, value]) => {
    params.push([key, value]);
  });

  const paramString = params
    .map(([k, v]) => [toPercent(k), toPercent(v)] as const)
    .sort(([aKey, aValue], [bKey, bValue]) =>
      aKey === bKey ? aValue.localeCompare(bValue) : aKey.localeCompare(bKey),
    )
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const baseString = `GET&${toPercent(`${url.origin}${url.pathname}`)}&${toPercent(paramString)}`;
  const signingKey = `${toPercent(apiSecret)}&${toPercent(accessTokenSecret ?? "")}`;
  const signature = crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");

  const headerParams = { ...oauth, oauth_signature: signature };
  const header = Object.entries(headerParams)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${toPercent(k)}="${toPercent(v)}"`)
    .join(", ");

  return `OAuth ${header}`;
}

function hasOAuthCredentials(): boolean {
  return Boolean(
    process.env.SMUGMUG_API_KEY &&
      process.env.SMUGMUG_API_SECRET &&
      process.env.SMUGMUG_ACCESS_TOKEN &&
      process.env.SMUGMUG_ACCESS_TOKEN_SECRET,
  );
}

function pickFirstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return undefined;
}

function pickImageUrl(item: SmugMugAlbumImage): string | undefined {
  return pickFirstString(
    item.ArchivedUri,
    item.X3LargeUrl,
    item.X2LargeUrl,
    item.XLargeUrl,
    item.LargeUrl,
    item.MediumUrl,
    item.SmallUrl,
    item.OriginalUrl,
  );
}

function pickVideoUrl(item: SmugMugAlbumImage): string | undefined {
  return pickFirstString(item.Video1920Url, item.Video1280Url, item.Video960Url, item.Video640Url, item.Video320Url);
}

function normalizeAlbumImage(item: SmugMugAlbumImage): SmugMugMedia {
  const kind: MediaKind = item.IsVideo ? "video" : "photo";
  const id = item.ImageKey ?? item.Uri ?? crypto.randomUUID();
  const title = item.Title ?? "";
  const caption = item.Caption ?? "";
  const alt = item.AltDescription ?? item.Title ?? item.Caption ?? "";

  return {
    id,
    kind,
    title,
    caption,
    alt,
    width: typeof item.Width === "number" ? item.Width : undefined,
    height: typeof item.Height === "number" ? item.Height : undefined,
    createdAt: typeof item.DateTimeOriginal === "string" ? item.DateTimeOriginal : undefined,
    updatedAt: typeof item.LastUpdated === "string" ? item.LastUpdated : undefined,
    thumbnailUrl: pickFirstString(item.ThumbnailUrl, item.TinyUrl, item.SmallUrl),
    imageUrl: pickImageUrl(item),
    originalUrl: typeof item.OriginalUrl === "string" ? item.OriginalUrl : undefined,
    videoUrl: kind === "video" ? pickVideoUrl(item) : undefined,
    pageUrl: typeof item.WebUri === "string" ? item.WebUri : undefined,
    raw: item,
  };
}

async function resolveLargestVideoUrl(item: SmugMugAlbumImage): Promise<string | undefined> {
  const largestVideoUri =
    typeof item.Uris?.LargestVideo === "string"
      ? item.Uris.LargestVideo
      : item.Uris?.LargestVideo && typeof item.Uris.LargestVideo === "object"
        ? item.Uris.LargestVideo.Uri
        : undefined;

  if (!largestVideoUri) return undefined;

  try {
    const data = await fetchSmugMug<SmugMugLargestVideoResponse>(largestVideoUri, {});
    return pickFirstString(data.Response?.LargestVideo?.Url);
  } catch {
    return undefined;
  }
}

async function resolveLargestImageUrl(item: SmugMugAlbumImage): Promise<string | undefined> {
  const largestImageUri =
    typeof item.Uris?.LargestImage === "string"
      ? item.Uris.LargestImage
      : item.Uris?.LargestImage && typeof item.Uris.LargestImage === "object"
        ? item.Uris.LargestImage.Uri
        : undefined;

  if (!largestImageUri) return undefined;

  try {
    const data = await fetchSmugMug<SmugMugLargestImageResponse>(largestImageUri, {});
    return pickFirstString(data.Response?.LargestImage?.Url);
  } catch {
    return undefined;
  }
}

async function fetchSmugMug<T>(
  pathOrUrl: string,
  params: Record<string, string>,
  revalidateSeconds = 300,
): Promise<T> {
  const url = new URL(normalizeUrl(pathOrUrl));

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      url.searchParams.set(key, value);
    }
  });

  if (!hasOAuthCredentials()) {
    url.searchParams.set("APIKey", mustEnv("SMUGMUG_API_KEY"));
  }

  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (hasOAuthCredentials()) {
    headers.Authorization = buildSignedOAuthHeader(url);
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SmugMug request failed (${res.status}): ${body || res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function listSmugMugAlbumMedia(
  options: SmugMugListAlbumMediaOptions,
): Promise<{ media: SmugMugMedia[]; paging: { start: number; count: number; total: number } }> {
  const { albumKey, start = 1, count = 100, media = "all", revalidateSeconds = 300 } = options;

  const data = await fetchSmugMug<SmugMugAlbumImageResponse>(`/api/v2/album/${albumKey}!images`, {
    start: String(start),
    count: String(count),
    _verbosity: "2", // verbosity 2 returns more URL fields inline, reducing per-image fallback calls
  }, revalidateSeconds);

  const images = data.Response?.AlbumImage ?? [];

  // Normalize without fetching, filter to requested type, then resolve missing URLs
  // only for items we'll actually return — avoids N+1 fetches for discarded media.
  const pairs = images.map((raw) => ({ raw, normalized: normalizeAlbumImage(raw) }));

  const filteredPairs =
    media === "photos"
      ? pairs.filter(({ normalized }) => normalized.kind === "photo")
      : media === "videos"
        ? pairs.filter(({ normalized }) => normalized.kind === "video")
        : pairs;

  const allMedia = await Promise.all(
    filteredPairs.map(async ({ raw, normalized }) => {
      if (!normalized.imageUrl) {
        normalized.imageUrl = await resolveLargestImageUrl(raw);
      }
      if (normalized.kind === "video" && !normalized.videoUrl) {
        normalized.videoUrl = await resolveLargestVideoUrl(raw);
      }
      return normalized;
    }),
  );

  const pages = data.Response?.Pages;

  return {
    media: allMedia,
    paging: {
      start: pages?.Start ?? start,
      count: pages?.Count ?? allMedia.length,
      total: pages?.Total ?? allMedia.length,
    },
  };
}
