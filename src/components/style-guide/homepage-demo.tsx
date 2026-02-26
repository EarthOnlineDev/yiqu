export function HomepageDemo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "var(--space-20)",
        padding: "var(--space-20) var(--space-20)",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      {/* Left Column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "var(--space-10)",
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-3xl)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: "var(--space-2)",
            }}
          >
            一曲
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xl)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
            }}
          >
            YIQU
          </p>
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            marginBottom: "var(--space-16)",
          }}
        >
          {["Works", "Journal", "About", "Contact"].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                letterSpacing: "0.05em",
                cursor: "default",
              }}
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
          }}
        >
          &copy; 2024 YIQU
        </p>
      </div>

      {/* Right Column — Hero Photo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "var(--space-10)",
          paddingBottom: "var(--space-10)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            aspectRatio: "3 / 2",
            backgroundColor: "var(--bg-image)",
            position: "relative",
          }}
        >
          <p
            style={{
              position: "absolute",
              bottom: "var(--space-6)",
              right: "var(--space-6)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.05em",
            }}
          >
            hero photograph
          </p>
        </div>
      </div>
    </div>
  );
}
