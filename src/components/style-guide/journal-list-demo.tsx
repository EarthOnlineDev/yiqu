"use client";

import { SectionWrapper } from "./section-wrapper";

const entries = [
  { title: "心裡的草原·心裡的土地", date: "2024.12.20" },
  { title: "三點多的清晨太陽升起來", date: "2024.12.15" },
  { title: "種子知道如何等待", date: "2024.12.08" },
  { title: "想對小學時的自己說", date: "2024.11.30" },
  { title: "大理的日出是溫柔", date: "2024.11.22" },
  { title: "「在世間看」", date: "2024.11.15" },
  { title: "一隻特立獨行的鳥", date: "2024.11.01" },
  { title: "沉醉在無邊的灰白", date: "2024.10.25" },
];

export function JournalListDemo() {
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
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
