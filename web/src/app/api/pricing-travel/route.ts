import { NextResponse } from "next/server";
import { PRICING_DRIVE_ORIGIN } from "@/config/pricingScaffold";

const MAX_DEST_LEN = 280;

type DistanceMatrixResponse = {
  status: string;
  error_message?: string;
  origin_addresses?: string[];
  destination_addresses?: string[];
  rows?: {
    elements: {
      status: string;
      distance?: { value: number; text: string };
      duration?: { value: number; text: string };
    }[];
  }[];
};

/**
 * POST { destination: string }
 * Returns driving distance (miles) and duration (minutes) one-way from PRICING_DRIVE_ORIGIN.
 * Requires GOOGLE_MAPS_API_KEY with Distance Matrix API enabled (server-side key).
 */
export async function POST(req: Request) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "Travel lookup is not configured. Set GOOGLE_MAPS_API_KEY for the site deployment or use manual miles/minutes in the calculator.",
        code: "NO_API_KEY",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const destination =
    typeof body === "object" &&
    body !== null &&
    "destination" in body &&
    typeof (body as { destination: unknown }).destination === "string"
      ? (body as { destination: string }).destination.trim()
      : "";

  if (destination.length < 4) {
    return NextResponse.json(
      { error: "Enter a full street address or place name (at least a few characters)." },
      { status: 400 },
    );
  }

  if (destination.length > MAX_DEST_LEN) {
    return NextResponse.json({ error: "Address is too long." }, { status: 400 });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
  url.searchParams.set("origins", PRICING_DRIVE_ORIGIN);
  url.searchParams.set("destinations", destination);
  url.searchParams.set("units", "imperial");
  url.searchParams.set("key", key);

  const res = await fetch(url.toString(), {
    method: "GET",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Could not reach maps service. Try again later." },
      { status: 502 },
    );
  }

  const data = (await res.json()) as DistanceMatrixResponse;

  if (data.status !== "OK") {
    const msg =
      data.error_message ||
      (data.status === "REQUEST_DENIED"
        ? "Maps access denied — check API key and Distance Matrix API."
        : "Could not calculate route.");
    return NextResponse.json({ error: msg }, { status: 422 });
  }

  const el = data.rows?.[0]?.elements?.[0];
  if (!el || el.status !== "OK") {
    const reason =
      el?.status === "ZERO_RESULTS"
        ? "No driving route found. Try a full street address including city and state."
        : "No driving route found for that destination.";
    return NextResponse.json({ error: reason }, { status: 422 });
  }

  const meters = el.distance?.value ?? 0;
  const seconds = el.duration?.value ?? 0;
  const milesOneWay = Math.round((meters / 1609.344) * 10) / 10;
  const minutesOneWay = Math.max(1, Math.round(seconds / 60));

  return NextResponse.json({
    milesOneWay,
    minutesOneWay,
    destinationFormatted:
      data.destination_addresses?.[0]?.trim() || destination,
    originFormatted:
      data.origin_addresses?.[0]?.trim() ?? PRICING_DRIVE_ORIGIN,
  });
}
