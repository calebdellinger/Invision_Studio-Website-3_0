import { CinematicGrain } from "@/components/site/CinematicGrain";
import { PublicMain } from "@/components/site/PublicMain";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function PublicSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CinematicGrain />
      <SiteHeader />
      <PublicMain>{children}</PublicMain>
      <SiteFooter />
    </>
  );
}
