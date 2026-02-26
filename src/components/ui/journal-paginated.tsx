"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

interface ContentBlock {
  readonly text: string;
  readonly imageSrc?: string;
}

interface JournalPaginatedProps {
  readonly title: string;
  readonly blocks: readonly ContentBlock[];
}

export function JournalPaginated({ title, blocks }: JournalPaginatedProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const total = blocks.length;
  const hasMultiple = total > 1;
  const block = blocks[currentPage];

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || !hasMultiple) return;
      const next = Math.max(0, Math.min(total - 1, index));
      if (next === currentPage) return;
      setIsTransitioning(true);
      setCurrentPage(next);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [isTransitioning, hasMultiple, total, currentPage]
  );

  const goPrev = useCallback(
    () => goTo(currentPage - 1),
    [goTo, currentPage]
  );
  const goNext = useCallback(
    () => goTo(currentPage + 1),
    [goTo, currentPage]
  );

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  // Touch
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

  // Click navigation
  const handleClick = (e: React.MouseEvent) => {
    if (!hasMultiple || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goPrev();
    else goNext();
  };

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

  const hasImage = !!block.imageSrc;
  const hasText = !!block.text;

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
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: cursorStyle,
        minHeight: 0,
        position: "relative",
        opacity: isTransitioning ? 0.6 : 1,
        transition: "opacity 300ms ease",
      }}
    >
      {/* Title on first page */}
      {currentPage === 0 && (
        <h1
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-xl)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.6,
            marginBottom: "var(--space-6)",
            flexShrink: 0,
          }}
        >
          {title}
        </h1>
      )}

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: hasImage && hasText ? "grid" : "flex",
          gridTemplateColumns: hasImage && hasText ? "1fr 1fr" : undefined,
          gap: "var(--space-10)",
          alignItems: "center",
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
              overflow: "hidden",
              maxHeight: "100%",
              alignSelf: "center",
            }}
          >
            {block.text}
          </div>
        )}

        {/* Image */}
        {hasImage && (
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
              src={block.imageSrc!}
              alt={title}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
              priority
            />
          </div>
        )}
      </div>

      {/* Counter */}
      {hasMultiple && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--space-4)",
            flexShrink: 0,
          }}
        >
          <Link
            href="/journal"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            &larr; journal
          </Link>
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.1em",
            }}
          >
            {currentPage + 1} / {total}
          </span>
        </div>
      )}
    </div>
  );
}
