interface WorkDetailAsideProps {
  readonly titleTC: string;
  readonly descriptionTC: string;
  readonly publishDate?: string;
  readonly locationTC?: string;
}

export function WorkDetailAside({
  titleTC,
  descriptionTC,
  publishDate,
  locationTC,
}: WorkDetailAsideProps) {
  const hasMeta = !!(publishDate || locationTC);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* Title */}
      <div style={{ flexShrink: 0 }}>
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

        {/* Date + Location — subtle metadata line */}
        {hasMeta && (
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.02em",
              marginTop: "var(--space-2)",
            }}
          >
            {[publishDate, locationTC].filter(Boolean).join("  ·  ")}
          </p>
        )}
      </div>

      {/* Description — scrollable for long text */}
      {descriptionTC && (
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
          }}
        >
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
        </div>
      )}
    </div>
  );
}
