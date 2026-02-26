"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

interface WorkPreviewItem {
  readonly id: string;
  readonly titleTC: string;
  readonly firstImageSrc: string;
}

interface WorksPageClientProps {
  readonly works: readonly WorkPreviewItem[];
}

export function WorksPageClient({ works }: WorksPageClientProps) {
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleHover = useCallback(
    (index: number) => {
      if (index !== displayIndex) {
        setDisplayIndex(index);
      }
    },
    [displayIndex]
  );

  return (
    <>
      {/* ===== Desktop: sidebar + hover preview with true crossfade ===== */}
      <div
        className="sidebar-layout works-desktop"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Left sidebar: branding + work titles */}
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
                  onMouseEnter={() => handleHover(index)}
                  style={{
                    fontFamily:
                      "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                    fontSize: "var(--text-sm)",
                    fontWeight: 400,
                    color:
                      index === displayIndex
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
              &copy; 2026 YIQU
            </p>
          </div>
        </aside>

        {/* Right: TRUE crossfade — all images stacked, CSS handles transition */}
        <main
          style={{
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {works.map((work, index) => (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: index === displayIndex ? 1 : 0,
                transition: "opacity 600ms ease",
                pointerEvents: index === displayIndex ? "auto" : "none",
              }}
            >
              <Image
                src={work.firstImageSrc}
                alt={work.titleTC}
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
                  cursor: "pointer",
                }}
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
              />
            </Link>
          ))}
        </main>
      </div>

      {/* ===== Mobile: vertical scrollable list of works ===== */}
      <div className="works-mobile-list">
        {works.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            <Image
              src={work.firstImageSrc}
              alt={work.titleTC}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                marginBottom: "var(--space-3)",
              }}
              loading="lazy"
            />
            <p
              style={{
                fontFamily:
                  "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {work.titleTC}
            </p>
          </Link>
        ))}

        {/* Footer */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            paddingTop: "var(--space-4)",
            paddingBottom: "var(--space-4)",
            textAlign: "center",
          }}
        >
          &copy; 2026 YIQU
        </p>
      </div>
    </>
  );
}
