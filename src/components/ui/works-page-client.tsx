"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";

interface WorkPreviewItem {
  readonly id: string;
  readonly titleTC: string;
  readonly firstImageSrc: string;
  readonly allImageSrcs: readonly string[];
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

  // Preload after first render — delay to not compete with visible images
  const [preloadReady, setPreloadReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setPreloadReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  /* Work titles list — passed to SidebarNav as asideExtra */
  const workTitlesNav = (
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
  );

  return (
    <>
      {/* ===== Desktop: sidebar + hover preview with true crossfade ===== */}
      <div
        className="sidebar-layout works-desktop"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Left sidebar: branding + work titles (via SidebarNav for consistent brand position) */}
        <aside className="sidebar-aside">
          <SidebarNav
            currentPath="/works"
            hideMainNav
            asideExtra={workTitlesNav}
          />
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

      {/* Hidden preload: render actual Next.js <Image> components so the
          optimized /_next/image URLs get cached by the browser. When user
          clicks into a work detail, the carousel images are already warm. */}
      {preloadReady && (
        <div aria-hidden style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0 }}>
          {works.flatMap((work) =>
            work.allImageSrcs.slice(1).map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                loading="lazy"
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
