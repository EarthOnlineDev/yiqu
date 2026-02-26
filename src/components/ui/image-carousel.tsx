"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface CarouselImage {
  readonly src: string;
  readonly name?: string;
}

interface ImageCarouselProps {
  readonly images: readonly CarouselImage[];
  readonly alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [loadedSet, setLoadedSet] = useState<ReadonlySet<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const total = images.length;
  const hasMultiple = total > 1;

  const goTo = useCallback(
    (index: number) => {
      if (!hasMultiple) return;
      const next = ((index % total) + total) % total;
      if (next !== currentIndex) {
        setCurrentIndex(next);
      }
    },
    [hasMultiple, total, currentIndex]
  );

  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [goTo, currentIndex]
  );
  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [goTo, currentIndex]
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
    : hoverSide === "left"
      ? "w-resize"
      : "e-resize";

  // Track image load state
  const handleImageLoad = useCallback((index: number) => {
    setLoadedSet((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  // First image loaded = show counter
  const firstLoaded = loadedSet.has(0);

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
      {/* TRUE CROSSFADE: All images stacked, CSS opacity transitions */}
      {images.map((image, index) => (
        <div
          key={image.src}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: index === currentIndex && loadedSet.has(index) ? 1 : 0,
            transition: "opacity 600ms ease",
            pointerEvents: index === currentIndex ? "auto" : "none",
          }}
        >
          <Image
            src={image.src}
            alt={`${alt} — ${index + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            }}
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}

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
            opacity: firstLoaded ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          {currentIndex + 1} / {total}
        </span>
      )}
    </div>
  );
}
