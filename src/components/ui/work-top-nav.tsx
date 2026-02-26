"use client";

import Link from "next/link";
import { useState } from "react";

interface WorkNav {
  readonly id: string;
  readonly titleTC: string;
}

interface WorkTopNavProps {
  readonly prevWork: WorkNav | null;
  readonly nextWork: WorkNav | null;
}

export function WorkTopNav({ prevWork, nextWork }: WorkTopNavProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const linkStyle = (key: string, disabled?: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-cormorant), Georgia, serif",
    fontSize: "var(--text-sm)",
    fontWeight: 400,
    letterSpacing: "0.05em",
    color: disabled
      ? "var(--border)"
      : hovered === key
        ? "var(--text-primary)"
        : "var(--text-secondary)",
    textDecoration: "none",
    transition: "color var(--transition-normal)",
  });

  return (
    <nav className="work-top-nav">
      <Link
        href="/works"
        style={linkStyle("works")}
        onMouseEnter={() => setHovered("works")}
        onMouseLeave={() => setHovered(null)}
      >
        &larr; Works
      </Link>

      <div style={{ display: "flex", gap: "var(--space-6)" }}>
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
  );
}
