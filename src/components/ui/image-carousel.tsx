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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const total = images.length;
  const hasMultiple = total > 1;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || !hasMultiple) return;
      setIsTransitioning(true);
      setLoaded(false); // Reset load state for new image
      setCurrentIndex(((index % total) + total) % total);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [isTransitioning, hasMultiple, total]
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
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: cursorStyle,
        overflow: "hidden",
        minHeight: 0,
        backgroundColor: "var(--bg-image)",
      }}
    >
      {/* Current image with onLoad fade-in */}
      <Image
        key={images[currentIndex].src}
        src={images[currentIndex].src}
        alt={`${alt} — ${currentIndex + 1}`}
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
          opacity: loaded ? 1 : 0,
          transition: "opacity 600ms ease-out",
        }}
        priority
        onLoad={() => setLoaded(true)}
      />

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
            opacity: loaded ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        >
          {currentIndex + 1} / {total}
        </span>
      )}

      {/* Preload next image (hidden) */}
      {hasMultiple && (
        <Image
          src={images[(currentIndex + 1) % total].src}
          alt=""
          width={0}
          height={0}
          sizes="1px"
          style={{ position: "absolute", width: 0, height: 0, opacity: 0 }}
          aria-hidden
        />
      )}
    </div>
  );
}
