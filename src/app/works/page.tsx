import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllWorks, s2t } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

export const metadata: Metadata = {
  title: "Works",
};

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <SidebarLayout currentPath="/works">
      <div style={{ paddingTop: "var(--space-10)" }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.05em",
            marginBottom: "var(--space-12)",
          }}
        >
          works
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {works.map((work, i) => (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-5)",
                padding: "var(--space-5) 0",
                borderBottom:
                  i < works.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                textDecoration: "none",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  flexShrink: 0,
                  backgroundColor: "var(--bg-image)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={work.images[0].src}
                  alt=""
                  width={60}
                  height={60}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Title */}
              <span
                style={{
                  fontFamily:
                    "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                }}
              >
                {s2t(work.title)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
