import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DaVinciResolveSyllabus } from "@/components/internal/DaVinciResolveSyllabus";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DaVinci Resolve 19 — Master syllabus",
  robots: { index: false, follow: false },
};

export default function DaVinciResolveSyllabusPage() {
  return (
    <div className={`${inter.variable} w-full`}>
      <DaVinciResolveSyllabus />
    </div>
  );
}
