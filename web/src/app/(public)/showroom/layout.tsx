import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Same surface as services — album showcases use Montserrat headings. */
export default function ShowroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${montserrat.variable} min-h-full bg-[#0c0c0c] text-zinc-600`}
    >
      {children}
    </div>
  );
}
