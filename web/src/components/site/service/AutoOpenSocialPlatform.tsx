"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PLATFORM_ROUTES: Record<string, string> = {
  facebook: "/services/social-media/facebook",
  tiktok: "/services/social-media/tiktok",
  pinterest: "/services/social-media/pinterest",
};

export function AutoOpenSocialPlatform() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const platform = searchParams.get("autoPlatform")?.toLowerCase() ?? "";
    const route = PLATFORM_ROUTES[platform];
    if (!route) return;

    const onceKey = `social-auto-open:${platform}`;
    const alreadyOpened = sessionStorage.getItem(onceKey) === "1";

    if (alreadyOpened) {
      const cleaned = new URLSearchParams(searchParams.toString());
      cleaned.delete("autoPlatform");
      const nextQuery = cleaned.toString();
      router.replace(nextQuery ? `/services/social-media?${nextQuery}` : "/services/social-media");
      return;
    }

    sessionStorage.setItem(onceKey, "1");
    const timer = window.setTimeout(() => {
      router.push(route);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [router, searchParams]);

  return null;
}
