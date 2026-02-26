"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface ContentBlock {
  readonly text: string;
  readonly imageSrc?: string;
}

interface JournalPaginatedProps {
  readonly blocks: readonly ContentBlock[];
  readonly title: string;
}

export function JournalPaginated({ blocks, title }: JournalPaginatedProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [loadedSet, setLoadedSet] = useState<ReadonlySet<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const total = blocks.length;
  const hasMultiple = total > 1;

  const goTo = useCallback(
    (index: number) => {
      if (!hasMultiple) return;
      const next = Math.max(0, Math.min(total - 1, index));
      if (next !== currentPage) {
        setCurrentPage(next);
      }
    },
    [hasMultiple, total, currentPage]
  );

  const goPrev = useCallback(
    () => goTo(currentPage - 1),
    [goTo, currentPage]
  );
  const goNext = useCallback(
    () => goTo(currentPage + 1),
    [goTo, currentPage]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Click navigation: left half → prev, right half → next
  const handleClick = (e: React.MouseEvent) => {
    if (!hasMultiple || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goPrev();
    else goNext();
  };

  // Track mouse position for cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasMultiple || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverSide(x < rect.width / 2 ? "left" : "right");
  };

  const cursorStyle = !hasMultiple
    ? "default"
    : hoverSide === "left" && currentPage > 0
      ? "w-resize"
      : hoverSide === "right" && currentPage < total - 1
        ? "e-resize"
        : "default";

  // Track image load state
  const handleImageLoad = useCallback((index: number) => {
    setLoadedSet((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverSide(null)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        flex: 1,
        position: "relative",
        cursor: cursorStyle,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      {/* TRUE CROSSFADE: All pages stacked, CSS opacity transitions */}
      {blocks.map((block, index) => {
        const hasImage = !!block.imageSrc;
        const hasText = !!block.text;
        const isActive = index === currentPage;
        const imageLoaded = !hasImage || loadedSet.has(index);

        return (
          <div
            key={`${block.text.slice(0, 30)}-${index}`}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              opacity: isActive && imageLoaded ? 1 : 0,
              transition: "opacity 600ms ease",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            {/* Content area */}
            <div
              style={{
                flex: 1,
                display: hasImage && hasText ? "grid" : "flex",
                gridTemplateColumns: hasImage && hasText ? "1fr 1fr" : undefined,
                gap: "var(--space-10)",
                overflow: "hidden",
                minHeight: 0,
              }}
            >
              {/* Text */}
              {hasText && (
                <div
                  style={{
                    fontFamily:
                      "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                    fontSize: "var(--text-sm)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    lineHeight: 2,
                    whiteSpace: "pre-line",
                    overflow: "auto",
                    maxHeight: "100%",
                    alignSelf: "center",
                  }}
                >
                  {block.text}
                </div>
              )}

              {/* Image — fill mode so it scales up to use available space */}
              {hasImage && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={block.imageSrc!}
                    alt={`${title} — ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "eager"}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Counter */}
      {hasMultiple && (
        <span
          style={{
            position: "absolute",
            bottom: "var(--space-4)",
            right: "var(--space-4)",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.1em",
            userSelect: "none",
          }}
        >
          {currentPage + 1} / {total}
        </span>
      )}
    </div>
  );
}
