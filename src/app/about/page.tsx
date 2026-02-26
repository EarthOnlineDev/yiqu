import type { Metadata } from "next";
import { getAllWorks } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { WorkImage } from "@/components/ui/work-image";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  const works = getAllWorks();
  // Use 每日散步时间 first image as portrait stand-in
  const portraitWork = works[9];

  return (
    <SidebarLayout currentPath="/about">
      <div style={{ paddingTop: "var(--space-10)", maxWidth: 720 }}>
        {/* Portrait photo */}
        {portraitWork?.images[0] && (
          <div style={{ marginBottom: "var(--space-16)" }}>
            <WorkImage
              src={portraitWork.images[0].src}
              alt="一曲 YIQU"
              priority
            />
          </div>
        )}

        {/* Chinese bio */}
        <p
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 2.0,
            marginBottom: "var(--space-12)",
          }}
        >
          一曲，攝影師，常居雲南大理。
          用鏡頭記錄日常散步途中的光、人與山。
          喜歡安靜的事物，相信慢慢走也能到很遠的地方。
        </p>

        {/* English bio */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          YIQU is a photographer based in Dali, Yunnan, China.
          She captures the quiet beauty of daily walks — light,
          people, and mountains along the way.
        </p>
      </div>
    </SidebarLayout>
  );
}
