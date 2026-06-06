import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

/**
 * Service detail pages: Montserrat for headings via `--font-montserrat`;
 * body inherits site sans (Plus Jakarta) from root.
 */
export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${montserrat.variable} min-h-full bg-white text-zinc-800`}
    >
      {children}
    </div>
  );
}
