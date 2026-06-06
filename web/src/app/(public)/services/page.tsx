import type { Metadata } from "next";
import { ServicesFlow } from "@/components/site/ServicesFlow";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Photography, video, social content, and AI integrations — cinematic creative services.",
};

export default function ServicesPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-clip bg-white">
      <ServicesFlow />
    </div>
  );
}
