import type { Metadata } from "next";
import Link from "next/link";
import { getAllWorks, s2t } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  const works = getAllWorks();

  return (
    <SidebarLayout currentPath="/journal">
      <div
        style={{
          paddingTop: "var(--space-10)",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.05em",
            marginBottom: "var(--space-8)",
          }}
        >
          journal
        </p>

        {works.map((work, i) => (
          <Link
            key={work.id}
            href={`/journal/${work.id}`}
            style={{
              display: "block",
              padding: "var(--space-3) 0",
              borderBottom:
                i < works.length - 1
                  ? "1px solid var(--border)"
                  : "none",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily:
                  "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
              }}
            >
              {s2t(work.title)}
            </span>
          </Link>
        ))}
      </div>
    </SidebarLayout>
  );
}
