interface SectionWrapperProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

export function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <section style={{ marginBottom: "var(--space-20)" }}>
      <h3
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "var(--text-sm)",
          fontWeight: 400,
          color: "var(--text-tertiary)",
          letterSpacing: "0.05em",
          marginBottom: "var(--space-8)",
          paddingBottom: "var(--space-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
