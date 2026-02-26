import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_TC } from "next/font/google";
import { MobileNav } from "@/components/layout/mobile-nav";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "一曲 / YIQU",
    template: "%s — 一曲 YIQU",
  },
  description:
    "YIQU (一曲) — Photographer based in Dali, China. Daily walks, female portraiture, and the quiet beauty of mountains.",
  openGraph: {
    title: "一曲 / YIQU",
    description: "Photography by YIQU — Dali, China",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${notoSerifTC.variable} antialiased`}
      >
        <MobileNav />
        {children}
      </body>
    </html>
  );
}
