"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

interface SidebarNavProps {
  readonly currentPath: string;
  readonly asideExtra?: ReactNode;
}

const navItems = [
  { href: "/works", label: "Works" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function NavLink({
  href,
  label,
  active,
}: {
  readonly href: string;
  readonly label: string;
  readonly active: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "var(--text-sm)",
        fontWeight: 400,
        letterSpacing: "0.05em",
        color:
          active || hovered ? "var(--text-primary)" : "var(--text-secondary)",
        textDecoration: active ? "underline" : "none",
        textUnderlineOffset: "4px",
        transition: "color var(--transition-normal)",
        display: "block",
      }}
    >
      {label}
    </Link>
  );
}

export function SidebarNav({ currentPath, asideExtra }: SidebarNavProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: "var(--space-10)",
        overflow: "hidden",
      }}
    >
      {/* Name */}
      <Link
        href="/"
        style={{ textDecoration: "none", marginBottom: "var(--space-12)" }}
      >
        <p
          style={{
            fontFamily:
              "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
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
      </Link>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-5)",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={currentPath.startsWith(item.href)}
          />
        ))}
      </nav>

      {/* Optional extra content (e.g., work metadata on detail pages) */}
      {asideExtra && (
        <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
          {asideExtra}
        </div>
      )}

      {/* Spacer */}
      {!asideExtra && <div style={{ flex: 1 }} />}

      {/* Footer */}
      <p
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "var(--text-xs)",
          color: "var(--text-tertiary)",
          paddingBottom: "var(--space-10)",
          paddingTop: "var(--space-4)",
          flexShrink: 0,
        }}
      >
        &copy; 2025 YIQU
      </p>
    </div>
  );
}
