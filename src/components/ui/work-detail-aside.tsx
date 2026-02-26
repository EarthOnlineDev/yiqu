"use client";

import Link from "next/link";
import { useState } from "react";

interface WorkNav {
  readonly id: string;
  readonly titleTC: string;
}

interface WorkDetailAsideProps {
  readonly titleTC: string;
  readonly seriesTC?: string;
  readonly descriptionTC: string;
  readonly prevWork: WorkNav | null;
  readonly nextWork: WorkNav | null;
}

export function WorkDetailAside({
  titleTC,
  seriesTC,
  descriptionTC,
  prevWork,
  nextWork,
}: WorkDetailAsideProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const linkStyle = (key: string, disabled?: boolean) => ({
    fontFamily: "var(--font-cormorant), Georgia, serif",
    fontSize: "var(--text-sm)" as const,
    fontWeight: 400 as const,
    letterSpacing: "0.05em",
    color: disabled
      ? "var(--border)"
      : hovered === key
        ? "var(--text-primary)"
        : "var(--text-secondary)",
    textDecoration: "none" as const,
    transition: "color var(--transition-normal)",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
        paddingTop: "var(--space-8)",
        height: "100%",
      }}
    >
      {/* Work navigation: ← Works / Back / Next */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        <Link
          href="/works"
          style={linkStyle("works")}
          onMouseEnter={() => setHovered("works")}
          onMouseLeave={() => setHovered(null)}
        >
          &larr; Works
        </Link>

        <div
          style={{
            display: "flex",
            gap: "var(--space-4)",
          }}
        >
          {prevWork ? (
            <Link
              href={`/works/${prevWork.id}`}
              style={linkStyle("prev")}
              onMouseEnter={() => setHovered("prev")}
              onMouseLeave={() => setHovered(null)}
            >
              Back
            </Link>
          ) : (
            <span style={linkStyle("prev", true)}>Back</span>
          )}

          {nextWork ? (
            <Link
              href={`/works/${nextWork.id}`}
              style={linkStyle("next")}
              onMouseEnter={() => setHovered("next")}
              onMouseLeave={() => setHovered(null)}
            >
              Next
            </Link>
          ) : (
            <span style={linkStyle("next", true)}>Next</span>
          )}
        </div>
      </nav>

      {/* Title + Series */}
      <div style={{ paddingTop: "var(--space-4)" }}>
        <p
          style={{
            fontFamily:
              "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.6,
          }}
        >
          {titleTC}
        </p>

        {seriesTC && (
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.02em",
              marginTop: "var(--space-1)",
            }}
          >
            {seriesTC}
          </p>
        )}
      </div>

      {/* Description */}
      {descriptionTC && (
        <p
          style={{
            fontFamily:
              "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-xs)",
            fontWeight: 400,
            color: "var(--text-secondary)",
            lineHeight: 2,
            whiteSpace: "pre-line",
          }}
        >
          {descriptionTC}
        </p>
      )}
    </div>
  );
}
