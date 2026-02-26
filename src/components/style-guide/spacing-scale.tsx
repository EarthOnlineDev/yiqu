import { SectionWrapper } from "./section-wrapper";

const spacings = [
  { token: "--space-1", value: "4px", label: "Minimum gap" },
  { token: "--space-2", value: "8px", label: "Tight gaps" },
  { token: "--space-4", value: "16px", label: "Related items" },
  { token: "--space-6", value: "24px", label: "Nav items" },
  { token: "--space-8", value: "32px", label: "Section padding" },
  { token: "--space-12", value: "48px", label: "Content blocks" },
  { token: "--space-16", value: "64px", label: "Major sections" },
  { token: "--space-20", value: "80px", label: "Page margins" },
  { token: "--space-32", value: "128px", label: "Between photos" },
];

export function SpacingScale() {
  return (
    <SectionWrapper title="spacing">
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {spacings.map((s) => (
          <div
            key={s.token}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-6)",
            }}
          >
            <div
              style={{
                width: s.value,
                height: 12,
                backgroundColor: "var(--text-primary)",
                opacity: 0.15,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
