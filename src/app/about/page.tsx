import type { Metadata } from "next";
import Image from "next/image";
import { getAllWorks } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  const works = getAllWorks();
  const portraitWork = works[9];

  return (
    <SidebarLayout currentPath="/about">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-16)",
          alignItems: "center",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left: bio text */}
        <div>
          <p
            style={{
              fontFamily:
                "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 2.2,
              marginBottom: "var(--space-12)",
            }}
          >
            一曲，攝影師，常居雲南大理。
            <br />
            用鏡頭記錄日常散步途中的光、人與山。
            <br />
            喜歡安靜的事物，相信慢慢走也能到很遠的地方。
          </p>

          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              letterSpacing: "0.02em",
            }}
          >
            YIQU is a photographer based in Dali, Yunnan.
            <br />
            She captures the quiet beauty of daily walks —
            <br />
            light, people, and mountains along the way.
          </p>
        </div>

        {/* Right: portrait photo */}
        {portraitWork?.images[0] && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src={portraitWork.images[0].src}
              alt="一曲 YIQU"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 40vw"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "calc(100vh - 160px)",
                objectFit: "contain",
                display: "block",
              }}
              priority
            />
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
