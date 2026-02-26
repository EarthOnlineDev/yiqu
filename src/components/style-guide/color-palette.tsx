import { SectionWrapper } from "./section-wrapper";

const colors = [
  { name: "--bg-primary", value: "#F5F5F3", label: "Background Primary", desc: "Page background" },
  { name: "--bg-secondary", value: "#ECEAE6", label: "Background Secondary", desc: "Hover / section bg" },
  { name: "--bg-image", value: "#E8E6E1", label: "Image Placeholder", desc: "Loading state" },
  { name: "--text-primary", value: "#1A1A1A", label: "Text Primary", desc: "Body text, headings" },
  { name: "--text-secondary", value: "#6B6B6B", label: "Text Secondary", desc: "Dates, captions" },
  { name: "--text-tertiary", value: "#9A9A9A", label: "Text Tertiary", desc: "Labels, copyright" },
  { name: "--border", value: "#E0DED9", label: "Border", desc: "Dividers" },
  { name: "--white", value: "#FFFFFF", label: "White", desc: "Sparingly used" },
];

export function ColorPalette() {
  return (
    <SectionWrapper title="colors">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {colors.map((color) => (
          <div key={color.name}>
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                backgroundColor: color.value,
                border: color.value === "#FFFFFF" ? "1px solid var(--border)" : "none",
                marginBottom: "var(--space-3)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--text-primary)",
                marginBottom: "var(--space-1)",
              }}
            >
              {color.label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-xs)",
                color: "var(--text-tertiary)",
              }}
            >
              {color.value} — {color.desc}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
