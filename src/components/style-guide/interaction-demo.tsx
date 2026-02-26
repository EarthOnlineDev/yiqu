"use client";

import { SectionWrapper } from "./section-wrapper";

export function InteractionDemo() {
  return (
    <SectionWrapper title="interactions">
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {/* Hover Links */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              marginBottom: "var(--space-4)",
            }}
          >
            hover states — opacity transition 300ms
          </p>
          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            {["散步日記", "女性人像", "她與山"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                  fontSize: "var(--text-lg)",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color var(--transition-normal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Underline Link */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              marginBottom: "var(--space-4)",
            }}
          >
            active state — subtle underline
          </p>
          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            {["Works", "Journal", "About", "Contact"].map((item, i) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                  textDecoration: i === 0 ? "underline" : "none",
                  textUnderlineOffset: 4,
                  transition: "color var(--transition-normal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Photo Fade-in Note */}
        <div
          style={{
            padding: "var(--space-8)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            photos fade in when entering viewport — 600ms ease-out<br />
            page transitions — 400ms opacity crossfade<br />
            no parallax, no slide-ins, no bounces, no scroll hijacking
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
