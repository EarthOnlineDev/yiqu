"use client";

import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";

const navItems = ["Works", "Journal", "About", "Contact"];

export function NavigationDemo() {
  const [activeItem, setActiveItem] = useState("Works");

  return (
    <SectionWrapper title="navigation">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "var(--space-20)",
          minHeight: 400,
        }}
      >
        {/* Left Column — Navigation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "var(--space-10)",
          }}
        >
          {/* Photographer Name */}
          <div style={{ marginBottom: "var(--space-10)" }}>
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.4,
                marginBottom: "var(--space-1)",
              }}
            >
              一曲
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-base)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
              }}
            >
              YIQU
            </p>
          </div>

          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  color: activeItem === item ? "var(--text-primary)" : "var(--text-secondary)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "color var(--transition-normal)",
                  textDecoration: activeItem === item ? "underline" : "none",
                  textUnderlineOffset: 4,
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              marginTop: "auto",
              paddingBottom: "var(--space-10)",
            }}
          >
            &copy; 2024 YIQU
          </p>
        </div>

        {/* Right Column — Content Area */}
        <div
          style={{
            backgroundColor: "var(--bg-image)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-16)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-sm)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.05em",
            }}
          >
            photo area — {activeItem.toLowerCase()}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
