"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/works", label: "Works" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div
        className="mobile-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4) var(--space-6)",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "baseline",
            gap: "var(--space-2)",
          }}
          onClick={() => setOpen(false)}
        >
          <span
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-lg)",
              fontWeight: 400,
              color: "var(--text-primary)",
            }}
          >
            一曲
          </span>
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
            }}
          >
            YIQU
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--space-2)",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            {open ? (
              <>
                <line x1="2" y1="2" x2="18" y2="12" stroke="var(--text-primary)" strokeWidth="1" />
                <line x1="2" y1="12" x2="18" y2="2" stroke="var(--text-primary)" strokeWidth="1" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="20" y2="1" stroke="var(--text-primary)" strokeWidth="1" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="var(--text-primary)" strokeWidth="1" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="var(--text-primary)" strokeWidth="1" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Full-screen overlay menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            backgroundColor: "var(--bg-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-8)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
