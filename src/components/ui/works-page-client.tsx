"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface WorkPreviewItem {
  readonly id: string;
  readonly titleTC: string;
  readonly firstImageSrc: string;
}

interface WorksPageClientProps {
  readonly works: readonly WorkPreviewItem[];
}

export function WorksPageClient({ works }: WorksPageClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="sidebar-layout"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Left sidebar: branding + nav + work titles */}
      <aside className="sidebar-aside">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            paddingTop: "var(--space-10)",
            overflow: "hidden",
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              marginBottom: "var(--space-12)",
            }}
          >
            <p
              style={{
                fontFamily:
                  "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                marginBottom: "var(--space-2)",
              }}
            >
              一曲
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-xl)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
              }}
            >
              YIQU
            </p>
          </Link>

          {/* Work titles as navigation */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {works.map((work, index) => (
              <Link
                key={work.id}
                href={`/works/${work.id}`}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  fontFamily:
                    "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color:
                    index === activeIndex
                      ? "var(--text-primary)"
                      : "var(--text-tertiary)",
                  textDecoration: "none",
                  transition: "color var(--transition-normal)",
                  lineHeight: 1.6,
                  display: "block",
                }}
              >
                {work.titleTC}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              paddingBottom: "var(--space-10)",
              paddingTop: "var(--space-4)",
              flexShrink: 0,
            }}
          >
            &copy; 2025 YIQU
          </p>
        </div>
      </aside>

      {/* Right: preview image */}
      <main
        style={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          key={works[activeIndex].firstImageSrc}
          src={works[activeIndex].firstImageSrc}
          alt={works[activeIndex].titleTC}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "calc(100vh - 160px)",
            objectFit: "contain",
            display: "block",
            transition: "opacity 300ms ease",
          }}
          priority
        />
      </main>
    </div>
  );
}
