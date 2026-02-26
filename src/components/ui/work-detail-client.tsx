"use client";

import Link from "next/link";
import { useState } from "react";
import { ImageCarousel } from "./image-carousel";

interface WorkImage {
  readonly src: string;
  readonly name?: string;
}

interface WorkNav {
  readonly id: string;
  readonly titleTC: string;
}

interface WorkDetailClientProps {
  readonly titleTC: string;
  readonly seriesTC?: string;
  readonly descriptionTC: string;
  readonly images: readonly WorkImage[];
  readonly prevWork: WorkNav | null;
  readonly nextWork: WorkNav | null;
}

export function WorkDetailClient({
  titleTC,
  seriesTC,
  descriptionTC,
  images,
  prevWork,
  nextWork,
}: WorkDetailClientProps) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-primary)",
        padding: "var(--space-6) var(--space-10)",
      }}
    >
      {/* Top nav bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
          paddingBottom: "var(--space-4)",
        }}
      >
        {/* Left: back to works */}
        <Link
          href="/works"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "color var(--transition-normal)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-tertiary)")
          }
        >
          &larr; Works
        </Link>

        {/* Right: Back / Next */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-6)",
          }}
        >
          {prevWork ? (
            <Link
              href={`/works/${prevWork.id}`}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color var(--transition-normal)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-tertiary)")
              }
            >
              Back
            </Link>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--border)",
                letterSpacing: "0.05em",
              }}
            >
              Back
            </span>
          )}

          {nextWork ? (
            <Link
              href={`/works/${nextWork.id}`}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color var(--transition-normal)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-tertiary)")
              }
            >
              Next
            </Link>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--border)",
                letterSpacing: "0.05em",
              }}
            >
              Next
            </span>
          )}
        </div>
      </div>

      {/* Image carousel — fills remaining space */}
      <ImageCarousel images={images} alt={titleTC} />

      {/* Bottom: title + series */}
      <div
        style={{
          flexShrink: 0,
          paddingTop: "var(--space-4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <span
            style={{
              fontFamily:
                "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--text-primary)",
              cursor: descriptionTC ? "pointer" : "default",
            }}
            onClick={() => descriptionTC && setShowDesc(!showDesc)}
          >
            {titleTC}
          </span>

          {seriesTC && (
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
                marginLeft: "var(--space-4)",
                letterSpacing: "0.02em",
              }}
            >
              {seriesTC}
            </span>
          )}
        </div>
      </div>

      {/* Expandable description overlay */}
      {showDesc && descriptionTC && (
        <div
          onClick={() => setShowDesc(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(245, 245, 243, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            cursor: "pointer",
            padding: "var(--space-20)",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <h2
              style={{
                fontFamily:
                  "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-lg)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.6,
                marginBottom: "var(--space-6)",
              }}
            >
              {titleTC}
            </h2>
            <p
              style={{
                fontFamily:
                  "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 2,
                whiteSpace: "pre-line",
              }}
            >
              {descriptionTC}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
