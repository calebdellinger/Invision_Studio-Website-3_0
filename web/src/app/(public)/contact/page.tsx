import type { Metadata } from "next";
import { ContactView } from "@/components/site/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Invision Creative.",
};

export default function ContactPage() {
  return <ContactView />;
}
