"use client";

import { SectionWrapper } from "./section-wrapper";
import { getAllWorks, s2t } from "@/lib/works";

export function JournalListDemo() {
  const works = getAllWorks();

  // Generate entries from works data with s2t conversion
  const entries = works.map((work) => ({
    title: s2t(work.title),
    // Use a mock date since works.json doesn't have dates yet
    date: "",
  }));

  return (
    <SectionWrapper title="journal list">
      <div style={{ maxWidth: 800 }}>
        {entries.map((entry, i) => (
          <a
            key={entry.title}
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "var(--space-5) 0",
              borderBottom: i < entries.length - 1 ? "1px solid var(--border)" : "none",
              textDecoration: "none",
              cursor: "pointer",
              transition: "opacity var(--transition-normal)",
            }}
            onMouseEnter={(e) => {
              const title = e.currentTarget.querySelector("[data-title]") as HTMLElement;
              if (title) title.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              const title = e.currentTarget.querySelector("[data-title]") as HTMLElement;
              if (title) title.style.color = "var(--text-secondary)";
            }}
          >
            <span
              data-title
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-base)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                transition: "color var(--transition-normal)",
              }}
            >
              {entry.title}
            </span>
            {entry.date && (
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color: "var(--text-tertiary)",
                  flexShrink: 0,
                  marginLeft: "var(--space-8)",
                }}
              >
                {entry.date}
              </span>
            )}
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
