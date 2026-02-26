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
  readonly backLabel?: string;
  readonly backHref?: string;
  readonly basePath?: string;
}

export function WorkTopNav({
  prevWork,
  nextWork,
  backLabel = "Works",
  backHref = "/works",
  basePath = "/works",
}: WorkTopNavProps) {
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
        href={backHref}
        style={linkStyle("back")}
        onMouseEnter={() => setHovered("back")}
        onMouseLeave={() => setHovered(null)}
      >
        &larr; {backLabel}
      </Link>

      <div style={{ display: "flex", gap: "var(--space-6)" }}>
        {prevWork ? (
          <Link
            href={`${basePath}/${prevWork.id}`}
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
            href={`${basePath}/${nextWork.id}`}
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
