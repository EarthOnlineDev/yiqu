import type { Metadata } from "next";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <SidebarLayout currentPath="/contact">
      <div style={{ paddingTop: "var(--space-10)", maxWidth: 480 }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.05em",
            marginBottom: "var(--space-12)",
          }}
        >
          for bookings and collaborations
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          {/* Email */}
          <a
            href="mailto:hello@yiqu.photo"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-lg)",
              fontWeight: 400,
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            hello@yiqu.photo
          </a>

          {/* Social links */}
          <a
            href="#"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-base)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            Xiaohongshu
          </a>

          <a
            href="#"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-base)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            Instagram
          </a>
        </div>
      </div>
    </SidebarLayout>
  );
}
